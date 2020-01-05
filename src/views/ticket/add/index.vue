<template>
    <d2-container>
        <demo-page-header :processes='processes' @change-process='changeProcess' />
        <demo-page-main :process='process' class='d2-mt-20' />
    </d2-container>
</template>

<script>
import api from '@/api'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'ticket-add', 
    components: {
        DemoPageHeader: () => import('./components/PageHeader'),
        DemoPageMain: () => import('./components/PageMain')
    },
    data() {
        return {
            processes: [],
            process: null
        }
    },
    created() {
        this.getProcesses()
    },
    methods: {
        async getProcesses() {
            let result = await api.process_list()
            if (result.valid) {
                this.processes = result.data
                console.log('流程信息')
                console.log(this.processes)
            }
        },
        changeProcess(process_id) {
            this.process = this.processes.filter(p => p.id === process_id)[0]
        }
    }
}
</script>
