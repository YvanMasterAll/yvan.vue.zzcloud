export default {
    path: '/admin',
    title: '系统管理',
    icon: 'flask',
    children: (pre => [
        { path: `${pre}user`, title: '用户管理', icon: 'user' },
        { path: `${pre}role`, title: '角色管理', icon: 'user-secret' }, // iconSvg: 'user-role' 
        { path: `${pre}dept`, title: '部门管理', icon: 'sitemap' },
        { path: `${pre}job`, title: '岗位管理', icon: 'street-view' }
    ])('/admin/')
}
