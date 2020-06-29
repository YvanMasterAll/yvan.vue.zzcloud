<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck, isAdminRole } from '@/router'
import { clearData } from '../../../../public/lib/UEditor/third-party/zeroclipboard/ZeroClipboard'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'admin-role',
    mixins: [commonData, tableData], 
    components: {
        FormDialog: () => import('./form'),
        PermissionCard: () => import('./p-card')
    },
    render() {
        var page = 
            <d2-container>
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
                <el-row gutter={20}>
                    <el-col xs={24} sm={24} md={16} lg={16} xl={17}>
                        <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span class="role-span">角色列表</span>
                                <div style="float: right">
                                    <el-radio-group vModel={this.permType} size="mini">
                                        <el-radio-button label="菜单分配"/>
                                        <el-radio-button label="权限分配"/>
                                    </el-radio-group>
                                </div>
                            </div>
                            { this.renderTable }
                        </el-card>
                    </el-col>
                    <permission-card ref='pcard' permType={this.permType} permissions={this.permissions} menus={this.menus} on-reload={this.handleSearch} />
                </el-row>
                <d2-pagination slot="footer" current={this.page.pagenum} size={this.page.limit} total={this.page.total} on-change={this.handlePaginationChange} />
                { this.tableColumnsFilter }
                <form-dialog ref='form' on-success={this.handleSearch} {...{ attrs: { depts: this.depts } }} />
            </d2-container>
        return page
    },
    data() {
        return {
            // 接口信息
            apis: {
                list: api.role_list,
                delete: api.role_del
            },
            // 表格信息
            table: {
                height: null,
                highlightCurrentRow: true,
                listeners: {
                    'current-change': this.handleRoleChange
                }
            },
            // 查询权限
            searchPermission: ['role/list'],
            // 新增权限
            addNewPermission: ['role/add'],
            // 导出表格标题
            excelTitle: '角色列表-' + util.toDateString(),
            // 权限类型
            permType: '菜单分配', // 菜单分配/权限分配
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'name', label: '名称', minWidth: '120px', fixed: 'left' },
                { 
                    prop: 'scope', 
                    label: '数据权限', 
                    minWidth: '80px', 
                    formatter: function(row) {
                        if (row.scope === 'all') { return '全部' }
                        if (row.scope === 'diy') { return '自定义' }
                        if (row.scope === 'same') { return '本级' }
                        return '未知'
                    }
                },
                { prop: 'level', label: '角色级别', minWidth: '80px' },
                { prop: 'remark', label: '描述', minWidth: '120px', showOverflowTooltip: true, },
                { prop: 'created_at', label: '创建时间', width: '140px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                if: permissionCheck(['role/edit', 'role/del']),
                actions: ({ row }) => [
                    { id: row.id, icon: 'el-icon-edit-outline', size: 'mini', if: permissionCheck(['role/edit']), action: () => this.onEdit(row) },
                    { id: row.id, icon: 'el-icon-delete', type: 'danger', size: 'mini', plain: true, if: permissionCheck(['role/del']), confirm: `确定删除本条数据吗`, loading: this.del_loading, action: this.onDelete }
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
                    placeholder: '输入要查询的角色名称',
                    style: {width: '200px'},
                    nativeListeners: {
                        keyup: this.onEnterKeySearch
                    },
                    clearable: true,
                },
            ]
        },
    },
    created() {
        this.getDepts()
        this.getPermissions()
        this.getMenus()
        this.$nextTick(() => {
            this.handleSearch()
        })
    },
    methods: {
        // 角色选中事件
        handleRoleChange(data) {
            this.$refs.pcard.handleRoleChange(data)
        },
        // 搜索前事件
        beforeSearch() {
            // 清空权限树
            this.$refs.pcard && this.$refs.pcard.clear()
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
            return {
                ...data, depts: data.Depts.map(d => d.id)
            }
        },
    }
}
</script>