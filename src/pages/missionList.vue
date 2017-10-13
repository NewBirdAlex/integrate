<template>
    <div>
        <div class="nav">
            <span v-for="item in idList" @click="selId(item)" :class="{'active':item.sel}">{{item.name}}</span>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="a">
                <div class=" bgWhite ml" v-for="i in 3">
                    <div class="paddingAll borderBottom">
                        <p class="fs30">设计公司logo <span class="fr blue">+600分</span></p>
                        <p class=" fs28">本周设计好公司logo,要求logo简单大气</p>
                        <p class=" fs26 gray">剩余：1 <span class="fr qd">抢单</span></p>

                    </div>
                    <div class="paddingAll gray overflow">
                        他们已抢单：
                        <span class="rightArrow fr">
                           <i class="icon iconfont icon-xiala1"></i>
                       </span>
                        <div class="fr" style="width: 5rem">
                            <img src="../assets/img/head.png" class="littleHead" v-for="i in 8" alt="">
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="b">
                <div class=" bgWhite ml" v-for="i in 3">
                    <div class="paddingAll borderBottom">
                        <p class="fs30">设计公司logo <span class="fr blue">+600分</span></p>
                        <p class=" fs28">本周设计好公司logo,要求logo简单大气</p>
                        <p class=" fs26 gray">剩余：1 <span class="fr qd">抢单</span></p>
                    </div>
                    <div class="paddingAll gray overflow">
                        他们已抢单：
                        <span class="rightArrow fr">
                           <i class="icon iconfont icon-xiala1"></i>
                       </span>
                        <div class="fr" style="width: 5rem">
                            <img src="../assets/img/head.png" class="littleHead" v-for="i in 8" alt="">
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="c">
                <div class=" bgWhite ml" v-for="i in 3">
                    <div class="paddingAll borderBottom">
                        <p class="fs30">设计公司logo <span class="fr blue">+600分</span></p>
                        <p class=" fs28">本周设计好公司logo,要求logo简单大气</p>
                        <p class=" gray">2017-9-26  13:30 前完成</p>
                        <p class=" fs26 gray">剩余：1 <span class="fr qd">抢单</span></p>
                        <i class="icon iconfont icon-icon"></i>
                    </div>
                    <div class="paddingAll gray overflow">
                        他们已抢单：
                        <span class="rightArrow fr">
                           <i class="icon iconfont icon-xiala1"></i>
                       </span>
                        <div class="fr" style="width: 5rem">
                            <img src="../assets/img/head.png" class="littleHead" v-for="i in 8" alt="">
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .ml {
        line-height: 0.5rem;
        position: relative;
        margin-bottom: 0.2rem;
        .icon-icon{
            position: absolute;
            right: 1.3rem;
            top:1rem;
            color:@blue;
            font-size: 1.2rem;
        }
        .littleHead {
            margin-right: 0.2rem;
            margin-bottom: 0.1rem;
        }
        span {
            &.qd {
                padding: 0.1rem 0.4rem;
                color: white;
                .fs30;
                background: @blue;
                margin-top: -0.3rem;
            }
        }
    }

    .nav {
        .borderBottom;
        .overflow;
        span {
            .fl;
            width: 33%;
            .tac;
            padding: 0.3rem 0;
            &.active {
                color: #338ecc;
                border-bottom: 2px solid @blue;
            }

        }
    }
</style>
<script>
    export default {
        data() {
            return {
                active: 'a',
                idList: [
                    {
                        id: 'a',
                        name: '日常任务',
                        sel: true
                    },
                    {
                        id: 'b',
                        name: '抢单任务',
                        sel: false
                    },
                    {
                        id: 'c',
                        name: '挑战任务',
                        sel: false
                    }
                ]
            }
        },
        methods: {
            selId(item) {
                this.idList.forEach(function (a) {
                    a.sel = false;
                })
                item.sel = true;
                this.active = item.id;
            }
        }
    }
</script>