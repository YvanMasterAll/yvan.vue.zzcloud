<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck } from '@/router'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'oa-ticket-list',
    mixins: [commonData, tableData], 
    render() {
        var page = 
            <d2-container spacious>
                <d2-search-panel slot='header' vModel={ this.search.panel.active }>
                    <template slot="title">
                        <div style='display: flex; justify-content: flex-end;'>
                            <el-button-group>
                                { this.refreshButton }
                                { this.exportButton }
                                { this.columnFilterButton }
                            </el-button-group>
                        </div>
                    </template>
                    { this.renderSearchForm }
                </d2-search-panel>
                { this.renderTable }
                <d2-pagination slot="footer" current={this.page.pagenum} size={this.page.limit} total={this.page.total} on-change={this.handlePaginationChange} />
                { this.tableColumnsFilter }
            </d2-container>
        return page
    },
    data() {
        return {
            // 接口信息
            apis: {
                list: api.ticket_list,
            },
            // 查询权限
            searchPermission: [],
            // 导出表格标题
            excelTitle: '待办的工单列表-' + util.toDateString(),
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'process_name', label: '工单类型', minWidth: '100px', fixed: 'left' },
                { prop: 'title', label: '标题', minWidth: '100px' },
                { prop: 'creator_name', label: '创建人', minWidth: '100px' },
                { prop: 'state_name', label: '当前状态', minWidth: '100px' },
                { 
                    prop: 'state', 
                    label: '处理状态', 
                    minWidth: '80px', 
                    render: ({ row }) => 
                        <el-tag size="mini" type={row.is_rejected ? 'danger':(row.is_finished ? 'success':'')}>
                            { row.is_rejected ? '否决':(row.is_finished ? '通过':'处理中') }
                        </el-tag>
                },
                { prop: 'created_at', label: '创建时间', minWidth: '100px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                actions: ({ row }) => [
                    { id: row.id, label: '详情', size: 'mini', action: () => this.gotoInfoPage(row.id) },
                ]
            }
        },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() {
            return [
                {
                    ftype: 'select',
                    options: this.processes.map(d => { return { label: d.name, value: d.id }}),
                    optionProps: {label: 'label', value: 'value'},
                    prop: 'process_id',
                    placeholder: '选择工单类型',
                    style: {width: '140px'},
                    clearable: true,
                },
                {
                    ftype: 'select',
                    options: this.executors.map(d => { return { label: d.name, value: d.id }}),
                    optionProps: {label: 'label', value: 'value'},
                    prop: 'executor_id',
                    placeholder: '选择工单执行人',
                    style: {width: '140px'},
                    clearable: true,
                },
                {
                    ftype: 'input',
                    label: '创建者',
                    prop: 'creator_name',
                    placeholder: '工单创建者名称',
                    style: {width: '140px'},
                    clearable: true,
                },
                {
                    ftype: 'date-picker',
                    prop: 'created_time',
                    type: "datetimerange",
                    pickerOptions: util.pickerOptions,
                    rangeSeparator: "至",
                    startPlaceholder: "开始日期",
                    endPlaceholder: "结束日期",
                    style: 'width: 280px',
                    align: "right"
                },
            ]
        },
    },
    created() {
        this.getProcesses()
        this.getExecutors() 
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    methods: {
        // 跳转到工单详情
        gotoInfoPage(id) {
            this.$router.push({name: 'oa-ticket-info', params: {ticket_id: id}})
        },
        // 查询前的执行函数
        beforeSearch() {
            // 时间参数预处理
            if (this.search.form.model.created_time) {
                this.search.form.model.created_start = util.toDateString(this.search.form.model.created_time[0])
                this.search.form.model.created_end = util.toDateString(this.search.form.model.created_time[1])
            }
        },
        /**
         * 导出excel前的数据转换
         * @param {} data 
         */
        transformExcelData(data) {
            return data.map(row => ({
                ...row,
                created_at: util.toDateString(row.created_at),
                updated_at: util.toDateString(row.updated_at),
            }))
        },
        /**
         * 表单编辑前的数据转换
         * @param {*} data 
         */
        transformEditData(data) {
            return data
        },
    }
}
</script>