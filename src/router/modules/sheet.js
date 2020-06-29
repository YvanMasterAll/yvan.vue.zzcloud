import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting' 

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/oa/sheet',
    name: 'oa-sheet',
    redirect: { name: 'oa-sheet-list' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'list',
            name: `${pre}list`,
            component: _import('oa/sheet/list'),
            meta: {
                ...meta,
                title: '表格列表',
                cache: true
            }
        },
        {
            path: 'detail',
            name: `${pre}detail`,
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
            path: 'tmpl',
            name: `${pre}tmpl`,
            component: _import('oa/sheet/tmpl'),
            meta: {
                ...meta,
                title: '模板管理',
                cache: true
            }
        },
        {
            path: 'field',
            name: `${pre}field`,
            component: _import('oa/sheet/field'),
            meta: {
                ...meta,
                title: '表格字段',
                cache: true
            }
        },
        {
            path: 'editor',
            name: `${pre}editor`,
            hidden: true,
            component: _import('oa/sheet/editor'),
            meta: {
                ...meta,
                auth: false,
                title: '表格模板编辑器',
                cache: true
            }
        },
    ])('oa-sheet-')
}
