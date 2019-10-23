<template>
    <!-- <d2-container :style="background"> -->
    <d2-container>
        <card />
    </d2-container>
</template>

<script>
import Card from './card'
import bg from '@/assets/images/texture_basketball.png'
export default {
    components: { Card },
    data() {
        return {
            background: {backgroundColor: 'red', backgroundImage: 'url(' + bg + ')'},
        }
    }
}   
</script>

<style lang="scss" scoped>
::v-deep .d2-container-full__body {
    background-image: url('~@/assets/images/texture_food.png') !important;
}
</style>