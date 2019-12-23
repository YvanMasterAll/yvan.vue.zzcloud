import Vue from 'vue'
import VueRouter from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

import api from '@/api'

// 路由数据
import routes from './routes'

var _ = require('lodash')

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
    // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
    await store.dispatch('d2admin/page/isLoaded')
    // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
    await store.dispatch('d2admin/size/isLoaded')
    // 进度条
    NProgress.start()
    // 关闭搜索面板
    store.commit('d2admin/search/set', false)
    
    if (to.matched.some(r => r.meta.public)) { // 公开页面不检查权限
        return next()
    }
    
    // 首先要验证用户是否登录或者登录已过期
    if (await authCheck()) {
        // 验证当前路由所有的匹配中是否需要有登录验证的
        if (to.matched.some(r => r.meta.auth)) {
            // 这里暂时将cookie里是否存有token作为验证是否登录的条件
            // 请根据自身业务需要修改
            // 验证菜单权限
            let route = to.matched.filter(r => r.path === to.fullPath)
            if (route.length === 1) {
                if (await menuCheck(route[0].path, route[0].meta.perm)) {
                    next()
                } else {
                    next({
                        name: '401'
                    })
                }
            } else {
                // 不需要身份校验，直接通过
                next()
            }
            NProgress.done()
        } else {
            next()
        }
    } else {
        // 没有登录的时候跳转到登录界面
        // 携带上登陆成功之后需要跳转的页面完整路径
        next({
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        })
        // https://github.com/d2-projects/d2-admin/issues/138
        NProgress.done()
    }
})

const authCheck = async function() {
    // 取到用户信息
    let user = await store.dispatch('d2admin/user/get')
    let expire = user.exp
    if (!expire) { return false }
    // 验证过期时间
    let now = Math.ceil((new Date().getTime())/1000)
    if (now > expire) {
        return false
    }
    // 如果过期时间快到了那就更新token
    if ((expire - now)/60 < 20) {
        let result = await api.refresh()
        if (result.valid) {
            user.exp = result.data.exp
            user.iat = result.data.iat
            await store.dispatch('d2admin/user/set', user)
        }
        console.log('重新更新token结果: ' + result.msg)
    }

    return true
}

// 检查菜单权限
const menuCheck = async function(menu, authorities) {
    // 获取用户的权限
    let user = await store.dispatch('d2admin/user/get')
    if (!user) { return false }
    let isadmin = isAdmin(user.roles, user.perms) // 超级管理员
    let menus = user.menus
    
    // 检查菜单权限，没有权限访问的菜单隐藏
    if (menu instanceof Array) { 
        function query(m) {
            if (isadmin || m.public) { // 管理员或者是公开菜单始终可见
                m.show = true 
            } else { 
                m.show = menus.filter(d => '/' + d.path === m.path).length > 0
            }
            if (m.children) { m.children.forEach(d => query(d)) }
        }
        menu.forEach(m => query(m))
        
        return
    }

    // 检查权限
    if (isadmin) { return true }
    return menus.filter(d => '/' + d.path === menu).length > 0
}

// 检查资源权限
const permissionCheck = function(urls) {
    // let user = await store.dispatch('d2admin/user/get')
    let user = store.state.d2admin.user.info // 同步获取用户信息, 因为template中无法异步操作
    if (!user) { return false }
    let roles = user.roles
    let perms = user.perms
    if (!roles || !perms) { return false }
    if (isAdmin(roles, perms)) { // 超级管理员
        return true
    }
    // 检查资源权限，其实就是判断权限中是否能匹配访问路由
    urls = urls.map(u => u.replace('/api/', ''))
    let paths = perms.map(p => p.path)
    let cool = urls.some(u => { // 乐观判断
        return paths.includes(u)
        // return paths.includes(u) || paths.filter(p => u.startWith(p)).length > 0
    })
    // let cool = urls.every(u => { // 悲观判断
    //     return paths.includes(u)
    //     // return paths.includes(u) || paths.filter(p => u.startWith(p)).length > 0
    // })

    return cool
}

// 检查是否是管理员
const isAdmin = function(roles, perms) {
    if (!roles || !perms) { return false }
    return (roles.filter(d => d.id === 1).length > 0 && perms.filter(d => d.id === 1).length > 0)
}

// 检查是否是超管角色
const isAdminRole = function(id) {
    return id === 1
}

// 检查是否是超管权限
const isAdminPermission = function(id) {
    return id === 1
}

// 检查是否是根部门
const isRootDept = function(dept) {
    return dept.pid === 0
}

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 多页控制 打开新的页面
    store.dispatch('d2admin/page/open', to)
    // 更改标题
    util.title(to.meta.title)
})

export {
    isAdmin,
    isAdminRole,
    permissionCheck,
    menuCheck,
    isAdminPermission,
    isRootDept
}
export default router
