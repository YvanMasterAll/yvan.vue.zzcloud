<script>
import util from '@/libs/util'
import sheetTableData from '@/mixins/sheetTableData'
import commonData from '@/mixins/commonData'
export default {
    mixins: [sheetTableData, commonData],
    data() {
        return { 
            dialog: {
                visible: false,
                width: '500px',
                appendToBody: true
            },
            title: '模板编写说明'
         }
    },
    render() {
        var page = 
            <d2-container class='sheet-editor' spacious>
                <el-dialog
                    class='nofooter'
                    {...{ attrs: this.dialog }}
                    title={this.title}
                    on-close={this.cancel}
                >
                    { this.guideContent }
                </el-dialog>
                <d2-search-panel slot='header'>
                    <template slot="prefix">
                        <div>
                            <d2-button type="primary" class='is-thin' size='mini' icon="el-icon-arrow-left" label="返回模板列表" to="/oa/sheet/tmpl" plain/>
                        </div>
                    </template>
                    <template slot="title">
                        <div style='display: flex; justify-content: flex-end;'>
                            <el-button-group>
                                { this.renderSaveButton }
                            </el-button-group>
                        </div>
                    </template>
                </d2-search-panel>
                <el-row style={{height: '100%'}}>
                    <el-col span={10} style={{height: '100%'}}>
                        <div class='editor-wrapper'>
                            <div class='editor-action-bar'>
                                <div class='action-group'>
                                    { this.guideButton }
                                    { this.runButton }
                                    { this.addSnippetButton }
                                </div>
                            </div>
                            <div class='editor-content'>
                                <d2-json-editor ref='jsonEditor' value={JSON.parse(this.sheet.editor.content)} />
                            </div>
                        </div>
                    </el-col>
                    <el-col span={14} style={{height: '100%'}}>
                        <div class='sheet-preview-canvas'>
                            <div class='canvas-wrapper'>
                                <div class='canvas-content'>
                                    { this.renderSheet() }
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </d2-container>
        return page
    },
    computed: {
        // 说明按钮
        guideButton() {
            return <el-button size='mini' type='text' icon="el-icon-s-flag" on-click={this.showGuideDialog}>说明</el-button>
        },  
        // 运行按钮
        runButton() {
            return <el-button size='mini' type='text' icon="el-icon-video-play" on-click={this.onPreview}>运行</el-button>
        },  
        // 添加表格片段按钮
        addSnippetButton() {
            let items = []
            this.sheet.editor.snippets.forEach(d => {
                items.push(<el-dropdown-item command={d.type}>{d.title}</el-dropdown-item>)
            })
            return (
                <el-dropdown onCommand={this.addSnippetAction} style='display: flex; align-content: center'>
                    <el-button type="text" size='mini' class='is-thin' icon='el-icon-goods'>
                        快捷输入<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        { items }
                    </el-dropdown-menu>
                </el-dropdown>
            )
        },
        // 说明文档
        guideContent() {
            return (
                <div class='guide-container' style={{}}>
                    <ul style={{paddingLeft: '20px'}}>
                        <li style={{lineHeight: '34px'}}><strong style={{color: '#333'}}>title：</strong>模板标题，必须；</li>
                        <li style={{lineHeight: '34px'}}><strong style={{color: '#333'}}>cellHeight：</strong>表格单元格高度，必须；</li>
                        <li style={{lineHeight: '34px'}}><strong style={{color: '#333'}}>table > th：</strong>表格列宽序列，对应每一列的宽度，必须；</li>
                        <li style={{lineHeight: '34px'}}><strong style={{color: '#333'}}>table > td > rowspan：</strong>单元格所占行数，默认1；</li>
                        <li style={{lineHeight: '34px'}}><strong style={{color: '#333'}}>table > td > colspan：</strong>单元格所占列数，默认1；</li>
                    </ul>
                </div>
            )
        }
    },
    async created() {
        await this.getSheetFields()
        this.initEditor(this.sheet_fields)
    },
    methods: {
        // 添加表格片段
        addSnippetAction(type) {
            let snippet = this.sheet.editor.snippets.filter(d => d.type === type)[0].snippet
            this.$refs.jsonEditor.insert(snippet)
        },
        // 重写数据保存
        saveData() {
            this.saveTmpl()
        },
        // 显示说明对话框
        showGuideDialog() {
            this.dialog.visible = true
        },
        // 关闭说明对话框
        cancel() {
            this.dialog.visible = false
        },
    }
}
</script>