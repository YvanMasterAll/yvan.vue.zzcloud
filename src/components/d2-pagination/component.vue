<template>
    <el-pagination
        :current-page="current+1"
        :page-size="size"
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        :layout='layout'
        :style='styles'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script>
export default {
    name: 'd2-pagination',
    props: {
        current: {
            default: 0
        },
        size: {
            default: 0
        },
        total: {
            default: 0
        },
        styles: {
            default: 'margin: -10px'
        },
        layout: {
            default: "total, sizes, prev, pager, next, jumper"
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('change', {
                pagenum: this.current,
                limit: val,
                total: this.total
            })
        },
        handleCurrentChange(val) {
            this.$emit('change', {
                pagenum: val-1,
                limit: this.size,
                total: this.total
            })
        }
    }
}
</script>
