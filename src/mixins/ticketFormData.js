export default {
    data() {
        return {
            // 表单信息
            form: {
                model: {},
                rules: {},
                size: 'mini',
                labelWidth: '140px'
            }
        }
    },
    computed: {
        renderForm() {
            return (
                <el-form 
                    {...{ attrs: this.form }}
                    ref='form'
                >
                    { this.ticket.detail && 
                        <el-form-item label="申请人：">
                            { this.renderFormInput(this.ticket.detail.creator_name) }
                        </el-form-item>
                    }
                    { this.ticket.fields && this.ticket.fields.map((item, index) => {
                        return (
                            <el-form-item label={`${item.name}：`} prop={item.key} style='white-space: nowrap'>
                                { this.renderFormItem(item) }
                            </el-form-item>
                        )
                    })}
                    { this.renderAdditionalParts() }
                </el-form>
            )
        }
    },
    methods: {
        // 上传前的执行函数
        beforeUpload(file) {
            // console.log(this.$refs.upload.uploadFiles)
            // const isJPG = file.type === 'image/jpeg'
            // const isLt2M = file.size / 1024 / 1024 < 2

            // if (!isJPG) { this.$message.error('上传头像图片只能是 JPG 格式!') }
            // if (!isLt2M) { this.$message.error('上传头像图片大小不能超过 2MB!') }

            // return isJPG && isLt2M

            return true
        },
        // 上传成功的执行函数
        uploadSuccess(response, file, fileList) {
            console.log(response)
        },
        // 上传失败的执行函数
        uploadError(e, file, fileList) {
            const msg = JSON.parse(e.message)
            this.$notify({
                title: msg.message,
                type: 'error',
                duration: 2500
            })
        },
        // 文件预览
        filePreview(file) {
            window.open(file.url)
        },
        /**
         * @description 表单项渲染
         */
        renderFormItem(item) {
            if (item.type === this.$enums.wk.field_type.string) {
                return (
                    <el-col span={8}>
                        { 
                            !this.ticket.is_executor || item.attribute == this.$enums.wk.field_attribute_type.readOnly ? 
                            this.renderFormInput(item.value)
                            :<el-input vModel={this.form.model[item.key]} placeholder={item.description} />
                        }
                    </el-col>
                )
            }
            if (item.type === this.$enums.wk.field_type.date) {
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-date-picker
                        vModel={this.form.model[item.key]}
                        type="datetime"
                        placeholder={item.description}
                        align="right"
                        >
                    </el-date-picker>
            }
            if (item.type === this.$enums.wk.field_type.select) {
                const options = []
                this._.forOwn(item.choice, (value, key) => {
                    options.push(<el-option key={key} label={value} value={value} />)
                })
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-select
                        vModel={this.form.model[item.key]}
                        placeholder={item.description}
                        >
                        { options }
                    </el-select>
            }
            if (item.type === this.$enums.wk.field_type.text) {
                return (
                    <el-col span={8}>
                        { 
                            !this.ticket.is_executor || item.attribute == this.$enums.wk.field_attribute_type.readOnly ? 
                            this.renderFormInput(item.value)
                            :<el-input vModel={this.form.model[item.key]} placeholder={item.description} type='textarea' autosize={{miniRows: 4, maxRows: 8}} />
                        }
                    </el-col>
                )
            }
            if (item.type === this.$enums.wk.field_type.int) {
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-input-number vModel={this.form.model[item.key]} placeholder={item.description} />
            }
            if (item.type === this.$enums.wk.field_type.float) {
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-input-number vModel={this.form.model[item.key]} placeholder={item.description} precision={2} step={0.1} />
            }
            if (item.type === this.$enums.wk.field_type.radio) {
                let options = []
                this._.forOwn(item.choice, (value, key) => {
                    options.push(<el-radio key={key} label={value} value={key} />)
                })
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-radio-group vModel={this.form.model[item.key]}>
                        { options }
                    </el-radio-group>
            }
            if (item.type === this.$enums.wk.field_type.checkbox) {
                let options = []
                this._.forOwn(item.choice, (value, key) => {
                    options.push(<el-checkbox key={key} label={value} value={key} />)
                })
                return !this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly ?
                    this.renderFormInput(item.value)
                    :<el-checkbox-group vModel={this.form.model[item.key]}>
                        { options }
                    </el-checkbox-group>
            }
            if (item.type === this.$enums.wk.field_type.richtext) {
                return (
                    <el-col span={20}>
                        <d2-quill
                            style="min-height: 200px; margin-bottom: 10px;"
                            vModel={this.form.model[item.key]}
                            api={this.apis.upload}
                            readOnly={!this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly}
                        />
                    </el-col>
                )
            }
            if (item.type === this.$enums.wk.field_type.image) {
                return (
                    <el-col span={8}>
                        <el-upload
                            ref={item.key}
                            action={this.apis.upload_url}
                            headers={this.apis.headers}
                            name="upload"
                            before-upload={this.beforeUpload}
                            file-list={this.form.model[item.key]}
                            {...{
                                props: { 
                                    onSuccess: this.uploadSuccess,
                                    onError: this.uploadError,
                                    onPreview: this.ticket.detail ? this.filePreview:null
                                }
                            }}
                            multiple={true}
                            list-type="picture"
                            disabled={!this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly}
                            >
                            { 
                                this.ticket.is_executor && item.attribute !== this.$enums.wk.field_attribute_type.readOnly ?
                                <div>
                                    <el-button plain={true} size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">{item.description}</div>
                                </div>
                                :null
                            }
                        </el-upload>
                    </el-col>
                )
            }
            if (item.type === this.$enums.wk.field_type.attachment) {
                return (
                    <el-col span={8}>
                        <el-upload
                            ref={item.key}
                            drag={this.ticket.is_executor && item.attribute !== this.$enums.wk.field_attribute_type.readOnly}
                            action={this.apis.upload_url}
                            headers={this.apis.headers}
                            name="upload"
                            before-upload={this.beforeUpload}
                            file-list={this.form.model[item.key]}
                            {...{
                                props: { 
                                    onSuccess: this.uploadSuccess,
                                    onError: this.uploadError,
                                    onPreview: this.ticket.detail ? this.filePreview:null
                                }
                            }}
                            multiple={true}
                            disabled={!this.ticket.is_executor || item.attribute === this.$enums.wk.field_attribute_type.readOnly}
                            >
                            { 
                                this.ticket.is_executor && item.attribute !== this.$enums.wk.field_attribute_type.readOnly ?
                                <div>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div slot="tip" class="el-upload__tip">{item.description}</div>
                                </div>
                                :null
                            }
                        </el-upload>
                    </el-col>
                )
            }
            return null
        },
        /**
         * @description 输入框渲染
         * @param {item}} val 
         */
        renderFormInput(val) {
            return <span style='font-size: 14px;color: #606266;'>{val}</span>
        },
        /**
         * @description 渲染详情额外的内容
         */
        renderAdditionalParts() {
            let elements = []
            elements.push(this.ticket.need_suggestion ? 
                <el-form-item label="处理意见：" prop='suggestion'>
                    <el-col span={8}>
                        <el-input
                            type="textarea"
                            autosize={{minRows: 4, maxRows: 8}}
                            placeholder="输入处理意见"
                            v-model={this.form.model.suggestion}>
                        </el-input>
                    </el-col>
                </el-form-item>:null
            )
            elements.push(this.ticket.is_finished ? (
                <el-form-item label="处理状态：" prop="result">
                    <el-tag size="mini" type={this.ticket.is_rejected ? 'danger':'success'}>
                        { this.ticket.is_rejected ? '否决' : '通过' }
                    </el-tag>
                </el-form-item>):null
            )
            elements.push(this.ticket.is_executor && this.ticket.transitions !== null ? (
                <el-form-item>
                    { this.ticket.transitions.map(item => {
                        return <el-button key={item.id} plain={true} type="primary" on-click={this.onSubmit.bind(this, item.id)}>{item.name}</el-button>
                    })}
                </el-form-item>):null
            )
            return elements
        }
    }
}