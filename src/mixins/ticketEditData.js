import util from '@/libs/util'
import { ticket_upload } from '@/dataSourceConfig'
import api from '@/api'
export default {
    data() {
        return {
            ticket_api: null,
            fields: null,
            transitions: null,
            state: null,
            json_data: null,
            headers: { 'Authorization': util.cookies.get('token') },
            uploadApi: ticket_upload.url.fullUrl(),
            ticket_upload: api.ticket_upload,
            form: {},
            rules: {}
        }
    },
    methods: {
        beforeUpload(file) {
            // console.log(this.$refs.upload.uploadFiles)
            // const isJPG = file.type === 'image/jpeg'
            // const isLt2M = file.size / 1024 / 1024 < 2

            // if (!isJPG) { this.$message.error('上传头像图片只能是 JPG 格式!') }
            // if (!isLt2M) { this.$message.error('上传头像图片大小不能超过 2MB!') }

            // return isJPG && isLt2M

            return true
        },
        handleSuccess(response, file, fileList) {
            console.log(response)
        },
        handleError(e, file, fileList) {
            const msg = JSON.parse(e.message)
            this.$notify({
                title: msg.message,
                type: 'error',
                duration: 2500
            })
        },
        handlePreview(file) {
            window.open(file.url)
        },
        onSubmit(id) {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // 验证文件上传并更新文件列表
                    for (var key in this.state.fields) {
                        let field = this.fields.filter(f => f.key === key)[0]
                        if (field.type === this.$enums.wk.field_type.image || field.type === this.$enums.wk.field_type.attachment) {
                            let files = []
                            this.$refs[key][0].uploadFiles.forEach(file => {
                                if (!file.response) { // 已有的文件
                                    files.push({name: file.name, url: file.url})
                                }
                                if (file.response && file.response.code === 200) { // 上传的文件
                                    files.push({name: file.name, url: file.response.data})
                                }
                            })
                            this.form[key] = files
                            if (this.state.fields[key].attribute === this.$enums.wk.field_attribute_type.required && this.form[key].length === 0) {
                                this.$message({
                                    message: '请上传需要的文件',
                                    type: 'warning'
                                })
                                return false
                            }
                        }
                        if (field.type === this.$enums.wk.field_type.date && this.form[`_${key}`]) { // 处理时间格式
                            this.form[key] = util.toDateString(this.form[`_${key}`])
                        }
                    }
                    this.form.process_id = this.state.process_id
                    this.form.transition_id = id
                    // 提交前的执行方法
                    if (this.beforeSubmit_ticket) {
                        this.beforeSubmit_ticket() 
                    }
                    console.log(this.form)
                    // 获取流转Action
                    let transition = this.transitions.filter(t => t.id === this.form.transition_id)[0]
                    // 工单处理确认
                    this.$confirm(`你要${transition.name}工单，是否继续？`, '确认提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.transition_add(transition)
                    }).catch(() => {})
                } else {
                    return false
                }
            })
        },
        async transition_add(transition) {
            let result = await this.ticket_api(this.form)
            console.log(result)
            if (result.valid) {
                this.$notify({
                    title: `工单${transition.name}成功`,
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                // 提交成功的执行方法
                if (this.submitSuccess_ticket) { this.submitSuccess_ticket() }
                // 重置表单
                this.$refs['form'].resetFields()
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 初始化表单
        initForm(val) { 
            this.json_data = val.json_data
            this.state = val.WK_State
            // 如果工单已结束，将显示所有字段数据
            if (this.is_finished) {
                let fields = {}
                val.WK_Fields.forEach(f => {
                    fields[f.key] = {
                        attribute: this.$enums.wk.field_attribute_type.readOnly
                    }
                })
                this.state.fields = fields
            }
            // 字段初始化
            let _fields = val.WK_Fields
            let fields = []
            for (var key in this.state.fields) {
                let f = _fields.filter(f => f.key === key)[0]
                if (f.type === this.$enums.wk.field_type.checkbox) { // 如果是多选框需要初始化，不然会报错
                    // this.form[f.key] = []
                    this.$set(this.form, f.key, []) // 这里需要调用Vue的set方法来实现数据更新，避免多选框出现无法选中的问题
                }
                f.attribute = this.state.fields[f.key].attribute // 字段属性
                // 表单数据初始化，对于已有的数据，需要合并到字段中并显示到表单上
                if (this.json_data && this.json_data[f.key] !== null) {
                    f.value = this.json_data[f.key]
                    if (f.type === this.$enums.wk.field_type.image || 
                        f.type === this.$enums.wk.field_type.attachment) {
                        this.$set(this.form, `_${f.key}`, f.value)
                    } else if (f.type === this.$enums.wk.field_type.date) {
                        this.$set(this.form, `_${f.key}`, util.toDate(f.value))
                    } else {
                        this.$set(this.form, f.key, f.value)
                    }
                }
                fields.push(f)
            }
            this.fields = fields
            this.transitions = this.state.WK_Transitions
            // 设置表单规则
            this.setRules()
        },
        setRules() {
            this.fields.forEach(f => {
                if (this.state.fields[f.key].attribute === this.$enums.wk.field_attribute_type.required) {
                    if (f.type !== this.$enums.wk.field_type.date) {
                        this.rules[`_${f.key}`] = [{ required: true, message: '内容不能为空', trigger: 'change' }]
                    } else if (f.type !== this.$enums.wk.field_type.image &&
                        f.type !== this.$enums.wk.field_type.attachment) {
                        this.rules[f.key] = [{ required: true, message: '内容不能为空', trigger: 'change' }]
                    }
                }
            })
        },
    }
}
