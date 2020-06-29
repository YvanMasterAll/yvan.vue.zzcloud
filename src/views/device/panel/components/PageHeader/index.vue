<template>
    <div class='header'>
        <div class='content'>
            <div class='avatar'>
                <el-avatar shape="circle" :size="72" fit="cover" src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'></el-avatar>
            </div>
            <div class='describe'>
                <div class="welcome">早安，Serati Ma，祝你开心每一天！</div>
                <div class="actor">交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
            </div>
        </div>
        <div class='content-extra'>
            <div class="text-block">
                <div class="describe">项目数</div>
                <div class="content">56</div>
            </div>
            <div class="text-block">
                <div class="describe">团队内排名</div>
                <div class="content">
                    8
                    <div class='suffix'>/24</div>
                </div>
            </div>
            <div class="text-block">
                <div class="describe">项目访问</div>
                <div class="content">2,223</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang='scss'>
.header {
    display: flex;
    height: 80px;
    font-weight: 300;
    padding: 10px 20px;
    box-shadow: 1px 0px 2px 0 rgba(0,0,0,.1);
    border: 1px solid $color-border-3;
    border-radius: 4px;
    .content {
        display: flex;
        .avatar {
            margin-right: 20px;
        }
        .describe {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .welcome {
                font-weight: 400;
                font-size: 20px;
                line-height: 28px;
                margin-bottom: 12px;
            }
            .actor {
                color: $color-text-sub;
                line-height: 22px;
                font-size: 14px;
            }
        }
    }
    .content-extra {
        margin-left: auto;
        display: flex;
        .text-block {
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding: 0 28px;
            .describe {
                color: $color-text-sub;
                line-height: 22px;
                font-size: 14px;
                margin-bottom: 4px;
            }
            .content {
                font-weight: 300;
                font-size: 24px;
                text-align: right;
                .suffix {
                    font-size: 16px;
                    margin-left: 4px;
                    position: relative;
                    top: 6px;
                }
            }
            &::after {
                position: absolute;
                right: 0;
                width: 1px;
                height: 40px;
                background-color: $color-text-placehoder;
                content: "";
            }
            &:last-child {
                padding-right: 0px;
                &::after {
                    width: 0;
                }
            }
        }
    }
}
</style>