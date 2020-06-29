<template>
    <el-col :span='12'>
        <el-row :gutter='20' style='margin-bottom: 10px'>
            <el-col :span='12'>
                <div class='grid-content'>
                    <div class="card blue">
                        <div class="content" v-if='todo_count !== null'>
                            <div class="time">
                                //本月
                            </div>
                            <div class="title">
                                待处理的工单
                            </div>
                            <div class="value">
                                {{todo_count}}
                            </div>
                        </div>
                        <div class="bubble bubble1"></div>
                        <div class="bubble bubble2"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span='12'>
                <div class='grid-content'>
                    <div class="card orange">
                        <div class="content" v-if='month_commit !== null'>
                            <div class="time">
                                //本月
                            </div>
                            <div class="title">
                                已提交的工单
                            </div>
                            <div class="value">
                                {{month_commit}}
                            </div>
                        </div>
                        <div class="bubble bubble1"></div>
                        <div class="bubble bubble2"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span='12'>
                <div class='grid-content'>
                    <div class="card green">
                        <div class="content" v-if='month_finished !== null'>
                            <div class="time">
                                //本月
                            </div>
                            <div class="title">
                                已完成的工单
                            </div>
                            <div class="value">
                                {{month_finished}}
                            </div>
                        </div>
                        <div class="bubble bubble1"></div>
                        <div class="bubble bubble2"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span='12'>
                <div class='grid-content'>
                    <div class="card purple">
                        <div class="content" v-if='staff_active !== null'>
                            <div class="time">
                                //本月
                            </div>
                            <div class="title">
                                员工的活跃度
                            </div>
                            <div class="value">
                                {{staff_active}}
                            </div>
                        </div>
                        <div class="bubble bubble1"></div>
                        <div class="bubble bubble2"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-col>
</template>
<script>
export default {
    props: {
        ticketPanel: {
            default: null
        }
    },
    data() {
        return {
            todo_count: null,
            month_commit: null,
            month_finished: null,
            staff_active: null
        }
    },
    watch: {
        ticketPanel: {
            handler(val) {
                this.todo_count = 18
                this.month_commit = 58
                this.month_finished = 40
                this.staff_active = 10
                // this.todo_count = val.ticket_todo_count
                // this.month_commit = val.ticket_month_commit
                // this.month_finished = val.ticket_month_finished
                // this.staff_active = val.ticket_staff_active
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.grid-content {
    height: 175px;
    &__chart {
        height: 360px;
    }
    .card {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        .content {
            z-index: 1;
            margin-bottom: 20px;
            margin-left: 24px;
            .time {
                color: #ffffffad;
                font-size: 13px;
                margin-bottom: 6px;
            }
            .title {
                font-size: 20px;
                color: white;
                margin-bottom: 4px;
            }
            .value {
                font-size: 38px;
                color: white;
            }
        }
        .bubble {
            position: absolute;
            &.bubble1 {
                width: 220px;
                height: 220px;
                border-radius: 50%;
                right: -20px;
                top: -50px;
            }
            &.bubble2 {
                width: 220px;
                height: 220px;
                border-radius: 50%;
                right: -90px;
                bottom: -110px;
            }
        }
        &.blue {
            background-image: linear-gradient(30deg, #228DF1 0%, #228df1cf 25%, #228df19c 100%);
            .bubble {
                &.bubble1 {
                    box-shadow: 0 0 10px #228df126;
                    background-color: #ffffff0d;
                }
                &.bubble2 {
                    box-shadow: 0 0 20px #228df147;
                    background-color: #23e1ff61;
                }
            }
        }
        &.orange {
            background-image: linear-gradient(30deg, #ff6a00 0%, #ff6a00cf 25%, #ff6a009c 100%);
            .bubble {
                &.bubble1 {
                    box-shadow: 0 0 10px #ff6a0026;
                    background-color: #ffffff0d;
                }
                &.bubble2 {
                    box-shadow: 0 0 20px #ff6a0047;
                    background-color: #e8e21b4a;
                }
            }
        }
        &.green {
            background-image: linear-gradient(30deg, #45c303 0%, #45c303cf 25%, #45c3039c 100%);
            .bubble {
                &.bubble1 {
                    box-shadow: 0 0 10px #45c30326;
                    background-color: #ffffff0d;
                }
                &.bubble2 {
                    box-shadow: 0 0 20px #45c30347;
                    background-color: #00f99d61;
                }
            }
        }
        &.purple {
            background-image: linear-gradient(30deg, #b465da 0%, #b465dacf 25%, #b465da9c 100%);
            .bubble {
                &.bubble1 {
                    box-shadow: 0 0 10px #b465da26;
                    background-color: #ffffff0d;
                }
                &.bubble2 {
                    box-shadow: 0 0 20px #b465da47;
                    background-color: #c553ad61;
                }
            }
        }
    }
}
</style>