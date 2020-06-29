<script>
import util from '@/libs/util'
import api from '@/api'
import { ticket_upload } from '@/dataSourceConfig'
import ticketData from '@/mixins/ticketData'
export default {
    mixins: [ticketData],
    props: {
        process: {
            default: null
        }
    },
    render() {
        if (!this.ticket.state) {
            return null
        }
        return (
            <el-card shadow='never' class='d2-card-mini'>
                <template slot='header'>{this.process.name}</template>
                { this.renderForm }
            </el-card>
        )
    },
    data() {
        return {
            // 接口信息
            apis: {
                ticket_request: api.ticket_add
            },
            // 工单信息
            ticket: {
                is_executor: true
            },
        }
    },
    watch: {
        process: {
            handler(val) {
                this.initForm(val)
            }
        }
    },
    methods: {
        // 提交前的执行函数
        beforeSubmit() {
            
        }
    }
}
</script>