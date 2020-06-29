import util from '@/libs/util'
export default {
    data() {
        return {
            // 接口信息
            apis: {
                list: null,
                delete: null
            },
            // 表格信息
            table: {        
                data: [],   
                columns: []
            },      
            // 主体表格列过滤
            columnsFilter: { 
                options: []
            },
            // 分页信息
            page: {         
                pagenum: 0, 
                limit: 10,
                total: 0
            },
            // 搜索信息
            search: {       
                panel: {
                  active: true
                },
                form: {
                    size: 'mini',    
                    model: {},
                    inline: true,
                    columns: [],
                    labelPosition: 'left',
                }
            },
            // 查询状态
            search_loading: false, 
            // 查询权限
            searchPermission: [],
            // 删除按钮加载状态
            del_loading: false,
            // 查询权限
            searchPermission: [],
            // 新增权限
            addNewPermission: [],
            // 导出表格标题
            excelTitle: '',

        }
    },
    created() {
        this.initTableColumns()
        this.initSearchFormColumns()
    },
    watch: {
        settingColumns: 'initTableColumns',
        settingActions: 'initTableColumns',
        settingSearch: 'initSearchFormColumns',
    },
    methods: {
        // 表单查询
        async handleSearch() {
            this.search_loading = true
            await this.beforeSearch()
            let result = await this.apis.list(this.searchParams())
            this.search_loading = false
            if (result.valid) {
                this.page.total = result.total
                this.table.data = result.data
            } else {
                this.$notify({
                    title: result.msg
                })
            }
        },
        // 数据删除
        async onDelete(id, closePopover) {
            this.del_loading = true
            let result = await this.apis.delete({id: id})
            this.del_loading = false // 隐藏菊花
            closePopover()
            if (result.valid) {
                this.$notify({
                    title: '删除成功',
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                this.handleSearch()
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 搜索参数
        searchParams () {
            return {
                ...this.search.form.model,
                ...this.page || {},
            }
        },
        // 重置查询
        reSearch() {
            this.page.pagenum = 0
            this.$nextTick(() => {
                this.handleSearch()
            })
        },
        // 查询前的执行函数
        beforeSearch() {},
        // 分页事件处理
        handlePaginationChange(val) {
            this.page = val
            this.handleSearch()
        },
        // 表格导出
        handleDownloadXlsx(title, data) {
            this.$export
                .excel({
                // .csv({
                    title: title,
                    columns: this.table.columns,
                    data: data
                })
                .then(() => {
                    this.$message('导出表格成功')
                })
        },
        // 回车键搜索
        onEnterKeySearch(event) {
            if (event.keyCode == "13") {
                this.handleSearch()
        　　}
        },
        /**
         * 导出excel前的数据转换
         * @param {} data 
         */
        transformExcelData(data) { return data },
        /**
         * 导出excel文档
         */
        downloadXlsx() {
            this.handleDownloadXlsx(this.excelTitle, this.transformExcelData(this.table.data))
        },
        /**
         * 表单编辑前的数据转换
         * @param {*} data 
         */
        transformEditData(data) { return data },
        /**
         * @description 表格编辑事件，初始化并打开表单对话框
         * @param {*} data 
         */
        onEdit(data) {
            this.$refs.form.edit(this.transformEditData(data))
        },
        /**
         * @description 表格新建事件，初始化并打开表单对话框
         * @param {*} data 
         */
        onCreate() {
            this.$refs.form.create()
        },
        /**
         * @description init
         * @description 根据 settingSearch 初始化搜索条件
         */
        initSearchForm () {
            const data = {}
            this.settingSearch.forEach(setting => {
                data[setting.prop] = setting.default
            })
            this.$set(this.search.form, 'model', data)
        },
        /**
         * @description 重置搜索表单
         */
        searchFormReset () {
            this.initSearchForm()
            this.reSearch()
        },
        /**
         * @description 初始化表单配置项
         */
        initSearchFormColumns () {
            this.search.form.columns = this._.cloneDeep(this.settingSearch.filter(e => e.if !== false))
        },
        /**
         * @description init
         * @description 合并settingColumns和settingActions
         * @description 并加上 id
         */
        initTableColumns () {
            const columns = util.arrayAddUniqueId([
                ...this.settingColumns,
                ...this.initTableActions()
            ])
            this.table.columns = this._.cloneDeep(columns.filter(e => e.show !== false && e.if !== false))
            this.columnsFilter.options = this._.cloneDeep(columns.filter(e => e.if !== false))
        },
        initTableActions () {
            const config = this.settingActions
            // 赋值假数据获得基本的设置信息
            const configStatic = config.actions({ row: {}, column: {}, $index: 0 }).filter(e => e.show !== false && e.if !== false)
            // 如果设置项数量是0就不显示操作列
            if (configStatic.length === 0) return []
            // 宽度额外余量
            const extra = 10
            const width = configStatic.length > 0 ? configStatic.reduce((result, item) => {
                if (item.icon) result += 12
                if (item.label) result += item.label.length * 12
                if (item.icon && item.label) result += 5
                result += 18
                return result
            }, extra + 20 + 4 * (configStatic.length - 1)) : 0
            // 返回计算完成的操作列
            return [
                {
                    label: '操作',
                    align: 'center',
                    width: width + 'px',
                    fixed: 'right',
                    ...config,
                    render: row => <d2-table-actions actions={ config.actions(row).filter(e => e.show !== false && e.if !== false) }/>
                }
            ]
        },
        /**
         * @description 触发列设置面板显示
            */
        tableColumnsFilterStart () {
            this.$refs['d2-table-columns-filter'].start()
        },
    },
    computed: {
        // 表格列配置项
        // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
        settingColumns() { return [] },
        // 表格操作列配置项
        settingActions() { return { actions: () => [] }},
        settingActionsConfig() { return () => [] },
        // 表格搜索配置项
        // 建议的书写顺序 [type] -> [options/optionProps] -> [prop] -> [label] -> [placeholder] -> [if][show] -> [style] -> [clearable] -> [render]
        settingSearch() { return [] },
        // 表格渲染函数
        renderTable() {
            const node =
                <d2-table
                    ref="table"
                    size='mini'
                    {...{ attrs: this.table }}
                    {...{ on: this.table.listeners }}
                />
            return node
        },
        // 表格列设置
        tableColumnsFilter() {
            const node =
                <d2-table-columns-filter
                    ref="d2-table-columns-filter"
                    { ...{ attrs: this.columnsFilter } }
                    vModel={ this.table.columns }/>
            return node
        },
        // 搜索表单渲染函数
        renderSearchForm() {
            const node =
                <d2-form ref='form' {...{ attrs: { form: this.search.form } }}>
                    <template slot='follow'>
                        <el-form-item>{ this.searchFormSearchButton }</el-form-item>
                        <el-form-item>{ this.searchFormResetButton }</el-form-item>
                    </template>
                </d2-form>
            return node
        },
        // 搜索表单搜索按钮
        searchFormSearchButton() {
            const node =
                <el-button
                    class='is-thin'
                    size='mini'
                    icon="el-icon-search"
                    type="primary"
                    v-permission={this.searchPermission}
                    // loading={ this.search_loading }
                    on-click={ this.handleSearch }>
                    查询
                </el-button>
            return node
        },
        // 搜索表单重置按钮
        searchFormResetButton() {
            const node =
                <el-button
                    size='mini'
                    class='is-thin'
                    icon="el-icon-refresh"
                    on-click={ this.searchFormReset }
                    plain={true}>
                    重置
                </el-button>
            return node
        },
        // 顶栏刷新按钮
        refreshButton () {
            const node =
                <el-button
                    size='mini'
                    class='is-thin'
                    icon="el-icon-refresh"
                    label="刷新"
                    loading={ this.search_loading }
                    on-click={ this.reSearch }>
                    刷新
                </el-button>
            return node
        },
        // 顶栏导出按钮
        exportButton () {
            const node =
                <el-button
                    size='mini'
                    class='is-thin'
                    icon="el-icon-refresh"
                    label="导出"
                    on-click={ this.downloadXlsx }>
                    导出
                </el-button>
            return node
        },
        // 顶栏导出按钮
        exportButton () {
            const node =
                <el-button
                    size='mini'
                    class='is-thin'
                    icon="el-icon-download"
                    label="导出"
                    on-click={ this.downloadXlsx }>
                    导出
                </el-button>
            return node
        },
        // 顶栏新建按钮
        addNewButton() {
            const node =
                <el-button
                    size='mini'
                    type="primary"
                    class='is-thin'
                    icon="el-icon-plus"
                    v-permission={this.addNewPermission}
                    on-click={ this.onCreate }>
                    新建
                </el-button>
            return node
        },
        // 顶栏过滤设置按钮
        columnFilterButton() {
            const node =
                <el-button
                    size='mini'
                    class='is-thin'
                    icon="el-icon-set-up"
                    label="设置"
                    on-click={ this.tableColumnsFilterStart }>
                    设置
                </el-button>
            return node
        },
    }
}
