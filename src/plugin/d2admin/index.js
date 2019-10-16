// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 组件
import '@/components'
// svg 图标
import '@/assets/svg-icons'

// 功能插件
import pluginError from '@/plugin/error'
import pluginLog from '@/plugin/log'
import pluginOpen from '@/plugin/open'
import pluginPermission from '@/plugin/permission'
import enums from '@/libs/util.enums'
import setting from '@/setting'

// 全局变量
global.setting = setting

export default {
    async install(Vue, options) {
        // 设置为 false 以阻止 vue 在启动时生成生产提示
        // https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false
        // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV
        // 常用枚举
        Vue.prototype.$enums = enums
        // 当前的 baseUrl
        Vue.prototype.$baseUrl = process.env.BASE_URL
        // 当前版本
        Vue.prototype.$version = process.env.VUE_APP_VERSION
        // 构建时间
        Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
        // Element
        Vue.use(ElementUI)
        // 插件
        Vue.use(pluginError)
        Vue.use(pluginLog)
        Vue.use(pluginOpen)
        Vue.use(pluginPermission)

        // 测试方法
        test()
    }
}

import request from '@/plugin/axios'
async function test() {
    console.log('hello, this is a testing method')
    // 测试接口
    // 测试资源权限
    // let result = await request({
    //     method: 'post', 
    //     url: '/api/book/add',
    //     params: {name: 'live here'}
    // })
    // console.log(result)
}
