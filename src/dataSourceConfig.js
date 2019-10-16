
let auth = false // 资源权限认证

export const userProfile = { url: '/api/profile', method: 'get', auth: false }
export const userLogout = { url: '/api/logout', method: 'post', auth: false }
export const userLogin = { url: '/api/login', method: 'post', auth: false }
export const userRegister = { url: '/api/register', method: 'post', auth: false }
export const recordList = { url: '/api/record', method: 'post', auth: false }

/// 认证模块

export const signin = { url: '/api/auth/signin', method: 'post', auth: false }
export const signout = { url: '/api/auth/signout', method: 'post', auth: false }
export const refresh = { url: '/api/auth/refresh', method: 'post', auth: false }

/// 用户模块

export const user_list = { url: '/api/user/list', method: 'get', auth }
export const user_add = { url: '/api/user/add', method: 'post', auth }
export const user_edit = { url: '/api/user/edit', method: 'post', auth }
export const user_del = { url: '/api/user/del', method: 'post', auth }

/// 通用模块

export const depts = { url: '/api/common/depts', method: 'get',  auth: false }
export const jobs = { url: '/api/common/jobs', method: 'get',  auth: false }
export const roles = { url: '/api/common/roles', method: 'get',  auth: false }
export const menus = { url: '/api/common/menus', method: 'get',  auth: false }
export const permissions = { url: '/api/common/permissions', method: 'get',  auth: false }

/// 角色模块

export const role_list = { url: '/api/role/list', method: 'get',  auth }
export const role_add = { url: '/api/role/add', method: 'post',  auth }
export const role_del = { url: '/api/role/del', method: 'post',  auth }
export const role_edit = { url: '/api/role/edit', method: 'post',  auth }
export const role_menu_edit = { url: '/api/role/menu_edit', method: 'post',  auth }
export const role_permission_edit = { url: '/api/role/permission_edit', method: 'post',  auth }

