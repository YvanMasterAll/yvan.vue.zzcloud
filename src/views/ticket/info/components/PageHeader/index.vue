<template>
    <el-card shadow="never" class='d2-card-mini d2-mb-20'>
        <template slot="header">工单流程</template>
        <el-col :span='18' class='d2-mb-10'>
            <el-steps :active="active_step" finish-status="success" process-status='process' simple>
                <el-step v-for='item in states' :key='item.id' :title='item.name'></el-step>
            </el-steps>
        </el-col>
    </el-card>
</template>

<script>
export default {
    props: {
        ticketInfo: {
            default: null
        }
    },
    data() {
        return {
            active_step: null,
            states: [],
            is_finished: false,
            is_rejected: false
        }
    },
    watch: {
        ticketInfo: {
            handler(val) {
                this.is_finished = this.ticketInfo.is_finished
                this.is_rejected = this.ticketInfo.is_rejected
                this.states = this.ticketInfo.WK_States
                this.active_step = this.states.map(s => s.id).indexOf(this.ticketInfo.state_id)
            }
        }
    }
}
</script>

<style scoped>
.input-text {
    font-size: 12px;
    color: #606266;
}
::v-deep .el-step__head.is-process {
    color: #409EFF;
    border-color: #409EFF;
}
::v-deep .el-step__title.is-process {
    color: #409EFF;
}
::v-deep .el-step.is-simple .el-step__title {
    font-size: 12px;
}
::v-deep .el-step__head.is-process > .el-step__icon.is-text {
    border-width: 8px;
}
/* ::v-deep .el-step.is-simple .el-step__arrow::after, ::v-deep .el-step.is-simple .el-step__arrow::before {
    background: #409EFF;
} */
</style>
