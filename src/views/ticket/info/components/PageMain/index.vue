<template>
    <div>
        <el-card shadow="never" class='d2-card-mini'>
            <template slot="header">工单详情</template>
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                size="mini"
                style="margin-bottom: -18px;"
                label-width="180px"
                >
                <el-form-item v-if='ticketInfo' label="申请人">
                    <span class='input-text'>{{creator_name}}</span>
                </el-form-item>
                <el-form-item v-for="item in fields" :key='item.id' :label="item.name" :prop="item.type !== $enums.wk.field_type.date ? item.key:`_${item.key}`">
                    <el-col v-if='item.type === $enums.wk.field_type.string' :span="8">
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-input v-else v-model="form[item.key]" :placeholder="item.description" read/>
                    </el-col>
                    <div v-if='item.type === $enums.wk.field_type.date'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-date-picker
                            v-else
                            v-model="form[`_${item.key}`]"
                            type="datetime"
                            :placeholder="item.description"
                            align="right"
                            >
                        </el-date-picker>
                    </div>
                    <div v-if='item.type === $enums.wk.field_type.select'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-select
                            v-else
                            v-model="form[item.key]"
                            :placeholder="item.description"
                            >
                            <el-option v-for='(value, key) in item.choice' :key='key' :label='value' :value='value' />
                        </el-select>
                    </div>
                    <el-col v-if='item.type === $enums.wk.field_type.text' :span="8">
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-input
                        v-else
                        type="textarea"
                        :autosize="{minRows: 4, maxRows: 8}"
                        :placeholder="item.description"
                        v-model="form[item.key]">
                        </el-input>
                    </el-col>
                    <div v-if='item.type === $enums.wk.field_type.int'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-input-number v-else v-model="form[item.key]" :placeholder="item.description" />
                    </div>
                    <div v-if='item.type === $enums.wk.field_type.float'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-input-number v-else v-model="form[item.key]" :precision="2" :step="0.1" :placeholder="item.description" />
                    </div>
                    <div v-if='item.type === $enums.wk.field_type.radio'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                        <el-radio-group v-else v-model="form[item.key]">
                            <el-radio v-for='(value, key) in item.choice' :key='key' :label="value" :value='key' />
                        </el-radio-group>
                    </div>
                    <div v-if='item.type === $enums.wk.field_type.checkbox'>
                        <span v-if='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value ? item.value.join('，'):''}}</span>
                        <el-checkbox-group v-else v-model="form[item.key]">
                            <el-checkbox v-for="(value, key) in item.choice" :key="key" :label="value" :value='key' />
                        </el-checkbox-group>
                    </div>
                    <el-col v-if='item.type === $enums.wk.field_type.richtext' :span="20">
                        <d2-quill
                            style="min-height: 200px; margin-bottom: 10px;"
                            v-model="form[item.key]"
                            :api='ticket_upload'
                            :readOnly='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly'
                        />
                    </el-col>
                    <el-col v-if='item.type === $enums.wk.field_type.image' :span="8">
                        <el-upload
                            :ref="item.key"
                            :on-preview='handlePreview'
                            :action="uploadApi"
                            :headers="headers"
                            name="upload"
                            :before-upload="beforeUpload"
                            :file-list='form[`_${item.key}`]'
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            multiple
                            list-type="picture"
                            :disabled='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly'
                            >
                            <div v-if='item.attribute !== $enums.wk.field_attribute_type.readOnly'>
                                <el-button plain size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">{{item.description}}</div>
                            </div>
                        </el-upload>
                    </el-col>
                    <el-col v-if='item.type === $enums.wk.field_type.attachment' :span="8">
                        <el-upload
                            :ref="item.key"
                            :on-preview='handlePreview'
                            :drag='is_executor && item.attribute !== $enums.wk.field_attribute_type.readOnly'
                            :action="uploadApi"
                            :headers="headers"
                            name="upload"
                            :before-upload="beforeUpload"
                            :file-list='form[`_${item.key}`]'
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :disabled='!is_executor || item.attribute === $enums.wk.field_attribute_type.readOnly'
                            multiple
                            >
                            <div v-if='is_executor && item.attribute !== $enums.wk.field_attribute_type.readOnly'>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div slot="tip" class="el-upload__tip">{{item.description}}</div>
                            </div>
                        </el-upload>
                    </el-col>
                </el-form-item>
                
                <el-form-item v-if='need_suggestion' label="处理意见" prop="suggestion">
                    <el-col :span="8">
                        <el-input
                            type="textarea"
                            :autosize="{minRows: 4, maxRows: 8}"
                            placeholder="输入处理意见"
                            v-model="form.suggestion">
                        </el-input>
                    </el-col>
                </el-form-item>

                <el-form-item v-if='is_finished' label="处理状态" prop="suggestion">
                    <el-tag size="mini" :type="is_rejected ? 'danger':'success'">
                        {{ is_rejected ? '否决' : '通过' }}
                    </el-tag>
                </el-form-item>
                <el-form-item v-if='is_executor && transitions !== null'>
                    <el-button v-for="item in transitions" :key='item.id' plain type="primary" @click="onSubmit(item.id)">{{item.name}}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <activity-list :table-data="table" :current="page.current" :size="page.size" :total="page.total" @change="handlePaginationChange" />
    </div>
</template>

<script>
import util from '@/libs/util'
import api from '@/api'
import { ticket_upload } from '@/dataSourceConfig'
import ticketEditData from '@/mixins/ticketEditData'
import tableData from '@/mixins/tableData'
export default {
    mixins: [ticketEditData, tableData],
    components: {ActivityList: () => import('./activity_list')},
    props: {
        ticketInfo: {
            default: null
        }
    },
    data() {
        return {
            is_executor: false,
            is_finished: false,
            is_rejected: false,
            need_suggestion: false,
            creator_name: null,
            ticket_api: api.transition_add,
            api: api.activity_list,
        }
    },
    watch: {
        ticketInfo: {
            handler(val) {
                this.creator_name = val.creator_name
                this.is_finished = val.is_finished
                this.is_rejected = val.is_rejected
                this.is_executor = val.is_executor
                if (this.is_executor && val.executor_type !== this.$enums.wk.executor_type.none) {
                    this.need_suggestion = true
                }
                this.initForm(val)
                // 获取工单活动
                this.$nextTick(() => {
                    this.params.ticket_id = val.id
                    this.handleSubmit()
                })
            }
        }
    },
    methods: {
        beforeSubmit_ticket() {
            this.form.ticket_id = this.ticketInfo.id
        },
        submitSuccess_ticket() {
            // 重新加载数据
            this.$emit('reload-data')
            this.is_executor = false
            this.need_suggestion = false
        }
    }
}

</script>

<style lang="scss" scoped>
.input-text {
    font-size: 12px;
    color: #606266;
}
::v-deep .el-step__head.is-process {
    color: #409EFF;
    border-color: #409EFF;
}
::v-deep .el-step__title.is-process {
    color: #409EFF;
}
::v-deep .el-step.is-simple .el-step__title {
    font-size: 13px;
}
::v-deep .el-step__head.is-process > .el-step__icon.is-text {
    border-width: 8px;
}
/* ::v-deep .el-step.is-simple .el-step__arrow::after, ::v-deep .el-step.is-simple .el-step__arrow::before {
    background: #409EFF;
} */
</style>