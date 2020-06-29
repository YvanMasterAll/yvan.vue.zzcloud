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
import pluginLodash from '@/plugin/lodash'
import enums from '@/libs/util.enums'
import errors from '@/libs/util.errors'
import setting from '@/setting'
import echarts from "echarts"
import Viser from 'viser-vue'

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
        // 错误异常
        Vue.prototype.$errors = errors
        // 当前的 baseUrl
        Vue.prototype.$baseUrl = process.env.BASE_URL
        // 当前版本
        Vue.prototype.$version = process.env.VUE_APP_VERSION
        // 构建时间
        Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
        // Element
        Vue.use(ElementUI)
        // Echarts
        Vue.prototype.$echarts = echarts
        // Antv
        Vue.use(Viser)
        // 插件
        Vue.use(pluginError)
        Vue.use(pluginLog)
        Vue.use(pluginOpen)
        Vue.use(pluginLodash)
        Vue.use(pluginPermission)
    }
}
