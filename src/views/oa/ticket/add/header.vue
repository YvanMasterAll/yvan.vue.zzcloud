<template>
    <div>
        <el-card shadow="never" class='d2-card-mini'>
            <template slot="header">选择工单类型</template>
            <el-form
                :inline="true"
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
                style="margin-bottom: -18px;"
                >
                <el-form-item prop="processType">
                    <el-select
                        v-model="form.process_id"
                        @change="changeProcess"
                        placeholder="选择工单类型"
                    >
                        <el-option v-for='item in form.processTypeOptions' :key='item.key' :label='item.display_name' :value='item.key' />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
export default {
    props: {
        processes: {
            default: null
        }
    },
    data() {
        return {
            form: {
                process_id: null,
                processTypeOptions: []
            },
            rules: {}
        }
    },
    watch: {
        processes: {
            handler(val) {
                this.form.processTypeOptions = []
                val.forEach(v => {
                    this.form.processTypeOptions.push({key: v.id, display_name: v.name})
                })
            },
            immediate: true
        }
    },
    methods: {
        changeProcess(val) {
            this.$emit('change-process', val)
        }
    }
}
</script>
