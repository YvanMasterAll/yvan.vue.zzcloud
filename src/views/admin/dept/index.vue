<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck, isRootDept } from '@/router'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'admin-dept',
    mixins: [commonData, tableData], 
    components: {
        FormDialog: () => import('./form')
    },
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
                { this.tableColumnsFilter }
                <form-dialog ref='form' on-success={this.handleSearch} {...{ attrs: { depts: this.depts, jobs: this.jobs, roles: this.roles } }} />
            </d2-container>
        return page
    },
    data() {
        return {
            // 接口信息
            apis: {
                list: api.dept_list,
                delete: api.dept_del
            },
            // 表格信息
            table: {
                rowKey: 'id',
                defaultExpandAll: true,
                treeProps: {
                    children: 'children',
                    label: 'name'
                }
            },
            // 查询权限
            searchPermission: ['dept/list'],
            // 新增权限
            addNewPermission: ['dept/add'],
            // 导出表格标题
            excelTitle: '部门列表-' + util.toDateString(),
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'name', label: '名称', minWidth: '100px', fixed: 'left' },
                { 
                    prop: 'state', 
                    label: '状态', 
                    minWidth: '80px', 
                    render: ({ row }) => 
                        <el-tag size="mini" type={row.state === 'on' ? '':'info'}>
                            { this.$enums.dict.getItemLabel('state', row.state) }
                        </el-tag>
                },
                { prop: 'created_at', label: '创建时间', minWidth: '100px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                if: permissionCheck(['dept/edit', 'dept/del']),
                actions: ({ row }) => [
                    { id: row.id, icon: 'el-icon-edit-outline', size: 'mini', if: permissionCheck(['dept/edit']), action: () => this.onEdit(row) },
                    { id: row.id, icon: 'el-icon-delete', type: 'danger', size: 'mini', plain: true, if: permissionCheck(['dept/del']), confirm: `确定删除本条数据吗`, loading: this.del_loading, action: this.onDelete, disabled: isRootDept(row) }
                ]
            }
        },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() {
            return [
                {
                    ftype: 'input',
                    prop: 'name',
                    placeholder: '输入要查询的部门名称',
                    nativeListeners: {
                        keyup: this.onEnterKeySearch
                    },
                    style: {width: '200px'},
                    clearable: true,
                },
                {
                    ftype: 'select',
                    options: this.$enums.dict.getDictItems('state'),
                    optionProps: {label: 'label', value: 'value'},
                    prop: 'state',
                    label: '状态',
                    placeholder: '状态选择',
                    style: {width: '100px'},
                    clearable: true,
                },
            ]
        },
    },
    created() {
        this.getDepts()
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    watch: {
        depts: {
            handler(val) {
                this.showDepts = val
            }
        },
    },
    methods: {
        // 查询前的执行函数
        beforeSearch() {
            // 不分页
            this.page.pagenum = null
            this.page.limit = null
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