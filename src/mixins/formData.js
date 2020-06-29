import formDialog from './formDialog'
import util from '@/libs/util'
const validator = require('validator')
export default {
    mixins: [formDialog],
    data() {
        return {
            // 接口信息
            apis: {
                create: null,
                update: null
            },
            // 表单信息
            form: {
                initialized: false, // 初始化状态
                inline: true,
                model: {},
                columns: [],
                labelWidth: '66px',
                size: 'mini',
            },
            // 是否是编辑模式
            isEdit: false,
            // 表单详情
            detail: {},
            // 按钮组
            buttons: {
                cancel: {
                    label: '取消',
                    plain: true,
                    size: 'mini'
                },
                submit: {
                    label: '确认',
                    type: 'primary',
                    size: 'mini',
                    icon: 'el-icon-check'
                }
            },
            // 加载状态
            submit_loading: false
        }
    },
    created() {
        this.initFormColumns()
    },
    watch: {
        settingForm: 'initFormColumns',
    },
    render() {
        return this.renderFormDialog([
            this.renderForm,
            this.formButtons
        ])
    },
    computed: {
        // 表单渲染
        renderForm() {
            return <d2-form ref='form' {...{ attrs: { form: this.form } }} />
        },
        // 表单按钮组
        formButtons() {
            const node =
                <div slot="footer" class="dialog-footer">
                    <el-button { ...{ attrs: this.buttons.cancel } } on-click={this.cancel}>取消</el-button>
                    <el-button { ...{ attrs: this.buttons.submit } } loading={this.submit_loading} disabled={ !this.isFormChanged } on-click={this.onSubmit}>确认</el-button>
                </div>
            return node
        },
        // 表单配置
        settingForm() { return [] },
        // 根据表单设置计算出校验规规则
        rulesFromSetting () { return this._.fromPairs(this.settingForm.filter(item => item.rule).map(item => [item.prop, item.rule])) },
        // 根据表单设置计算出表单默认值
        formFromSetting () { return this._.fromPairs(this.settingForm.map(item => [item.prop, item.default])) },
        // 根据表单设置和详情计算出表单值
        formFromSettingAndDetail () { return Object.assign({}, this.formFromSetting, this.detail) },
        // 表单是否发生变化
        isFormChanged () { return !util.isIdenticalObject(this.formFromSettingAndDetail, this.form.model) },
    },
    methods: {
        /**
         * @description 初始化表单配置项
         */
        initFormColumns () {
            this.form.columns = this._.cloneDeep(this.settingForm.filter(e => e.if !== false))
        },
        // 手机号验证
        validPhone(rule, value, callback) {
            if (!value) {
                callback(new Error('请输入电话号码'))
            } else if (!validator.isMobilePhone(value + '', "zh-CN")) {
                callback(new Error('请输入正确的11位手机号码'))
            } else {
                callback()
            }
        }, 
        /**
         * @description 初始化表单为编辑模式
         * @param {Number} id 编辑表单的唯一 id
         */
        async edit(data) {
            this.isEdit = true
            this.detail = data
            this.open()
            this.modelReload()
        },
        /**
         * @description 初始化表单为新建模式
         */
        async create(data = {}) {
            this.isEdit = false
            this.detail = data
            this.modelReload()
            this.open()
        },
        /**
         * @description 重新计算 model
         * @param {Object} config {Array} pick 需要从旧的表单数据中保留的字段
         * @param {Object} config {Object} data 需要特殊设置的数据
         */
        modelReload ({
            pick = [],
            data = {}
        } = {}) {
            // this.form.model没有赋值过的时候要先根据formFromSetting初始化
            // 因为 setting中会有根据this.form.model.xxx动态生成的数据
            if (!this.form.initialized) {
                this.$set(this.form, 'model', this.formFromSetting)
                this.form.initialized = true
            }
            // 这时候才保证formFromSettingAndDetail是正确的
            const model = Object.assign(
                {},
                this.formFromSettingAndDetail,
                this._.pick(this.form.model, pick),
                data
            )
            this.$set(this.form, 'model', model)
        },
        /**
         * @description 在提交表单之前可选进行数据处理
         * @param {Object} data 默认的表单数据
         */
        transformSubmitData(data) { return data },
        /**
         * @description 提交表单
         */
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (!valid) return
                this.submit_loading = true // 显示菊花
                const data = this.transformSubmitData(this.form.model)
                const api_submit = this.isEdit ? this.apis.update:this.apis.create
                let result = await api_submit(data) 
                this.submit_loading = false // 隐藏菊花
                if (result.valid) {
                    this.$notify({
                        title: this.isEdit ? '修改成功':'添加成功',
                        message: result.msg,
                        type: 'success',
                        duration: 2500
                    })
                    this.$emit('success')
                    this.cancel()
                } else {
                    this.$message({
                        message: result.msg,
                        type: 'error'
                    })
                }
            })
        }
    }
}