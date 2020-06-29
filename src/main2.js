// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// mock
import '@/mock'

// [ 可选组件 ]D2-Crud
import D2Crud from '@d2-projects/d2-crud'
// [ 可选组件 ] 图表
import VCharts from 'v-charts'
// [ 可选组件 ] 右键菜单
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
// [ 可选组件 ] JSON 树状视图
import vueJsonTreeView from 'vue-json-tree-view'
// [ 可选组件 ] 网格布局
import { GridLayout, GridItem } from 'vue-grid-layout'
// [ 可选组件 ] 区域划分
import SplitPane from 'vue-splitpane'
// [ 可选组件 ] UEditor
import VueUeditorWrap from 'vue-ueditor-wrap'
// [ 可选插件 ] 数据导入导出
import pluginExport from '@d2-projects/vue-table-export'
import pluginImport from '@d2-projects/vue-table-import'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(d2Admin)

// 可选插件组件
Vue.use(D2Crud)
Vue.use(VCharts)
Vue.use(contentmenu)
Vue.use(vueJsonTreeView)
Vue.use(pluginExport)
Vue.use(pluginImport)
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)
Vue.component('SplitPane', SplitPane)
Vue.component('VueUeditorWrap', VueUeditorWrap)

new Vue({
    render: h => h(App),
}).$mount('#app')
