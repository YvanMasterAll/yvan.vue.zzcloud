<template>
    <el-card shadow="never" v-if='state !== null' class='d2-card-mini'>
        <template slot="header">{{process.name}}</template>
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            size="mini"
            style="margin-bottom: -18px;"
            label-width="180px"
            >
            <el-form-item v-for="item in fields" :key='item.id' :label="item.name" :prop="item.type !== $enums.wk.field_type.date ? item.key:`_${item.key}`">
                <el-col v-if='item.type === $enums.wk.field_type.string' :span="8">
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-input v-else v-model="form[item.key]" :placeholder="item.description" read/>
                </el-col>
                <div v-if='item.type === $enums.wk.field_type.date'>
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
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
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-select
                        v-else
                        v-model="form[item.key]"
                        :placeholder="item.description"
                        >
                        <el-option v-for='(value, key) in item.choice' :key='key' :label='value' :value='value' />
                    </el-select>
                </div>
                <el-col v-if='item.type === $enums.wk.field_type.text' :span="8">
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-input
                    v-else
                    type="textarea"
                    :autosize="{minRows: 4, maxRows: 8}"
                    :placeholder="item.description"
                    v-model="form[item.key]">
                    </el-input>
                </el-col>
                <div v-if='item.type === $enums.wk.field_type.int'>
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-input-number v-else v-model="form[item.key]" :placeholder="item.description" />
                </div>
                <div v-if='item.type === $enums.wk.field_type.float'>
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-input-number v-else v-model="form[item.key]" :precision="2" :step="0.1" :placeholder="item.description" />
                </div>
                <div v-if='item.type === $enums.wk.field_type.radio'>
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value}}</span>
                    <el-radio-group v-else v-model="form[item.key]">
                        <el-radio v-for='(value, key) in item.choice' :key='key' :label="value" :value='key' />
                    </el-radio-group>
                </div>
                <div v-if='item.type === $enums.wk.field_type.checkbox'>
                    <span v-if='item.attribute === $enums.wk.field_attribute_type.readOnly' class='input-text'>{{item.value ? item.value.join('，'):''}}</span>
                    <el-checkbox-group v-else v-model="form[item.key]">
                        <el-checkbox v-for="(value, key) in item.choice" :key="key" :label="value" :value='key' />
                    </el-checkbox-group>
                </div>
                <el-col v-if='item.type === $enums.wk.field_type.richtext' :span="20">
                    <d2-quill
                        style="min-height: 200px; margin-bottom: 10px;"
                        v-model="form[item.key]"
                        :api='ticket_upload'
                        :readOnly='item.attribute === $enums.wk.field_attribute_type.readOnly'
                    />
                </el-col>
                <el-col v-if='item.type === $enums.wk.field_type.image' :span="8">
                    <el-upload
                        :ref="item.key"
                        :action="uploadApi"
                        :headers="headers"
                        name="upload"
                        :before-upload="beforeUpload"
                        :file-list='form[`_${item.key}`]'
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        multiple
                        list-type="picture"
                        :disabled='item.attribute === $enums.wk.field_attribute_type.readOnly'
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
                        :drag='item.attribute !== $enums.wk.field_attribute_type.readOnly'
                        :action="uploadApi"
                        :headers="headers"
                        name="upload"
                        :before-upload="beforeUpload"
                        :file-list='form[`_${item.key}`]'
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :disabled='item.attribute === $enums.wk.field_attribute_type.readOnly'
                        multiple
                        >
                        <div v-if='item.attribute !== $enums.wk.field_attribute_type.readOnly'>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div slot="tip" class="el-upload__tip">{{item.description}}</div>
                        </div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item v-if='transitions !== null'>
                <el-button v-for="item in transitions" :key='item.id' plain type="primary" @click="onSubmit(item.id)">{{item.name}}</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import util from '@/libs/util'
import api from '@/api'
import { ticket_upload } from '@/dataSourceConfig'
import ticketEditData from '@/mixins/ticketEditData'
export default {
    mixins: [ticketEditData],
    props: {
        process: {
            default: null
        }
    },
    data() {
        return {
            ticket_api: api.ticket_add
        }
    },
    watch: {
        process: {
            handler(val) {
                this.initForm(val)
            }
        }
    },
    methods: {
        beforeSubmite() {
            
        }
    }
}

</script>

<style lang="scss" scoped>
.input-text {
    font-size: 12px;
    color: #606266;
}
</style>