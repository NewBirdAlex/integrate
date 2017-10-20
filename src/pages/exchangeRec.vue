<template>
    <div>
        <div class="bgWhite">
            <div class="paddingAll borderBottom exr overflow" v-for="i in 5">
                <img src="../assets/img/1.jpg" class=" marginRight" alt="">
                <div class="lh40">
                    <p class="fs30 "> <strong>折叠晴雨两用防晒太阳伞</strong></p>
                    <p class="fs26 gray">兑换时间：2017-8-16</p>
                    <span class="yellow type fs30" v-if="i==1">兑换中</span>
                    <span class="green type fs30" v-else-if="i==2">已兑换</span>
                    <span class="red type fs30" v-else="i==3">兑换失败</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .exr{
        position: relative;
        img{
            .fl;
            width: 1.2rem;
            height: 1.2rem;
            .borderRadius;
        }
        p{
            margin-top: 0.15rem;
        }
        .type{
            position: absolute;
            right: 0.2rem;
            top:50%;
            transform: translateY(-50%);
        }
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>