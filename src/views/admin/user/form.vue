<script>
import formData from '@/mixins/formData'
import { mapState, mapActions } from 'vuex'
import api from '@/api'
export default {
    mixins: [formData], 
    props: {
        depts: {
            default: []
        },
        jobs: {
            default: []
        },
        roles: {
            default: []
        }
    },
    computed: {
        ...mapState('d2admin/user', ['info']),
        settingForm() {
            return [
                { 
                    ftype: 'input', 
                    prop: 'name', 
                    label: '用户名', 
                    default: '',
                    style: {width: '178px'},
                    rule: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ], 
                },
                { 
                    ftype: 'input', 
                    type: 'password',
                    prop: 'password', 
                    label: '密码', 
                    default: '',
                    style: {width: '178px'},
                    rule: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
                { 
                    ftype: 'input', 
                    prop: 'phone', 
                    label: '电话', 
                    default: '',
                    style: {width: '178px'},
                    rule: { required: true, trigger: 'blur', validator: this.validPhone}, 
                },
                { 
                    ftype: 'input', 
                    prop: 'email', 
                    label: '邮箱', 
                    default: '',
                    style: {width: '178px'},
                    rule: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ], 
                },
                { 
                    ftype: 'treeselect', 
                    options: this.depts,
                    prop: 'dept',
                    label: '部门',
                    default: null,
                    style: {width: '178px'},
                    placeholder: '选择部门',
                    listeners: {
                        select: this.selectDept,
                    },
                    clearable: false,
                    rule: { required: true, message: '部门不能为空', trigger: 'change' }
                },
                { 
                    ftype: 'select', 
                    options: this.showJobs,
                    optionProps: {label: 'name', value: 'id'},
                    prop: 'job', 
                    label: '岗位', 
                    default: null,
                    style: {width: '178px'},
                    placeholder: '请先选择部门',
                    rule: { required: true, message: '岗位不能为空', trigger: 'change' }
                },
                {
                    ftype: 'radio', 
                    options: this.$enums.dict.getDictItems('state'),
                    optionProps: {id: 'id', value: 'value', label: 'label'},
                    prop: 'state', 
                    label: '状态', 
                    default: 'on',
                    style: {width: '244px'},
                    rule: { required: true, message: '状态不能为空', trigger: 'change' }
                },
                { 
                    ftype: 'select', 
                    options: this.roles,
                    optionProps: {label: 'name', value: 'id'},
                    prop: 'roles', 
                    label: '角色', 
                    multiple: true,
                    default: [],
                    style: {width: '178px'},
                    placeholder: '请选择',
                    disabled: this.compareLevel,
                    rule: { required: true, message: '角色不能为空', trigger: 'change' }
                },
            ]
        }
    },
    data() {
        return {
            // 接口信息
            apis: {
                create: api.user_add,
                update: api.user_edit
            },
            // 要显示的岗位信息
            showJobs: []
        }
    },
    methods: {
        // 部门选择事件
        selectDept(node, instanceId) {
            delete this.form.model.job
            this.showJobs = this.jobs.filter(j => j.dept_id === node.id)
        },
        // 角色级别比较，true：可操作，false：不可操作
        compareLevel(item) {
            // 计算用户级别
            if (this.info) {
                let level = 999
                this.info.roles.forEach(r => {
                    if (r.level < level) {
                        level = r.level
                    }
                })
                return level !== 1 && item.level <= level
            }
            return false
        },
        // 提交前转换数据
        transformSubmitData(data) {
            if (data.password == '_!@#$%^&*()_') { // 密码未修改不提交密码
                delete data.password
            }
            return data
        }
    }
}
</script>