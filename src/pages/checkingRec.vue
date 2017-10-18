<template>
    <div>
        <div class="top  fs30 tac">
            <span :class="{'active':chooseNum}" @click="change">今日考勤榜</span>
            <span :class="{'active':!chooseNum}" @click="change">本月考勤榜</span>
        </div>

        <div class="bgWhite paddingAll fs28 borderBottom">
            按上班时间排序
            <span class="fr">
                2017.09.21
                <i class="icon iconfont icon-xiala1 "></i>
            </span>
        </div>
        <!--今日考勤榜-->
        <div v-if="chooseNum">
            <div class="list" v-for="i in 2">
                <span class="left fl sg tac">dd</span>
                <div class="right fl">
                    <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                    <div class="fl md">
                        <p class="fs30">我</p>
                        <p class="gray fs28">正常上班</p>
                    </div>
                    <div class="fl blue sg">
                        588933
                    </div>
                    <div class="fr paddingRight tac">
                        <p>10</p>
                        <i class="icon iconfont icon-dianzanmw "></i>
                    </div>
                </div>
            </div>
            <div class="marginTop">
                <div class="list" v-for="i in 2">
                    <span class="left fl sg tac">dd</span>
                    <div class="right fl">
                        <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                        <div class="fl md">
                            <p class="fs30">我</p>
                            <p class="gray fs28">正常上班</p>
                        </div>
                        <div class="fl blue sg">
                            588933
                        </div>
                        <div class="fr paddingRight tac">
                            <p>10</p>
                            <i class="icon iconfont icon-dianzanmw "></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--本月考勤榜-->
        <div v-if="!chooseNum">
            <div class="list rb" v-for="i in 7">
                <span class="left fl sg tac">dd</span>
                <div class="right fl">
                    <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                    <div class="fl md">
                        <p class="fs30">我</p>
                        <p class="gray fs28">正常上班</p>
                    </div>
                    <div class="fl blue sg">
                        588933
                    </div>
                    <div class="fr paddingRight tac">
                        <p>10</p>
                        <i class="icon iconfont icon-dianzanmw "></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .list{
        .overflow;
        .bgWhite;
        line-height: 0.4rem;
        .fs28;
        .borderBottom;
        &.rb{
            border:none;
            .right{
                .borderBottom;
            }
        }
        .paddingTop;
        .sg{
            margin-top: 0.25rem;
        }
        .left{
            width: 10%;
            height: 100%;
            .tac;
        }
        .right{
            width: 90%;
            .paddingBottom;
            .md{
                width: 3rem;
            }
            .icon{
                font-size: 0.4rem;
            }
        }

    }
    .top{
        .active{
            .blue;
            border-bottom: 1px solid @blue;
        }
        .borderBottom;
        span{
            display: inline-block;
            width: 40%;
            .paddingAll;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                chooseNum:true
            }
        },
        methods:{
            change(){
                this.chooseNum=!this.chooseNum;
            }
        }
    }
</script>