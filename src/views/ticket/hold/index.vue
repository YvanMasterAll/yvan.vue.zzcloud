<template>
    <d2-container>
        <demo-page-header slot="header" :processes='processes' @submit="handleSubmit" ref="header" />
        <demo-page-main :table-data="table" ref="main"/>
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
import tableData from '@/mixins/tableData'
import commonData from '@/mixins/commonData'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'ticket-hold',
    mixins: [tableData, commonData], 
    components: {
        DemoPageHeader: () => import('./components/PageHeader'),
        DemoPageMain: () => import('./components/PageMain'),
        DemoPageFooter: () => import('./components/PageFooter')
    },
    data() {
        return {
            api: api.ticket_hold_list
        }
    },
    created() {
        this.getProcesses()
        this.$nextTick(() => {
            this.handleSubmit()
        })
    },
    methods: {
        
    }
}
</script>