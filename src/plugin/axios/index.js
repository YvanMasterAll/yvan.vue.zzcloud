import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/libs/util'
import * as urls from '@/dataSourceConfig'
import { env } from '@/libs/util.storage'
import { RequestError, AuthFailed } from '@/libs/util.errors'
import Vue from 'vue'

// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

// 记录和显示错误
function errorLog(error) {
    // 添加到日志
    store.dispatch('d2admin/log/push', {
        message: '数据请求异常',
        type: 'danger',
        meta: {
            error
        }
    })
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(error)
    }
    // 显示提示
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 10000, // 请求超时时间
    // withCredentials: true // 这个属性暂时不加, 如果加了后台必须指定前端地址, 比较麻烦, 不加会产生什么问题还未知
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token')
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['X-Token'] = token
        config.headers.common['Authorization'] = 'Bearer ' + token
        return config
    },
    error => {
        // 发送失败
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 保存身份信息
        if (response.headers.authorization != null) {
            util.cookies.set('token', response.headers.authorization)
        }
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        let data = typeof dataAxios === 'object' ? dataAxios:JSON.parse(dataAxios)
        let code = data.code
        if (code === 200) {
            data.valid = true
        } else {
            data.valid = false
        }
        if (code === 401 || code == 411) { // (401)授权失败, (411)token异常
            window.location.href = '/#/login'
        }
        if (code === 410) { // (410)缺少资源权限
            Message({
                message: data.msg,
                type: 'error',
                duration: 5 * 1000
            })
        }
        if (code === 0) { // 测试数据
            return data.data
        } else {
            return data
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = '未授权，请登录'; break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = '请求超时'; break
                case 500: error.message = '服务器内部错误'; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
        } else {
            let _error = new RequestError()
            return {
                code: _error.code,
                msg: _error.msg,
                valid: false
            }
        }
        // errorLog(error)
        // return Promise.reject(error)
        return {
            code: error.response.status,
            msg: error.message,
            valid: false
        }
    }
)

/**
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 10000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */
export default function request(option) {
    console.log(process.env.VUE_APP_API + option.url)
    return new Promise((resolve, reject) => {
        let _option = {
            method: option.method,
            url: option.url,
            params: option.params,
            data: option.data
        }
        // 显示菊花
        let loading = Vue.prototype.$loading({fullscreen: true})
        service(_option).then(
            data => {
                // 隐藏菊花
                loading.close()
                if (option.url === urls.signin.url && data.valid) {
                    // 本地储存
                    env.setUser(data.data)
                    util.cookies.set('token', data.msg)
                    window.location.href = '/#/'
                }
                resolve(data)
            },
            error => {
                // 隐藏菊花
                loading.close()
                console.log(error)
            }
        )
    })
}

// export default service

// import store from '@/store'
// import axios from 'axios'
// import { Message } from 'element-ui'
// import util from '@/libs/util'

// // 创建一个错误
// function errorCreate(msg) {
//     const error = new Error(msg)
//     errorLog(error)
//     throw error
// }

// // 记录和显示错误
// function errorLog(error) {
//     // 添加到日志
//     store.dispatch('d2admin/log/push', {
//         message: '数据请求异常',
//         type: 'danger',
//         meta: {
//             error
//         }
//     })
//     // 打印到控制台
//     if (process.env.NODE_ENV === 'development') {
//         util.log.danger('>>>>>> Error >>>>>>')
//         console.log(error)
//     }
//     // 显示提示
//     Message({
//         message: error.message,
//         type: 'error',
//         duration: 5 * 1000
//     })
// }

// // 创建一个 axios 实例
// const service = axios.create({
//     baseURL: process.env.VUE_APP_API,
//     timeout: 5000 // 请求超时时间
// })

// // 请求拦截器
// service.interceptors.request.use(
//     config => {
//         // 在请求发送之前做一些处理
//         const token = util.cookies.get('token')
//         // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//         config.headers['X-Token'] = token
//         return config
//     },
//     error => {
//         // 发送失败
//         console.log(error)
//         return Promise.reject(error)
//     }
// )

// // 响应拦截器
// service.interceptors.response.use(
//     response => {
//         // dataAxios 是 axios 返回数据中的 data
//         const dataAxios = response.data
//         // 这个状态码是和后端约定的
//         const { code } = dataAxios
//         // 根据 code 进行判断
//         if (code === undefined) {
//             // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
//             return dataAxios
//         } else {
//             // 有 code 代表这是一个后端接口 可以进行进一步的判断
//             switch (code) {
//                 case 0:
//                     // [ 示例 ] code === 0 代表没有错误
//                     return dataAxios.data
//                 case 'xxx':
//                     // [ 示例 ] 其它和后台约定的 code
//                     errorCreate(
//                         `[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`
//                     )
//                     break
//                 default:
//                     // 不是正确的 code
//                     errorCreate(`${dataAxios.msg}: ${response.config.url}`)
//                     break
//             }
//         }
//     },
//     error => {
//         if (error && error.response) {
//             switch (error.response.status) {
//                 case 400:
//                     error.message = '请求错误'
//                     break
//                 case 401:
//                     error.message = '未授权，请登录'
//                     break
//                 case 403:
//                     error.message = '拒绝访问'
//                     break
//                 case 404:
//                     error.message = `请求地址出错: ${error.response.config.url}`
//                     break
//                 case 408:
//                     error.message = '请求超时'
//                     break
//                 case 500:
//                     error.message = '服务器内部错误'
//                     break
//                 case 501:
//                     error.message = '服务未实现'
//                     break
//                 case 502:
//                     error.message = '网关错误'
//                     break
//                 case 503:
//                     error.message = '服务不可用'
//                     break
//                 case 504:
//                     error.message = '网关超时'
//                     break
//                 case 505:
//                     error.message = 'HTTP版本不受支持'
//                     break
//                 default:
//                     break
//             }
//         }
//         errorLog(error)
//         return Promise.reject(error)
//     }
// )

// export default service