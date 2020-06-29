<template>
    <d2-container>
        <page-header />
        <page-main />
    </d2-container>
</template>
<script>
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'device-panel',
    components: {
        PageHeader: () => import('./components/PageHeader'),
        PageMain: () => import('./components/PageMain'),
    },
}
</script>