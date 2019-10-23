<template>
    <d2-container>
        <demo-page-header slot="header" @show-dialog="showDialog" @submit="handleSubmit" ref="header" />
        <demo-page-main @reload-form="handleSubmit" :depts="depts" :table-data="table" ref="main"/>
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
    name: 'admin-job',
    mixins: [commonData, tableData], 
    components: {
        DemoPageHeader: () => import('./componnets/PageHeader'),
        DemoPageMain: () => import('./componnets/PageMain'),
        DemoPageFooter: () => import('./componnets/PageFooter')
    },
    data() {
        return {
            params: { // 列表查询参数
                name: null,
            },
            api: api.job_list
        }
    },
    created() {
        this.getDepts()
        this.$nextTick(() => {
            this.handleSubmit()
        })
    },
    methods: {
        showDialog() { // 显示添加部门窗口
            this.$refs.main.showDialog(true)
        }
    }
}
</script>