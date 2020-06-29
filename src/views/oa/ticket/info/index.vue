<script>
import api from '@/api'
import ticketData from '@/mixins/ticketData'
import ActivityList from './activity-list'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    // name: 'oa-ticket-info',   
    mixins: [ticketData],
    components: { ActivityList },
    data() {
        return {
            // 接口信息
            apis: {
                ticket_request: api.transition_add
            }
        }
    },
    render() {
        return (
            <d2-container>
                <el-card shadow="never" class='d2-card-mini d2-mb-20'>
                    <template slot="header">工单流程</template>
                    { this.ticket.states &&
                        <el-col span={20} class='d2-mb-10'>
                            <el-steps active={ this.ticket.states.map(s => s.id).indexOf(this.ticket.detail.state_id) } finish-status="success" process-status='process' simple>
                                { this.ticket.states.map(item => {
                                    return <el-step key={item.id} title={item.name}></el-step>    
                                })}
                            </el-steps>
                        </el-col>
                    }
                </el-card>
                <el-card shadow='never' class='d2-card-mini'>
                    <template slot='header'>工单详情</template>
                    { this.renderForm }
                </el-card>
                { this.ticket.detail && <activity-list ref='activity-list' ticket_id={this.ticket.detail.id} /> }
            </d2-container>
        )
    },
    created() {
        this.getTicketDetail()
    },
    methods: {
        // 工单提交成功后的执行函数
        onTicketSubmitSuccess() {
            // 重新加载数据
            this.getTicketDetail()
            // 更新活动列表
            this.$refs['activity-list'].reSearch()
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