<template>
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="570px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name" style="width: 178px"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" style="width: 178px"/>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model.number="form.phone" style="width: 178px"/>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" style="width: 178px"/>
            </el-form-item>

            <el-form-item label="部门">
                <treeselect v-model="deptId" :options="depts" style="width: 178px" placeholder="选择部门" @select="selectDept" :clearable="false" />
            </el-form-item>

            <el-form-item label="岗位">
                <el-select ref="jobSelect" v-model="jobId" style="width: 178px" placeholder="请先选择部门">
                    <el-option
                        v-for="(item, index) in showJobs"
                        :key="item.name + index"
                        :label="item.name"
                        :value="item.id"/>
                </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="state" style="width: 244px;">
                <el-radio v-for="item in dicts" :key="item.id" v-model="form.state" :label="item.value">{{ item.label }}</el-radio>
            </el-form-item>

            <el-form-item style="margin-bottom: 0px;" label="角色">
                <el-select v-model="roleIds" style="width: 178px;" multiple placeholder="请选择">
                    <el-option
                        v-for="(item, index) in roles"
                        :disabled="level !== 1 && item.level <= level"
                        :key="item.name + index"
                        :label="item.name"
                        :value="item.id"/>
                </el-select>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
const validator = require('validator')
import { mapState, mapActions } from 'vuex'
import api from '@/api'
var _ = require('lodash')
export default {
    components: { Treeselect },
    computed: {
        ...mapState('d2admin/user', ['info'])
    },
    props: {
        isAdd: { // ? '新增用户' : '编辑用户'
            type: Boolean,
            required: true
        },
        depts: {
            default: []
        },
        jobs: {
            default: []
        },
        roles: {
            default: []
        }
    },
    data() {
        return {
            dicts: [{id: 1, value: 'on', label: '激活'}, {id: 2, value: 'off', label: '锁定'}],
            dialog: false, 
            loading: false, 
            form: { id: null, name: null, password: null, email: null, state: 'off', phone: null },
            roleIds: [], 
            showJobs: [],
            deptId: null, 
            jobId: null, 
            level: null,
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: this.validPhone}
                ],
                state: [
                    { required: true, message: '状态不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        cancel() {
            this.resetForm()
        },
        doSubmit() {
            this.form.dept = this.deptId
            this.form.job = this.jobId
            this.form.roles = this.roleIds
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (!this.deptId) {
                        this.$message({
                            message: '部门不能为空',
                            type: 'warning'
                        })
                    } else if (!this.jobId) {
                        this.$message({
                            message: '岗位不能为空',
                            type: 'warning'
                        })
                    } else if (_.isEmpty(this.roleIds)) {
                        this.$message({
                            message: '角色不能为空',
                            type: 'warning'
                        })
                    } else {
                        this.loading = true // 显示菊花
                        if (this.isAdd) {
                            this.doAdd()
                        } else {
                            this.doEdit()
                        }
                    }
                } else {
                    return false
                }
            })
        },
        async doAdd() {
            let result = await api.user_add(this.form) 
            this.loading = false // 隐藏菊花
            if (result.valid) {
                this.$notify({
                    title: '添加成功',
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                this.resetForm()
                this.$emit('reload-form')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        async doEdit() {
            // 设置密码, 如果密码没变不修改密码
            let password = this.form.password
            if (this.form.password === '~!@#$%^&*()_+') { password = null }
            let result = await api.user_edit({...this.form, password}) 
            this.loading = false // 隐藏菊花
            if (result.valid) {
                this.$notify({
                    title: '修改成功',
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                this.resetForm()
                this.$emit('reload-form')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        resetForm() {
            this.dialog = false
            this.$refs['form'].resetFields()
            this.deptId = null
            this.jobId = null
            this.roleIds = []
            this.form = { name: null, password: null, email: null, state: 'off', phone: null }
        },
        selectDept(node, instanceId) {
            this.jobId = null
            this.showJobs = this.jobs.filter(j => j.dept_id === node.id)
        },
        getLevel() {
            // 计算用户级别
            if (this.info) {
                let level = 999
                this.info.roles.forEach(r => {
                    if (r.level < level) {
                        level = r.level
                    }
                })
                this.level = level
            }
        },
        validPhone(rule, value, callback) {
            if (!value) {
                callback(new Error('请输入电话号码'))
            } else if (!validator.isMobilePhone(value + '', "zh-CN")) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }
    }
}
</script>

<style scoped>

</style>
