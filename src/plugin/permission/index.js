import { permissionCheck } from '@/router'

// Vue组件, 如果用户没有足够的权限, 控件将被移除，就是不显示
// v-permission="['user/list']"

export default {
    install(Vue, options) {
        Vue.directive('permission', {
            async inserted(el, binding, vnode) {
                const { value } = binding
                if (value && value instanceof Array) {
                    if (value.length > 0) {
                        // 检查权限
                        let cool = permissionCheck(value)
                    
                        if (!cool) { el.parentNode && el.parentNode.removeChild(el) }
                    }
                } else {
                    throw new Error(`need roles! Like v-permission="['admin','user/list']"`)
                }
            }
        })
    }
}



