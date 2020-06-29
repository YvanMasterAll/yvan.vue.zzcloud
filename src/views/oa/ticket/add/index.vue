<template>
    <d2-container>
        <header-card :processes='processes' @change-process='changeProcess' />
        <form-card :process='process' class='d2-mt-20' />
    </d2-container>
</template>

<script>
import api from '@/api'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'oa-ticket-add', 
    components: {
        HeaderCard: () => import('./header'),
        FormCard: () => import('./form')
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
            let result = await api.process_all()
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
