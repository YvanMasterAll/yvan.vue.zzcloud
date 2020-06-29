<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
import { permissionCheck } from '@/router'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'admin-user',
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
                <el-container class="container">
                    <el-aside width="200px">
                        <el-tree data={this.showDepts} props={this.treeParams} expand-on-click-node={false} default-expand-all on-node-click={this.selectDept} />
                    </el-aside>
                    <el-main>{ this.renderTable }</el-main>
                </el-container>
                <d2-pagination slot="footer" current={this.page.pagenum} size={this.page.limit} total={this.page.total} on-change={this.handlePaginationChange} />
                { this.tableColumnsFilter }
                <form-dialog ref='form' on-success={this.handleSearch} {...{ attrs: { depts: this.depts, jobs: this.jobs, roles: this.roles } }} />
            </d2-container>
        return page
    },
    data() {
        return {
            // 接口信息
            apis: {
                list: api.user_list,
                delete: api.user_del
            },
            // 部门查询关键字
            deptKey: '',      
            // 要显示的部门数据     
            showDepts: [],          
            // 树形列表显示参数
            treeParams: {           
                children: 'children',
                label: 'name'
            },
            // 查询权限
            searchPermission: ['user/list'],
            // 新增权限
            addNewPermission: ['user/add'],
            // 导出表格标题
            excelTitle: '用户列表-' + util.toDateString(),
        }
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() {
            return [
                { prop: 'name', label: '用户名', minWidth: '100px', fixed: 'left' },
                { prop: 'phone', label: '电话', minWidth: '100px' },
                { prop: 'email', label: '邮箱', minWidth: '140px' },
                { prop: 'dept_job', label: '部门 / 岗位', minWidth: '140px', render: ({ row }) => <div>{ row.Dept.name } / { row.Job.name }</div> },
                { 
                    prop: 'state', 
                    label: '状态', 
                    minWidth: '80px', 
                    render: ({ row }) => 
                        <el-tag size="mini" type={row.state === 'on' ? '':'info'}>
                            { this.$enums.dict.getItemLabel('state', row.state) }
                        </el-tag>
                },
                { prop: 'created_at', label: '创建时间', width: '140px', formatter: row => util.toDateString(row.created_at) },
            ]
        },
        // 表格操作配置
        settingActions() {
            return {
                if: permissionCheck(['user/edit', 'user/del']),
                actions: ({ row }) => [
                    { id: row.id, icon: 'el-icon-edit-outline', size: 'mini', if: permissionCheck(['user/edit']), action: () => this.onEdit(row) },
                    { id: row.id, icon: 'el-icon-delete', type: 'danger', size: 'mini', plain: true, if: permissionCheck(['user/del']), confirm: `确定删除本条数据吗`, loading: this.del_loading, action: this.onDelete }
                ]
            }
        },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() {
            return [
                {
                    ftype: 'input',
                    render: () => <el-input size='mini' vModel={this.deptKey} clearable placeholder="输入要查询的部门" prefix-icon="el-icon-search" style="width: 180px;" on-input={this.updateDeptKey} />
                },
                {
                    ftype: 'input',
                    prop: 'name',
                    label: '用户',
                    placeholder: '输入要查询的用户名',
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
        this.getJobs()
        this.getRoles()
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
        // 更新部门搜索关键字
        updateDeptKey(key) {
            this.deptKey = key
            this.searchDeptDict()
        },
        // 选中部门事件
        selectDept(dept) {
            this.search.form.model.dept = dept.id
            this.handleSearch()
        },
        /**
         * 导出excel前的数据转换
         * @param {} data 
         */
        transformExcelData(data) {
            return data.map(row => ({
                ...row,
                dept_job: `${row.Dept.name} / ${row.Job.name}`,
                created_at: util.toDateString(row.created_at),
                updated_at: util.toDateString(row.updated_at),
            }))
        },
        /**
         * 表单编辑前的数据转换
         * @param {*} data 
         */
        transformEditData(data) {
            let mapData = {
                password: '_!@#$%^&*()_', // 验证密码
                dept: data.dept_id,
                job: data.job_id,
                roles: data.roles.map(d => d.id)
            }
            return Object.assign({}, data, mapData)
        },
    }
}
</script>
<style lang="scss">
.container {
    height: 100%;
    .el-aside {
        padding: 12px;
        border-right: 1px solid #cfd7e5;
    }
    .el-main {
        padding: 0px;
    }
}
</style>