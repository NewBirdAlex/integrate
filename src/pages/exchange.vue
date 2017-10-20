<template>
    <div>
        <div class="bgWhite">
            <div class=" borderBottom paddingAll list marginBottom" v-for="i in 5">
                <img src="../assets/img/head.png" class="headPicture marginRight fl" alt="">
                <div>
                    <p class="fs30">
                        <strong>温文雅</strong>
                        <strong class="fr">1000分</strong>
                    </p>
                    <p class="gray fs26">
                        设计部
                    </p>
                    <p >
                        <span class="gray fs24">
                            兑换时间：08-16 16:08
                        </span>
                        <span class="fr green fs30">
                            兑换中
                        </span>
                    </p>
                </div>
            </div>
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
            return {

            }
        }
    }
</script>