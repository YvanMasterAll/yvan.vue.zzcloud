<script>
import api from '@/api'
import util from '@/libs/util'
import tableData from '@/mixins/tableData'
export default {
    mixins: [tableData], 
    props: {
        ticket_id: {
            type: Number,
            required: true
        }
    },
    render() {
        var page = 
            <el-card shadow="never" class='d2-card-mini d2-mt-20'>
                <template slot="header">工单记录</template>
                { this.renderTable }
                { this.table.data && this.table.data.length > 0 && <d2-pagination current={this.page.pagenum} styles='margin: 0; padding-top: 10px' layout='total, prev, pager, next' size={this.page.limit} total={this.page.total} on-change={this.handlePaginationChange} /> }
            </el-card>
        return page
    },
    data() {
        return {
            // 接口信息
            apis: {
                list: api.activity_list,
            },
            // 表单信息
            search: {
                form: { model: {} }
            },
            // 表格信息
            table: {
                height: null
            }
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'state_name', label: '节点名称', minWidth: '100px', fixed: 'left' },
                { prop: 'executor_name', label: '执行人', minWidth: '100px' },
                { 
                    prop: 'action', 
                    label: '动作', 
                    minWidth: '80px', 
                    render: ({ row }) => 
                        <el-tag size="mini" type={row.action_type === this.$enums.wk.action_type.accept ? '':'danger'}>
                            {row.transition_name}
                        </el-tag>
                },
                { prop: 'suggestion', label: '处理意见', showOverflowTooltip: true, minWidth: '100px', render: ({ row }) => <span>{ row.suggestion ? row.suggestion:'无' }</span> },
                { prop: 'created_at', label: '创建时间', minWidth: '100px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
    },
    created() {
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    methods: {
        // 查询前的执行函数
        beforeSearch() {
            this.search.form.model.ticket_id = this.ticket_id
        },
    }
}
</script>