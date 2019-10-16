<template>
    <d2-container>
        <demo-page-header slot="header" @show-dialog="showDialog" @downloadXlsx="handleDownloadXlsx" @updateDeptName="updateDeptName" @submit="handleSubmit" ref="header" />
        <demo-page-main @reload-form="handleSubmit" :roles="roles" :jobs="jobs" :depts="depts" :depts-dict="deptsDict" :dept-name="deptName" :table-data="table" @dept-select="filterDept" ref="main"/>
        <demo-page-footer
            slot="footer"
            :current="page.current"
            :size="page.size"
            :total="page.total"
            @change="handlePaginationChange"
        />
    </d2-container>
</template>

<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'admin-user',
    mixins: [commonData, tableData], 
    components: {
        DemoPageHeader: () => import('./componnets/PageHeader'),
        DemoPageMain: () => import('./componnets/PageMain'),
        DemoPageFooter: () => import('./componnets/PageFooter')
    },
    data() {
        return {
            deptName: '', // 查询的部门名称
            params: { // 列表查询参数
                dept: null,
                name: null,
                state: null
            },
            api: api.user_list,
            downloadColumns: [
                { label: 'ID', prop: 'id' },
                { label: '用户名', prop: 'name' },
                { label: '头像', prop: 'avatar' },
                { label: '邮箱', prop: 'email' },
                { label: '手机号码', prop: 'phone' },
                { label: '部门', prop: 'dept' },
                { label: '岗位', prop: 'job' },
                { label: '状态', prop: 'state' },
                { label: '创建时间', prop: 'created_at' },
                { label: '更新时间', prop: 'updated_at' },
            ]
        }
    },
    created() {
        this.getDepts()
        this.getJobs()
        this.getRoles()
        this.$nextTick(() => {
            this.handleSubmit()
        })
    },
    methods: {
        updateDeptName(name) {
            this.deptName = name
        },
        filterDept(dept) {
            this.params.dept = dept
            this.handleSubmit()
        },
        downloadDataTranslate(data) {
            return data.map(row => ({
                ...row,
                dept: row.Dept.name,
                job: row.Job.name,
                created_at: util.toDateString(row.created_at),
                updated_at: util.toDateString(row.updated_at),
            }))
        },
        handleDownloadXlsx(data) {
            this.$export
                // .excel({
                .csv({
                    title: '用户列表-' + util.toDateString(),
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(this.table)
                })
                .then(() => {
                    this.$message('导出表格成功')
                })
        },
        showDialog() { // 显示添加用户窗口
            this.$refs.main.showDialog(true)
        }
    }
}
</script>
