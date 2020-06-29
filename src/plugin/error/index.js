import { get } from 'lodash'
import store from '@/store'
import util from '@/libs/util'

export default {
    install(Vue, options) {
        Vue.config.errorHandler = function(error, instance, info) {
            Vue.nextTick(() => {
                // store 追加 log
                store.dispatch('d2admin/log/push', {
                    message: `${info}: ${error.message}`,
                    type: 'danger',
                    meta: {
                        error,
                        instance
                    }
                })
                // 只在开发模式下打印 log
                if (process.env.NODE_ENV === 'development') {
                    util.log.capsule('D2Admin', 'ErrorHandler', 'danger')
                    util.log.danger('>>>>>> 错误信息 >>>>>>')
                    console.log(info)
                    util.log.danger('>>>>>> Vue 实例 >>>>>>')
                    console.log(instance)
                    util.log.danger('>>>>>> Error >>>>>>')
                    console.log(error)
                }
            })
        }
    }
}

// import { get, isObject } from 'lodash'
// import store from '@/store'
// import util from '@/libs/util'
// // 下面的代码是最新的代码，会捕捉所有异常，但是觉得没必要
// export default {
//     install(Vue, options) {
//         function writeLog(logType) {
//             return (error, vm, info = '') => {
//                 Vue.nextTick(() => {
//                     store.dispatch('d2admin/log/push', {
//                         message: `${info}: ${
//                             isObject(error) ? error.message : error
//                         }`,
//                         type: logType,
//                         meta: {
//                             error,
//                             vm
//                         }
//                     })
//                     if (process.env.NODE_ENV !== 'development') return
//                     util.log.capsule('D2Admin', 'ErrorHandler', logType)
//                     util.log.danger('>>>>>> 错误信息 >>>>>>')
//                     console.log(info)
//                     util.log.danger('>>>>>> Vue 实例 >>>>>>')
//                     console.log(vm)
//                     util.log.danger('>>>>>> Error >>>>>>')
//                     console.log(error)
//                 })
//             }
//         }
//         if (process.env.NODE_ENV === 'development') {
//             Vue.config.warnHandler = writeLog('warning')
//         }
//         Vue.config.errorHandler = writeLog('danger')
//         window.onunhandledrejection = error => {
//             // 如果是路由重复不提交异常
//             if (get(error, 'reason.name', "Unknown error") == 'NavigationDuplicated') {
//                 return
//             }
//             store.dispatch('d2admin/log/push', {
//                 message: get(error, 'reason.message', 'Unknown error'),
//                 type: 'danger',
//                 meta: {
//                     error: get(error, 'reason'),
//                     trace: get(error, 'reason.stack')
//                 }
//             })
//         }
//         window.onerror = (event, source, lineno, colno, error) => {
//             store.dispatch('d2admin/log/push', {
//                 message: get(error, 'message', 'Unknown error'),
//                 type: 'danger',
//                 meta: {
//                     error,
//                     trace: get(error, 'stack'),
//                     source: `${source}@${lineno}:${colno}`,
//                     event: event
//                 }
//             })
//         }
//     }
// }
