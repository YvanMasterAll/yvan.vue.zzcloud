<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck } from '@/router'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'oa-sheet-tmpl',
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
                list: api.sheet_tmpl_list,
                delete: api.sheet_tmpl_del
            },
            // 查询权限
            searchPermission: ['sheet/tmpl_list'],
            // 新增权限
            addNewPermission: ['sheet/tmpl_add'],
            // 导出表格标题
            excelTitle: '表格模板列表-' + util.toDateString(),
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'id', label: '模板编号', minWidth: '60px', fixed: 'left' },
                { prop: 'title', label: '表格标题', minWidth: '100px' },
                { 
                    prop: 'state', 
                    label: '状态', 
                    minWidth: '100px', 
                    render: ({ row }) => 
                        <el-tag size="mini" type={row.state === 'on' ? '':'info'}>
                            { this.$enums.dict.getItemLabel('state', row.state) }
                        </el-tag>
                },
                // { prop: 'template', label: '模板',  minWidth: '200px', showOverflowTooltip: true },
                { prop: 'created_at', label: '创建时间', minWidth: '100px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                if: permissionCheck(['sheet/tmpl_del']),
                actions: ({ row }) => [
                    { id: row.id, icon: 'el-icon-delete', type: 'danger', size: 'mini', plain: true, if: permissionCheck(['sheet/tmpl_del']), confirm: `确定删除本条数据吗`, loading: this.del_loading, action: this.onDelete }
                ]
            }
        },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() {
            return [
                {
                    ftype: 'input',
                    prop: 'title',
                    placeholder: '输入表格标题',
                    nativeListeners: {
                        keyup: this.onEnterKeySearch
                    },
                    style: {width: '180px'},
                    clearable: true,
                },
            ]
        },
    },
    created() {
        this.getSheetTemplates()
        this.getSheetFields()
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    methods: {
        // 重写新建方法
        onCreate(command) {
            this.$router.push({name: 'oa-sheet-editor'})
        },
        // 查询前的执行函数
        beforeSearch() {
            
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