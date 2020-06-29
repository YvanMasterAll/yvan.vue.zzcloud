export default {
    data() {
        return {
            dialog: {
                visible: false,
                width: '570px',
                appendToBody: true
            },
        }
    },
    computed: {
        // 表单容器的标题
        title() {
            return this.isEdit ? '编辑':'新增'
        }
    },
    methods: {
        /**
         * @description vNode 模态框
         * @param {VNode} content 内容
         */
        renderFormDialog(content) {
            const node = (
                <el-dialog
                    {...{ attrs: this.dialog }}
                    title={this.title}
                    on-close={this.cancel}
                >
                    {content}
                </el-dialog>
            )
            return node
        },
        /**
         * @description 打开面板
         */
        open() {
            this.dialog.visible = true
            this.$nextTick(() => this.clearValidate())
        },
        /**
         * @description 关闭面板
         */
        cancel() {
            this.clearValidate()
            this.dialog.visible = false
        },
        /**
         * @description 清空表单校验
         */
        clearValidate() {
            this.$nextTick(() => {
                this.$refs.form && this.$refs.form.clearValidate()
            })
        }
    }
}
