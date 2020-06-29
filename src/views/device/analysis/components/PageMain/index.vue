<template>
    <div class="container">
        <div class="introduce">
            <el-row :gutter='20'>
                <el-col :span='6'>
                    <div class="card">
                        <div class="header">
                            <div class="title">
                                总销售额
                            </div>
                            <el-tooltip effect="dark" content="指标说明" placement="top">
                                <div class="action">
                                    <d2-icon name="info-circle" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="total">
                            ¥ 126,560
                        </div>
                        <div class="content">
                            <span class="up">周同比 12%<d2-icon name='caret-up'/></span>
                            <span class="down">日同比 11%<d2-icon name='caret-down'/></span>
                        </div>
                        <div class="footer">
                            日销售额 <span class="total">￥12,423</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span='6'>
                    <div class="card">
                        <div class="header">
                            <div class="title">
                                访问量
                            </div>
                            <el-tooltip effect="dark" content="指标说明" placement="top">
                                <div class="action">
                                    <d2-icon name="info-circle" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="total">
                            8,846
                        </div>
                        <div class="content">
                            <mini-area :data='visitData'/>
                        </div>
                        <div class="footer">
                            日访问量 <span class="total">1,234</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span='6'>
                    <div class="card">
                        <div class="header">
                            <div class="title">
                                支付笔数
                            </div>
                            <el-tooltip effect="dark" content="指标说明" placement="top">
                                <div class="action">
                                    <d2-icon name="info-circle" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="total">
                            6,560
                        </div>
                        <div class="content">
                            <mini-bar />
                        </div>
                        <div class="footer">
                            转化率 <span class="total">60%</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span='6'>
                    <div class="card">
                        <div class="header">
                            <div class="title">
                                运营活动效果
                            </div>
                            <el-tooltip effect="dark" content="指标说明" placement="top">
                                <div class="action">
                                    <d2-icon name="info-circle" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="total">
                            78%
                        </div>
                        <div class="content">
                            <mini-progress :percentage='78' :target='80' />
                        </div>
                        <div class="footer">
                            <span class="up">周同比 12%<d2-icon name='caret-up'/></span>
                            <span class="down">日同比 11%<d2-icon name='caret-down'/></span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="overview">
            <el-card shadow="never" class="d2-card card">
                <el-tabs v-model="activeTab">
                    <el-tab-pane label="销售量" name="sales">
                        <el-row>
                            <el-col :span='16'>
                                <bar :data="salesData" title="销售额排行" />
                            </el-col>
                            <el-col :span='8'>
                                <rank-list title="门店销售排行榜" :list="rankList"/>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="访问量" name="visits">
                        <el-row>
                            <el-col :span='16'>
                                <bar :data="salesData" title="销售额排行" />
                            </el-col>
                            <el-col :span='8'>
                                <rank-list title="门店销售排行榜" :list="rankList"/>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <div class="extra">
                    <div class="category">
                        <span class='item'>今日</span>
                        <span class='item selected'>本周</span>
                        <span class='item'>本月</span>
                        <span class='item'>本年</span>
                    </div>
                    <div class="time">
                        <el-date-picker
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size='small'>
                        </el-date-picker>
                    </div>
                </div>
            </el-card>
        </div>
        <el-row style='margin-top: 20px' :gutter='20'>
            <el-col :span='12' class="top-search">
                <el-card shadow="never" class="d2-card card">
                    <template slot='header'>
                        线上热门搜索
                        <div class="extra">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <d2-icon name='ellipsis-h'></d2-icon>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>操作一</el-dropdown-item>
                                    <el-dropdown-item>操作二</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                    <div class="content">
                        <el-row :gutter='68'>
                            <el-col :span='12'>
                                <div class="header">
                                    搜索用户数
                                    <d2-icon name="info-circle" />
                                </div>
                                <div class="total">
                                    <div class="number">12,321</div>
                                    <div class="index">
                                        <span class="up">17.1<d2-icon name='caret-up'/></span>
                                    </div>
                                </div>
                                <div class="chart">
                                    <mini-area :data='visitData2' :height='45' :line='true' color='rgba(24, 144, 255, 0.2)' />
                                </div>
                            </el-col>
                            <el-col :span='12'>
                                <div class="header">
                                    人均搜索次数
                                    <d2-icon name="info-circle" />
                                </div>
                                <div class="total">
                                    <div class="number">2.7</div>
                                    <div class="index">
                                        <span class="down">26.2<d2-icon name='caret-down'/></span>
                                    </div>
                                </div>
                                <div class="chart">
                                    <mini-area :data='visitData2' :height='45' :line='true' color='rgba(24, 144, 255, 0.2)' />
                                </div>
                            </el-col>
                        </el-row>
                        <div class="table-wrapper">
                            <div class="table-content">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%"
                                    size='medium'
                                    :default-sort = "{prop: 'date', order: 'descending'}"
                                    >
                                    <el-table-column prop="rank" label="排名" width='100'></el-table-column>

                                    <el-table-column prop="key" label="搜索关键词">
                                        <template slot-scope="scope">
                                            <span style='cursor: pointer; font-size: 14px; color: #409EFF; font-weight: 300;'>{{ scope.row.key }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="count" label="用户数" sortable></el-table-column>

                                    <el-table-column prop="rate" label="周涨幅" sortable>
                                        <template slot-scope="scope">
                                            <span style='font-size: 14px; font-weight: 300;'>{{ scope.row.rate }}%</span>
                                            <d2-icon v-if='scope.row.raise' name='caret-up'/>
                                            <d2-icon v-else name='caret-down'/>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="table-pagination">
                                <el-pagination
                                    background
                                    small
                                    layout="prev, pager, next"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="5"
                                    :total="50">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12' class="sales">
                <el-card shadow="never" class="d2-card card">
                    <template slot='header'>
                        销售额类别占比
                        <div class="extra">
                            <el-radio-group v-model="radio1" size='mini'>
                                <el-radio-button label="全部渠道"></el-radio-button>
                                <el-radio-button label="线上"></el-radio-button>
                                <el-radio-button label="门店"></el-radio-button>
                            </el-radio-group>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <d2-icon name='ellipsis-h'></d2-icon>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>操作一</el-dropdown-item>
                                    <el-dropdown-item>操作二</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                    <div class="content">
                        <div class="title">
                            销售额
                        </div>
                        <div class="chart">
                            <pie />
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="details">
            <el-card shadow="never" class="d2-card card">
                <div class="rate">
                    <custom-tab />
                </div>
                <div class="chart">
                    <time-line />
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
// 模拟数据
const visitData = []
const beginDay = new Date().getTime()
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
            'YYYY-MM-DD'
        ),
        y: fakeY[i]
    })
}
const visitData2 = []
const fakeY2 = [1, 6, 4, 8, 3, 7, 2]
for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
            'YYYY-MM-DD'
        ),
        y: fakeY2[i]
    })
}
const rankList = []
for (let i = 0; i < 7; i++) {
    rankList.push({
        name: '白鹭岛 ' + (i + 1) + ' 号店',
        total: 1234.56 - i * 100
    })
}
const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
    barData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
    barData2.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
}
const salesData = []
for (let i = 0; i < 12; i += 1) {
    salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
    })
}
export default {
    components: {
        MiniArea: () => import('./components/MiniArea'),
        MiniBar: () => import('./components/MiniBar'),
        MiniProgress: () => import('./components/MiniProgress'),
        Bar: () => import('./components/Bar'),
        RankList: () => import('./components/RankList'),
        Pie: () => import('./components/Pie'),
        CustomTab: () => import('./components/CustomTab'),
        TimeLine: () => import('./components/TimeLine')
    },
    data() {
        return {
            activeTab: 'sales',
            rankList,
            barData,
            salesData,
            visitData,
            visitData2,
            tableData: [],
            searchData: [],
            currentPage: 1,
            radio1: '全部渠道'
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            // let result = await axios.get('/api/device/chart/mock')
            // this.searchData = result.data.data.searchData
            this.fetchTableData(1)
        },
        fetchTableData(page) {
            let data = []
            for (let i = 0; i < 5; i++) {
                data.push({
                    rank: i + page,
                    key: '搜索关键词-' + i,
                    count: Math.floor(Math.random() * 1000),
                    rate: Math.floor(Math.random() * 100 / 4),
                    raise: Math.floor(Math.random() * 10 % 2)
                })
            }
            this.tableData = data
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.fetchTableData(val)
        }
    }
}
</script>
<style scoped lang="scss">
.el-card.d2-card {
    border: 1px solid $color-border-3;
}
::v-deep .el-card.d2-card .el-card__header {
    border-bottom: 1px solid $color-border-3;
}
.fa-caret-down {
    color: $color-success;
    margin: 0 4px;
}
.fa-caret-up {
    color: $color-danger;
    margin: 0 4px;
}
.introduce {
    .card {
        border: 1px solid $color-border-3;
        background-color: white;
        font-size: 14px;
        font-weight: 300;
        color: $color-text-normal;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        padding: 0 20px;
        .header {
            margin-top: 20px;
            margin-bottom: 12px;
            display: flex;
            .action {
                margin-left: auto;
                color: $color-text-sub;
                font-size: 14px;
                cursor: pointer;
            }
        }
        >.total {
            font-size: 28px;
            letter-spacing: 2px;
            font-weight: 400;
            color: $color-text-main;
        }
        .content {
            display: flex;
            height: 46px;
            align-items: flex-end;
            margin-bottom: 12px;
            .down {
                margin-left: 12px;
                white-space: nowrap;
            }
            .up {
                white-space: nowrap;
            }
        }
        .footer {
            padding: 10px 0;
            border-top: 1px solid $color-border-3;
            white-space: nowrap;
            .total {
                color: $color-text-main;
            }
        }
    }
}
.overview {
    .card {
        margin-top: 20px;
        position: relative;
        ::v-deep .el-card__body {
            padding-top: 0;
        }
        ::v-deep .el-tabs__item {
            font-size: 16px !important;
            font-weight: 400;
        }
        ::v-deep .el-tabs__nav {
            padding: 8px 0;
        }
        ::v-deep .el-tabs__header {
            margin-bottom: 10px;
        }
        .extra {
            position: absolute;
            right: 20px;
            top: 0px;
            height: 58px;
            display: flex;
            align-items: center;
            .category {
                .item {
                    font-size: 14px;
                    font-weight: 300;
                    color: $color-text-normal;
                    padding: 0 10px;
                    cursor: pointer;
                    &:hover {
                        color: $color-primary;
                    }
                    &.selected {
                        color: $color-primary;
                    }
                }
            }
            .time {
                margin-left: 20px;
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    width: 260px;
                }
            }
        }
    }
}
.top-search {
    font-size: 14px;
    .extra {
        float: right;
        .fa {
            color: $color-text-sub;
            font-size: 14px;
        }
    }
    .header {
        color: $color-text-sub;
        > .fa {
            font-size: 14px;
            margin-left: 8px;
            margin-bottom: 12px;
        }
    }
    .total {
        display: flex;
        align-items: center;
        .number {
            font-size: 24px;
            letter-spacing: 2px;
            font-weight: 300;
            color: $color-text-main;
        }
        .index {
            font-size: 16px;
            color: $color-text-sub;
            margin-left: 30px;
            white-space: nowrap;
        }
    }
    .chart {
        display: flex;
        height: 45px;
        align-items: flex-end;
        margin-bottom: 12px;
    }
    .table-wrapper {
        .table-content {
            margin-top: 10px;
            border: 1px solid $color-border-3;
            border-radius: 4px;
            padding: 0 4px;
            ::v-deep .el-table--medium td {
                padding: 8px 0;
            }
            ::v-deep .el-table--medium th {
                padding: 4px 0;
            }
            ::v-deep .el-table::before {
                background-color: transparent;
            }
            ::v-deep .el-table__body > tbody > tr:last-child > td {
                border-bottom: none;
            }
        }
        .table-pagination {
            margin-top: 10px;
            .el-pagination {
                text-align: right;
            }
        }
    }
}
.sales {
    font-size: 14px;
    height: 500px;
    .card {
        height: 100%;
    }
    .extra {
        float: right;
        position: relative;
        bottom: 6px;
        .fa {
            color: $color-text-sub;
            font-size: 14px;
        }
        .el-dropdown {
            vertical-align: middle;
            position: relative;
            bottom: 1px;
            margin-left: 20px;
        }
    }
    .content {
        .title {
            margin: 10px 0 40px 4px;
            color: $color-text-main;
            font-size: 14px;
        }
    }
}
.details {
    margin-top: 20px;
    .rate {
        margin-bottom: 20px;
    }
}
</style>