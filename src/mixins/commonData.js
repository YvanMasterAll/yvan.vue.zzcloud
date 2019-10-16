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
        getDeptsDict() { // 生成部门字典
            let _depts = []
            function flatDepts(s) { // 扁平化数据
                s.forEach(d => {
                    _depts.push({ id: d.id, name: d.name, pid: d.pid, createTime: d.createTime, label: d.label })
                    if (d.children) { flatDepts(d.children) }
                })
            }
            flatDepts(this.depts)
            
            let _deptsDict = []
            _depts.forEach(d => {
                let tokens = d.name.split('') // 字符串数组
                let dict = _deptsDict
                tokens.forEach(t => { dict = plant(dict, t, d) })
            })
            function plant(dict, token, source) {
                let _dict = dict.filter(d => d.name === token)[0]
                if (_dict) {
                    _dict.data.push(source)
                    return _dict.children
                } else {
                    let node = { name: token, data: [source], children: [] }
                    dict.push(node)
                    return node.children
                }
            }

            this.deptsDict = _deptsDict
        },
    }
}
