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
        <div class="bgWhite paddingAll lh40">
            <div>
                <strong class="fs30">不锈钢真空保温杯</strong>
                <span class="fr gray fs26">剩余20件</span>
            </div>
            <div class="marginTop">
                <span class="yellow marginRight fs36">¥ 2000分</span>
                <span class="gray fs24">还差600分</span>
                <span class="fr fs26">已兑换8件</span>
            </div>
        </div>
        <div class="marginTop paddingAll bgWhite fs26 borderBottom">
            <span>他们都兑换了 <span class="gray">(8)</span></span>
            <span class="fr rightArrow">
                <i class="icon iconfont icon-xiala1"></i>
            </span>
        </div>
        <div class=" paddingAll bgWhite fs26">
            <span>请按部门选择兑换</span>
            <span class="fr rightArrow">
                <i class="icon iconfont icon-xiala1"></i>
            </span>
        </div>
        <div class=" bgWhite">
            <div class="marginTop fs30 paddingAll">
                商品详情
            </div>
            <div class="show">
                <img src="../assets/img/1.jpg" alt="">
            </div>
        </div>
        <div class="exchange fs36">确认兑换</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .exchange{
        .tac;
        .paddingAll;
        background: @blue;
        color:white;
        margin-top: 1rem;
    }
    body{
        padding-bottom: 0;
    }
    .show{
        img{
            width: 100%;
        }
    }
    .slide{
        height:4.8rem;
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