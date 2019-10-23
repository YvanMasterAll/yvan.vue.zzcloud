<template>
    <div>
        <update-email @reload-info="_getProfile" ref="email" :email="profile.email"/>
        <update-password ref="password"/>
        <el-row :gutter="20"  style="height: 100%">
            <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div>
                        <div style="text-align: center;" class="d2-pt d2-pb">
                            <el-upload
                                class="avatar-uploader"
                                name="upload"
                                :show-file-list="false"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :headers="headers"
                                :action="uploadApi"
                                :before-upload="beforeUpload"
                                >
                                <img v-if="profile.avatar" :src="profile.avatar" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <ul class="user-info">
                            <li>
                                <i class="el-icon-user" /> 
                                <span class="d2-ml-5">用户名称</span>
                                <span class="content">{{ profile.name }}</span>
                            </li>
                            <li>
                                <i class="el-icon-phone-outline" /> 
                                <span class="d2-ml-5">手机号码</span>
                                <span class="content">{{ profile.phone }}</span>
                            </li>
                            <li>
                                <i class="el-icon-link" /> 
                                <span class="d2-ml-5">用户邮箱</span>
                                <span class="content">{{ profile.email }}</span>
                            </li>
                            <li>
                                <i class="el-icon-office-building" /> 
                                <span class="d2-ml-5">所属部门</span>
                                <span class="content"> {{ profile.Dept && profile.Dept.name }} / {{ profile.Job && profile.Job.name }}</span>
                            </li>
                            <li>
                                <i class="el-icon-timer" /> 
                                <span class="d2-ml-5">创建日期</span>
                                <span class="content">{{ toDateString(profile.created_at) }}</span>
                            </li>
                            <li>
                                <i class="el-icon-setting" /> 
                                <span class="d2-ml-5">安全设置</span>
                                <span class="content">
                                    <a @click="$refs.password.dialog = true">修改密码</a>
                                    <a @click="$refs.email.dialog = true">修改邮箱</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import util from '@/libs/util'
import * as urls from '@/dataSourceConfig'
import api from '@/api'
import updateEmail from './updateEmail'
import updatePassword from './updatePassword'
import { mapState, mapActions } from 'vuex'
export default {
    components: {updateEmail, updatePassword}, 
    data() {
        return {
            headers: { 'Authorization': util.cookies.get('token') },
            uploadApi: process.env.VUE_APP_API + urls.user_update_avatar.url,
            profile: { }
        }
    },
    created() {
        this._getProfile()
    },
    methods: {
        ...mapActions('d2admin/account', ['getProfile']),
        toDateString: util.toDateString,
        handleSuccess(response, file, fileList) {
            if (response.code === 200) {
                this.$notify({
                    title: '头像修改成功',
                    type: 'success',
                    duration: 2500
                })
                // 更新用户信息
                this._getProfile()
            } else {
                this.$notify({
                    title: response.msg,
                    type: 'error',
                    duration: 2500
                })
            }
        },
        handleError(e, file, fileList) {
            const msg = JSON.parse(e.message)
            this.$notify({
                title: msg.message,
                type: 'error',
                duration: 2500
            })
        },
        beforeUpload(file) {
            // const isJPG = file.type === 'image/jpeg'
            // const isLt2M = file.size / 1024 / 1024 < 2

            // if (!isJPG) { this.$message.error('上传头像图片只能是 JPG 格式!') }
            // if (!isLt2M) { this.$message.error('上传头像图片大小不能超过 2MB!') }

            // return isJPG && isLt2M

            return true
        },
        async _getProfile() {
            let result = await this.getProfile()
            if (result.valid) {
                this.profile = result.data
            }
        }
    }
}   
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    ::v-deep .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    ::v-deep .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
        // border-radius: 50%;
        border-radius: 6px;
    }
    .user-info {
        padding-left: 0px;
        list-style: none;
        li:nth-child(1) {
            border-top: 1px solid #F0F3F4;
        }
        li {
            border-bottom: 1px solid #F0F3F4;
            padding: 11px 0px;
            font-size: 13px;
            line-height: 20px;
        }
        .content {
            float: right;
            a {
                color: #317EF3;
                cursor: pointer;
                margin-left: 5px;
            }
        }
    }
</style>