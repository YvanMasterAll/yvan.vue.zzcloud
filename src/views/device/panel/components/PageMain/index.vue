<template>
    <el-row :gutter='20' class='d2-mt-20'>
        <el-col :span='16'>
            <el-card shadow="never" class='d2-card-mini project d2-mb-20'>
                <template slot="header" >
                    <span style='vertical-align: middle;'>进行中的项目</span>
                    <el-button type="text" size='mini' class='action'>
                        全部项目
                    </el-button>
                </template>
                <el-row class="project-list">
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">Alipay</el-link>
                        </div>
                        <div class="describe">
                            那是一种内在的东西，他们到达不了，也无法触及的
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">科学搬砖组</el-link>
                            <div class="time">
                                33 分钟前
                            </div>
                        </div>
                    </el-col>
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">Angular</el-link>
                        </div>
                        <div class="describe">
                            希望是一个好东西，也许是最好的，好东西是不会消亡的
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">全组都是吴彦祖</el-link>
                            <div class="time">
                                3 年前
                            </div>
                        </div>
                    </el-col>
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">Ant Design</el-link>
                        </div>
                        <div class="describe">
                            城镇中有那么多的酒馆，她却偏偏走进了我的酒馆
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">中二少女组</el-link>
                            <div class="time">
                                3 小时前
                            </div>
                        </div>
                    </el-col>
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">Ant Design Pro</el-link>
                        </div>
                        <div class="describe">
                            那时候我只会想自己想要什么，从不想自己拥有什么
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">程序员日常</el-link>
                            <div class="time">
                                3 年前
                            </div>
                        </div>
                    </el-col>
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">Bootstrap</el-link>
                        </div>
                        <div class="describe">
                            凛冬将至
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">高逼格设计天团</el-link>
                            <div class="time">
                                3 年前
                            </div>
                        </div>
                    </el-col>
                    <el-col :span='8' class="project-item">
                        <div class="header">
                            <div class="icon">
                                <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'></el-avatar>
                            </div>
                            <el-link :underline="false" class='name' target="_blank">React</el-link>
                        </div>
                        <div class="describe">
                            生命就像一盒巧克力，结果往往出人意料
                        </div>
                        <div class="detail">
                            <el-link type='info' class='executor' :underline="false" target="_blank">骗你来学计算机</el-link>
                            <div class="time">
                                3 年前
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="never" class='d2-card-mini dynamic d2-mb-20'>
                <template slot="header" >
                    <span style='vertical-align: middle;'>动态</span>
                </template>
                <div class="dynamic-list">
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                曲丽丽 在 
                                <el-link type='primary' :underline="false" target="_blank">
                                    高逼格设计天团
                                </el-link>
                                 新建项目 
                                <el-link type='primary' :underline="false" target="_blank">
                                    六月迭代
                                </el-link>
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                付小小 在 
                                <el-link type='primary' :underline="false" target="_blank">
                                    高逼格设计天团
                                </el-link>
                                 新建项目 
                                <el-link type='primary' :underline="false" target="_blank">
                                    六月迭代
                                </el-link>
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                林东东 在 
                                <el-link type='primary' :underline="false" target="_blank">
                                    中二少女团
                                </el-link>
                                 新建项目 
                                <el-link type='primary' :underline="false" target="_blank">
                                    六月迭代
                                </el-link>
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                周星星 将 
                                <el-link type='primary' :underline="false" target="_blank">
                                    5 月日常迭代
                                </el-link>
                                 更新至已发布状态
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                朱偏右 在 
                                <el-link type='primary' :underline="false" target="_blank">
                                    工程效能
                                </el-link>
                                 发布了 
                                <el-link type='primary' :underline="false" target="_blank">
                                    留言
                                </el-link>
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                    <div class="dynamic-item">
                        <div class="avatar">
                            <el-avatar shape="circle" :size="32" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'></el-avatar>
                        </div>
                        <div class="content">
                            <div class="describe">
                                乐哥 在 
                                <el-link type='primary' :underline="false" target="_blank">
                                    程序员日常
                                </el-link>
                                 新建项目 
                                <el-link type='primary' :underline="false" target="_blank">
                                    品牌迭代
                                </el-link>
                            </div>
                            <div class="time">
                                2 小时前
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span='8'>
            <el-card shadow="never" class='d2-card-mini bootstrap d2-mb-20'>
                <template slot="header" >
                    <span style='vertical-align: middle;'>快速开始 / 便捷导航</span>
                </template>
                <el-row class='bootstrap-list'>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作一</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作二</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作三</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作四</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作五</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-link :underline="false" class='action' target="_blank">操作六</el-link>
                    </el-col>
                    <el-col :span='6' class="bootstrap-item">
                        <el-button type="primary" size='mini' :plain='true' class='action-add'>
                            <d2-icon name="plus" />添加
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="never" class='d2-card-mini radar d2-mb-20'>
                <template slot="header" >
                    <span style='vertical-align: middle;'>雷达·指数</span>
                </template>
                <radar :data="radarData" />
            </el-card>
            <el-card shadow="never" class='d2-card-mini team d2-mb-20'>
                <template slot="header" >
                    <span style='vertical-align: middle;'>团队</span>
                </template>
                <el-row class='team-list'>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">科学搬砖组</el-link>
                    </el-col>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">全组都是吴彦祖</el-link>
                    </el-col>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">中二少女团</el-link>
                    </el-col>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">程序员日常</el-link>
                    </el-col>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">高逼格设计天团</el-link>
                    </el-col>
                    <el-col :span='12' class="team-item">
                        <div class="icon">
                            <el-avatar shape="circle" :size="24" fit="cover" src='https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'></el-avatar>
                        </div>
                        <el-link :underline="false" class='name' target="_blank">骗你来学计算机</el-link>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
const DataSet = require('@antv/data-set')
export default {
    components: {
        Radar: () => import('./components/Radar'),
    },
    data() {
        return {
            radarData: []
        }
    },
    mounted() {
        this.initRadar()
    },
    methods: {
        async initRadar() {
            let result = await axios.get('/api/device/chart/mock')
            this.radarData = result.data.data.radarData
            // let data = [{
            //     'item': '引用',
            //     '个人': 70,
            //     '团队': 30,
            //     '部门': 40
            // }, {
            //     'item': '口碑',
            //     '个人': 60,
            //     '团队': 70,
            //     '部门': 40
            // }, {
            //     'item': '产量',
            //     '个人': 50,
            //     '团队': 60,
            //     '部门': 40
            // }, {
            //     'item': '贡献',
            //     '个人': 40,
            //     '团队': 50,
            //     '部门': 40
            // }, {
            //     'item': '热度',
            //     '个人': 60,
            //     '团队': 70,
            //     '部门': 40
            // }, {
            //     'item': '引用',
            //     '个人': 70,
            //     '团队': 50,
            //     '部门': 40
            // }]
            // let dv = new DataSet.View().source(data)
            // dv.transform({
            //     type: 'fold',
            //     fields: ['个人', '团队', '部门'],
            //     key: 'user',
            //     value: 'score'
            // })
            // this.radarData = dv.rows
        }
    }
}
</script>
<style scoped lang="scss">
::v-deep .el-card__body {
    padding: 0 !important;
}
::v-deep .el-link--inner {
    font-weight: 400 !important;
}
::v-deep .radar .el-card__body {
    padding: 20px 0 !important;
}
::v-deep .dynamic-item .el-link--inner {
    font-weight: 300 !important;
}
.project {
    overflow: visible;
    .action {
        float: right;
        position: relative;
        bottom: 4px;
        font-weight: 400;
        font-size: 12px;
    }
    .project-item {
        box-shadow: 1px 1px 0px 0px $color-border-3;
        padding: 20px;
        box-sizing: border-box;
        height: 138px;
        font-size: 14px;
        position: relative;
        &:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
        }
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            .name {
                margin-left: 10px;
                bottom: 2px;
            }
        }
        .describe {
            color: $color-text-sub;
            font-weight: 300;
            margin-bottom: 10px;
        }
        .detail {
            position: absolute;
            width: 100%;
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;
            left: 0;
            bottom: 20px;
            .executor {
                font-weight: 300;
                font-size: 12px;
            }
            .time {
                color: $color-text-placehoder;
                font-weight: 300;
                font-size: 12px;
                margin-left: auto;
            }
        }
    }
}
.dynamic {
    .dynamic-list {
        padding: 0px 20px;
        .dynamic-item {
            height: 80px;
            font-size: 14px;
            padding: 14px 0px;
            box-sizing: border-box;
            display: flex;
            align-items: flex-start;
            border-bottom: 1px solid $color-border-3;
            &:last-child {
                border-bottom: none;
            }
            .content {
                margin-left: 20px;
                .describe {
                    margin-top: 2px;
                    margin-bottom: 10px;
                }
                .time {
                    color: $color-text-sub;
                }
            }
        }
    }
}
.bootstrap {
    .bootstrap-list {
        font-weight: 300;
        padding: 10px 0;
        .bootstrap-item {
            display: flex;
            height: 40px;
            justify-content: flex-start;
            padding-left: 20px;
            align-items: center;
            .action {
                font-size: 14px;
            }
            .action-add {
                .fa {
                    margin-right: 4px;
                }
            }
        }
    }
}
.team {
    .team-list {
        padding: 10px 0;
        font-weight: 300;
        .team-item {
            display: flex;
            height: 54px;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            .name {
                margin-left: 10px;
            }
        }
    }
}
</style>