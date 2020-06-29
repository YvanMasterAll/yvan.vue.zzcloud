import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { createMenu } from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
    name: 'd2-layout-header-aside-menu-side',
    mixins: [menuMixin],
    render(h) {
        return (
            <div class="d2-layout-header-aside-menu-side">
                <el-menu
                    collapse={this.asideCollapse}
                    collapseTransition={this.asideTransition}
                    uniqueOpened={true}
                    defaultActive={this.$route.fullPath}
                    ref="menu"
                    onSelect={this.handleMenuSelect}
                >
                    {this.aside.map(menu => createMenu.call(this, h, menu))}
                </el-menu>
                {this.aside.length === 0 && !this.asideCollapse ? (
                    <div
                        class="d2-layout-header-aside-menu-empty"
                        flex="dir:top main:center cross:center"
                    >
                        <d2-icon name="inbox"></d2-icon>
                        <span>没有侧栏菜单</span>
                    </div>
                ) : null}
            </div>
        )
    },
    data() {
        return {
            asideHeight: 300,
            BS: null
        }
    },
    computed: {
        ...mapState('d2admin/menu', [
            'aside',
            'asideCollapse',
            'asideTransition'
        ])
    },
    watch: {
        // 折叠和展开菜单的时候销毁 better scroll
        asideCollapse(val) {
            this.scrollDestroy()
            setTimeout(() => {
                this.scrollInit()
            }, 500)
        },
        // 监听路由 控制侧边栏激活状态
        // '$route.fullPath': {
        //     handler(value) {
        //         this.active = value
        //         this.$nextTick(() => {
        //             // 这段代码已被项目移除, 但是为了让菜单选中效果正常激活, 所以在这里重新加上, 如果有更好的办法可以考虑取代它
        //             if (this.aside.length > 0 && this.$refs.menu) {
        //                 // console.log(this.$refs.menu) // 菜单展开折叠还存在异常, 可以尝试通过reference找到修改它的办法
        //                 this.$refs.menu.activeIndex = value
        //             }
        //         })
        //     },
        //     immediate: true
        // }
    },
    mounted() {
        this.scrollInit()
    },
    beforeDestroy() {
        this.scrollDestroy()
    },
    methods: {
        scrollInit() {
            this.BS = new BScroll(this.$el, {
                mouseWheel: true,
                click: true
                // 如果你愿意可以打开显示滚动条
                // scrollbar: {
                //   fade: true,
                //   interactive: false
                // }
            })
        },
        scrollDestroy() {
            // https://github.com/d2-projects/d2-admin/issues/75
            try {
                this.BS.destroy()
            } catch (e) {
                delete this.BS
                this.BS = null
            }
        }
    }
}