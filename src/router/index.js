import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

import { env } from '@/libs/util.storage'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

/// 权限类型
const ptype = {
    menu: 'menu',           // 菜单权限
    resource: 'resource',   // 资源权限
    feature: 'feature'      // 功能权限
}

const permissions = [
    { id: 101, name: '超管', type: ptype.feature }, // 具备管理所有用户的权力 
    { id: 102, name: '管理', type: ptype.feature }, // 具备管理成员的权力
    { id: 201, name: '监控', type: ptype.menu },
    { id: 202, name: '图表', type: ptype.menu },
    { id: 203, name: '表格', type: ptype.menu },
    { id: 204, name: '列表', type: ptype.menu },
    { id: 205, name: '内容', type: ptype.menu },
    { id: 206, name: '结果', type: ptype.menu },
    { id: 207, name: '异常', type: ptype.menu }
]

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
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some(r => r.meta.auth)) {
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        // 请根据自身业务需要修改
        if (authCheck()) {
            // 验证路由权限
            let route = to.matched.filter(r => r.path === to.fullPath)
            if (route.length === 1 && route[0].meta.perm) {
                if (permCheck(route[0].meta.perm)) {
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
    } else {
        next()
    }
})

const authCheck = function() {
    let user = env.getUser()
    if (!user) { return false }
    let token = user.token
    let expire = token.exp
    let now = Math.ceil((new Date().getTime())/1000)
    if (now > expire) {
        return false
    }

    return true
}

const permCheck = function(authorities) {
    // 获取用户的权限
    let user = env.getUser()
    let perms = user.perms
    let pass = true
    authorities.forEach(p => {
        if (perms.includes(p)) {
            return
        }
        pass = false
    })

    return pass
}

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 多页控制 打开新的页面
    store.dispatch('d2admin/page/open', to)
    // 更改标题
    util.title(to.meta.title)
})

export default router
