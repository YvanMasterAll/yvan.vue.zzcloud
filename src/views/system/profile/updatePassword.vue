<template>
    <div>
        <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="475px" @close="cancel">
            <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
                <el-form-item label="旧密码" prop="old">
                    <el-input v-model="form.old" type="password" style="width: 320px;"/>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password" type="password" style="width: 320px;"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                    <el-input v-model="form.repassword" type="password" style="width: 320px;"/>
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
    data() {
        const validPass = (rule, value, callback) => {
           if (value !== this.form.password) {
                callback(new Error('两次密码输入不同'))
            } else {
                callback()
            }
        }
        return {
            loading: false, dialog: false, title: '修改密码', form: { password: '', old: '', repassword: '' },
            rules: {
                old: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { required: true, validator: validPass, trigger: 'blur' }
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
                    let result = await api.user_update_password(this.form)
                    this.loading = false // 隐藏菊花
                    if (result.valid) {
                        this.$notify({
                            title: '密码修改成功',
                            message: result.msg,
                            type: 'success',
                            duration: 2500
                        })
                        this.resetForm()
                        // 更新用户信息
                        // this.$emit('reload-info')
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
            this.form = { old: '', password: '', repassword: '' }
        }
    }
}
</script>
