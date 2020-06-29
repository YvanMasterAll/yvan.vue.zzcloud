<script>
import formData from '@/mixins/formData'
import api from '@/api'
export default {
    mixins: [formData], 
    props: {
        depts: {
            default: []
        },
    },
    computed: {
        settingForm() {
            return [
                { 
                    ftype: 'input', 
                    prop: 'name', 
                    label: '角色名称', 
                    default: '',
                    style: {width: '370px'},
                    rule: { required: true, message: '请输入角色名称', trigger: 'blur' }, 
                },
                { 
                    ftype: 'input-number', 
                    prop: 'level', 
                    label: '角色级别', 
                    min: 1,
                    default: 999,
                    controlsPosition: 'right',
                    style: {width: '150px'},
                    rule: { required: true, message: '角色级别不能为空', trigger: 'blur' }, 
                },
                { 
                    ftype: 'select',
                    options: [{label: '全部', value: 'all'}, {label: '本级', value: 'same'}, {label: '自定义', value: 'diy'}],
                    optionProps: {label: 'label', value: 'value'},
                    prop: 'scope', 
                    label: '权限范围', 
                    default: null,
                    style: {width: '370px'},
                    placeholder: '请选择权限范围',
                    rule: { required: true, message: '权限范围不能为空', trigger: 'change' }
                },
                { 
                    ftype: 'treeselect', 
                    options: this.depts,
                    prop: 'depts',
                    label: '数据权限',
                    default: [],
                    style: {width: '360px'},
                    placeholder: '请选择权限范围',
                    multiple: true,
                    if: this.form.model.scope === 'diy',
                    rule: { required: true, message: '权限范围不能为空', trigger: 'change' }
                },
                { 
                    ftype: 'input', 
                    type: 'textarea',
                    prop: 'remark', 
                    label: '描述信息', 
                    default: '',
                    style: {width: '370px'},
                    rule: { required: true, message: '请输入角色名称', trigger: 'blur' }, 
                },
            ]
        }
    },
    data() {
        return {
            // 接口信息
            apis: {
                create: api.role_add,
                update: api.role_edit
            },
            // 对话框配置
            dialog: {
                width: '500px'
            },
            // 表单信息
            form: {
                labelWidth: '80px',
            },
        }
    },
    methods: {}
}
</script>