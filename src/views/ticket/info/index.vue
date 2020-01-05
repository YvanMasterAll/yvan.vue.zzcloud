<template>
    <d2-container>
        <demo-page-header :ticketInfo='ticketInfo' />
        <demo-page-main :ticketInfo='ticketInfo' @reload-data='reloadData' />
    </d2-container>
</template>

<script>
import api from '@/api'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'ticket-info',   
    components: {
        DemoPageHeader: () => import('./components/PageHeader'),
        DemoPageMain: () => import('./components/PageMain')
    },
    data() {
        return {
            ticketInfo: null,
        }
    },
    created() {
        this.getTicketInfo()
    },
    methods: {
        async getTicketInfo() {
            let ticket_id = this.$route.params.ticket_id
            if (!ticket_id) { return }
            let result = await api.ticket_info({ticket_id})
            if (result.valid) {
                this.ticketInfo = result.data
                console.log('工单信息')
                console.log(this.ticketInfo)
            }
        },
        reloadData() {
            this.getTicketInfo()
        }
    }
}
</script>