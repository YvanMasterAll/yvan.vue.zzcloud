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
                    rule: { required: true, message: '请输入岗位名称', trigger: 'blur' }, 
                },
                { 
                    ftype: 'input-number',
                    prop: 'sort',
                    label: '排序',
                    min: 0,
                    max: 999,
                    default: 99,
                    controlsPosition: 'right',
                    style: {width: '370px'},
                    rule: { required: true, message: '请填写岗位排序', trigger: 'blur' }
                },
                {
                    ftype: 'treeselect', 
                    options: this.depts,
                    prop: 'dept',
                    label: '所属部门',
                    default: null,
                    style: {width: '370px'},
                    placeholder: '选择所属部门',
                    rule: { required: true, message: '请选择所属部门', trigger: 'blur' }
                },
            ]
        }
    },
    data() {
        return {
            // 接口信息
            apis: {
                create: api.job_add,
                update: api.job_edit
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