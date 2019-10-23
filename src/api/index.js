import request from '@/plugin/axios'
import * as urls from '@/dataSourceConfig'

class API {
  
    /// 登录
    async signin(data) { return await request({ api: urls.signin, params: data }) }
    /// 登出
    async signout() { return await request({ api: urls.signout }) }
    /// 更新Token
    async refresh() { return await request({ api: urls.refresh }) } 

    /// 部门信息
    async depts() { return await request({ api: urls.depts }) }
    /// 岗位信心
    async jobs() { return await request({ api: urls.jobs }) }
    /// 角色信息
    async roles() { return await request({ api: urls.roles }) }
    /// 菜单信息
    async menus() { return await request({ api: urls.menus }) }
    /// 权限信息
    async permissions() { return await request({ api: urls.permissions }) }

    /// 用户列表
    async user_list(data) { return await request({ api: urls.user_list, params: data }) }
    /// 添加用户
    async user_add(data) { return await request({ api: urls.user_add, params: data }) }
    /// 编辑用户
    async user_edit(data) { return await request({ api: urls.user_edit, params: data }) }
    /// 删除用户
    async user_del(data) { return await request({ api: urls.user_del, params: data }) }
    /// 个人信息
    async user_profile() { return await request({ api: urls.user_profile })}
    /// 更新邮箱
    async user_update_email(data) { return await request({ api: urls.user_update_email, params: data })}
    /// 更新密码
    async user_update_password(data) { return await request({ api: urls.user_update_password, params: data })}

    /// 角色列表
    async role_list(data) { return await request({ api: urls.role_list, params: data }) }
    /// 编辑角色
    async role_edit(data) { return await request({ api: urls.role_edit, params: data }) }
    /// 添加角色
    async role_add(data) { return await request({ api: urls.role_add, params: data }) }
    /// 删除角色
    async role_del(data) { return await request({ api: urls.role_del, params: data }) }
    /// 编辑角色菜单权限
    async role_menu_edit(data) { return await request({ api: urls.role_menu_edit, params: data }) }
    /// 编辑角色资源权限
    async role_permission_edit(data) { return await request({ api: urls.role_permission_edit, params: data }) }

    /// 部门列表
    async dept_list(data) { return await request({ api: urls.dept_list, params: data }) }
    /// 部门新增
    async dept_add(data) { return await request({ api: urls.dept_add, params: data }) }
    /// 部门编辑
    async dept_edit(data) { return await request({ api: urls.dept_edit, params: data }) }
    /// 部门删除
    async dept_del(data) { return await request({ api: urls.dept_del, params: data }) }

     /// 岗位列表
     async job_list(data) { return await request({ api: urls.job_list, params: data }) }
     /// 岗位新增
     async job_add(data) { return await request({ api: urls.job_add, params: data }) }
     /// 岗位编辑
     async job_edit(data) { return await request({ api: urls.job_edit, params: data }) }
     /// 岗位删除
     async job_del(data) { return await request({ api: urls.job_del, params: data }) }
}

export default new API()