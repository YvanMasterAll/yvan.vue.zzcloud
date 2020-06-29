<template>
    <div class='timeline-chart' :style='{height: height + 30 }'>
        <v-chart :height='height' :padding='padding' :data='dv' :scale='cols' :forceFit='true'>
            <v-axis name="x" />
            <v-tooltip />
            <v-legend name="key" position="top" />
            <v-line position="x*value" :size='borderWidth' color="key" />
        </v-chart>
        <div style='margin-right: -20px'>
            <v-plugin>
                <v-slider
                    :padding='[0, padding[1] + 20, 0, padding[3]]'
                    container='viser-slider-1'
                    width="auto"
                    :height='26'
                    xAxis="x"
                    yAxis="y1"
                    :scales='{ x: cols[0] }'
                    :data='offlineChartData'
                    :start='ds.state.start'
                    :end='ds.state.end'
                    :background-chart='{ type: "line" }'
                    :on-change='onChange'
                />
            </v-plugin>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
const DataSet = require('@antv/data-set')
// 模拟数据
const titleMap = {y1: '客流量', y2: '支付笔数'}
const offlineChartData = []
for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
        // x: moment(new Date().getTime() + 1000 * 60 * 30 * i).format('YYYY-MM-DD HH:mm:ss'),
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10
    })
}
offlineChartData.sort((a, b) => a.x - b.x)
let max = 0
if (offlineChartData[0] && offlineChartData[0].y1 && offlineChartData[0].y2) {
    max = Math.max(
        [...offlineChartData].sort((a, b) => b.y1 - a.y1)[0].y1,
        [...offlineChartData].sort((a, b) => b.y2 - a.y2)[0].y2,
    )
}
const ds = new DataSet({
    state: {
        start: offlineChartData[0].x,
        end: offlineChartData[offlineChartData.length - 1].x,
    },
})
const dv = ds.createView()
dv.source(offlineChartData)
    .transform({
        type: 'filter',
        callback: (obj) => {
            const date = obj.x;
            return date <= ds.state.end && date >= ds.state.start;
        }
    })
    .transform({
        type: 'map',
        callback(row) {
            const newRow = { ...row }
            newRow[titleMap.y1] = row.y1
            newRow[titleMap.y2] = row.y2
            return newRow
        }
    })
    .transform({
        type: 'fold',
        fields: [titleMap.y1, titleMap.y2], // 展开字段集
        key: 'key', // key字段
        value: 'value' // value字段
    })
// 图表参数
const cols = [
    {
        dataKey: 'x',
        type: 'time',
        tickInterval: 60 * 60 * 1000,
        mask: 'HH:mm',
        range: [0, 1]
    }, {
        dataKey: 'value',
        max,
        min: 0
    }
]
export default {
    name: 'TimeLine',
    data() {
        return {
            dv, ds,
            height: 400,
            padding: [60, 20, 40, 40],
            borderWidth: 2,
            cols,
            titleMap,
            offlineChartData
        }
    },
    methods: {
        onChange(opts) {
            ds.setState('start', opts.startValue)
            ds.setState('end', opts.endValue)
        }
    }
}
</script>
<style scoped lang="scss">
.antv-chart-mini {
    position: relative;
    width: 100%;
    .chart-wrapper {
        position: absolute;
        bottom: -28px;
        width: 100%;
    }
}
</style>
