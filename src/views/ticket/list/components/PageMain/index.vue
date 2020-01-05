<template>
    <div>
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

            <el-table-column label="操作" width="125" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="viewInfo(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { permissionCheck } from '@/router'
import util from '@/libs/util'
import api from '@/api'
export default {
    props: {
        tableData: {
            default: () => []
        }
    },
    data() {
        return {}
    },
    methods: {
        permissionCheck,
        toDateString: util.toDateString,
        viewInfo(id) {
            // 跳转到工单详情
            this.$router.push({name: 'ticket-info', params: {ticket_id: id}})
        }
    }
}

</script>