import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import shortid from 'shortid'
import storage from './util.storage'
import lodash, { get, cloneDeep, keys, isNull } from 'lodash'
import { isUndefined } from 'lodash'
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

/**
 * @description 给指定的数组添加唯一id字段
 * @description https://github.com/dylang/shortid
 * @param {Array} source 数据源
 * @param {String} idKeyName 字段名
 */
util.arrayAddUniqueId = function(source = [], idKeyName = 'id') {
    return source.map(item => {
        let currentItem = cloneDeep(item)
        currentItem[idKeyName] = shortid.generate()
        return currentItem
    })
}

/**
 * 比较两个对象是否值一样 忽略顺序
 * @param {Array} array1 比较的对象
 * @param {Array} array2 比较的对象
 */
util.isIdenticalObject = function(object1, object2) {
    let result = true
    const keys1 = keys(object1)
    const keys2 = keys(object2)
    if (!this.isIdenticalArray(keys1, keys2)) {
        result = false
    } else {
        keys1.forEach(keyName => {
            if (object1[keyName] !== object2[keyName]) {
                result = false
            }
        })
    }
    return result
}

/**
 * 比较两个数组是否值一样 忽略顺序
 * @param {Array} array1 比较的数组
 * @param {Array} array2 比较的数组
 */
util.isIdenticalArray = function(array1, array2) {
    let result = true
    if (array1.length !== array2.length) {
        result = false
    } else {
        array1.forEach(item => {
            if (array2.indexOf(item) < 0) {
                result = false
            }
        })
    }
    return result
}

/// 日期格式化
util.toDateString = function(date, format = "YYYY-MM-DD HH:mm:ss") {
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
String.prototype.toImageArr = function() {
    if (this.trim() === '') {
        return []
    }
    let models = []
    let images = this.split('|')
    images.forEach(image => {
        let name = image.split('*')[0]
        let url = image.split('*')[1]
        models.push({name, url})
    })
    return models
}
Array.prototype.toImageStr = function() {
    let images = this.map(model => {
        return `${model.name}*${model.url}`
    })
    return images.join('|')
}


/// loadsh扩展
lodash.isNullOrUndefined = function(value) {
    return isNull(value) || isUndefined(value)
}

export default util
