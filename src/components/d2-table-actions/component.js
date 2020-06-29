export default {
    name: 'd2-table-actions',
    render() {
        const render = (
            <span>
                {this.actions.map(action => {
                    const attrsDefault = {
                        plain: true
                    }
                    const attrs = this._.omit(action, ['action'])
                    if (action.confirm) { // 如果是提示按钮添加popover弹窗
                        const button = 
                            action.if ?
                                <el-popover
                                    ref={action.id}
                                    placement="top"
                                    style="margin: 0 2px;"
                                    width="180">
                                    <p>{action.confirm}</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" on-click={this.closePopover.bind(this, action.id)}>取消</el-button>
                                        <el-button loading={action.loading} type="primary" size="mini" on-click={action.action.bind(this, action.id, this.closePopover.bind(this, action.id))}>确定</el-button>
                                    </div>
                                    <el-button
                                        {...{ attrs: Object.assign({}, attrsDefault, attrs) }}
                                        slot="reference"
                                        class="is-thin"
                                    />
                                </el-popover>:null
                        return button
                    } else {
                        const button = (
                            <el-button
                                {...{ attrs: Object.assign({}, attrsDefault, attrs) }}
                                style="margin: 0 2px;"
                                class="is-thin"
                                on-click={action.action}
                            >{action.label ? action.label:''}</el-button>
                        )
                        return button
                    }
                })}
            </span>
        )
        return render
    },
    props: {
        actions: {
            type: Array,
            default: () => [],
            required: false
        }
    },
    methods: {
        closePopover(id) {
            this.$refs[id].doClose()
        },
        onAction(action) {
            const callback = action.action || (() => {})
            if (action.confirm) {
                this.$confirm(action.confirm, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(callback)
                    .catch(() => {})
            } else {
                callback()
            }
        }
    }
}
