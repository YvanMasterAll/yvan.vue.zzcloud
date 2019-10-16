import store from '@/store'

// Vue组件, 如果用户没有足够的权限, 控件将被移除

export default {
    install(Vue, options) {
        Vue.directive('permission', {
            async inserted(el, binding, vnode) {
                const { value } = binding
                // let user = await store.dispatch('d2admin/user/get')
                // let perms = user.perms

                if (value && value instanceof Array && value.length > 0) {
                    // 检查权限
                } else {
                    // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
                }
            }
        })
    }
}



