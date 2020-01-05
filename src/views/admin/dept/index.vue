<template>
    <d2-container>
        <demo-page-header :expand="expand" slot="header" @show-dialog="showDialog" @submit="handleSubmit" @change-expand="changeExpand" ref="header" />
        <demo-page-main @reload-form="handleSubmit" :depts="depts" :table-data="table" ref="main"/>
    </d2-container>
</template>

<script>
import api from '@/api'
import util from '@/libs/util'
import commonData from '@/mixins/commonData'
import tableData from '@/mixins/tableData'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'admin-dept',
    mixins: [commonData, tableData], 
    components: {
        DemoPageHeader: () => import('./components/PageHeader'),
        DemoPageMain: () => import('./components/PageMain')
    },
    data() {
        return {
            params: { // 列表查询参数
                name: null,
            },
            api: api.dept_list,
            expand: true
        }
    },
    created() {
        this.getDepts()
        this.$nextTick(() => {
            this.handleSubmit()
        })
    },
    methods: {
        beforeSubmit() {
            // 不分页
            this.page.current = null
            this.params.limit = null
        },
        showDialog() { // 显示添加部门窗口
            this.$refs.main.showDialog(true)
        },
        changeExpand() {
            this.expand = !this.expand
            this.$refs.main.changeExpand(this.expand)
        }
    }
}
</script>
