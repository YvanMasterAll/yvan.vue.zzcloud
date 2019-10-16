<template>
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="isAdd ? '新增角色' : '编辑角色'" append-to-body width="500px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" style="width: 370px"/>
            </el-form-item>

            <el-form-item label="角色级别" prop="level">
                <el-input-number v-model.number="form.level" :min="1" controls-position="right" style="width: 150px;"/>
            </el-form-item>

            <el-form-item label="权限范围">
                <el-select v-model="form.scope" style="width: 370px" placeholder="请选择权限范围" @change="changeScope">
                <el-option
                    v-for="item in scopes"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name"/>
                </el-select>
            </el-form-item>

            <el-form-item v-if="form.scope === 'diy'" label="数据权限">
                <treeselect v-model="deptIds" :options="depts" multiple style="width: 370px" placeholder="请选择权限范围" />
            </el-form-item>

            <el-form-item label="描述信息">
                <el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea"/>
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
import api from '@/api'
export default {
    components: {Treeselect},
    props: {
        isAdd: { // ? '新增角色' : '编辑角色'
            type: Boolean,
            required: true
        },
        depts: {
            default: []
        }
    },
    data() {
        return {
            scopes: [{label: '全部', name: 'all'}, {label: '本级', name: 'same'}, {label: '自定义', name: 'diy'}],
            dialog: false, 
            loading: false, 
            form: { id: null, name: null, level: 3, scope: 'same', remark: null, depts: null },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            },
            deptIds: [],
        }
    },
    methods: {
        cancel() {
            this.resetForm()
        },
        doSubmit() {
            if (this.form.scope === 'diy') {
                if (this.deptIds.length === 0) {
                    this.$message({
                        message: '自定义数据权限不能为空',
                        type: 'warning'
                    })
                    return
                }
                this.form.depts = this.deptIds
            } else { this.form.depts = null }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true // 显示菊花
                    if (this.isAdd) {
                        this.doAdd()
                    } else {
                        this.doEdit()
                    }
                } else {
                    return false
                }
            })
        },
        async doAdd() {
            let result = await api.role_add(this.form) 
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
            let result = await api.role_edit(this.form) 
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
            this.deptIds = []
            this.form = { id: null, name: null, depts: null, remark: null, scope: 'same', level: 3 }
        },
        changeScope() {

        }
    }
}
</script>