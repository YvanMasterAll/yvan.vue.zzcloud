<template>
    <d2-container>
        <div slot="header">
            <el-form
                :inline="true"
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
                style="margin-bottom: -18px;"
                >
                <el-form-item label="工单类型" prop="processType">
                    <el-select
                        v-model="form.processType"
                        placeholder="选择工单类型"
                    >
                        <el-option v-for='item in form.processTypeOptions' :key='item.key' :label='item.display_name' :value='item.key' />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
                style="margin-bottom: -18px;"
                label-width="180px"
                >
                <el-form-item label="请假标题" prop="title">
                    <el-col :span="8">
                        <el-input v-model="form.title" placeholder="请假标题" />
                    </el-col>
                </el-form-item>
                <el-form-item label="开始时间" prop="leave_start">
                    <el-date-picker
                        v-model="form.leave_start"
                        type="datetime"
                        placeholder="选择开始时间"
                        align="right"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="leave_end">
                    <el-date-picker
                        v-model="form.leave_end"
                        type="datetime"
                        placeholder="选择结束时间"
                        align="right"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="请假类型" prop="leave_type">
                    <el-select
                        v-model="form.leave_type"
                        placeholder="选择请假类型"
                    >
                        <el-option v-for='item in form.leave_type_options' :key='item.key' :label='item.display_name' :value='item.key' />
                    </el-select>
                </el-form-item>
                <el-form-item label="请假原因" prop="leave_reason">
                    <el-col :span="8">
                        <el-input
                        type="textarea"
                        :autosize="{minRows: 4, maxRows: 8}"
                        placeholder="输入请假原因"
                        v-model="form.leave_reason">
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="int类型" prop="int">
                    <el-input-number v-model="form.int" label="int类型" placeholder="int类型" />
                </el-form-item>
                <el-form-item label="float类型" prop="float">
                    <el-input-number v-model="form.float" :precision="2" :step="0.1" label="float类型" placeholder="float类型" />
                </el-form-item>
                <el-form-item label="单选框" prop="radio">
                    <el-radio-group v-model="form.radio">
                        <el-radio v-for='item in form.radio_options' :key='item.key' :label="item.display_name">{{item.display_name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label='多选框' prop='cities'>
                    <el-checkbox-group v-model="form.cities">
                        <el-checkbox v-for="item in form.city_options" :key="item.key" :label="item.key">{{item.display_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label='富文本' prop='richtext'>
                    <el-col :span="20">
                        <d2-quill
                            style="min-height: 200px; margin-bottom: 10px;"
                            v-model="form.richtext"
                            :api='ticket_upload'
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label='图片上传' prop='image_uploads'>
                    <el-col :span="8">
                        <el-upload
                            ref="upload"
                            :action="uploadApi"
                            :headers="headers"
                            :before-upload="beforeUpload"
                            :file-list='form.image_uploads'
                            multiple
                            list-type="picture"
                            >
                            <el-button plain size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label='文件上传' prop='file_uploads'>
                    <el-col :span="8">
                        <el-upload
                            ref="upload2"
                            drag
                            :action="uploadApi"
                            :headers="headers"
                            :before-upload="beforeUpload"
                            :file-list='form.file_uploads'
                            multiple
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button plain type="primary" @click="onSubmit(1)">提交</el-button>
                    <el-button plain type="primary" @click="onSubmit(2)">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
import util from '@/libs/util'
import api from '@/api'
import { ticket_upload } from '@/dataSourceConfig'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'ticket-add',
    data() {
        return {
            headers: { 'Authorization': util.cookies.get('token') },
            uploadApi: ticket_upload.url.fullUrl(),
            ticket_upload: api.ticket_upload,
            form: {
                processType: null,
                processTypeOptions: [
                    { key: 1, display_name: '请假申请' }
                ],
                title: null,
                leave_type_options: [
                    { key: 1, display_name: '年假' },
                    { key: 2, display_name: '调休' },
                    { key: 3, display_name: '病假' },
                    { key: 4, display_name: '婚假' }
                ],
                int: null,
                float: null,
                radio: null,
                radio_options: [
                    { key: 1, display_name: '选项一' },
                    { key: 2, display_name: '选项二' },
                ],
                cities: [],
                city_options: [
                    { key: 1, display_name: '上海' },
                    { key: 2, display_name: '背景' },
                    { key: 3, display_name: '广州' },
                    { key: 4, display_name: '深圳' }
                ],
                richtext: null,
                image_uploads: [],
                file_uploads: [],
            },
            rules: {
                // type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ],
                // user: [ { message: '请输入用户', trigger: 'change' } ]
            }
        }
    },
    methods: {
        beforeUpload(file) {
            // console.log(this.$refs.upload.uploadFiles)
            // const isJPG = file.type === 'image/jpeg'
            // const isLt2M = file.size / 1024 / 1024 < 2

            // if (!isJPG) { this.$message.error('上传头像图片只能是 JPG 格式!') }
            // if (!isLt2M) { this.$message.error('上传头像图片大小不能超过 2MB!') }

            // return isJPG && isLt2M

            return true
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
    font-size: 13px !important;
}
</style>
