<template>
    <div>
        <edit-dialog @reload-form="reloadForm" :depts="depts" ref="dialog" :is-add="isAdd" />
        <el-table
            :data="tableData"
            size="mini"
            stripe
            ref="table"
            style="width: 100%;"
            >
            <el-table-column prop="name" label="名称"/>

            <el-table-column :show-overflow-tooltip="true" prop="dept_path" label="所属部门"/>

            <el-table-column prop="sort" label="排序"/>

            <el-table-column label="状态" width="100" align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.state === 'on' ? '':'info'">
                        {{ scope.row.state === 'on' ? '正常' : '停用' }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                <template slot-scope="scope">
                    <span>{{ toDateString(scope.row.created_at) }}</span>
                </template>
            </el-table-column>
            
            <el-table-column v-if="permissionCheck(['job/edit', 'job/del'])" label="操作" width="125" align="center">
                <template slot-scope="scope">
                    <el-button v-permission="['job/edit']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" style='margin-right: 4px;'/>
                    <el-popover
                        v-permission="['job/del']"
                        :ref="scope.row.id"
                        placement="top"
                        width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="del_loading" type="primary" size="mini" @click="onDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { permissionCheck } from '@/router'
import util from '@/libs/util'
import editDialog from '../EditDialog'
import api from '@/api'
export default {
    components: { editDialog },
    props: {
        tableData: {
            default: () => []
        },
        depts: {
            default: []
        }
    },
    data() {
        return {
            del_loading: false,
            isAdd: false, // ? '新增岗位' : '编辑岗位'
        }
    },
    methods: {
        permissionCheck,
        toDateString: util.toDateString,
        async onDelete(id) {
            this.del_loading = true
            let result = await api.job_del({id: id})
            this.del_loading = false // 隐藏菊花
            this.$refs[id].doClose()
            if (result.valid) {
                this.$notify({
                    title: '删除成功',
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                this.$emit('reload-form')
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        edit(data) {
            this.isAdd = false
            const _this = this.$refs.dialog
            _this.form = { id: data.id, name: data.name, dept: data.dept_id, state: data.state, sort: data.sort }
            _this.dialog = true
        },
        showDialog(isAdd) {
            this.isAdd = isAdd
            let _this = this.$refs.dialog
            _this.dialog = true
        },
        reloadForm() {
            this.$emit('reload-form')
        }
    }
}

</script>