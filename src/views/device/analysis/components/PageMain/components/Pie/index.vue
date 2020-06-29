<template>
    <div class="pie">
        <div class="chart">
            <v-chart
                :scale="scale"
                :height="height"
                :forceFit="forceFit"
                :data="dv"
                :padding="padding"
                :animate="animate"
            >
                <v-tooltip :showTitle="false" />
                <v-axis />
                <v-coord type="theta" :radius="1" :innerRadius="0.74" />
                <v-pie
                    position="percent"
                    color='x'
                    :vStyle="pieStyle"
                    :tooltip='tooltipFormat'
                    type="intervalStack"
                />
            </v-chart>
            <div class="total">
                <h4 class="pie-sub-title">{{ subTitle }}</h4>
                <div class="pie-stat">{{ total }}</div>
            </div>
        </div>
        <ul class="legend">
            <li
                v-for="(item, i) in legendData"
                :key="item.x"
                @click="handleLegendClick(item, i)"
            >
                <span
                    class="dot"
                    :style="{
                        backgroundColor: !item.checked ? '#aaa' : item.color
                    }"
                />
                <span class="legendTitle">{{ item.x }}</span>
                <div class="divider" />
                <span class="percent">
                    {{ (item.percent*100).toFixed(2) }}%
                </span>
                <span class="value">¥ {{ item.y }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
const DataSet = require('@antv/data-set')
const origin_salesData = [
    {
        x: '家用电器',
        y: 4544
    },
    {
        x: '食用酒水',
        y: 3321
    },
    {
        x: '个护健康',
        y: 3113
    },
    {
        x: '服饰箱包',
        y: 2341
    },
    {
        x: '母婴产品',
        y: 1231
    },
    {
        x: '其他',
        y: 1231
    }
]
const dv = new DataSet.View().source(origin_salesData)
dv.transform({
    type: 'percent',
    field: 'y',
    dimension: 'x',
    as: 'percent'
})
let salesData = dv.rows
export default {
    mounted() {
        this.getLegendData()
    },
    data() {
        return {
            scale: {
                x: {
                    type: 'cat',
                    range: [0, 1],
                },
                y: {
                    min: 0,
                },
            },
            height: 248,
            forceFit: true,
            dv: salesData,
            padding: [12, 0, 12, 0],
            animate: true,
            subTitle: '销售额',
            total: '¥ 15,781',
            pieStyle: {
                stroke: '#fff',
                lineWidth: 1
            },
            legendData: [],
            tooltipFormat: ['x*percent', (x, p) => ({
                    name: x,
                    value: `${(p * 100).toFixed(2)}%`,
                })
            ]
        }
    },
    methods: {
        handleLegendClick(item, index) {
            this.legendData[index].checked = !this.legendData[index].checked
            this.dv = this.legendData.filter(d => d.checked)
        },
        getLegendData() {
            let colors = [
                '#62B1FF',
                '#3ECBCB',
                '#50CB74',
                '#FBD444',
                '#F2637B',
                '#9860E5'
            ]
            let data = []
            this.dv.forEach((d, i) => {
                data.push({
                    ...d,
                    color: colors[i],
                    checked: true
                })
            })
            this.legendData = data
        }
    }
}
</script>
<style scoped lang="scss">
.pie {
    position: relative;
    .chart {
        position: relative;
        width: calc(100% - 240px);
    }
    .legend {
        position: absolute;
        top: 50%;
        right: 0;
        min-width: 200px;
        margin: 0 20px;
        padding: 0;
        list-style: none;
        transform: translateY(-50%);
        li {
            height: 22px;
            margin-bottom: 16px;
            line-height: 22px;
            cursor: pointer;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .dot {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 8px;
        border-radius: 8px;
    }
    .divider {
        position: relative;
        top: -.06em;
        display: inline-block;
        width: 1px;
        height: .9em;
        margin: 0 8px;
        vertical-align: middle;
        box-sizing: border-box;
        padding: 0;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: "tnum";
        background: #e8e8e8;
    }
    .legendTitle {
        color: $color-text-normal;
    }
    .percent {
        color: $color-text-sub;
    }
    .value {
        position: absolute;
        right: 0;
        color: $color-text-normal;
        font-weight: 300;
    }
    .title {
        margin-bottom: 8px;
    }
    .total {
        position: absolute;
        top: 44%;
        left: 50%;
        max-height: 62px;
        text-align: center;
        transform: translate(-50%, -50%);
        & > h4 {
            height: 22px;
            margin-bottom: 8px;
            color: $color-text-sub;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
        }
        & > .pie-stat {
            display: block;
            height: 32px;
            color: $color-text-normal;
            font-size: 24px;
            line-height: 32px;
            white-space: nowrap;
        }
    }
}
.legendBlock {
    .chart {
        width: 100%;
        margin: 0 0 32px 0;
    }
    .legend {
        position: relative;
        transform: none;
    }
}
</style>
