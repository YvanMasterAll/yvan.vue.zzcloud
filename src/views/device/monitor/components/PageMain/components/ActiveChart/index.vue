<template>
    <div class='activeChart'>
        <div style='margin-top: 32px;'>
            <mini-area :data='activeData' :height='84' :line='true' color='rgba(24, 144, 255, 0.2)' />
        </div>
        <div>
            <div class='activeChartGrid'>
                <p>{{[...activeData].sort()[activeData.length - 1].y + 200}} 亿元</p>
                <p>{{[...activeData].sort()[Math.floor(activeData.length / 2)].y}} 亿元</p>
            </div>
            <div class='dashedLine'>
                <div class='line' />
            </div>
            <div class='dashedLine'>
                <div class='line' />
            </div>
        </div>
        <div class='activeChartLegend'>
            <span>00:00</span>
            <span>{{activeData[Math.floor(activeData.length / 2)].x}}</span>
            <span>{{activeData[activeData.length - 1].x}}</span>
        </div>
    </div>
</template>
<script>
function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

function getActiveData() {
    const activeData = []
    for (let i = 0; i < 24; i += 1) {
        activeData.push({
            x: `${fixedZero(i)}:00`,
            y: Math.floor(Math.random() * 200) + i * 50
        })
    }
    return activeData
}
export default {
    components: {
        MiniArea: () => import('../MiniArea')
    },
    data() {
        return {
            activeData: getActiveData(),
            timer: null
        }
    },
    mounted() {
        this.loopData()
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
    methods: {
        loopData() {
            this.timer = setTimeout(() => {
                this.activeData = getActiveData()
                this.loopData()
            }, 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
.activeChartGrid {
    p {
        font-size: 14px;
        position: absolute;
        top: 60px;
    }
    p:last-child {
        font-size: 14px;
        top: 95px;
    }
}
.activeChartLegend {
    position: relative;
    height: 20px;
    margin-top: 8px;
    font-size: 0;
    line-height: 20px;
    span {
        display: inline-block;
        width: 33.33%;
        font-size: 12px;
        text-align: center;
    }
    span:first-child {
        text-align: left;
    }
    span:last-child {
        text-align: right;
    }
}
.dashedLine {
    position: relative;
    top: -70px;
    left: -3px;
    height: 1px;
    .line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, transparent 50%, #e9e9e9 50%);
        background-size: 6px;
    }
}
.dashedLine:last-child {
    top: -36px;
}
</style>