<template>
    <div class="waterWave" ref="root" :style="{ transform: `scale(${radio})` }">
        <div
            :style="{
                width: `${height}px`,
                height: `${height}px`,
                overflow: 'hidden'
            }"
        >
            <canvas
                class="waterWaveCanvasWrapper"
                ref="node"
                :width="height * 2"
                :height="height * 2"
            />
        </div>
        <div class="text" :style="{ width: height }">
            <span>{{ title }}</span>
            <h4>{{ percent }}%</h4>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: { required: true },
        color: { default: '#1890FF' },
        height: { default: 1 },
        percent: { default: 0 }
    },
    data() {
        return {
            radio: null
        }
    },
    mounted() {
        this.renderChart()
        this.resize()
        window.addEventListener('resize', this.resize, { passive: true })
    },
    beforeDestroy() {
        this.$refs.node.innerHTML = ''
        window.removeEventListener('resize', this.resize)
    },
    methods: {
        resize() {
            let height = this.height
            let offsetWidth = this.$refs.root.parentNode.offsetWidth
            this.radio = offsetWidth < height ? offsetWidth / height : 1
        },
        renderChart(type) {
            const percent = this.percent
            const color = this.color
            const data = percent / 100
            const self = this

            if (data !== 0 && !data) {
                return
            }

            const canvas = this.$refs.node
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                return
            }
            const canvasWidth = canvas.width
            const canvasHeight = canvas.height
            const radius = canvasWidth / 2
            const lineWidth = 2
            const cR = radius - lineWidth

            ctx.beginPath()
            ctx.lineWidth = lineWidth * 2

            const axisLength = canvasWidth - lineWidth
            const unit = axisLength / 8
            const range = 0.2 // 振幅
            let currRange = range
            const xOffset = lineWidth
            let sp = 0 // 周期偏移量
            let currData = 0
            const waveupsp = 0.005 // 水波上涨速度

            let arcStack = []
            const bR = radius - lineWidth
            const circleOffset = -(Math.PI / 2)
            let circleLock = true

            for (
                let i = circleOffset;
                i < circleOffset + 2 * Math.PI;
                i += 1 / (8 * Math.PI)
            ) {
                arcStack.push([
                    radius + bR * Math.cos(i),
                    radius + bR * Math.sin(i)
                ])
            }

            const cStartPoint = arcStack.shift()
            ctx.strokeStyle = color
            ctx.moveTo(cStartPoint[0], cStartPoint[1])

            function drawSin() {
                if (!ctx) {
                    return
                }
                ctx.beginPath()
                ctx.save()

                const sinStack = []
                for (
                    let i = xOffset;
                    i <= xOffset + axisLength;
                    i += 20 / axisLength
                ) {
                    const x = sp + (xOffset + i) / unit
                    const y = Math.sin(x) * currRange
                    const dx = i
                    const dy =
                        2 * cR * (1 - currData) + (radius - cR) - unit * y

                    ctx.lineTo(dx, dy)
                    sinStack.push([dx, dy])
                }

                const startPoint = sinStack.shift()

                ctx.lineTo(xOffset + axisLength, canvasHeight)
                ctx.lineTo(xOffset, canvasHeight)
                ctx.lineTo(startPoint[0], startPoint[1])

                const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
                gradient.addColorStop(0, '#ffffff')
                gradient.addColorStop(1, color)
                ctx.fillStyle = gradient
                ctx.fill()
                ctx.restore()
            }
            function render() {
                if (!ctx) {
                    return
                }
                ctx.clearRect(0, 0, canvasWidth, canvasHeight)
                if (circleLock && type !== 'update') {
                    if (arcStack.length) {
                        const temp = arcStack.shift()
                        ctx.lineTo(temp[0], temp[1])
                        ctx.stroke()
                    } else {
                        circleLock = false
                        ctx.lineTo(cStartPoint[0], cStartPoint[1])
                        ctx.stroke()
                        arcStack = []

                        ctx.globalCompositeOperation = 'destination-over'
                        ctx.beginPath()
                        ctx.lineWidth = lineWidth
                        ctx.arc(radius, radius, bR, 0, 2 * Math.PI, true)

                        ctx.beginPath()
                        ctx.save()
                        ctx.arc(
                            radius,
                            radius,
                            radius - 3 * lineWidth,
                            0,
                            2 * Math.PI,
                            true
                        )

                        ctx.restore()
                        ctx.clip()
                        ctx.fillStyle = color
                    }
                } else {
                    if (data >= 0.85) {
                        if (currRange > range / 4) {
                            const t = range * 0.01
                            currRange -= t
                        }
                    } else if (data <= 0.1) {
                        if (currRange < range * 1.5) {
                            const t = range * 0.01
                            currRange += t
                        }
                    } else {
                        if (currRange <= range) {
                            const t = range * 0.01
                            currRange += t
                        }
                        if (currRange >= range) {
                            const t = range * 0.01
                            currRange -= t
                        }
                    }
                    if (data - currData > 0) {
                        currData += waveupsp
                    }
                    if (data - currData < 0) {
                        currData -= waveupsp
                    }

                    sp += 0.07
                    drawSin()
                }
                self.timer = requestAnimationFrame(render)
            }
            render()
        }
    }
}
</script>
<style lang="scss" scoped>
.waterWave {
    position: relative;
    display: inline-block;
    transform-origin: left;
    .text {
        position: absolute;
        top: 32px;
        left: 0;
        width: 100%;
        text-align: center;
        span {
            color: $color-text-sub;
            font-size: 14px;
            line-height: 22px;
        }
        h4 {
            color: $color-text-main;
            font-size: 24px;
            line-height: 32px;
        }
    }
    .waterWaveCanvasWrapper {
        transform: scale(0.5);
        transform-origin: 0 0;
    }
}
</style>
