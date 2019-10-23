<template>
    <div>
        <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="475px" @close="cancel">
            <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
                <el-form-item label="新邮箱" prop="email">
                    <el-input v-model="form.email" auto-complete="on" style="width: 320px;"/>
                </el-form-item>
                <el-form-item label="当前密码" prop="password">
                    <el-input v-model="form.password" type="password" style="width: 320px;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api'
export default {
    props: {
        email: {
            type: String,
            default: ''
        }
    },
    data() {
        const validEmail = (rule, value, callback) => {
           if (value === this.email) {
                callback(new Error('新邮箱不能与旧邮箱相同'))
            } else {
                callback()
            }
        }
        return {
            loading: false, dialog: false, title: '修改邮箱', form: { password: '', email: '' },
            rules: {
                password: [
                    { required: true, message: '当前密码不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
                    { required: true, validator: validEmail, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        cancel() {
            this.resetForm()
        },
        doSubmit() {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    let result = await api.user_update_email(this.form)
                    this.loading = false // 隐藏菊花
                    if (result.valid) {
                        this.$notify({
                            title: '邮箱修改成功',
                            message: result.msg,
                            type: 'success',
                            duration: 2500
                        })
                        this.resetForm()
                        // 更新用户信息
                        this.$emit('reload-info')
                    } else {
                        this.$message({
                            message: result.msg,
                            type: 'error'
                        })
                    }
                } else {
                    return false
                }
            })
        },
        resetForm() {
            this.dialog = false
            this.$refs['form'].resetFields()
            this.form = { pass: '', email: '' }
        }
    }
}
</script>
