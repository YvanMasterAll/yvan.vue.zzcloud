<template>
    <div>
        <v-chart :forceFit="true" :animate="true" height="260" :data="radarData" :padding="[35, 30, 16, 30]" :scale="scale" ref='chart'>
            <v-tooltip></v-tooltip>
            <v-coord type="polar" />
            <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
            <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
            <v-line position="label*value" :color='color' :size="1" />
            <v-point position="label*value" :color="color" :size="3" shape="circle" />
        </v-chart>
        <el-row class='legend'>
            <el-col v-for="(item, index) in legendData" :span='24 / legendData.length' :key='index'>
                <div class='legend-item' @click='handleLegendClick(item, index)'>
                    <p>
                        <span class='dot' :style="{backgroundColor: !item.checked ? '#aaa':item.color}"/>
                        <span>{{item.name}}</span>
                    </p>
                    <h6>{{item.value}}</h6>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
const axis1Opts = {
    dataKey: 'label',
    line: {
        stroke: 'rgba(0,0,0,.3)',
        lineWidth: 1
    },
    tickLine: {
        stroke: 'rgba(0,0,0,.3)',
        lineWidth: 1
    },
    grid: {
        lineStyle: {
            lineDash: null
        },
        hideFirstLine: false
    }
}
const axis2Opts = {
    dataKey: 'value',
    line: null,
    tickLine: null,
    grid: {
        type: 'polygon',
        lineStyle: {
            lineDash: [5, 5]
        }
    }
}
const scale = [
    {
        dataKey: 'value',
        min: 0,
        max: 10,
        tickCount: 5
    },
    {
        dataKey: 'name',
        alias: '类型'
    }
]
const colors = [
    '#1890FF',
    '#FACC14',
    '#2FC25B',
    '#8543E0',
    '#F04864',
    '#13C2C2',
    '#fa8c16',
    '#a0d911',
]
export default {
    name: 'Radar',
    props: {
        data: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            axis1Opts,
            axis2Opts,
            scale,
            color: ['name', colors],
            legendData: [],
            radarData: null
        }
    },
    watch: {
        data: {
            handler(val) {
                // 获取legendData
                // console.log(this.$refs.chart)
                let data = []
                let colors = {
                    '个人': '#1890FF',
                    '团队': '#FACC14',
                    '部门': '#2FC25B'
                }
                val.forEach(v => {
                    let p = data.filter(d => d.name === v.name)
                    if (p.length > 0) {
                        let node = p[0]
                        node.value = node.value + v.value
                    } else {
                        data.push({
                            name: v.name, color: colors[v.name], checked: true, value: v.value
                        })
                    }
                })
                this.legendData = data
                this.radarData = val
            }
        }
    },
    methods: {
        handleLegendClick(item, index) {
            let name = item.name
            let checked = !this.legendData.filter(d => d.name === name)[0].checked
            this.legendData.map(d => {
                if (d.name === name) {
                    d.checked = checked
                }
            })
            let names = this.legendData.filter(d => d.checked).map(d => d.name)
            this.radarData = this.data.filter(d => {
                if (names.indexOf(d.name) !== -1) {
                    return true
                }
                return false
            })
        }
    }
}
</script>
<style scoped lang="scss">
.legend {
    font-weight: 300;
    margin-top: 16px;
    .legend-item {
        position: relative;
        color: $color-text-sub;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
        p {
            margin: 0;
        }
        h6 {
            margin-top: 4px;
            margin-bottom: 0;
            padding-left: 16px;
            color: $color-text-main;
            font-size: 24px;
            line-height: 32px;
            font-weight: 400;
        }
        &::after {
            position: absolute;
            top: 8px;
            right: 0;
            width: 1px;
            height: 40px;
            background-color: $color-border-3;
            content: '';
        }
    }
    > :last-child .legend-item::after {
        display: none;
    }
    .dot {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 6px;
        border-radius: 6px;
    }
}
</style>
