<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck } from '@/router'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'oa-sheet-list',
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
                            <div style='margin-left: 10px;'>
                                { this.addNewButton }
                            </div>
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
                list: api.sheet_list,
                delete: api.sheet_del
            },
            // 查询权限
            searchPermission: ['sheet/list'],
            // 新增权限
            addNewPermission: ['sheet/add'],
            // 导出表格标题
            excelTitle: '表格列表-' + util.toDateString(),
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'sn', label: '设备编号', minWidth: '100px', fixed: 'left' },
                { prop: 'sn2', label: '设备编号2', minWidth: '100px' },
                { prop: 'title', label: '表格类型', minWidth: '140px' },
                { prop: 'company', label: '客户名称', minWidth: '120px' },
                { prop: 'date', label: '出表日期', minWidth: '100px' },
                // { prop: 'data', label: '数据',  minWidth: '120px', showOverflowTooltip: true },
                { prop: 'created_at', label: '创建时间', minWidth: '100px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                if: permissionCheck(['sheet/edit', 'sheet/del']),
                actions: ({ row }) => [
                    { id: row.id, icon: 'el-icon-edit-outline', size: 'mini', if: permissionCheck(['sheet/edit']), action: () => this.onEdit(row) },
                    { id: row.id, icon: 'el-icon-delete', type: 'danger', size: 'mini', plain: true, if: permissionCheck(['sheet/del']), confirm: `确定删除本条数据吗`, loading: this.del_loading, action: this.onDelete }
                ]
            }
        },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() {
            return [
                {
                    ftype: 'input',
                    prop: 'sn',
                    placeholder: '输入设备编号',
                    nativeListeners: {
                        keyup: this.onEnterKeySearch
                    },
                    style: {width: '140px'},
                    clearable: true,
                },
                {
                    ftype: 'select',
                    options: this.companyOptions,
                    optionProps: {label: 'label', value: 'value'},
                    prop: 'company',
                    filterable: true,
                    placeholder: '选择客户',
                    style: {width: '140px'},
                    clearable: true,
                },
                {
                    ftype: 'date-picker',
                    prop: 'date',
                    type: "daterange",
                    pickerOptions: util.pickerOptions,
                    rangeSeparator: "至",
                    startPlaceholder: "开始日期",
                    endPlaceholder: "结束日期",
                    style: 'width: 280px',
                    align: "right"
                },
            ]
        },
        // 公司选项
        companyOptions() {
            if (this.sheet_fields.company) {
                let options = []
                this.sheet_fields.company.forEach(d => {
                    options.push({label: d, value: d})
                })
                return options
            }
            return []
        },
        // 重写新增按钮
        addNewButton() {
            let items = []
            this.sheet_templates.forEach(d => [
                items.push(<el-dropdown-item command={d.id} divided>{d.title}</el-dropdown-item>)
            ])
            return (
                <el-dropdown onCommand={this.onCreate}>
                    <el-button type="primary" size='mini' class='is-thin' >
                        新增<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        { items }
                    </el-dropdown-menu>
                </el-dropdown>
            )
        }
    },
    created() {
        this.getSheetTemplates()
        this.getSheetFields()
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    methods: {
        // 重写编辑方法
        onEdit(data) {
            this.$router.push({name: 'oa-sheet-detail', params: {data: data, tmpl: data.ST_Sheet_Tmpl, fields: this.sheet_fields}})
        },
        // 重写新建方法
        onCreate(command) {
            this.$router.push({name: 'oa-sheet-detail', params: {fields: this.sheet_fields, tmpl: this.sheet_templates.filter(d => d.id === command)[0]}})
        },
        // 查询前的执行函数
        beforeSearch() {
            // 时间参数预处理
            if (this.search.form.model.date) {
                this.search.form.model.date_start = util.toDateString(this.search.form.model.date[0], 'YYYY-MM-DD')
                this.search.form.model.date_end = util.toDateString(this.search.form.model.date[1], 'YYYY-MM-DD')
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