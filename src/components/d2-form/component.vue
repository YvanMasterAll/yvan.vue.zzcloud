<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name: 'd2-form',
    components: {
        Treeselect,
    },
    props: {
        form: {
            type: Object,
            default: () => {
                return {
                    columns: [],
                    model: {}
                }
            },
            required: false
        },
    },
    render() {
        return this.renderForm
    },
    computed: {
        renderForm() {
            this.form.rules = this._.fromPairs(this.form.columns.filter(item => item.rule).map(item => [item.prop, item.rule]))
            const form = 
                <el-form ref='form' {...{ attrs: this.form }} class='is-thin'>
                    {
                        ...this.form.columns.map((item, index) => {
                            return this.renderFormItem(item)
                        })
                    }
                    { this.$slots.follow }
                </el-form>
            return form
        },
    },
    methods: {
        renderFormItem(item) {
            if (item.ftype == 'input') {
                const node =
                    <el-form-item label={item.label} prop={item.prop}>
                        { item.render ? item.render():<el-input vModel={this.form.model[item.prop]} {...{attrs: item}} {...{nativeOn: item.nativeListeners}} {...{on: item.listeners}} style={item.style} /> }
                    </el-form-item>
                return node
            }
            if (item.ftype == 'input-number') {
                const node =
                    <el-form-item label={item.label} prop={item.prop}>
                        { item.render ? item.render():<el-input-number vModel={this.form.model[item.prop]} {...{attrs: item}} style={item.style} /> }
                    </el-form-item>
                return node
            }
            if (item.ftype == 'date-picker') {
                const node =
                    <el-form-item label={item.label} prop={item.prop}>
                        { 
                            item.render ? item.render():<el-date-picker vModel={this.form.model[item.prop]} {...{ attrs: item }}></el-date-picker>
                        }
                    </el-form-item>
                return node
            }
            if (item.ftype == 'treeselect') {
                const node = 
                    <el-form-item label={item.label} prop={item.prop}>
                        { item.render ? item.render():<treeselect class={this.form.size} vModel={this.form.model[item.prop]} options={item.options} multiple={item.multiple} style={item.style} placeholder={item.placeholder} {...{on: item.listeners}} clearable={item.clearable}/> }
                    </el-form-item>
                return node
            }
            if (item.ftype == 'radio') {
                const node = 
                    <el-form-item label={item.label} prop={item.prop} style={item.style}>
                        { item.render ? item.render():item.options ? item.options.map((option, index) => {
                            return <el-radio key={option[item.optionProps.id]} vModel={this.form.model[item.prop]} label={option[item.optionProps.value]}>{ option[item.optionProps.label] }</el-radio>
                        }):null}
                    </el-form-item>
                return node
            }
            if (item.ftype == 'select') {
                const node = 
                    <el-form-item label={item.label} prop={item.prop}>
                        { item.render ? item.render():<el-select vModel={this.form.model[item.prop]} style={item.style} clearable={item.clearable} filterable={item.filterable} multiple={item.multiple} placeholder={item.placeholder}>
                            { item.options ? item.options.map((option, index) => {
                                return <el-option key={index} label={option[item.optionProps.label]} value={option[item.optionProps.value]} disabled={item.disabled ? item.disabled(item):false} />
                            }):null}
                        </el-select>}
                    </el-form-item>
                return node
            }
        },
        validate(callback) {
            return this.$refs.form.validate(callback)
        },
        clearValidate() {
            this.$refs.form.clearValidate()
        }
    }
}
</script>