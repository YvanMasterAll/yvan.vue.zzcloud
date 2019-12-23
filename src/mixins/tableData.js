export default {
    data() {
        return {
            table: [],
            page: {
                current: 1,
                size: 10,
                total: 0
            },
            api: null,
            params: null
        }
    },
    methods: {
        async handleSubmit(form) {
            await this.beforeSubmit()
            this.params.pagenum = this.page.current - 1
            this.params.limit = this.page.size
            this.params.total = this.page.total
            if (form) {
                this.params = {...this.params, ...form}
            }
            let result = await this.api(this.params)
            if (result.valid) {
                this.page.total = result.total
                this.table = result.data
            } else {
                this.$notify({
                    title: result.msg
                })
            }
        },
        resubmit() {
            this.page.current = 1
            this.handleSubmit()
        },
        beforeSubmit() {},
        handlePaginationChange(val) {
            this.page = val
            this.handleSubmit()
        }
    }
}
