<template>
    <div>
        <div class="paddingAll borderBottom bgWhite lh40" v-for=" i in 5">
            <p class="fs30">
                折叠晴雨两用防晒太阳伞
                <span class="yellow fr" v-if="i!=3">兑换中</span>
                <span class="green fr" v-else>已兑换</span>
            </p>
            <p class="fs26 gray">
                <span>九月份设计部积分抽奖</span>
                <span class="fr fs24">2017-8-16  18:30</span>
            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>