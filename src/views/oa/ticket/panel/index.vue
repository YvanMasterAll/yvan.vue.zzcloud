<template>
    <d2-container>
        <el-row :gutter='20' style='margin-bottom: 20px;'>
            <panel-card :ticket-panel='ticketPanel' />
            <el-col :span='12'>
                <panel-chart :ticket-panel='ticketPanel' />
            </el-col>
        </el-row>
        <panel-list />
    </d2-container>
</template>
<script>
import api from '@/api'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'oa-ticket-panel',
    components: {
        PanelCard: () => import('./panel-card'),
        PanelChart: () => import('./panel-chart'),
        PanelList: () => import('./panel-list'),
    },
    data() {
        return {
            ticketPanel: null,
            api: api.ticket_panel
        }
    },
    created() {
        this.$nextTick(() => {
            this.handleSubmit()
        })
    },
    methods: {
        async handleSubmit() {
            let result = await this.api()
            console.log(result)
            if (result.valid) {
                this.ticketPanel = result.data
            }
        }
    }
}
</script>
