<template>
    <el-card shadow="never" class='d2-card-mini d2-mt-20'>
        <template slot="header">工单记录</template>
        <el-table
            :data="tableData"
            size="mini"
            stripe
            ref="table"
            style="width: 100%;"
            >
            <el-table-column prop="state_name" label="节点名称"/>

            <el-table-column prop="executor_name" width="100" label="执行人"/>

            <el-table-column label="动作" align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.action_type === $enums.wk.action_type.accept ? '':'danger'">
                        {{scope.row.transition_name}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" prop="suggestion" label="处理意见">
                <template slot-scope="scope">
                    <span>{{ scope.row.suggestion ? scope.row.suggestion:'无' }}</span>
                </template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                <template slot-scope="scope">
                    <span>{{ toDateString(scope.row.created_at) }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-if='tableData.length > 0'
            :current-page="current"
            :page-size="size"
            :total="total"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, prev, pager, next"
            class='d2-mt-20'
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
        </el-pagination>
    </el-card>
</template>

<script>
import util from '@/libs/util'
export default {
    props: {
        tableData: {
            default: () => []
        },
        current: {
            default: 0
        },
        size: {
            default: 0
        },
        total: {
            default: 0
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        toDateString: util.toDateString,
        handleSizeChange(val) {
            this.$emit('change', {
                current: this.current,
                size: val,
                total: this.total
            })
        },
        handleCurrentChange(val) {
            this.$emit('change', {
                current: val,
                size: this.size,
                total: this.total
            })
        }
    }
}

</script>