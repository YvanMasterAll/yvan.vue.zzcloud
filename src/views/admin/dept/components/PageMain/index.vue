<template>
    <div>
        <edit-dialog @reload-form="reloadForm" :depts="depts" ref="dialog" :is-add="isAdd" />
        <el-table
            :data="showTableData"
            size="mini"
            row-key="id"
            stripe
            ref="table"
            style="width: 100%;"
            default-expand-all
            :tree-props="defaultProps"
            >
            <el-table-column prop="name" label="名称"/>

            <el-table-column label="状态" align="center">
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
            
            <el-table-column v-if="permissionCheck(['dept/edit', 'dept/del'])" label="操作" width="125" align="center">
                <template slot-scope="scope">
                    <el-button v-permission="['dept/edit']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" style='margin-right: 4px;'/>
                    <el-popover
                        v-permission="['dept/del']"
                        :ref="scope.row.id"
                        placement="top"
                        width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="del_loading" type="primary" size="mini" @click="onDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button :disabled="isRootDept(scope.row)" slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { permissionCheck, isRootDept } from '@/router'
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
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            del_loading: false,
            isAdd: false, // ? '新增部门' : '编辑部门'
            showTableData: [],
            expandRows: [] // 需要收展的行
        }
    },
    watch: {
        tableData: {
            handler(val) {
                // 配置收展项
                this.expandRows = []
                val.forEach(v => {
                    // v.expanded = true
                    // this.expandRows.push(v)
                    if (v.children) {  v.children.forEach(c => { c.expanded = true; this.expandRows.push(c) })}
                })
                this.showTableData = val
            },
            immediate: true
        },
    },
    methods: {
        permissionCheck,
        isRootDept,
        toDateString: util.toDateString,
        async onDelete(id) {
            this.del_loading = true
            let result = await api.dept_del({id: id})
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
            _this.form = { id: data.id, name: data.name, state: data.state, pid: data.pid }
            _this.dialog = true
        },
        showDialog(isAdd) {
            this.isAdd = isAdd
            let _this = this.$refs.dialog
            _this.dialog = true
        },
        reloadForm() {
            this.$emit('reload-form')
        },
        changeExpand(expand) {
            this.expandRows.forEach(e => {
                this.$refs.table.toggleRowExpansion(e, expand)
            })
        }
    }
}

</script>