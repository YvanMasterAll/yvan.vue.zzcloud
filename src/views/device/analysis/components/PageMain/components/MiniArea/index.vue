<template>
    <div class="antv-chart-mini">
        <div class="chart-wrapper" :style="{ height }">
            <v-chart
                :force-fit="true"
                :height="height + 54"
                :data="data"
                :padding="[36, 5, 24, 5]"
            >
                <v-tooltip />
                <v-smooth-area position="x*y" :color='color' :opacity='1' :v-style="style" />
                <v-smooth-line v-if="line" position='x*y' color='#1089ff' :size='2' />
            </v-chart>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
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
        max: 22
    }
]

export default {
    name: 'MiniArea',
    props: {
        data: {
            type: Array,
            default: []
        },
        line: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 46
        },
        color: {
            default: '#975FE4'
        }
    },
    data() {
        return {
            tooltip,
            scale,
            style: {
                text: {
                    textAlign: 'left',
                    fontSize: 12
                },
                point: {
                    stroke: '#FF4D4F'
                },
                line: {
                    stoke: '#FF4D4F',
                    fill: '#FF4D4F'
                }
            }
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
        > div {
            margin: 0 -5px;
            overflow: hidden;
        }
    }
}
</style>
