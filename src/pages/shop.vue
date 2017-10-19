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
        <div class="paddingAll bgWhite overflow">
            <div class="item">
                <i class="icon iconfont icon-jifen yellow"></i>
                可用积分：<span class="yellow">600</span>
            </div>
            <div class="item">
                <i class="icon iconfont icon-duihuanjilu blue"></i>
                兑换记录
            </div>
        </div>

        <div class="marginTop bgWhite paddingAll tac  ">
            <h3 class="fs34">他们都在兑</h3>
            <p class="blue fs30 marginTop">每个部门兑换分数不一样喔</p>
        </div>

        <div class="overflow marginTop">
            <div class="product" v-for="i in 10" @click="go">
                <img src="../assets/img/1.jpg" alt="">
                <h4 class="paddingLeft fs30"> <strong>不锈钢真空杯</strong></h4>
                <div class="paddingLeft fs26 marginTop">
                    <span class="yellow fs30">500</span>
                    <span class="gray marginRight">积分</span>

                    <span class="cj" :class="{'dh':i==2}" v-if="i==2">兑换</span>
                    <span class="cj" v-else="">抽奖</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .product{
        .fl;
        .marginAll;
        .bgWhite;
        .borderRadius;
        .overflow;
        .paddingBottom;
        .lh40;
        width:calc(~"50% - 0.4rem");
        img{
            width:3.45rem;
            height:3.45rem;
        }
        .cj{
            padding: 0.07rem 0.2rem;
            color: white;
            background: red;
            border-radius: 0.3rem;
        }
        .dh{
            .bgWhite;
            border:1px solid @red;
            color:@red;
        }
    }
    .item{
        .fl;
        width: calc(~"50% - 0.2rem");
        .tac;
        .fs30;
        i{
            font-size: 0.6rem;
        }
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
        },
        methods:{
            go(){
                this.$router.push('/product');
            }
        }
    }
</script>