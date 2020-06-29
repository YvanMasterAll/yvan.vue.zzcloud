<template>
    <div class='grid-content grid-content__chart'>
        <el-card shadow="never" class='d2-card-mini'>
            <template slot="header" >
                <d2-icon-svg name="ticket-chart" style='width: 20px; height: 20px; margin-right: 4px; vertical-align: middle;' />
                <span style='vertical-align: middle;'>工单分类分布图</span>
            </template>
            <div id="chart" style="height: 289px;"></div>
        </el-card>
    </div>
</template>
<script>
export default {
    props: {
        ticketPanel: {
            default: null
        }
    },
    data() {
        return {
            data: null
        }
    },
    watch: {
        ticketPanel: {
            handler(val) {
                // let data = []
                // for (var name in val.ticket_category_distribute) {
                //     data.push({
                //         name, value: val.ticket_category_distribute[name]
                //     })
                // }
                // this.data = data
                // 测试数据
                this.data = [{name: "请假申请", value: 39}, {name: "售后申请", value: 16}, {name: "问题反馈", value: 12}]
                this.drawChart()
            }
        }
    },
    methods: {
        drawChart() {
            let colors = ['#409EFF', '#F56C6C', '#01E17E']
            var data = this.data
            let option = {
                color: colors,
                tooltip: {
                    trigger: 'item', formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vartical",
                    right: "7%",
                    top: '4%',
                    itemWidth: 24,
                    itemHeight: 14,
                    itemGap: 16,
                    textStyle: { color: '#303133', fontSize: 12, fontWeight: 0 },
                    data: data.map(function(d) { return d.name })
                },
                series: [{
                    stack: 'a',
                    type: 'pie',
                    center: ['44%', '50%'],
                    // radius: ['20%', '80%'],
                    radius: ['14%', '70%'],
                    // roseType: 'radius',
                    zlevel: 10,
                    label: {
                        normal: { show: true, formatter: "{b}：{d} %", textStyle: { fontSize: 15, }, position: 'outside' },
                        emphasis: { show: true }
                    },
                    labelLine: {
                        normal: { show: true, length: 10, length2: 20 },
                        emphasis: { show: false }
                    },
                    itemStyle: {
                        normal: { shadowBlur: 20, shadowColor: 'rgba(0, 0, 0, 0.28)' }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) { return Math.random()*200; },
                    data: data
                }]
            }
            let chart = this.$echarts.init(document.getElementById("chart"))
            chart.setOption(option)
            window.onresize = function(){ chart.resize() }
        }
    }
}
</script>
<style scoped lang='scss'>
.grid-content {
    &__chart {
        height: 360px;
    }
}
</style>