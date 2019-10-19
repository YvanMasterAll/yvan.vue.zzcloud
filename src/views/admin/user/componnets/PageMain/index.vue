<template>
    <div>
        <edit-dialog @reload-form="reloadForm" :roles="roles" :jobs="jobs" :depts="depts" ref="dialog" :is-add="isAdd" />
        <el-row :gutter="20">
            <!-- 部门数据 -->
            <el-col :xs="9" :sm="6" :md="4" :lg="4" :xl="4">
                <el-tree :data="showDepts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>
            </el-col>
            <!-- 用户数据 -->
            <el-col :xs="15" :sm="18" :md="20" :lg="20" :xl="20">
                <el-table
                    :data="currentTableData"
                    size="mini"
                    stripe
                    style="width: 100%;"
                    >
                    <el-table-column prop="name" label="用户名"/>

                    <el-table-column prop="phone" label="电话"/>

                    <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱"/>

                    <el-table-column label="部门 / 岗位">
                        <template slot-scope="scope">
                            <div>{{ scope.row.Dept.name }} / {{ scope.row.Job.name }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态" width="100" align="center">
                        <template slot-scope="scope">
                            <el-tag size="mini" :type="scope.row.state === 'on' ? '':'info'">
                                {{ scope.row.state === 'on' ? '激活' : '锁定' }}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
                        <template slot-scope="scope">
                            <span>{{ toDateString(scope.row.created_at) }}</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column v-if="permissionCheck(['user/edit', 'user/del'])" label="操作" width="125" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button v-permission="['user/edit']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" style='margin-right: 4px;'/>
                            <el-popover
                                v-permission="['user/del']"
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
import util from '@/libs/util'
import { permissionCheck } from '@/router'
import editDialog from '../EditDialog'
import api from '@/api'
export default {
    components: { editDialog },
    props: {
        tableData: {
            default: () => []
        },
        deptName: {
            default: ''
        },
        depts: {
            default: []
        },
        deptsDict: {
            default: []
        },
        jobs: {
            default: []
        },
        roles: {
            default: []
        }
    },
    data() {
        return {
            currentTableData: [],
            multipleSelection: [],
            del_loading: false,
            showDepts: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            isAdd: false, // ? '新增用户' : '编辑用户'
        }
    },
    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
            },
            immediate: true
        },
        deptName: {
            handler(val) {
                this.findDepts()
            }
        },
        depts: {
            handler(val) {
                this.showDepts = val
            }
        }
    },
    methods: {
        permissionCheck,
        toDateString: util.toDateString,
        handleNodeClick(data) {
            this.$emit('dept-select', data.id)
        },
        async onDelete(id) {
            this.del_loading = true
            let result = await api.user_del({id: id})
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
            _this.form = { id: data.id, name: data.name, password: '~!@#$%^&*()_+', email: data.email, state: data.state, phone: data.phone },
            _this.deptId = data.Dept.id
            _this.selectDept(data.Dept)
            _this.jobId = data.Job.id 
            _this.roleIds = data.roles.map(r => r.id)
            _this.getLevel()
            _this.dialog = true
        },
        findDepts() { // 搜索部门字典
            if (this.deptName === '') {
                this.showDepts = this.depts
                return 
            } 
            let tokens = this.deptName.split('')
            let node = { children: this.deptsDict }
            let find = true
            tokens.forEach(t => {
                if (node.children.length === 0) {
                    find = false
                    return false
                }
                let _node
                node.children.forEach(n => {
                    if (n.name === t) {
                        _node = n
                        return false
                    }
                })
                if (_node) {
                    node = _node
                } else {
                    find = false
                    return false
                }
            })
            if (find) {
                this.showDepts = node.data
            } else {
                this.showDepts = []
            }
        },
        showDialog(isAdd) {
            this.isAdd = isAdd
            let _this = this.$refs.dialog
            _this.getLevel()
            _this.dialog = true
        },
        reloadForm() {
            this.$emit('reload-form')
        },
    }
}

// let depts = [{ // 测试数据
//     "id": 1,
//     "name": "eladmin",
//     "enabled": true,
//     "pid": 0,
//     "children": [{
//         "id": 7,
//         "name": "华南分部",
//         "enabled": true,
//         "pid": 1,
//         "children": [{
//             "id": 2,
//             "name": "研发部",
//             "enabled": true,
//             "pid": 7,
//             "createTime": 1553476532000,
//             "label": "研发部"
//         }, {
//             "id": 5,
//             "name": "运维部",
//             "enabled": true,
//             "pid": 7,
//             "createTime": 1553476844000,
//             "label": "运维部"
//         }, {
//             "id": 9,
//             "name": "财务部",
//             "enabled": true,
//             "pid": 7,
//             "createTime": 1553483134000,
//             "label": "财务部"
//         }, {
//             "id": 12,
//             "name": "市场部",
//             "enabled": false,
//             "pid": 7,
//             "createTime": 1553483424000,
//             "label": "市场部"
//         }],
//         "createTime": 1553483090000,
//         "label": "华南分部"
//     }, {
//         "id": 8,
//         "name": "华北分部",
//         "enabled": true,
//         "pid": 1,
//         "children": [{
//             "id": 6,
//             "name": "测试部",
//             "enabled": true,
//             "pid": 8,
//             "createTime": 1553478738000,
//             "label": "测试部"
//         }, {
//             "id": 10,
//             "name": "行政部",
//             "enabled": true,
//             "pid": 8,
//             "createTime": 1553483158000,
//             "label": "行政部"
//         }, {
//             "id": 11,
//             "name": "人事部",
//             "enabled": true,
//             "pid": 8,
//             "createTime": 1553483278000,
//             "label": "人事部"
//         }],
//         "createTime": 1553483093000,
//         "label": "华北分部"
//     }],
//     "createTime": 1553476445000,
//     "label": "eladmin"
// }]

// // 生成部门字典
// let getDeptsDict = function() {
//     let _depts = []
//     function flatDepts(s) { // 扁平化数据
//         s.forEach(d => {
//             _depts.push({
//                 id: d.id, name: d.name, pid: d.pid, createTime: d.createTime, label: d.label
//             })
//             if (d.children) {
//                 flatDepts(d.children)
//             }
//         })
//     }
//     flatDepts(depts)
    
//     let deptsDict = []
//     _depts.forEach(d => {
//         let tokens = d.name.split('') // 字符串数组
//         let dict = deptsDict
//         tokens.forEach(t => {
//             dict = plant(dict, t, d)
//         })
//     })
//     function plant(dict, node, source) {
//         let _dict = dict.filter(d => d.name === node)
//         if (_dict.length > 0) {
//             _dict[0].data.push(source)
//         } else {
//             dict.push({
//                 name: node,
//                 data: [source],
//                 children: []
//             })
//         }

//         return dict[0].children
//     }
//     console.log(deptsDict)
// }
// getDeptsDict()

</script>
