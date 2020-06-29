<template>
    <div class='container'>
        <div class="content">
            <div class="arrow-wrapper" @click='paging(true)'>
                <div class='arrow-css left'></div>
            </div>
            <div class="list-wrapper" ref='listWrapper'>
                <div class="list" ref="list" :style='{left: `${list_position}px`, width: "2400px"}'>
                    <div v-for='(item, index) in offlineData' :key='index' class="item">
                        <div class="title">
                            {{item.name}}
                        </div>
                        <el-row class="content">
                            <el-col :span='12' class='header'>
                                <div class="name">转化率</div>
                                <div class="value">{{item.data[0].y}}%</div>
                            </el-col>
                            <el-col :span='12'>
                                <div class="chart">
                                    <v-chart
                                        :scale="scale"
                                        :height="height"
                                        :data='item.data'
                                        :forceFit="forceFit"
                                        :padding="padding"
                                        :animate="animate"
                                    >
                                        <v-coord type="theta" :radius="1" :innerRadius="0.55" />
                                        <v-pie
                                            position="percent"
                                            :color='["x", formatColor]'
                                        />
                                    </v-chart>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="arrow-wrapper" @click='paging(false)'>
                <div class='arrow-css right'></div>
            </div>
        </div>
    </div>
</template>
<script>
const DataSet = require('@antv/data-set')
// 模拟数据
const offlineData = []
for (let i = 0; i < 10; i += 1) {
    let percent = Math.ceil(Math.random() * 9) / 10 * 100
    let origin_data = [{x: '占比', y: parseFloat(`${percent}`)}, {x: '反比', y: 100 - parseFloat(`${percent}`)}]
    const dv = new DataSet.View().source(origin_data)
    dv.transform({ type: 'percent', field: 'y', dimension: 'x', as: 'percent' })
    offlineData.push({name: `Stores ${i}`, data: dv.rows})
}
export default {
    data() {
        return {
            list_position: 0,
            percent: 10,
            scale: {
                x: {
                    type: 'cat',
                    range: [0, 1],
                },
                y: {
                    min: 0,
                },
            },
            height: 64,
            forceFit: true,
            padding: [12, 0, 12, 0],
            animate: false,
            offlineData
        }
    },
    methods: {
        paging(isLeft) {
            let item_width = 190
            let list_width = this.$refs.list.style.width.replace('px', '')
            let list_position = -this.list_position
            let view_width = this.$refs.listWrapper.offsetWidth
            if (!isLeft && list_position + view_width >= list_width || isLeft && list_position - view_width < 0) {
                return
            }
            let item_size = Math.ceil(view_width/item_width)
            if (isLeft) {
                this.list_position = -(list_position - item_size*item_width)
            } else {
                this.list_position = -(list_position + item_size*item_width)
            }
        },
        formatColor(value) {
            if (value === '占比') {
                return 'rgba(24, 144, 255, 0.85)'
            }
            return '#F0F2F5'
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    height: 120px;
    .content {
        overflow: hidden;
        display: flex;
        .arrow-wrapper {
            width: 40px;
            cursor: pointer;
            color: $color-border-1;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            .arrow-css {
                transform: rotate(45deg);
                border-style: solid;
                &.left {
                    border-width: 10px 10px 2px 2px;
                    border-color: transparent transparent $color-text-sub $color-text-sub;
                }
                &.right {
                    border-width: 2px 2px 10px 10px;
                    border-color: $color-text-sub $color-text-sub transparent transparent;
                }
            }
        }
        .list-wrapper {
            flex: 1;
            overflow: hidden;
            .list {
                overflow: auto;
                position: relative;
                transition: all 0.5s ease-out;
                .item {
                    display: inline-block;
                    padding: 10px 60px 10px 10px;
                    width: 190px;
                    height: 120px;
                    box-sizing: border-box;
                    .title {
                        font-size: 16px;
                        color: $color-text-normal
                    }
                    .content {
                        margin-top: 20px;
                        .header {
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            align-items: flex-start;
                            .name {
                                color: $color-text-sub;
                                font-size: 14px;
                            }
                            .value {
                                font-size: 24px;
                                color: $color-text-main;
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>