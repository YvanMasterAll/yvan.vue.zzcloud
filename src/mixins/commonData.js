import api from '@/api'
export default {
    data() {
        return {
            depts: [],
            deptsDict: [],
            jobs: [],
            roles: [],
            menus: [],
            permissions: []
        }
    },
    methods: {
        async getDepts() {
            let result = await api.depts()
            if (result.valid) {
                this.depts = result.data
                console.log('部门信息')
                console.log(this.depts)
                this.getDeptsDict() // 构建字典
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
        getDeptsDict() { 
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
    }
}
