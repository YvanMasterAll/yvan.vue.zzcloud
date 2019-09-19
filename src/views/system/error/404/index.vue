<template>
    <div class="page">
        <img
            src="image/404.png"
            alt="页面不存在"
        />
        <h3 class="title">
            抱歉，你访问的页面不存在
        </h3>
        <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
            返回首页
        </el-button>
    </div>
</template>

<style lang="scss" scoped>
.page {
    background: white;
    background-blend-mode: multiply, multiply;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
}
</style>