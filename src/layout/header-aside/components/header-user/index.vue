<template>
    <el-dropdown trigger="click" size="small" class="d2-mr" style="padding-left: 8px;">
        <div>
            <el-image class="avatar" :src="info.avatar" fit="cover"></el-image>
            <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <router-link to="/profile" style="text-decoration: none;">
                <el-dropdown-item>
                    <d2-icon name="user-circle" class="d2-mr-5"/>
                    个人中心
                </el-dropdown-item>
            </router-link>
            <span style="display:block;">
                <el-dropdown-item divided @click.native="logOff">
                    <d2-icon name="power-off" class="d2-mr-5"/>
                    退出登录
                </el-dropdown-item>
            </span>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState('d2admin/user', ['info'])
    },
    methods: {
        ...mapActions('d2admin/account', ['logout']),
        /**
         * @description 登出
         */
        logOff() {
            this.logout({
                confirm: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 40px; 
    height: 40px; 
    border-radius: 6px; 
}
.el-icon-caret-bottom {
    position: relative;
    padding-left: 4px;
    bottom: 3px;
}
.el-dropdown-menu__item {
    list-style: none;
}
</style>

