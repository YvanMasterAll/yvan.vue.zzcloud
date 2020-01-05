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
                placeholder="输入要查询的部门名称"
                style="width: 200px;"
                size="mini"
                @keyup.enter.native="handleFormSubmit"
            />
        </el-form-item>

        <el-form-item label="状态" prop="state">
            <el-select
                v-model="form.state"
                placeholder="状态选择"
                style="width: 100px;"
                clearable
                >
                <el-option v-for='item in stateOptions' :key='item.key' :label='item.display_name' :value='item.key' />
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button v-permission="['dept/list']" type="primary" @click="handleFormSubmit" icon="el-icon-search">
                查询
            </el-button>
        </el-form-item>

        <el-form-item>
            <el-button v-permission="['dept/add']" icon="el-icon-plus" type='success' @click="showDialog">
                新增
            </el-button>
        </el-form-item>

        <el-form-item>
            <el-button class="filter-item" size="mini" icon="el-icon-more" @click="changeExpand">
                {{ expand ? '折叠':'展开' }}
            </el-button>
        </el-form-item>
        
    </el-form>
</template>

<script>
export default {
    props: {
        expand: { 
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            form: { name: null, state: null },
            rules: { },
            stateOptions: [
                { key: this.$enums.state.on, display_name: '正常' },
                { key: this.$enums.state.off, display_name: '停用' }
            ]
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
        },
        changeExpand() {
            this.$emit('change-expand')
        }
    }
}
</script>
