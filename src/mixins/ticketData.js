import util from '@/libs/util'
import { ticket_upload } from '@/dataSourceConfig'
import ticketFormData from './ticketFormData'
import api from '@/api'
export default {
    mixins: [ticketFormData],
    data() {
        return {
            // 接口信息
            apis: {
                ticket_request: null,
                ticket_detail: api.ticket_info,
                // 富文本文件上传接口
                upload: api.ticket_upload,
                // 文件上传路径
                upload_url: ticket_upload.url.fullUrl(),
                // 请求头信息
                headers: { 'Authorization': util.cookies.get('token') }, 
            },
            // 工单信息
            ticket: {
                fields: null,       // 字段信息
                transitions: null,  // 流转信息
                state: null,        // 状态信息
                states: null,       // 所有状态
                json_data: null,    // json信息
                is_finished: false, // 工单执行状态
                is_rejected: false, // 工单执行状态
                detail: null,       // 工单详情
                is_executor: false, // 工单执行人
                need_suggestion: false, // 处理意见
            }
        }
    },
    methods: {
        // 表单提交
        onSubmit(id) {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // 拷贝表单数据
                    let data = this._.cloneDeep(this.form.model)
                    // 验证文件上传并更新文件列表
                    for (var key in this.ticket.state.fields) {
                        let field = this.ticket.fields.filter(f => f.key === key)[0]
                        if (field.type === this.$enums.wk.field_type.image || field.type === this.$enums.wk.field_type.attachment) {
                            let files = []
                            this.$refs[key].uploadFiles.forEach(file => {
                                if (!file.response) { // 已有的文件
                                    files.push({name: file.name, url: file.url})
                                }
                                if (file.response && file.response.code === 200) { // 上传的文件
                                    files.push({name: file.name, url: file.response.data})
                                }
                            })
                            data[key] = files
                            if (this.ticket.state.fields[key].attribute === this.$enums.wk.field_attribute_type.required && data[key].length === 0) {
                                this.$message({
                                    message: '请上传需要的文件',
                                    type: 'warning'
                                })
                                return false
                            }
                        }
                        if (field.type === this.$enums.wk.field_type.date && data[key]) { // 处理时间格式
                            data[key] = util.toDateString(data[key])
                        }
                    }
                    data.process_id = this.ticket.state.process_id
                    data.transition_id = id
                    // 提交前的执行方法
                    if (this.beforeTicketSubmit) {
                        this.beforeTicketSubmit() 
                    }
                    // 获取流转Action
                    let transition = this.ticket.transitions.filter(t => t.id === data.transition_id)[0]
                    // 工单处理确认
                    this.$confirm(`你要${transition.name}工单，是否继续？`, '确认提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.addTransition(transition, data)
                    }).catch(() => {})
                } else {
                    return false
                }
            })
        },
        // 提交Transition
        async addTransition(transition, data) {
            console.log(data)
            let result = await this.apis.ticket_request(data)
            console.log(`工单提交结果：${result}`)
            if (result.valid) {
                this.$notify({
                    title: `工单${transition.name}成功`,
                    message: result.msg,
                    type: 'success',
                    duration: 2500
                })
                // 提交成功的执行方法
                if (this.onTicketSubmitSuccess) { this.onTicketSubmitSuccess() }
                // 重置表单
                this.$refs['form'].resetFields()
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 获取工单详情
        async getTicketDetail() {
            // 初始化数据
            this.ticket.is_executor = false
            this.ticket.need_suggestion = false
            // 从路由提取参数
            let ticket_id = this.$route.params.ticket_id
            console.log(`ticket_id: ${ticket_id}`)
            if (!ticket_id) { return }
            let result = await this.apis.ticket_detail({ticket_id})
            if (result.valid) {
                this.ticket.detail = result.data
                console.log('工单信息')
                console.log(this.ticket.detail)
                // 初始化数据
                this.ticket.states = this.ticket.detail.WK_States
                this.form.model.ticket_id = this.ticket.detail.id
                this.ticket.is_finished = this.ticket.detail.is_finished
                this.ticket.is_rejected = this.ticket.detail.is_rejected
                this.ticket.is_executor = this.ticket.detail.is_executor
                if (this.ticket.is_executor && this.ticket.detail.executor_type !== this.$enums.wk.executor_type.none) {
                    this.ticket.need_suggestion = true
                }
                this.initForm(this.ticket.detail)
            }
        },
        // 初始化表单
        initForm(data) { 
            this.ticket.json_data = data.json_data
            this.ticket.state = data.WK_State
            // 如果工单已结束，将显示所有字段数据
            if (this.ticket.is_finished) {
                let fields = {}
                data.WK_Fields.forEach(f => {
                    fields[f.key] = {
                        attribute: this.$enums.wk.field_attribute_type.readOnly
                    }
                })
                this.ticket.state.fields = fields
            }
            // 字段初始化
            let origin_fields = data.WK_Fields
            let fields = []
            for (var key in this.ticket.state.fields) {
                let f = origin_fields.filter(f => f.key === key)[0]
                if (f.type === this.$enums.wk.field_type.checkbox) { // 如果是多选框需要初始化，不然会报错
                    // this.form.model[f.key] = []
                    this.$set(this.form.model, f.key, []) // 这里需要调用Vue的set方法来实现数据更新，避免多选框出现无法选中的问题
                }
                f.attribute = this.ticket.state.fields[f.key].attribute // 字段属性
                // 表单数据初始化，对于已有的数据，需要合并到字段中并显示到表单上
                if (this.ticket.json_data && this.ticket.json_data[f.key] !== null) {
                    f.value = this.ticket.json_data[f.key]
                    if (f.type === this.$enums.wk.field_type.image || 
                        f.type === this.$enums.wk.field_type.attachment) {
                        this.$set(this.form.model, f.key, f.value)
                    } else if (f.type === this.$enums.wk.field_type.date) {
                        this.$set(this.form.model, f.key, util.toDate(f.value))
                    } else {
                        this.$set(this.form.model, f.key, f.value)
                    }
                }
                fields.push(f)
            }
            this.ticket.fields = fields
            this.ticket.transitions = this.ticket.state.WK_Transitions
            // 设置表单规则
            this.initRules()
        },
        // 初始化表单规则
        initRules() {
            this.ticket.fields.forEach(f => {
                if (this.ticket.state.fields[f.key].attribute === this.$enums.wk.field_attribute_type.required) {
                    if (f.type === this.$enums.wk.field_type.date) {
                        this.form.rules[f.key] = [{ required: true, message: '内容不能为空', trigger: 'change' }]
                    } else if (f.type !== this.$enums.wk.field_type.image &&
                        f.type !== this.$enums.wk.field_type.attachment) {
                        this.form.rules[f.key] = [{ required: true, message: '内容不能为空', trigger: 'change' }]
                    }
                }
            })
        },
        // 跳转到工单详情
        gotoInfoPage(id) {
            this.$router.push({name: 'oa-ticket-info', params: {ticket_id: id}})
        },
    }
}
