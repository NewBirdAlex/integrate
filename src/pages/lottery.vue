<template>
    <div class="wrap">
        <div class="top overflow">
            <img src="../assets/img/coujiang.jpg" class="fl w100" alt="">
        </div>
        <div class="paddingTop"></div>
        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius">
            <div class="wp2 spc borderRadius">
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

        <div class="rec borderRadius">
            <div class="borderRadius">
                <div class="">
                    <router-link tag="div" to="/lotteryRec" class="paddingTop paddingRight paddingBottom borderBottom fs30 wdYellow">
                        我的抽奖记录
                        <span class="rightArrow fr"><i class="icon iconfont icon-xiala1 fs30"></i></span>
                    </router-link>
                    <div class="roll">
                        <div class="item  tac fs28 bgWhite" v-for="(item,index) in priceList" :key="index"
                             :class="{'midSpace':index==1||index==4||index==7}" v-if="index!=4">
                            <img src="../assets/img/1.jpg" alt="">
                            <p class="paddingAll" >乐扣保温杯</p>
                            <div class="" :class="{'cover':item.light}"></div>
                        </div>
                        <div v-else class="item tac midSpace midItem">
                            <div @click="start">
                                <div>
                                    <p>START</p>
                                    <p>开始抽奖</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius">
            <div class="wp2 spc borderRadius">
                <div class="title">中奖记录</div>
                <table class="cjTable">
                    <tr class="fs30" v-for="i in 3">
                        <td>刘诗梦抽奖抽中</td>
                        <td class="tac">乐扣不锈钢保温杯</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius rec">
            <div class="wp2 spc borderRadius">
                <div class="title">抽奖规则</div>
                <table class="cjTable">
                    <tr class="fs30" v-for="i in 3">
                        <td>1. 刘诗梦抽奖抽换机单，看看打开了经济订单哦多开开
                            发护肤贷款发放货到付款开发。</td>
                    </tr>
                </table>
            </div>
        </div>


        <div class="result" v-if="showResult">
            <div class="inner tac ">
                <p class="overflow"><i class="icon iconfont icon-close48 fr" @click="showResult=!showResult"></i></p>
                <p>哎呦，没抽到！</p>
                <div><i class="icon iconfont icon-sad1"></i></div>
                <div><i class="icon iconfont icon-Smile"></i></div>
                <p>再试下呗~</p>
                <div class="goon" @click="showResult=!showResult">继续抽奖</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .result{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        .inner{
            position: absolute;
            left:50%;
            top:50%;
            .borderRadius;
            .paddingAll;
            transform: translate(-50%,-50%);
            width: 5rem;
            background: url("../assets/img/colorBg.jpg") ;
            background-size: 100% auto;
            color: white;
            .fs36;
            .icon-close48{
                font-size: 0.4rem   ;
            }
            .icon-sad1,.icon-Smile{
                font-size: 1rem;
                color: @yellow;
                margin:0.5rem 0;
                display: inline-block;
            }
            .goon{
                width: 2.80rem;
                height: 0.68rem;
                line-height: 0.68rem;
                display: inline-block;
                .marginTop;
                border-radius: 0.34rem;
                border: solid 2px rgba(255, 166, 156, 1);
            }
        }
    }
    .wp1 {
        background: #fe4237;
    }

    .wp2 {
        background: #e72920;
    }

    @lighYellow: #ffd66b;
    @wdYellow: #ffd66b;
    .wdYellow {
        color: @wdYellow;
        border-bottom: 1px solid #f9625a
    }

    .cjTable {
        width: 6.2rem;
        color: @wdYellow;
        .marginTop;
        margin-left: 0.4rem;
        .lh40;
        td, th {
            padding: 0.1rem 0;
        }
    }

    .title {
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

    .myLottery {
        padding: 0 0.1rem;
    }

    .wrap {
        background: #bd1008;
        padding-bottom: 1rem;
    }

    .spc {
        position: relative;
        padding-bottom: 0.78rem;

        .sanjiao {
            position: absolute;
            bottom: 0rem;
            left: 0;
            transform: translate(-100%);
            width: 0.3rem;
            &:nth-child(2) {
                right: 0;
                left: auto;
                transform: translate(100%);
            }
            &:nth-child(3) {
                bottom: 0;
                left: 0;
                width: 100%;
                transform: translateY(100%);
            }
        }
    }

    .rec {
        margin: 1rem 0.12rem;
        padding: 0.1rem;
        .wp1;
        > div {
            .wp2;
            padding: 0.1rem;
        }
    }

    .roll {
        /*padding: 0.3rem 0.1rem;*/
        padding: 0.3rem 0;
        .tac;
        .overflow;
        .item {
            margin-top: 0.2rem;
            width: 2.1rem;
            height: 2.7rem;
            display: inline-block;
            position: relative;
            img {
                width: 2.1rem;
                height: 2.1rem;
            }
            .paddingAll {
                padding: 0.15rem 0
            }
            /*&:nth-child(2n+3){*/
            /*}*/
            .cover {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #f4d48e;
                opacity: 0.6;
            }
        }
        .midSpace {
            margin: 0.2rem 0.18rem;

        }
    }

    .midItem{
        position: relative;
        vertical-align: top;
        >div{
            width: 1.8rem;
            height: 1.8rem;
            color: #bd1008;
            margin:0 auto;
            margin-top: 0.45rem;
            .fs30;
            border-radius: 50%;
            background-color: rgba(245, 206, 108, 1);
            position: relative;
            >div{
                width: 1.44rem;
                height: 1.44rem;
                position: absolute;
                left:0.18rem;
                top:0.18rem;
                border-radius: 50%;
                background-color: rgba(255, 214, 107, 1);
                box-shadow: 0px 2px 2px 0px rgba(4, 0, 0, 0.16);
                p:first-child{
                    padding-top: 0.4rem;
                    font-weight: bold;
                    padding-bottom: 0.1rem;
                    padding-bottom: 0.1rem;
                }
            }
        }
    }
</style>
<script>
    //    import '../lib/tween'

    let timer = null;
    export default {
        data() {
            return {
                showResult:false,
                rollArr: [0, 1, 2, 5, 8, 7, 6, 3],
                canClick: true,
                timer: null,
                times: 0,
                speed: 500,
                circle: 48,
                maskIndex: 0,
                priceList: [
                    {
                        light: true
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    },
                    {
                        light: false
                    }
                ]
            }
        },
        methods: {
            activeMask(num) {
                this.priceList.forEach(item => item.light = false);
                this.priceList[this.rollArr[num]].light = true;
            },
            init() {
                this.speed = 500;
                this.times = 0;
                this.maskIndex = 0;
            },
            start() {
                console.log(this.canClick)
                if (this.canClick) {
                    this.init();
                    this.canClick = false;
                    this.roll();
                }
            },
            roll() {
                let that = this;
                clearTimeout(that.timer);

                that.times++;
                that.speed -= 20;
                that.speed <= 40 ? that.speed = 40 : '';
                if (that.times >= 100) {
                    that.canClick=true;
                    return
                }
                that.maskIndex += 1;
                that.maskIndex >= that.rollArr.length ? that.maskIndex = 0 : '';
                that.activeMask(that.maskIndex);
                console.log(that.speed)
                that.timer = setTimeout(that.roll, that.speed)
            }
        }
    }
</script>