<template>
    <d2-container type="card">
        <template slot="header"
            >禁用</template
        >
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="handleClick">菜单1</v-contextmenu-item>
            <v-contextmenu-item disabled @click="handleClick"
                >菜单2</v-contextmenu-item
            >
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-submenu title="子菜单">
                <v-contextmenu-item @click="handleClick"
                    >菜单3</v-contextmenu-item
                >
                <v-contextmenu-item divider></v-contextmenu-item>
                <v-contextmenu-submenu disabled title="子菜单">
                    <v-contextmenu-item @click="handleClick"
                        >菜单5</v-contextmenu-item
                    >
                </v-contextmenu-submenu>
                <v-contextmenu-item @click="handleClick"
                    >菜单4</v-contextmenu-item
                >
            </v-contextmenu-submenu>
        </v-contextmenu>
        <div class="contextmenu-pad" v-contextmenu:contextmenu>
            右键点击此区域
        </div>
    </d2-container>
</template>

<script>
export default {
    methods: {
        handleClick(instance, event) {
            this.$message({
                message: `你点击了${instance.$slots.default[0].text}`,
                type: 'info'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/pub.scss';
</style>
