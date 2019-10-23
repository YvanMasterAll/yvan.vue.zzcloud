<template>
    <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增部门' : '编辑部门'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;"/>
            </el-form-item>

            <!-- 暂时不做状态上的操作 -->
            <el-form-item v-if="true === false" label="状态" prop="state">
                <el-radio v-for="item in dicts" :key="item.id" v-model="form.state" :label="item.value">{{ item.label }}</el-radio>
            </el-form-item>

            <el-form-item v-if="!isRootDept(form)" style="margin-bottom: 0px;" label="上级部门" prop="pid">
                <treeselect v-model="form.pid" :options="depts" style="width: 370px;" placeholder="选择上级类目" />
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
import { isRootDept } from '@/router'
export default {
    components: {Treeselect},
    props: {
        isAdd: { // ? '新增部门' : '编辑部门'
            type: Boolean,
            required: true
        },
        depts: {
            default: []
        }
    },
    data() {
        return {
            dicts: [{id: 1, value: 'on', label: '正常'}, {id: 2, value: 'off', label: '锁定'}],
            dialog: false, 
            loading: false, 
            form: { id: null, name: null, pid: null, state: 'on' },
            rules: {
                name: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                ],
                pid: [
                    { required: true, message: '请选择上级部门', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        isRootDept,
        cancel() {
            this.resetForm()
        },
        doSubmit() {
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
            let result = await api.dept_add(this.form)
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
            let result = await api.dept_edit(this.form) 
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
            this.form = { id: null, name: null, pid: null, state: 'on' }
        },
    }
}
</script>