<template>
    <div
        class='tagCloud'
        :style='{ width: "100%", height }'
        ref='root'
    >
        <v-chart
            :width='width'
            :height='height'
            :data='dv'
            :padding='0'
            :scale='{ x: { nice: false }, y: { nice: false } }'
        >
            <v-tooltip :showTitle='false' />
            <v-coord reflect="y" />
            <v-point
                position="x*y"
                color="text"
                shape="cloud"
                :tooltip="[
                    'text*value',
                    function trans(text, value) {
                        return { name: text, value }
                    }
                ]"
            />
        </v-chart>
    </div>
</template>
<script>
import { registerShape } from 'viser'
const DataSet = require('@antv/data-set')
const imgUrl = 'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png'
export default {
    props: {
        data: { required: true },
        height: { default: 0 }
    },
    data() {
        return {
            dv: null,
            isUnmount: false,
            imageMask: undefined,
            width: 0
        }
    },
    beforeDestroy() {
        this.isUnmount = true
        window.removeEventListener('resize', this.resize)
    },
    watch: {
        data: {
            handler(val) {
                this.initTagCloud()
                this.renderChart()
                window.addEventListener('resize', this.resize, { passive: true })
            }
        }
    },
    methods: {
        resize() {
            this.renderChart()
        },
        initTagCloud() {
            function getTextAttrs(cfg) {
                return {
                    ...cfg.style,
                    fillOpacity: cfg.opacity,
                    fontSize: cfg.origin._origin.size,
                    rotate: cfg.origin._origin.rotate,
                    text: cfg.origin._origin.text,
                    textAlign: 'center',
                    fontFamily: cfg.origin._origin.font,
                    fill: cfg.color,
                    textBaseline: 'Alphabetic',
                }
            }
            registerShape('point', 'cloud', {
                drawShape(cfg, container) {
                    const attrs = getTextAttrs(cfg);
                    return container.addShape('text', {
                        attrs: {
                            ...attrs,
                            x: cfg.x,
                            y: cfg.y,
                        }}
                    )
                }
            })
        },
        renderChart() {
            // const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];
            const h = this.height
            const w = this.$refs.root.offsetWidth
            const onload = () => {
                const dv = new DataSet.View().source(this.data)
                const range = dv.range('value')
                const [min, max] = range
                dv.transform({
                    type: 'tag-cloud',
                    fields: ['name', 'value'],
                    imageMask: this.imageMask,
                    font: 'Verdana',
                    size: [w, h], // 宽高设置最好根据 imageMask 做调整
                    padding: 0,
                    timeInterval: 5000, // max execute time
                    rotate() {
                        return 0
                    },
                    fontSize(d) {
                        const size = ((d.value - min) / (max - min)) ** 2
                        return size * (17.5 - 5) + 5
                    }
                })

                if (this.isUnmount) {
                    return;
                }

                this.dv = dv
                this.width = w
                this.height = h
            }

            if (!this.imageMask) {
                this.imageMask = new Image()
                this.imageMask.crossOrigin = ''
                this.imageMask.src = imgUrl

                this.imageMask.onload = onload
            } else {
                onload()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tagCloud {
    overflow: hidden;
    canvas {
        transform-origin: 0 0;
    }
}
</style>