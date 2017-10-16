<template>
    <div class=" paddingAll">
        <div class="overflow bgWhite paddingAll list marginTop" v-for="i in 8">
            <p class="fs30">本月的积分抽奖活动已经开启了，大家赶紧去抽奖吧，手快有手慢无哦</p>
            <p class="fs28 gray overflow"> <span class="fr">美蜂科技</span></p>
            <p class="fs26 gray overflow"> <span class="fr">2017-09-01 12:20</span></p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .list{
        line-height: 0.4rem;
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>