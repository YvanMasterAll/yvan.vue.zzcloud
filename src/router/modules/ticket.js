import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting' 

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/ticket',
    name: 'ticket',
    redirect: { name: 'ticket-commit' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'info',
            name: `${pre}info`,
            hidden: true,
            component: _import('ticket/info'),
            meta: {
                ...meta,
                auth: false,
                title: '工单详情',
                cache: true
            }
        }, {
            path: 'panel',
            name: `${pre}panel`,
            component: _import('ticket/panel'),
            meta: {
                ...meta,
                title: '工单面板',
                cache: true
            }
        }, {
            path: 'add',
            name: `${pre}add`,
            component: _import('ticket/add'),
            meta: {
                ...meta,
                auth: false,
                title: '新建工单',
                cache: true
            }
        }, {
            path: 'commit',
            name: `${pre}commit`,
            component: _import('ticket/commit'),
            meta: {
                ...meta,
                title: '我发布的工单',
                cache: true
            }
        }, {
            path: 'hold',
            name: `${pre}hold`,
            component: _import('ticket/hold'),
            meta: {
                ...meta,
                title: '我待办的工单',
                cache: true
            }
        }, {
            path: 'stay',
            name: `${pre}stay`,
            component: _import('ticket/stay'),
            meta: {
                ...meta,
                title: '待处理的工单',
                cache: true
            }
        }, {
            path: 'handle',
            name: `${pre}handle`,
            component: _import('ticket/handle'),
            meta: {
                ...meta,
                title: '我处理的工单',
                cache: true
            }
        }, {
            path: 'list',
            name: `${pre}list`,
            component: _import('ticket/list'),
            meta: {
                ...meta,
                title: '所有工单列表',
                cache: true
            }
        }
    ])('ticket-')
}
