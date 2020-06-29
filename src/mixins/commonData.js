import api from '@/api'
export default {
    data() {
        return {
            depts: [],      // 部门信息
            deptsDict: [],  // 部门字典
            jobs: [],       // 岗位信息
            roles: [],      // 角色信息
            menus: [],      // 菜单信息
            permissions: [],// 权限信息
            processes: [],  // 流程信息
            executors: [],  // 可执行人信息
            sheet_fields: {},  // 表格字段
            sheet_templates: [], // 表格模板
        }
    },
    methods: {
        async getDepts() {
            let result = await api.depts()
            if (result.valid) {
                this.depts = result.data
                console.log('部门信息')
                console.log(this.depts)
                this.generateDeptDict() // 构建字典
            }
        },
        async getJobs() {
            let result = await api.jobs()
            if (result.valid) {
                this.jobs = result.data
                console.log('岗位信息')
                console.log(this.jobs)
            }
        },
        async getRoles() {
            let result = await api.roles()
            if (result.valid) {
                this.roles = result.data
                console.log('角色信息')
                console.log(this.roles)
            }
        },
        async getMenus() {
            let result = await api.menus()
            if (result.valid) {
                this.menus = result.data
                console.log('菜单信息')
                console.log(this.menus)
            }
        },
        async getPermissions() {
            let result = await api.permissions()
            if (result.valid) {
                this.permissions = result.data
                console.log('权限信息')
                console.log(this.permissions)
            }
        },
        // 生成部门字典，按照字符构建一颗字典树，效果大概是：[{name: '中', children: [{name: '正', children: [{name: '智', children: [{name: '控'}]}]}]
        generateDeptDict() { 
            let _depts = []
            function flatDepts(node) { // 扁平化数据
                node.forEach(d => {
                    _depts.push({ id: d.id, name: d.name, pid: d.pid, createTime: d.createTime, label: d.label })
                    if (d.children) { flatDepts(d.children) }
                })
            }
            flatDepts(this.depts)
            
            let _deptsDict = []
            _depts.forEach(node => {
                let tokens = node.name.split('') // 字符数组
                let dict = _deptsDict
                // 根据字符顺序找到要操作的节点，并将当前节点合并到该节点上
                tokens.forEach(t => { dict = merge(dict, t, node) })
            })
            function merge(dict, token, source) {
                let node = dict.filter(d => d.name === token)[0]
                if (node) {
                    node.data.push(source)
                    return node.children
                } else {
                    node = { name: token, data: [source], children: [] }
                    dict.push(node)
                    return node.children
                }
            }

            this.deptsDict = _deptsDict
        },
        // 搜索部门字典
        searchDeptDict() { 
            if (this.deptKey === '') {
                this.showDepts = this.depts
                return 
            } 
            let tokens = this.deptKey.split('')
            let node = { children: this.deptsDict }
            let find = true
            tokens.forEach(t => {
                if (node.children.length === 0) {
                    find = false
                    return false
                }
                let next_node
                node.children.forEach(n => {
                    if (n.name === t) {
                        next_node = n
                        return false
                    }
                })
                if (next_node) {
                    node = next_node
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
        // 获取工单流程
        async getProcesses() {
            let result = await api.processes()
            if (result.valid) {
                this.processes = result.data
                console.log('工单流程')
                console.log(this.processes)
            }
        },
        // 获取具备工单处理的执行人
        async getExecutors() {
            let result = await api.ticket_executors()
            if (result.valid) {
                this.executors = result.data
                console.log('执行人')
                console.log(this.executors)
            }
        },
        // 获取公司名称
        async getSheetFields() {
            let result = await api.sheet_fields()
            if (result.valid) {
                let fields = {}
                let origin_fields = result.data
                origin_fields.forEach(field => {
                    let key = field.key
                    let value = field.value
                    if (!fields[key]) {
                        fields[key] = []
                    }
                    fields[key].push(value)
                })
                // 公司字段
                // fields.company = fields.company[0].split('|')
                this.sheet_fields = fields
                console.log('表单字段')
                console.log(this.sheet_fields)
            }
        },
        // 获取表格模板
        async getSheetTemplates() {
            let result = await api.sheet_templates()
            if (result.valid) {
                this.sheet_templates = result.data
                console.log('表格模板')
                console.log(this.sheet_templates)
            }
        }
    }
}
