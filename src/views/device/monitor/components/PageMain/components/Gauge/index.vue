<template>
    <div>
        <v-chart :height='height' :data='data' :scale='cols' :padding='[-16, 0, 16, 0]' :forceFit='forceFit'>
            <v-coord type="polar" :startAngle="-225" :endAngle="45" :radius='0.8' />
            <v-axis dataKey="1" />
            <v-axis dataKey="value" :zIndex='2' :label='{offset: -12, formatter, textStyle}' />
            <v-series :line='false' gemo="point" position="value*1" shape="pointer" :color="color" :active="false" />
            <v-guide type='line' :start='[3, 0.905]' :end='[3, 0.85]' :lineStyle='{stroke: color, lineDash: undefined, lineWidth: 2}' />
            <v-guide type='line' :start='[5, 0.905]' :end='[5, 0.85]' :lineStyle='{stroke: color, lineDash: undefined, lineWidth: 3}' />
            <v-guide type='line' :start='[7, 0.905]' :end='[7, 0.85]' :lineStyle='{stroke: color, lineDash: undefined, lineWidth: 3}' />
            <v-guide type='arc' :start='[0, 0.965]' :end='[10, 0.965]' :vStyle='{stroke: bgColor, lineWidth: 10}' />
            <v-guide type='arc' :start='[0, 0.965]' :end='[data[0].value, 0.965]' :vStyle='{stroke: color, lineWidth: 10}' />
            <v-guide type='html' :position="['50%', '95%']" :html='renderHtml()' />
        </v-chart>
    </div>
</template>
<script>
import { registerShape } from 'viser'
// 注册图形
registerShape('point', 'pointer', {
    drawShape(cfg, group) {
        let point = cfg.points[0];
        point = this.parsePoint(point);
        const center = this.parsePoint({
            x: 0,
            y: 0,
        })
        group.addShape('line', {
            attrs: {
                x1: center.x,
                y1: center.y,
                x2: point.x,
                y2: point.y,
                stroke: cfg.color,
                lineWidth: 2,
                lineCap: 'round',
            }
        })
        return group.addShape('circle', {
            attrs: {
                x: center.x,
                y: center.y,
                r: 6,
                stroke: cfg.color,
                lineWidth: 3,
                fill: '#fff',
            },
        })
    }
})
const defaultFormatter = val => {
    switch (val) {
        case '2':
            return '差'
        case '4':
            return '中'
        case '6':
            return '良'
        case '8':
            return '优'
        default:
            return ''
    }
}
export default {
    props: {
        title: { required: true },
        height: { default: 1 },
        percent: { required: true },
        forceFit: { default: true },
        color: { default: '#2F9CFF' },
        bgColor: { default: '#F0F2F5' }
    },
    mounted() {
        console.log(this.color)
    },
    data() {
        return {
            data: [{ value: this.percent / 10 }],
            cols: {
                value: {
                    type: 'linear',
                    min: 0,
                    max: 10,
                    tickCount: 6,
                    nice: true,
                }
            },
            textStyle: {
                fontSize: 12,
                fill: 'rgba(0, 0, 0, 0.65)',
                textAlign: 'center'
            },
            formatter: defaultFormatter
        }
    },
    methods: {
        renderHtml() {
            return `
            <div style="width: 300px;text-align: center;font-size: 12px!important;">
                <div style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;margin-bottom: 4px;">${this.title}</div>
                <div style="font-size: 24px;color: rgba(0,0,0,0.85);margin: 0;">
                    ${(this.data[0].value * 10).toFixed(2)}%
                </div>
            </div>`
        },
    }
}
</script>