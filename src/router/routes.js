import playground from './modules/playground'
import frame from './modules/frame'
import d2Crud from './modules/d2-crud'
import plugins from './modules/plugins'
import charts from './modules/charts'
import components from './modules/components'
import element from './modules/element'
import business from './modules/business'
import admin from './modules/admin'

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

let meta = { auth: false }
/**
 * 在主框架内显示
 */
const frameIn = [
    {
        path: '/',
        redirect: { name: 'index' },
        component: layoutHeaderAside,
        children: [
            // 首页
            {
                path: 'index',
                name: 'index',
                meta: {
                    ...meta,
                    auth: false
                },
                component: _import('system/index')
            },
            // 系统 前端日志
            {
                path: 'log',
                name: 'log',
                meta: {
                    ...meta,
                    title: '前端日志'
                },
                component: _import('system/log')
            },
            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: _import('system/function/refresh')
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: _import('system/function/redirect')
            },
            // 错误页面
            {
                path: '401',
                name: '401',
                hidden: true,
                meta: {
                    title: '没有权限',
                },
                component: _import('system/error/401')
            }
        ]
    },
    admin,
    playground,
    frame,
    d2Crud,
    plugins,
    charts,
    components,
    element,
    business
]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: { public: true },
        component: _import('system/login')
    }
]

/**
 * 错误页面
 */
const error404Page = [
    {
        path: '*',
        name: '404',
        component: _import('system/error/404')
    }
]

// const error401Page = [
//     {
//         path: '*',
//         name: '401',
//         component: _import('system/error/401')
//     }
// ]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...error404Page]
