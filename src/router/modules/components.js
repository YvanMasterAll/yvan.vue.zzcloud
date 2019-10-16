import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/demo/components',
    name: 'demo-components',
    meta,
    redirect: { name: 'demo-components-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'container/full',
            name: `${pre}container-full`,
            component: _import('demo/components/container/full.vue'),
            meta: { ...meta, title: '布局组件 填充' }
        },
        {
            path: 'container/full-slot',
            name: `${pre}container-full-slot`,
            component: _import('demo/components/container/full-slot.vue'),
            meta: { ...meta, title: '布局组件 填充 插槽' }
        },
        {
            path: 'container/full-bs',
            name: `${pre}container-full-bs`,
            component: _import('demo/components/container/full-bs.vue'),
            meta: { ...meta, title: '布局组件 填充 滚动优化' }
        },
        {
            path: 'container/ghost',
            name: `${pre}container-ghost`,
            component: _import('demo/components/container/ghost.vue'),
            meta: { ...meta, title: '布局组件 隐形' }
        },
        {
            path: 'container/ghost-slot',
            name: `${pre}container-ghost-slot`,
            component: _import('demo/components/container/ghost-slot.vue'),
            meta: { ...meta, title: '布局组件 隐形 插槽' }
        },
        {
            path: 'container/ghost-bs',
            name: `${pre}container-ghost-bs`,
            component: _import('demo/components/container/ghost-bs.vue'),
            meta: { ...meta, title: '布局组件 隐形 滚动优化' }
        },
        {
            path: 'container/card',
            name: `${pre}container-card`,
            component: _import('demo/components/container/card.vue'),
            meta: { ...meta, title: '布局组件 卡片' }
        },
        {
            path: 'container/card-slot',
            name: `${pre}container-card-slot`,
            component: _import('demo/components/container/card-slot.vue'),
            meta: { ...meta, title: '布局组件 卡片 插槽' }
        },
        {
            path: 'container/card-bs',
            name: `${pre}container-card-bs`,
            component: _import('demo/components/container/card-bs.vue'),
            meta: { ...meta, title: '布局组件 卡片 滚动优化' }
        },
        {
            path: 'container/api',
            name: `${pre}container-api`,
            component: _import('demo/components/container/api.vue'),
            meta: { ...meta, title: '布局组件 API' }
        },
        {
            path: 'contextmenu/simple',
            name: `${pre}contextmenu-simple`,
            component: _import('demo/components/contextmenu/simple.vue'),
            meta: { ...meta, title: '右键菜单 基础' }
        },
        {
            path: 'contextmenu/divier',
            name: `${pre}contextmenu-divier`,
            component: _import('demo/components/contextmenu/divier.vue'),
            meta: { ...meta, title: '右键菜单 分割线' }
        },
        {
            path: 'contextmenu/group',
            name: `${pre}contextmenu-group`,
            component: _import('demo/components/contextmenu/group.vue'),
            meta: { ...meta, title: '右键菜单 分组' }
        },
        {
            path: 'contextmenu/submenu',
            name: `${pre}contextmenu-submenu`,
            component: _import('demo/components/contextmenu/submenu.vue'),
            meta: { ...meta, title: '右键菜单 子菜单' }
        },
        {
            path: 'contextmenu/disabled',
            name: `${pre}contextmenu-disabled`,
            component: _import('demo/components/contextmenu/disabled.vue'),
            meta: { ...meta, title: '右键菜单 禁用' }
        },
        {
            path: 'contextmenu/custom-trigger',
            name: `${pre}contextmenu-custom-trigger`,
            component: _import(
                'demo/components/contextmenu/custom-trigger.vue'
            ),
            meta: { ...meta, title: '右键菜单 自定义触发' }
        },
        {
            path: 'countup',
            name: `${pre}countup`,
            component: _import('demo/components/countup'),
            meta: { ...meta, title: '数字动画' }
        },
        {
            path: 'editor-ueditor',
            name: `${pre}editor-ueditor`,
            component: _import('demo/components/editor-ueditor'),
            meta: { ...meta, title: 'UEditor' }
        },
        {
            path: 'editor-quill',
            name: `${pre}editor-quill`,
            component: _import('demo/components/editor-quill'),
            meta: { ...meta, title: '富文本编辑器' }
        },
        {
            path: 'editor-simpleMDE',
            name: `${pre}editor-simpleMDE`,
            component: _import('demo/components/editor-simpleMDE'),
            meta: { ...meta, title: 'markdown编辑器' }
        },
        {
            path: 'highlight',
            name: `${pre}highlight`,
            component: _import('demo/components/highlight'),
            meta: { ...meta, title: '代码高亮组件' }
        },
        {
            path: 'icon/icon',
            name: `${pre}icon-icon`,
            component: _import('demo/components/icon/icon.vue'),
            meta: { ...meta, title: '图标组件' }
        },
        {
            path: 'icon/icon-svg',
            name: `${pre}icon-icon-svg`,
            component: _import('demo/components/icon/icon-svg.vue'),
            meta: { ...meta, title: 'svg 图标' }
        },
        {
            path: 'icon/select',
            name: `${pre}icon-select`,
            component: _import('demo/components/icon/select.vue'),
            meta: { ...meta, title: '图标选择器' }
        },
        {
            path: 'icon/select-svg',
            name: `${pre}icon-select-svg`,
            component: _import('demo/components/icon/select-svg.vue'),
            meta: { ...meta, title: 'svg 图标选择器' }
        },
        {
            path: 'icon/list',
            name: `${pre}icon-list`,
            component: _import('demo/components/icon/list.vue'),
            meta: { ...meta, title: '图标列表' }
        },
        {
            path: 'index',
            name: `${pre}index`,
            component: _import('demo/components/index'),
            meta: { ...meta, title: '组件首页' }
        },
        {
            path: 'json-tree',
            name: `${pre}json-tree`,
            component: _import('demo/components/json-tree'),
            meta: { ...meta, title: 'JSON 展示' }
        },
        {
            path: 'layout/grid',
            name: `${pre}layout-grid`,
            component: _import('demo/components/layout/grid.vue'),
            meta: { ...meta, title: '拖拽网格布局' }
        },
        {
            path: 'layout/splitpane',
            name: `${pre}layout-splitpane`,
            component: _import('demo/components/layout/splitpane.vue'),
            meta: { ...meta, title: '区域布局' }
        },
        {
            path: 'markdown/source',
            name: `${pre}markdown-source`,
            component: _import('demo/components/markdown/source.vue'),
            meta: { ...meta, title: 'markdown指定资源渲染' }
        },
        {
            path: 'markdown/url',
            name: `${pre}markdown-url`,
            component: _import('demo/components/markdown/url.vue'),
            meta: { ...meta, title: 'markdown指定url渲染' }
        }
    ])('demo-components-')
}
