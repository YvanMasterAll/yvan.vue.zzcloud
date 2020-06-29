<template>
    <div class="json-editor">
        <label>
            <textarea ref="textarea" />
        </label>
    </div>
</template>
<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
require('script-loader!jsonlint')
export default {
    name: 'd2-json-editor',
    props: {
        value: {
            type: [Array, Object],
            default: () => {
                return null
            }
        }
    },
    data() {
        return {
            jsonEditor: false
        }
    },
    watch: {
        // value(value) {
        //     const editorValue = this.jsonEditor.getValue()
        //     if (editorValue) {
        //         this.$emit('change', editorValue)
        //     } else {
        //         this.$baseMessage('JSON不能为空,否则无法生成表格', 'error')
        //     }
        //     if (value !== editorValue) {
        //         this.jsonEditor.setValue(JSON.stringify(this.value, null, 4))
        //     }
        // }
    },
    mounted() {
        this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
            lineNumbers: true,
            mode: 'application/json',
            gutters: ['CodeMirror-lint-markers'],
            theme: 'rubyblue',
            indentUnit: 4,
            lint: true,
        })
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 4))
        this.jsonEditor.on('change', cm => {
            if (this.isJsonString(cm.getValue())) {
                this.$emit('change', cm.getValue())
            }
        })
    },
    methods: {
        getValue() {
            return this.jsonEditor.getValue()
        },
        insert(value) {
            let cursor = this.jsonEditor.getCursor()
            this.jsonEditor.replaceRange(value, cursor, cursor)
        },
        isJsonString(str) {
            try {
                if (typeof JSON.parse(str) == 'object') {
                    return true
                }
            } catch (e) {}
            return false
        }
    }
}
</script>
<style scoped>
.json-editor {
    position: relative;
    height: 100%;
}
.json-editor >>> .CodeMirror {
    padding: 0;
    border: none;
    border-radius: 0;
    height: 100%;
    font-size: 13px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
    color: #3dde2a;
}
.json-editor >>> .cm-s-rubyblue .CodeMirror-gutters {
    border-right: 1px solid black;
}
.json-editor >>> .cm-s-rubyblue.CodeMirror {
    background: #08233e;
    color: white;
}
.json-editor >>> .cm-s-rubyblue .CodeMirror-linenumber {
    color: #d6dccf;
}
.json-editor >>> .cm-s-rubyblue span.cm-atom {
    color: #3dde2a;
}
</style>
