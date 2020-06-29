<template>
    <div class="antv-chart-mini">
        <div class="chart-wrapper" :style="{ height: 46 }">
            <v-chart
                :force-fit="true"
                :height="height"
                :data="data"
                :padding="[36, 5, 24, 5]"
            >
                <v-tooltip />
                <v-bar position="x*y" />
            </v-chart>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
// 模拟数据
const data = []
const beginDay = new Date().getTime()

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
for (let i = 0; i < fakeY.length; i += 1) {
    data.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
            'YYYY-MM-DD'
        ),
        y: fakeY[i]
    })
}
// 图表参数
const tooltip = [
    'x*y',
    (x, y) => ({
        name: x,
        value: y
    })
]

const scale = [
    {
        dataKey: 'x',
        min: 2
    },
    {
        dataKey: 'y',
        title: '时间',
        min: 1,
        max: 30
    }
]

export default {
    name: 'MiniBar',
    data() {
        return {
            data,
            tooltip,
            scale,
            height: 100
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