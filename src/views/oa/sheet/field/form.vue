<script>
import formData from '@/mixins/formData'
import { isRootDept } from '@/router'
import api from '@/api'
export default {
    mixins: [formData], 
    computed: {
        settingForm() {
            return [
                { 
                    ftype: 'input', 
                    prop: 'key', 
                    label: '字段key', 
                    default: '',
                    style: {width: '170px'},
                    rule: { required: true, message: '请输入字段key', trigger: 'blur' }, 
                },
                { 
                    ftype: 'input', 
                    prop: 'label', 
                    label: '字段标签', 
                    default: '',
                    style: {width: '170px'},
                    rule: { required: true, message: '请输入字段标签', trigger: 'blur' }, 
                },
                { 
                    ftype: 'input', 
                    prop: 'value', 
                    label: '字段值', 
                    default: '',
                    style: {width: '170px'},
                    rule: { required: true, message: '请输入字段值', trigger: 'blur' }, 
                },
            ]
        }
    },
    data() {
        return {
            // 接口信息
            apis: {
                create: api.sheet_field_add,
                update: api.sheet_field_edit
            },
            // 对话框配置
            dialog: {
                width: '300px'
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