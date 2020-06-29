<template>
     <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card v-show="permType === '菜单分配'" class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                    <span class="role-span">菜单分配</span>
                </el-tooltip>
                <el-button
                    v-permission="['role/menu_edit']"
                    :disabled="!saveButtonEnable"
                    :loading="menu_save_loading"
                    icon="el-icon-check"
                    size="mini"
                    class='is-thin'
                    style="float: right; padding: 6px 9px"
                    type="primary"
                    @click="saveMenu">保存
                </el-button>
            </div>
            <el-tree
                ref="menu-tree"
                :data="menus"
                :default-checked-keys="menuIds"
                :props="treeParams"
                accordion
                show-checkbox
                node-key="id"/>
        </el-card>
        <el-card v-show="permType === '权限分配'" class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
                    <span class="role-span">权限分配</span>
                </el-tooltip>
                <el-button
                    v-permission="['role/permission_edit']"
                    :disabled="!saveButtonEnable"
                    :loading="perm_save_loading"
                    icon="el-icon-check"
                    size="mini"
                    style="float: right; padding: 6px 9px"
                    type="primary"
                    @click="savePermission">保存
                </el-button>
            </div>
            <el-tree
                ref="perm-tree"
                :data="permissions"
                :default-checked-keys="permissionIds"
                :props="treeParams"
                show-checkbox
                accordion   
                node-key="id"/>
        </el-card>
    </el-col>
</template>

<script>
import api from '@/api'
import { isAdminRole } from '@/router'
export default {
    props: {
        permissions: {
            default: []
        },
        menus: {
            default: []
        },
        permType: {
            default: ''
        }
    },
    data() {
        return {
            treeParams: { children: 'children', label: 'label' },
            currentRoleId: null,
            saveButtonEnable: false,
            menuIds: [],
            permissionIds: [],
            menu_save_loading: false,
            perm_save_loading: false
        }
    },
    methods: {
        // 清空权限树
        clear() {
            // 清空权限与菜单的选中
            this.menuIds = []
            this.permissionIds = []
            this.$refs['perm-tree'].setCheckedKeys([])
            this.$refs['menu-tree'].setCheckedKeys([])
        },
        // 角色选中事件
        handleRoleChange(data) {
            if (!data) { return }
            this.clear()
            // 判断是否是超管角色, 如果是那不做权限操作
            if (!isAdminRole(data.id)) {
                this.saveButtonEnable = true
                this.currentRoleId = data.id
            } else {
                this.saveButtonEnable = false
            }
            data.Menus.forEach(d => {
                // 去除菜单父节点, 避免子节点因为父节点的存在即使本身不存在也被选中的现象
                d.menu_type !== 0 && this.menuIds.push(d.id)
            })
            this.permissionIds = data.Permissions.map(d => d.id)
        },
        // 菜单权限保存事件
        async saveMenu() {
            if (!this.currentRoleId) { return }
            this.menu_save_loading = true
            const params = { id: this.currentRoleId, menus: [] }
            // 得到半选的父节点保存起来
            this.$refs['menu-tree'].getHalfCheckedNodes().forEach(function(data, index) {
                if (data.children) { 
                    params.menus.push(data.id)
                }
            })
            // 得到已选中的key值
            this.$refs['menu-tree'].getCheckedKeys().forEach(function(data, index) {
                params.menus.push(data)
            })
            let result = await api.role_menu_edit(params)
            this.menu_save_loading = false
            if (result.valid) {
                this.$notify({
                    title: '保存成功',
                    type: 'success',
                    duration: 2500
                })
                this.$emit('reload')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 资源权限保存事件
        async savePermission() {
            if (!this.currentRoleId) { return }
            this.perm_save_loading = true
            const params = { id: this.currentRoleId, permissions: [] }
            let root_permissions = []
            // 将所有父节点保存起来
            this.$refs['perm-tree'].getCheckedNodes().forEach(function(data, index) {
                if (data.children) {
                    root_permissions.push(data.id)
                }
            })
            this.$refs['perm-tree'].getHalfCheckedNodes().forEach(function(data, index) {
                root_permissions.push(data.id)
            })
            // 得到已选中的key值
            this.$refs['perm-tree'].getCheckedKeys().forEach(function(data, index) {
                if (root_permissions.filter(d => d === data).length === 0) { // 不包含父节点
                    params.permissions.push(data)
                }
            })
            let result = await api.role_permission_edit(params)
            this.perm_save_loading = false
            if (result.valid) {
                this.$notify({
                    title: '保存成功',
                    type: 'success',
                    duration: 2500
                })
                this.$emit('reload')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        }
    }
}
</script>