<template>
    <div class="wrap">
        <div class="top overflow">
            <img src="../assets/img/coujiang.jpg" class="fl w100" alt="">
        </div>
        <div class="paddingTop"></div>
        <div class="wp1 marginAll myLottery marginTop marginBottom">
            <div class="wp2 spc">
                <img src="../assets/img/sanjiao.png" class="sanjiao" alt="">
                <img src="../assets/img/sanjiao2.png" class="sanjiao" alt="">
                <img src="../assets/img/sanjiao3.png" class="sanjiao" alt="">
                <div class="title">我的抽奖</div>
                <table class="cjTable">
                    <tr class="fs30">
                        <td>抽奖主题</td>
                        <td class="tac">排名</td>
                        <td class="tac">抽奖次数</td>
                    </tr>
                    <tr v-for="i in 3" class="fs28">
                        <td>{{i}}. 8月设计部积分抽奖</td>
                        <td class="tac">2</td>
                        <td class="tac">1</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="rec">
            <div>
                <div>
                    <div class="paddingTop paddingRight paddingBottom borderBottom fs30 wdYellow" >
                        我的抽奖记录
                        <span class="rightArrow fr"><i class="icon iconfont icon-xiala1 fs30"></i></span>
                    </div>
                    <div class="roll">
                        <div class="item  tac fs28 bgWhite" v-for="(item,index) in priceList" :key="index" :class="{'midSpace':index==1||index==4||index==7}">
                            <img src="../assets/img/1.jpg" alt="">
                            <p class="paddingAll" @click="roll">乐扣保温杯</p>
                            <div class="" :class="{'cover':item.light}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wp1{background: #fe4237;}
    .wp2{background: #e72920;}
    @lighYellow:#ffd66b;
    @wdYellow:#ffd66b;
    .wdYellow{color:@wdYellow;border-bottom: 1px solid #f9625a}
    .cjTable{
        width: 6.2rem;
        color:@wdYellow;
        .marginTop;
        margin-left: 0.4rem;
        .lh40;
        td,th{
            padding: 0.1rem 0;
        }
    }
    .title{
        width: 5.80rem;
        height: 0.88rem;
        margin: 0 auto;
        color: #bd1008;
        font-size: 0.36rem;
        .tac;
        line-height: 0.88rem;
        background-color: rgba(255, 214, 107, 1);
        border-radius: 0px 0px 6px 6px;
    }
    .myLottery{
        padding: 0 0.1rem;
    }
    .wrap{
        background: #bd1008;
        padding-bottom: 1rem;
    }
    .spc{
        position: relative;
        padding-bottom: 0.78rem;

        .sanjiao{
            position: absolute;
            bottom: 0rem;
            left:0;
            transform: translate(-100%);
            width: 0.3rem;
            &:nth-child(2){
                right:0;
                left:auto;
                transform: translate(100%);
            }
            &:nth-child(3){
                bottom:0;
                left:0;
                width: 100%;
                transform: translateY(100%);
            }
        }
    }

    .rec{
        margin:1rem 0.12rem;
        padding: 0.1rem;
        .wp1;
        >div{
            .wp2;
            padding: 0.1rem;
        }
    }

    .roll{
        /*padding: 0.3rem 0.1rem;*/
        padding:0.3rem 0;
        .tac;
        .overflow;
        .item{
            margin-top: 0.2rem;
            display: inline-block;
            position: relative;
            img{
                width: 2.1rem;
                height: 2.1rem;
            }
            /*&:nth-child(2n+3){*/
            /*}*/
            .cover{
                position: absolute;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
                background: @yellow;
                opacity: 0.6;
            }
        }
        .midSpace{
            margin: 0.2rem 0.18rem;

        }
    }
</style>
<script>
    let timer = null;
    export default {
        data() {
            return {
                rollArr:[0,1,2,5,8,7,6,3],
                priceList:[
                    {
                        light:true
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    },
                    {
                        light:false
                    }
                ]
            }
        },
        methods:{
            roll(){

                let num = 0;
                let that = this;
//                let rollArr = this.rollArr;

                clearInterval(timer)
                timer = setInterval(function(){

                    that.priceList[that.rollArr[num]].light=false;
                    num+=1;
                    num>=that.rollArr.length?num=0:'';
                    that.priceList[that.rollArr[num]].light=true;

                },50)
            }
        }
    }
</script>