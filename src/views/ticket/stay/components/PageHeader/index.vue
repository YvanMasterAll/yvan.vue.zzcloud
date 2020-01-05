<template>
    <el-form
        :inline="true"
        :model="form"
        :rules="rules"
        ref="form"
        size="mini"
        style="margin-bottom: -18px;"
        >
        <el-form-item label="工单类型" prop="state">
            <el-select
                v-model="form.process_id"
                placeholder="选择工单类型"
                clearable
                >
                <el-option v-for='item in processTypeOptions' :key='item.key' :label='item.display_name' :value='item.key' />
            </el-select>
        </el-form-item>

        <el-form-item label='创建时间'>
            <el-date-picker
                v-model="form.created_time"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                >
            </el-date-picker>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleFormSubmit" icon="el-icon-search">
                查询
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import util from '@/libs/util'
export default {
    props: {
        processes: {
            default: null
        }
    },
    data() {
        return {
            form: {},
            rules: {},
            processTypeOptions: [
                // { key: this.$enums.state.on, display_name: '正常' },
                // { key: this.$enums.state.off, display_name: '停用' }
            ],
            executorOptions: [],
            pickerOptions: util.pickerOptions
        }
    },
    watch: {
        processes: {
            handler(val) {
                let processTypeOptions = []
                val.forEach(d => {
                    processTypeOptions.push({key: d.id, display_name: d.name})
                })
                this.processTypeOptions = processTypeOptions
            }
        },
    },
    methods: {
        handleFormSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.form.created_time) {
                        this.form.created_start = util.toDateString(this.form.created_time[0])
                        this.form.created_end = util.toDateString(this.form.created_time[1])
                    }
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
    }
}
</script>
