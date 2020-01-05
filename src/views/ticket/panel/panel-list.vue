<template>
    <el-card shadow="never" class='d2-card-mini'>
        <template slot="header" >
            <div style='display: flex; align-items: center;'>
                <d2-icon-svg name="ticket-panel-list" style='width: 20px; height: 20px; margin-right: 6px;' />
                <span>待处理的工单列表</span>
                <el-link type="primary" style='display: flex; flex: 1; justify-content: flex-end;' :underline="false" @click="gotoTicketStay">查看更多</el-link>
            </div>
        </template>
        <el-table
            :data="tableData"
            size="mini"
            stripe
            ref="table"
            style="width: 100%;"
            >
            <el-table-column prop="process_name" label="工单类型"/>

            <el-table-column prop="title" label="标题"/>

            <el-table-column prop="creator_name" label="创建人"/>

            <el-table-column prop="state_name" label="当前状态"/>

            <el-table-column label="处理状态" align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.is_rejected ? 'danger':(scope.row.is_finished ? 'success':'')">
                        {{ scope.row.is_rejected ? '否决':(scope.row.is_finished ? '通过':'处理中') }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                <template slot-scope="scope">
                    <span>{{ toDateString(scope.row.created_at) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import api from '@/api'
export default {
    data() {
        return {
            tableData: null,
            api: api.ticket_stay_list
        }
    },
    created() {
        this.handleSubmit()
    },
    methods: {
        async handleSubmit() {
            let result = await this.api()
            if (result.valid) {
                this.tableData = result.data
            } else {
                this.$notify({
                    title: result.msg
                })
            }
        },
        gotoTicketStay() {
            this.$router.push({name: 'ticket-stay', params: {from: 'ticket-panel'}})
        }
    }
}
</script>
<style scoped lang='scss'>

</style>