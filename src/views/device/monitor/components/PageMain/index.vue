<template>
    <div class="container">
        <el-row  :gutter='20'>
            <el-col :span='18'>
                <el-card shadow="never" class="d2-card activity">
                    <template slot='header'>
                        活动实时交易情况
                    </template>
                    <div class="content">
                        <el-row class="numbers">
                            <el-col :span='6' class='item'>
                                <div class="name">今日交易总额</div>
                                <div class="value">124,543,233<span class='dollar'>元</span></div>
                            </el-col>
                            <el-col :span='6' class='item'>
                                <div class="name">销售目标完成率</div>
                                <div class="value">92%</div>
                            </el-col>
                            <el-col :span='6' class='item'>
                                <div class="name">活动剩余时间</div>
                                <div class="value" ref='time'>47:39:21:085</div>
                            </el-col>
                            <el-col :span='6' class='item'>
                                <div class="name">每秒交易总额</div>
                                <div class="value">234<span class='dollar'>元</span></div>
                            </el-col>
                        </el-row>
                        <div class="chart">
                            <l7-map />
                        </div>
                    </div>  
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="never" class="d2-card condition">
                    <template slot='header'>
                        活动情况预测
                    </template>
                    <div class="content">
                        <div class="header">
                            <div class="title">目标评估</div>
                            <div class="caption">有望达到预期</div>
                        </div>
                        <div class="chart">
                            <active-chart />
                        </div>
                    </div>
                </el-card>
                <el-card shadow="never" class="d2-card ratio">
                    <template slot='header'>
                        券核效率
                    </template>
                    <div class="content">
                        <div class="chart">
                            <gauge title='跳出率' :height='180' :percent='87' />
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span='12'>
                <el-card shadow="never" class="d2-card category">
                    <template slot='header'>
                        各品类占比
                    </template>
                    <el-row class='content'>
                        <el-col :span='8'>
                            <pie :animate='false' :percent='28' total='28%' :height='128' :lineWidth='2' />
                        </el-col>
                        <el-col :span='8'>
                            <pie :animate='false' color="#5DDECF" :percent='22' total='22%' :height='128' :lineWidth='2' />
                        </el-col>
                        <el-col :span='8'>
                            <pie :animate='false' color="#2FC25B" :percent='32' total='32%' :height='128' :lineWidth='2' />
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="never" class="d2-card hotsearch">
                    <template slot='header'>
                        热门搜索
                    </template>
                    <div class="content">
                        <tag-cloud :data='tags' :height='161' />
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="never" class="d2-card source">
                    <template slot='header'>
                        资源剩余
                    </template>
                    <div class="content">
                        <water-wave :height='161' title='补贴资金剩余' :percent='34' />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>    
</template>
<script>
import axios from 'axios'
export default {
    components: {
        L7Map: () => import('./components/Map'),
        ActiveChart: () => import('./components/ActiveChart'),
        Gauge: () => import('./components/Gauge'),
        Pie: () => import('./components/Pie'),
        TagCloud: () => import('./components/TagCloud'),
        WaterWave: () => import('./components/WaterWave'),
    },
    mounted() {
        this.fetchData()
    },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        async fetchData() {
            let result = await axios.get('/api/device/chart/mock')
            this.tags = result.data.data.cloudTags.list
        }
    }
}
</script>
<style lang="scss" scoped>
.activity {
    .content {
        font-weight: 300;
        .numbers {
            margin-bottom: 10px;
            .item {
                .name {
                    color: $color-text-sub;
                    font-size: 14px;
                }
                .value {
                    margin-top: 10px;
                    font-size: 24px;
                    color: $color-text-main;
                    letter-spacing: 1px;
                    .dollar {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
.condition {
    .content {
        font-weight: 300;
        position: relative;
        .header {
            .title {
                color: $color-text-sub;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .caption {
                font-size: 24px;
                color: $color-text-main;
                letter-spacing: 1px;
            }
        }
    }
}
.ratio {
    margin-top: 20px;
    height: 293px;
}
.category {
    margin-top: 20px;
    height: 260px;
    .content {
        padding: 20px 0 10px 0;
    }
}
.hotsearch {
    height: 260px;
    margin-top: 20px;
}
.source {
    height: 260px;
    margin-top: 20px;
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
