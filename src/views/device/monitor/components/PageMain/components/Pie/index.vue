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
                <!-- <v-tooltip :showTitle="false" /> -->
                <v-coord type="theta" :radius="1" :innerRadius="0.74" />
                <v-pie
                    position="percent"
                    :color='["x", formatColor]'
                    :vStyle="{stroke: '#fff', lineWidth}"
                    :tooltip='tooltipFormat'
                />
            </v-chart>
            <div class="total">
                <div class="pie-stat">{{ total }}</div>
            </div>
        </div>
    </div>
</template>
<script>
const DataSet = require('@antv/data-set')
export default {
    mounted() {
        this.initData()
    },
    props: {
        total: { default: '0' },
        height: { default: 128 },
        percent: { default: 0 },
        animate: { default: true },
        lineWidth: { default: 1 },
        color: { require: false }
    },  
    data() {
        return {
            dv: [],
            scale: {
                x: {
                    type: 'cat',
                    range: [0, 1],
                },
                y: {
                    min: 0,
                },
            },
            forceFit: true,
            padding: [12, 0, 12, 0],
            legendData: [],
            tooltipFormat: ['x*percent', (x, p) => ({
                    name: x,
                    value: `${(p * 100).toFixed(2)}%`,
                })
            ]
        }
    },
    methods: {
        initData() {
            let data = [
                {
                    x: '占比',
                    y: parseFloat(`${this.percent}`),
                },
                {
                    x: '反比',
                    y: 100 - parseFloat(`${this.percent}`),
                }
            ]
            const dv = new DataSet.View()
            dv.source(data).transform({
                type: 'percent',
                field: 'y',
                dimension: 'x',
                as: 'percent',
            })
            this.dv = dv.rows
        },
        formatColor(value) {
            if (value === '占比') {
                return this.color || 'rgba(24, 144, 255, 0.85)'
            }
            return '#F0F2F5'
        }
    }
}
</script>
<style scoped lang="scss">
.pie {
    position: relative;
    .chart {
        position: relative;
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
        top: 46%;
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
