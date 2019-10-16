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
    
    if (await authCheck()) {
        // 验证当前路由所有的匹配中是否需要有登录验证的
        if (to.matched.some(r => r.meta.auth)) {
            // 这里暂时将cookie里是否存有token作为验证是否登录的条件
            // 请根据自身业务需要修改
            // 验证菜单权限
            let route = to.matched.filter(r => r.path === to.fullPath)
            if (route.length === 1) {
                if (await menuCheck(route.path, route[0].meta.perm)) {
                    next()
                } else {
                    next({
                        name: '401'
                    })
                }
            } else {
                // 不需要身份校验 直接通过
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
    let user = await store.dispatch('d2admin/user/get')
    let expire = user.exp
    if (!expire) { return false }
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
    if (isAdmin(user.roles, user.perms)) { // 超级管理员
        return true
    }
    let menus = user.menus
    if (menus.filter(d => d.path === menu).length > 0) {
        return true
    }

    return false
}

// 检查资源权限
const permissionCheck = async function(url) {
    let user = await store.dispatch('d2admin/user/get')
    if (!user) { return false }
    let roles = user.roles
    let perms = user.perms
    if (isAdmin(roles, perms)) { // 超级管理员
        return true
    }
    let path = url.replace('/api/', '')
    let pass = false
    perms.forEach(d => {
        let _path = _.lowerCase(d.path)
        if (_path === path || path.startWith(_path)) {
            pass = true
        }
    })
    if (pass) {
        return true
    }
    
    return false
}

// 检查是否是管理员
const isAdmin = function(roles, perms) {
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
    isAdminPermission
}
export default router
