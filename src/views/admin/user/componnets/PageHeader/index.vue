<template>
    <el-row :gutter="20">
        <el-col :xs="9" :sm="6" :md="4" :lg="4" :xl="4">
            <!-- 部门查询 -->
            <el-input size='mini' v-model="deptName" clearable placeholder="输入要查询的部门名称" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="updateDeptName"/>
        </el-col>
        <el-col :xs="15" :sm="18" :md="20" :lg="20" :xl="20">
            <!-- 用户查询 -->
            <el-form
                :inline="true"
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
                style="margin-bottom: -18px;"
                >
                <el-form-item label="用户" prop="name">
                    <el-input
                        v-model="form.name"
                        placeholder="输入要查询的用户名"
                        style="width: 200px;"
                    />
                </el-form-item>

                <el-form-item label="状态" prop="state">
                    <el-select
                        v-model="form.state"
                        placeholder="状态选择"
                        style="width: 100px;"
                        clearable
                    >
                        <el-option v-for='item in form.stateOptions' :key='item.key' :label='item.display_name' :value='item.key' />
                    </el-select>
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

                <el-form-item>
                    <el-button @click="handleFormReset" icon="el-icon-refresh">
                        重置
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <el-button icon="el-icon-download" @click="download">
                        导出
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            deptName: '',
            form: {
                state: null,
                name: null,
                stateOptions: [
                    { key: this.$enums.state.on, display_name: '激活' },
                    { key: this.$enums.state.off, display_name: '锁定' }
                ]
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
            this.deptName = ''
            this.updateDeptName()
        },
        updateDeptName() {
            this.$emit('updateDeptName', this.deptName);
        },
        download() {
            this.$emit('downloadXlsx')
        },
        showDialog() {
            this.$emit('show-dialog')
        }
    }
}
</script>
