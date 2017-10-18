<template>
    <div>
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="../assets/img/1.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item><img src="../assets/img/2.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../assets/img/3.jpg" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="paddingAll bgWhite test">

        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .test{
        width:calc(~"100% - 30px");
        height: 2rem;
        background: red;

    }
    .slide{
        height: 3rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
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