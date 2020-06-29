import util from '@/libs/util'
import api from '@/api'
import { sheet_upload } from '@/dataSourceConfig'
import { isNull, isUndefined } from 'lodash'
// 预留工作
// 1.图片上传接口
// 2.数据解析
// 3.后台数据准备
// 4.从后台获取数据：templates + cellFields
// 5.页面开发
export default {
    data() {
        return {
            // 表格信息
            sheet: {
                // 表格模板
                template: null,
                // 单元格字段
                cellFields: {},
                // 单元格选项
                cellOptions: {  
                    // 状态选项
                    "stateOptions": ["正常", "异常"],       
                    // 液晶屏安装选项
                    "screenFitOptions": ["外置", "内置"],   
                    // 变频选项
                    "freqTypeOptions": ["中频", "变频"],    
                    // 清洁选项
                    "cleanOptions": ["清洁", "不洁"],       
                    // 配件选项
                    "partsOptions": ["完整", "缺少"],       
                    // 包装选项
                    "packOptions": ["木箱", "纸箱", "缠绕膜", "不包装"], 
                    // 水压选项
                    "pressureOptions": ["完好", "渗水"],    
                    // 屏幕程序版本
                    "screenOptions": ["普通", "特殊"],      
                    // 变压器次级连接材料
                    "linkOptions": ["紫铜", "黄铜"],        
                    // 有无状态
                    "hasOptions": ["有", "无"],            
                    // IGBT型号
                    "igbtOptions": ["300", "450", "600", "800", "900", "1400"], 
                    // 电流霍尔型号
                    "lemOptions": ["300", "600", "800小", "800大", "1200"], 
                    // 安装选项
                    "fitOptions": ["外挂", "嵌入式"],       
                    // 散热板材料
                    "heatOptions": ["镶铜板", "纯铝板"],    
                    // 是否选项
                    "yesOptions": ["是", "否"],            
                    // 连接线牢固度检查
                    "checkOptions": ["已查", "查"],        
                    // 匝数比
                    "turnsOptions": ["51:1", "102:1"],    
                    // 变频选项
                    "freqOptions": ["1000HZ", "4000HZ"],  
                    // 维修选项
                    "fixOptions": ["需维修", "不需维修"],   
                    // 处理结果
                    "fixedOptions": ["可正常使用", "报废处理"], 
                    // 合格选项
                    "qualifiedOptions": ["合格", "不合格"] 
                },
                // 表格数据
                json: {},
                // 编辑模式，新增或编辑
                isAddNew: false,
                // 编辑器
                editor: {
                    content: '{"title":"","cellHeight":34,"table":{"th":[],"tr":[{"td":[{},{},{}]},{"td":[{},{},{}]}]}}',
                    snippets: [
                        { type: 'text', title: '文本', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "text", "name": null, "key": null, "value": "填写文本内容" },' },
                        { type: 'textfield', title: '文本输入', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "textfield", "name": "填写字段键名", "key": null,  "value": "", "placeholder": "填写空白描述" },' },
                        { type: 'sn', title: '编号输入', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "sn", "name": "sn", "key": null,  "value": "" },' },
                        { type: 'number', title: '数字输入', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "number", "name": "填写字段键名", "key": null,  "value": "", "placeholder": "填写空白描述" },' },
                        { type: 'bool', title: '布尔切换', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "bool", "name": "填写字段键名", "key": null,  "value": "true" },' },
                        { type: 'option', title: '单选框', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "option", "name": "填写字段键名", "key": "填写选项键名", "value": "填写默认选项" }, ' },
                        { type: 'select', title: '选项框', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "select", "name": "填写字段键名", "key": "填写选项键名",  "value": "" },' },
                        { type: 'select_search', title: '选项框带搜索', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "select", "name": "填写字段键名", "needsearch": true, "key": "填写选项键名",  "value": "" },' },
                        { type: 'date', title: '日期', snippet: '{ "rowspan": 1, "cellspan": 1, "type": "date", "name": "date", "key": null, "value": "" },' },
                        { type: 'image', title: '图片', snippet: '{ "rowspan": 4, "cellspan": 8, "type": "image", "name": "填写字段键名", "key": null, "value": "" },' },
                    ]
                }
            },
            // 设计稿尺寸
            designSize: {
                width: 1280,
                height: 960
            },
            // 接口信息
            apis: {
                // 添加模板
                sheet_tmpl_add: api.sheet_tmpl_add,
                // 添加表格
                sheet_add: api.sheet_add,
                // 编辑表格
                sheet_edit: api.sheet_edit,
                // 富文本文件上传接口
                upload_url: sheet_upload.url.fullUrl(),
                // 请求头信息
                headers: { 'Authorization': util.cookies.get('token') }, 
            }
        }
    },
    created() {

    },
    computed: {
        // 保存按钮
        renderSaveButton() {
            return <el-button size='mini' type="primary" class='is-thin' icon="el-icon-success" label="保存" on-click={ this.saveData }>保存</el-button>
        }
    },
    methods: {
        // 表格渲染
        renderSheet() {
            if (!this.sheet.template) {
                return null
            }
            return (
                <table class='sheet-table' border='0'>
                    { this.renderTh(this.sheet.template.table.th) }
                    { this.sheet.template.table.tr.map(tr => {
                        return this.renderTr(tr)
                    })}
                </table>
            )
        },
        // 渲染表格头，内容为空，主要作用是设置列宽
        renderTh(th) {
            return (
                <tr>
                    { th.map(v => {
                        // 百分比格式
                        if (v instanceof String) {
                            v = v*designSize.width
                        }
                        return <th style={{minWidth: `${v}px`}}></th>
                    })}
                </tr>
            )
        },
        // 渲染行
        renderTr(tr) {
            // 行高
            let cellHeight = this.sheet.template.cellHeight
            // 行元素
            let elements = [(<tr style={{height: `${cellHeight}px`}}>{ tr.td.map(td => { return this.renderTd(td) }) }</tr>)]
            // 以下代码是为了弥补因为行不足而导致的内容溢出问题
            // 简单描述一下问题，一个<tr>标签代表一行，如果一个<tr>中所有<td>都占用至少2行，那么会出现<tr>不足的情况，所以我们要主动填充空的<tr>避免内容溢出
            // 1.计算行占用的列数
            let th_size = this.sheet.template.table.th.length
            let tr_size = 0
            tr.td.forEach(td => {
                tr_size += td.cellspan
            })
            // 2.计算占用最少的行数
            let rowspan = 999
            tr.td.forEach(td => {
                rowspan = Math.min(td.rowspan, rowspan)
            })
            // 3.只有占满列数并且占用的行数超过1才需要补充空的行
            if (th_size === tr_size && rowspan > 1) {
                this._.range(rowspan-1).forEach(_ => {
                    elements.push(<tr></tr>)
                })
            }
            return elements
        },
        // 渲染列
        renderTd(td) {
            let rowspan = td.rowspan
            let colspan = td.cellspan
            let value = td.value
            let key = td.key
            let name = td.name
            if (td.type === 'text') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <span class='input-text'>{value}</span>
                    </td>
                )
            }
            if (td.type === 'textfield' || td.type === 'sn') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-input size='mini' style='width: 100%;' vModel={this.sheet.json[name]} clearable={true} placeholder={td.placeholder}></el-input>
                    </td>
                )
            }
            if (td.type === 'number') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        {/* <el-input-number size='mini' style='width: 100%' vModel={this.sheet.json[name]} clearable={true} placeholder={td.placeholder}></el-input-number> */}
                        <el-input size='mini' style='width: 100%;' vModel={this.sheet.json[name]} clearable={true} placeholder={td.placeholder}></el-input>
                    </td>
                )
            }
            if (td.type === 'bool') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-switch size='mini' vModel={this.sheet.json[name]} active-color="#13ce66"></el-switch>
                    </td>
                )
            }
            if (td.type === 'option') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-radio-group size='mini' vModel={this.sheet.json[name]}>
                            { 
                                this.sheet.cellOptions[key].map(option => {
                                    return <el-radio-button label={option}>{ option }</el-radio-button>
                                })
                            }
                        </el-radio-group>
                    </td>
                )
            }
            if (td.type === 'date') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-date-picker
                            vModel={this.sheet.json[name]}
                            type="date"
                            size='mini' 
                            style='width: 100%' 
                            valueFormat='yyyy-MM-dd'
                            placeholder="选择日期">
                        </el-date-picker>
                    </td>
                )
            }
            if (td.type === 'select') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-select size='mini' style='width: 100%' vModel={this.sheet.json[name]} filterable placeholder="选择内容">
                            { this.sheet.cellFields[key].map(item => {
                                return <el-option
                                    key={item}
                                    label={item}
                                    value={item}>
                                </el-option>
                            })}
                        </el-select>
                    </td>
                )
            }
            if (td.type === 'image') {
                return (
                    <td rowspan={rowspan} colspan={colspan}>
                        <el-upload
                            ref={name}
                            action={this.apis.upload_url}
                            headers={this.apis.headers}
                            name="upload"
                            before-upload={this.beforeUpload}
                            file-list={this.sheet.json[name]}
                            {...{
                                props: { 
                                    onSuccess: this.uploadSuccess,
                                    onError: this.uploadError,
                                    onPreview: this.filePreview
                                }
                            }}
                            multiple={true}
                            list-type="picture-card"
                            >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </td>
                )
            }
            return null
        },
        // 初始化编辑器
        initEditor(fields) {
            this.initData(null, {template: this.sheet.editor.content}, fields)
        },
        // 预览表格
        onPreview() {
            let tmpl = this.$refs.jsonEditor.getValue()
            try {
                tmpl = JSON.parse(tmpl)
            } catch (e) {
                this.$notify({title: 'json格式不正确'})
                return
            }
            this.sheet.template = tmpl
        },
        // 初始化数据
        initData(data, tmpl, fields) {
            // 模板解析
            this.sheet.template = JSON.parse(tmpl.template)
            this.sheet.cellFields = fields
            this.parseSheet()
            let json = this._.cloneDeep(this.sheet.json)
            json.title = tmpl.title
            json.tmpl_id = tmpl.id
            // 数据解析
            if (data) {
                let origin_json = JSON.parse(data.data)
                // 数据预处理
                let table = this.sheet.template.table
                let trs = table.tr
                trs.forEach(tr => {
                    let tds = tr.td
                    tds.forEach(td => { 
                        if (td.name && !this._.isNullOrUndefined(origin_json[td.name])) {
                            if (td.type === 'bool') {
                                json[td.name] = origin_json[td.name] === 'true'
                            } else if (td.type === 'image') {
                                json[td.name] = origin_json[td.name].toImageArr()
                            } else {
                                json[td.name] = origin_json[td.name]
                            }
                        }
                    })
                })
                // 设备编号
                json['sn'] = origin_json['sn']
            } else {
                // 新增模式
                this.sheet.isAddNew = true
            }
            this.sheet.json = json
        },
        // 保存模板
        async saveTmpl() {
            let tmpl = this.$refs.jsonEditor.getValue()
            try {
                tmpl = JSON.parse(tmpl)
            } catch (e) {
                this.$notify({title: 'json格式不正确'})
                return
            }
            let title = tmpl.title
            if (this._.isNullOrUndefined(title) || title.trim() === '') {
                this.$notify({title: '请输入模板标题'})
                return
            }
            delete tmpl.title
            let result = await this.apis.sheet_tmpl_add({title, template: JSON.stringify(tmpl)})
            if (result.valid) {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 保存数据
        async saveData() {
            // 数据验证
            if (!this.validateBeforeSave()) { return }

            if (this._.isNullOrUndefined(this.sheet.json["sn"]) || this.sheet.json["sn"].trim() === "") {
                this.$message({
                    message: "请至少填写设备编码",
                    type: 'error'
                })
                return
            }
            
            // 数据转换
            // 1.拷贝数据
            let json = this._.cloneDeep(this.sheet.json)
            // 2.布尔类型和文件类型的值处理
            let table = this.sheet.template.table
            let trs = table.tr
            trs.forEach(tr => {
                let tds = tr.td
                tds.forEach(td => { 
                    if (td.name) {
                        if (td.type === 'bool') {
                            json[td.name] = `${json[td.name]}`
                        } else if (td.type === 'image')  {
                            let images = []
                            this.$refs[td.name].uploadFiles.forEach(image => {
                                if (!image.response) { // 已有的图片
                                    images.push({name: image.name, url: image.url})
                                }
                                if (image.response && image.response.code === 200) { // 上传的图片
                                    images.push({name: image.name, url: image.response.data})
                                }
                            })
                            json[td.name] = images.toImageStr()
                        }
                    }
                })
            })

            let data = {
                sn: json.sn,
                sn2: json.sn2,
                title: json.title,
                date: json.date,
                company: json.company,
                tmpl_id: json.tmpl_id,
                data: JSON.stringify(json)
            }
            console.log(data)
            let result;
            if (this.sheet.isAddNew) {
                result = await this.apis.sheet_add(data)
            } else {
                result = await this.apis.sheet_edit(data)
            }
            if (result.valid) {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            } else {
                this.$message({
                    message: result.msg,
                    type: 'error'
                })
            }
        },
        // 数据上传前验证
        validateBeforeSave() {
            let json = this.sheet.json
            // 1.机器编码匹配
            if (json["sn_check"] && json["sn"] != json["sn_check"]) {
                this.$notify({title: '机器编码不匹配'})
                return false;
            }
            // 2.包装测试表格验证
            if (!this._.isNullOrUndefined(json["_sn1"]) && !this._.isNullOrUndefined(json["_sn2"]) && !this._.isNullOrUndefined(json['_sn3'])) {
                let _sn1 = json['_sn1'].trim()
                let _sn2 = json['_sn2'].trim()
                let _sn3 = json['_sn3'].trim()
                if (_sn1 === '' && _sn3 === '' || (_sn1 !== '' && _sn2 === '')) {
                    this.$notify({title: '请至少填写机器编码'})
                    return false
                }
                if (_sn1 !== '') {
                    json["sn"] = _sn1.trim()
                    json["sn2"] = _sn2.trim()
                } else {
                    json["sn"] = _sn3.trim()
                }
            }

            return true;
        },
        // 解析表格
        parseSheet() {
            let json = {}
            let table = this.sheet.template.table
            let trs = table.tr
            trs.forEach(tr => {
                let tds = tr.td
                tds.forEach(td => { 
                    if (td.name) {
                        if (td.type === 'bool') {
                            json[td.name] = td.value === 'true'
                        } else if (td.type === 'date') {
                            json[td.name] = util.toDateString(null, 'YYYY-MM-DD')
                        } else if (td.type === 'image')  {
                            json[td.name] = td.value.toImageArr()
                        } else {
                            json[td.name] = td.value
                        }
                    }
                })
            })
            this.sheet.json = json
        },
        // 上传前的执行函数
        beforeUpload(file) {
            return true
        },
        // 上传成功的执行函数
        uploadSuccess(response, file, fileList) {
            console.log(response)
        },
        // 上传失败的执行函数
        uploadError(e, file, fileList) {
            const msg = JSON.parse(e.message)
            this.$notify({
                title: msg.message,
                type: 'error',
                duration: 2500
            })
        },
        // 文件预览
        filePreview(file) {
            window.open(file.url)
        },
        // 获取表单高度
        getTableHeight() {
            let height = 0;
            let cellHeight = this.sheet.template.cellHeight
            var table = this.sheet.template.table
            var trs = table.tr
            trs.forEach(tr => {
                let tds = tr.td
                let row = 999
                tds.forEach(td => {
                    row = Math.min(td.rowspan, row)
                })
                height += cellHeight*row
            })
            return height
        },
        // 获取表单宽度
        getTableWidth() {
            var table = this.sheet.template.table
            var th_widths = table.th
            let cell_widths = []
            th_widths.forEach(v => {
                if (v instanceof String) { // 百分比
                    cell_widths.push(v*this.designSize.width)
                } else {
                    cell_widths.push(v)
                }
            })
            return cell_widths.reduce((prev, cur) => {return prev + cur})
        }
    }
}