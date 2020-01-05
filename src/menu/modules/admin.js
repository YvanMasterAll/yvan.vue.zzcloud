export default {
    path: '/admin',
    title: '系统管理',
    iconSvg: 'admin-sys',
    children: (pre => [
        { path: `${pre}user`, title: '用户管理', iconSvg: 'admin-user' },
        { path: `${pre}role`, title: '角色管理', iconSvg: 'admin-role' }, // icon: 'user-secret' 
        { path: `${pre}dept`, title: '部门管理', iconSvg: 'admin-dept' },
        { path: `${pre}job`, title: '岗位管理', iconSvg: 'admin-job' }
    ])('/admin/')
}
