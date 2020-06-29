import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting' 

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/device',
    name: 'device',
    redirect: { name: 'device-panel' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'panel',
            name: `${pre}panel`,
            component: _import('device/panel'),
            meta: {
                ...meta,
                auth: false,
                title: '工作台',
                cache: true
            }
        }, {
            path: 'monitor',
            name: `${pre}monitor`,
            component: _import('device/monitor'),
            meta: {
                ...meta,
                auth: false,
                title: '监控页',
                cache: true
            }
        }, {
            path: 'analysis',
            name: `${pre}analysis`,
            component: _import('device/analysis'),
            meta: {
                ...meta,
                auth: false,
                title: '分析页',
                cache: true
            }
        }
    ])('device-')
}
