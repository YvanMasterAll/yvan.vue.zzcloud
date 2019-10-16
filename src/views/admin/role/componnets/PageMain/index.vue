<template>
    <div>
        <edit-dialog @reload-form="reloadForm" :depts="depts" ref="dialog" :is-add="isAdd" />
        <el-row :gutter="20">
            <!-- 角色列表 -->
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span class="role-span">角色列表</span>
                        <div id="segment" style="float: right">
                            <el-radio-group v-model="segment" size="mini">
                                <el-radio-button label="菜单分配"/>
                                <el-radio-button label="权限分配"/>
                            </el-radio-group>
                        </div>
                    </div>
                    <el-table
                        :data="currentTableData"
                        size="mini"
                        stripe
                        highlight-current-row
                        style="width: 100%;"
                        @current-change="handleRoleChange"
                        >
                        <el-table-column prop="name" label="名称"/>

                        <el-table-column prop="scope" label="数据权限">
                            <template slot-scope="scope">
                                <span>{{ toScopeString(scope.row.scope) }}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column prop="level" label="角色级别"/>

                        <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>

                        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                            <template slot-scope="scope">
                                <span>{{ toDateString(scope.row.created_at) }}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column label="操作" width="125" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" style='margin-right: 4px;'/>
                                <el-popover
                                    :ref="scope.row.id"
                                    placement="top"
                                    width="180">
                                    <p>确定删除本条数据吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                        <el-button :loading="del_loading" type="primary" size="mini" @click="onDelete(scope.row.id)">确定</el-button>
                                    </div>
                                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 权限分配 -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
                <el-card v-show="segment === '菜单分配'" class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                        </el-tooltip>
                        <el-button
                            :disabled="!showButton"
                            :loading="menuLoading"
                            icon="el-icon-check"
                            size="mini"
                            style="float: right; padding: 6px 9px"
                            type="primary"
                            @click="saveMenu">保存
                        </el-button>
                    </div>
                    <el-tree
                        ref="menu"
                        :data="menus"
                        :default-checked-keys="menuIds"
                        :props="defaultProps"
                        accordion
                        show-checkbox
                        node-key="id"/>
                </el-card>
                <el-card v-show="segment === '权限分配'" class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
                            <span class="role-span">权限分配</span>
                        </el-tooltip>
                        <el-button
                            v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
                            :disabled="!showButton"
                            :loading="permissionLoading"
                            icon="el-icon-check"
                            size="mini"
                            style="float: right; padding: 6px 9px"
                            type="primary"
                            @click="savePermission">保存
                        </el-button>
                    </div>
                    <el-tree
                        ref="permission"
                        :data="permissions"
                        :default-checked-keys="permissionIds"
                        :props="defaultProps"
                        show-checkbox
                        accordion   
                        node-key="id"/>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import util from '@/libs/util'
import editDialog from '../EditDialog'
import api from '@/api'
import { isAdminRole } from '@/router'
export default {
    components: { editDialog },
    props: {
        tableData: {
            default: () => []
        },
        depts: {
            default: []
        },
        permissions: {
            default: []
        },
        menus: {
            default: []
        }
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            currentTableData: [],
            currentRoleId: null,
            del_loading: false,
            isAdd: false, // ? '新增角色' : '编辑角色'
            segment: '菜单分配',
            showButton: false,
            menuIds: [],
            permissionIds: [],
            menuLoading: false,
            permissionLoading: false
        }
    },
    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
            },
            immediate: true
        }
    },
    methods: {
        toDateString: util.toDateString,
        toScopeString(scope) {
            if (scope === 'all') { return '全部' }
            if (scope === 'diy') { return '自定义' }
            if (scope === 'same') { return '本级' }
            return '未知'
        },
        async onDelete(id) {
            this.del_loading = true
            let result = await api.role_del({id: id})
            this.del_loading = false // 隐藏菊花
            this.$refs[id].doClose()
            if (result.valid) {
                this.$notify({
                    title: '删除成功',
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                this.$emit('reload-form')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        edit(data) {
            this.isAdd = false
            const _this = this.$refs.dialog
            _this.form = { id: data.id, name: data.name, depts: null, remark: data.remark, scope: data.scope, level: data.level }
            _this.deptIds = data.Depts.map(d => d.id)
            _this.dialog = true
        },
        showDialog(isAdd) {
            this.isAdd = isAdd
            let _this = this.$refs.dialog
            _this.dialog = true
        },
        reloadForm() {
            // 清空权限与菜单的选中
            this.$refs.permission.setCheckedKeys([])
            this.$refs.menu.setCheckedKeys([])
            this.$emit('reload-form')
        },
        handleRoleChange(data) {
            if (!data) { return }
            console.log(data)
            // 清空权限与菜单的选中
            this.$refs.permission.setCheckedKeys([])
            this.$refs.menu.setCheckedKeys([])
            // 判断是否是超管角色, 如果是那不做权限操作
            if (!isAdminRole(data.id)) {
                this.showButton = true
                this.currentRoleId = data.id
            } else {
                this.showButton = false
            }
            this.menuIds = data.Menus.map(d => d.id)
            this.permissionIds = data.Permissions.map(d => d.id)
        },
        async saveMenu() {
            if (!this.currentRoleId) { return }
            this.menuLoading = true
            const params = { id: this.currentRoleId, menus: [] }
            let root_menus = []
            // 得到半选的父节点数据, 保存起来
            this.$refs.menu.getCheckedNodes().forEach(function(data, index) {
                if (data.children) {
                    root_menus.push(data.id)
                }
            })
            // 得到已选中的key值
            this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
                if (root_menus.filter(d => d === data).length === 0) { // 不包含父节点
                    params.menus.push(data)
                }
            })
            let result = await api.role_menu_edit(params)
            this.menuLoading = false
            if (result.valid) {
                this.$notify({
                    title: '保存成功',
                    type: 'success',
                    duration: 2500
                })
                this.reloadForm()
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        async savePermission() {
            if (!this.currentRoleId) { return }
            this.permissionLoading = true
            const params = { id: this.currentRoleId, permissions: [] }
            let root_permissions = []
            // 得到半选的父节点数据, 保存起来
            this.$refs.permission.getCheckedNodes().forEach(function(data, index) {
                if (data.children) {
                    root_permissions.push(data.id)
                }
            })
            this.$refs.permission.getHalfCheckedNodes().forEach(function(data, index) {
                root_permissions.push(data.id)
            })
            // 得到已选中的key值
            this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
                if (root_permissions.filter(d => d === data).length === 0) { // 不包含父节点
                    params.permissions.push(data)
                }
            })
            let result = await api.role_permission_edit(params)
            this.permissionLoading = false
            if (result.valid) {
                this.$notify({
                    title: '保存成功',
                    type: 'success',
                    duration: 2500
                })
                this.reloadForm()
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