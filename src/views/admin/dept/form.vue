<script>
import formData from '@/mixins/formData'
import { isRootDept } from '@/router'
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
                    label: '名称', 
                    default: '',
                    style: {width: '370px'},
                    rule: { required: true, message: '请输入部门名称', trigger: 'blur' }, 
                },
                { 
                    ftype: 'treeselect', 
                    options: this.depts,
                    prop: 'pid',
                    label: '上级部门',
                    default: null,
                    style: {width: '370px'},
                    placeholder: '选择上级部门',
                    if: !isRootDept(this.form.model),
                    rule: { required: true, message: '请选择上级部门', trigger: 'change' }
                },
            ]
        }
    },
    data() {
        return {
            // 接口信息
            apis: {
                create: api.dept_add,
                update: api.dept_edit
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