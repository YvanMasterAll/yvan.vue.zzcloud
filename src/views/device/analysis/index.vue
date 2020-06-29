<template>
    <d2-container>
        <page-main />
    </d2-container>
</template>
<script>
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'device-analysis',
    components: {
        PageMain: () => import('./components/PageMain')
    },
}
</script>
<style scoped lang="scss">
::v-deep .d2-container-full > .d2-container-full__body{
    background-color: $color-bg !important;
}
</style>