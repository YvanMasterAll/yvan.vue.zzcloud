<template>
    <div ref="editor"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name: 'd2-quill',
    props: {
        value: {
            type: String,
            required: false,
            default: ''
        },
        api: {
            default: null
        },
        readOnly: {
            default: false
        }
    },
    data() {
        return {
            Quill: undefined,
            currentValue: '',
            options: {
                theme: 'snow',
                bounds: document.body,
                debug: 'warn',
                modules: {
                    toolbar: [
                        [{ 'font': [] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'], // 引用和代码块
                        [{ 'script': 'sub' }, { 'script': 'super' }], // 上标和下标
                        [{ list: 'ordered' }, { list: 'bullet' }], // 列表
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }], // 减少缩进和缩进
                        // [{ 'direction': 'rtl' }], // 文本方向
                        // [{ size: ['small', false, 'large', 'huge'] }],
                        ['clean'],
                        ['link', 'image']
                    ]
                },
                placeholder: '书写你的内容',
                readOnly: this.readOnly
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                // 确认是新的值
                if (val !== this.currentValue) {
                    this.currentValue = val
                    // 尝试更新
                    if (this.Quill) {
                        this.Quill.pasteHTML(this.value)
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const editor = this.$refs.editor
            // 初始化编辑器
            this.Quill = new Quill(editor, this.options)
            // 默认值
            this.Quill.pasteHTML(this.currentValue)
            // 绑定事件
            this.Quill.on('text-change', (delta, oldDelta, source) => {
                const html = this.$refs.editor.children[0].innerHTML
                const text = this.Quill.getText()
                const quill = this.Quill
                // 更新内部的值
                this.currentValue = html
                // 发出事件 v-model
                this.$emit('input', html)
                // 发出事件
                this.$emit('change', { html, text, quill })
            })
            // 将一些 quill 自带的事件传递出去
            this.Quill.on('text-change', (delta, oldDelta, source) => {
                this.$emit('text-change', delta, oldDelta, source)
            })
            this.Quill.on('selection-change', (range, oldRange, source) => {
                this.$emit('selection-change', range, oldRange, source)
            })
            this.Quill.on('editor-change', (eventName, ...args) => {
                this.$emit('editor-change', eventName, ...args)
            })
            // 自定义图片上传
            var toolbar = this.Quill.getModule('toolbar')
            toolbar.addHandler('image', () => {
                var fileInput = toolbar.container.querySelector('input.ql-image[type=file]')
                if (fileInput == null) {
                    fileInput = document.createElement('input')
                    fileInput.setAttribute('type', 'file')
                    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
                    fileInput.classList.add('ql-image')
                    fileInput.addEventListener('change',  () => {
                        if (fileInput.files != null && fileInput.files[0] != null) {
                            this.uploadToServer(fileInput.files[0], (res) => {
                                var range = this.Quill.getSelection()
                                if (range) {
                                    fileInput.value = null
                                    // 在当前光标位置插入图片
                                    toolbar.quill.insertEmbed(range.index, 'image', res)
                                    // 将光标移动到图片后面
                                    toolbar.quill.setSelection(range.index + 1)
                                }
                            })
                        }
                    })
                    toolbar.container.appendChild(fileInput)
                }
                fileInput.click()
            })
        },
        async uploadToServer(file, callback) {
            const formData = new FormData()
            formData.append('upload', file)
            let result = await this.api(formData)
            if (result.valid) {
                callback(result.data)
            }
        }
    }
}
</script>
<style>
.ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
}
</style>