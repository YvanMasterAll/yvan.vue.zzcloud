<template>
    <el-form
        :inline="true"
        :model="form"
        :rules="rules"
        ref="form"
        size="mini"
        style="margin-bottom: -18px;"
        >
        <el-form-item>
            <el-input
                v-model="form.name"
                placeholder="输入要查询的角色名称"
                style="width: 200px;"
                size="mini"
            />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleFormSubmit" icon="el-icon-search">
                查询
            </el-button>
        </el-form-item>

        <el-form-item>
            <el-button icon="el-icon-plus" type='success' @click="showDialog">
                新增
            </el-button>
        </el-form-item>
        
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: null
            },
            rules: {
                // type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ],
                // user: [ { message: '请输入用户', trigger: 'change' } ]
            }
        }
    },
    methods: {
        handleFormSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit('submit', this.form)
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '表单校验失败'
                    })
                    return false
                }
            })
        },
        handleFormReset() {
            this.$refs.form.resetFields()
        },
        showDialog() {
            this.$emit('show-dialog')
        }
    }
}
</script>
