<template>
    <div class="page">
        <p class="page_title">401 page you have no priviliges</p>
        <el-button class="d2-mt" @click="handleClick">
            返回首页
        </el-button>
    </div>
</template>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    methods: {
        // ...mapActions('d2admin/page', ['close']),
        // 点击按钮的时候跳转到源代码
        handleClick() {
            // this.close({
            //     tagName: '/401'
            // })
            this.$router.replace({ path: '/' })
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    background: #303133;
    background-blend-mode: multiply, multiply;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .page_title {
        font-size: 20px;
        color: #fff;
    }
}
</style>