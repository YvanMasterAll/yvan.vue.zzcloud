import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting' 

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/oa',
    name: 'oa',
    component: layoutHeaderAside,
    redirect: { name: 'oa-ticket-commit' },
    children: (pre => [
        {
            path: 'ticket/info',
            name: `${pre}ticket-info`,
            hidden: true,
            component: _import('oa/ticket/info'),
            meta: {
                ...meta,
                auth: false,
                title: '工单详情',
                cache: true
            }
        }, {
            path: 'ticket/panel',
            name: `${pre}ticket-panel`,
            component: _import('oa/ticket/panel'),
            meta: {
                ...meta,
                title: '工单面板',
                cache: true
            }
        }, {
            path: 'ticket/add',
            name: `${pre}ticket-add`,
            component: _import('oa/ticket/add'),
            meta: {
                ...meta,
                auth: false,
                title: '新建工单',
                cache: true
            }
        }, {
            path: 'ticket/commit',
            name: `${pre}ticket-commit`,
            component: _import('oa/ticket/commit'),
            meta: {
                ...meta,
                title: '我发布的工单',
                cache: true
            }
        }, 
        // {
        //     path: 'ticket/hold',
        //     name: `${pre}ticket-hold`,
        //     component: _import('oa/ticket/hold'),
        //     meta: {
        //         ...meta,
        //         title: '我待办的工单',
        //         cache: true
        //     }
        // }, 
        {
            path: 'ticket/todo',
            name: `${pre}ticket-todo`,
            component: _import('oa/ticket/todo'),
            meta: {
                ...meta,
                title: '待处理的工单',
                cache: true
            }
        }, {
            path: 'ticket/handle',
            name: `${pre}ticket-handle`,
            component: _import('oa/ticket/handle'),
            meta: {
                ...meta,
                title: '我处理的工单',
                cache: true
            }
        }, {
            path: 'ticket/list',
            name: `${pre}ticket-list`,
            component: _import('oa/ticket/list'),
            meta: {
                ...meta,
                title: '所有工单列表',
                cache: true
            }
        },
        {
            path: 'sheet/list',
            name: `${pre}sheet-list`,
            component: _import('oa/sheet/list'),
            meta: {
                ...meta,
                title: '表格列表',
                cache: true
            }
        },
        {
            path: 'sheet/detail',
            name: `${pre}sheet-detail`,
            hidden: true,
            component: _import('oa/sheet/detail'),
            meta: {
                ...meta,
                auth: false,
                title: '表格详情',
                cache: true
            }
        },
        {
            path: 'sheet/tmpl',
            name: `${pre}sheet-tmpl`,
            component: _import('oa/sheet/tmpl'),
            meta: {
                ...meta,
                title: '模板管理',
                cache: true
            }
        },
        {
            path: 'sheet/field',
            name: `${pre}sheet-field`,
            component: _import('oa/sheet/field'),
            meta: {
                ...meta,
                title: '表格字段',
                cache: true
            }
        },
        {
            path: 'sheet/editor',
            name: `${pre}sheet-editor`,
            hidden: true,
            component: _import('oa/sheet/editor'),
            meta: {
                ...meta,
                auth: false,
                title: '表格模板编辑器',
                cache: true
            }
        },
    ])('oa-')
}
