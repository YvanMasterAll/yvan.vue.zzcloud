import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import storage from './util.storage'
var moment = require('moment')

const util = { cookies, db, log, storage }

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
    const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
    window.document.title = `${processTitle}${
        titleText ? ` | ${titleText}` : ''
    }`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'd2admin-link-temp')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/// 日期格式化
util.toDateString = function(date) {
    let format = "YYYY-MM-DD HH:mm:ss"
    if (date) {
        return moment(date).format(format)
    }
    return moment().format(format)
}
util.toDate = function(dateString) {
    let format = "YYYY-MM-DD HH:mm:ss"

    return moment(dateString, format)
}

/// 日期组件选项
util.pickerOptions = {
    shortcuts: [{
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
},

/// 字符串扩展
String.prototype.fullUrl = function() {  
    return process.env.VUE_APP_API + this
}

export default util
