import layoutHeaderAside from '@/layout/header-aside'
import setting from '@/setting' 

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: setting.menu.auth }

export default {
    path: '/admin',
    name: 'admin',
    meta,
    redirect: { name: 'admin-user' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'user',
            name: `${pre}user`,
            component: _import('admin/user'),
            meta: {
                ...meta,
                title: '用户管理',
                cache: true
            }
        }, {
            path: 'role',
            name: `${pre}role`,
            component: _import('admin/role'),
            meta: {
                ...meta,
                title: '角色管理',
                cache: true
            }
        }, {
            path: 'dept',
            name: `${pre}dept`,
            component: _import('admin/dept'),
            meta: {
                ...meta,
                title: '部门管理',
                cache: true
            }
        }, {
            path: 'job',
            name: `${pre}job`,
            component: _import('admin/job'),
            meta: {
                ...meta,
                title: '岗位管理',
                cache: true
            }
        }
    ])('admin-')
}
