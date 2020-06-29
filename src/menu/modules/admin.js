export default {
    path: '/admin',
    title: '系统',
    iconFont: 'huabanfuben1',
    children: (pre => [
        { path: `${pre}user`, title: '用户管理', iconFont: 'ai-user' },
        { path: `${pre}role`, title: '角色管理', iconFont: 'role' }, // icon: 'user-secret' 
        { path: `${pre}dept`, title: '部门管理', iconFont: 'bumenguanli' },
        { path: `${pre}job`, title: '岗位管理', iconFont: 'zhiyeweisheng' }
    ])('/admin/')
}
