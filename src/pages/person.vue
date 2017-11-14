<template>
    <div class="paddingAll">
        <!--<h3 class="tac paddingAll ">个人中心</h3>-->
        <div class="pt">
            <router-link to="/personalData" tag="div" class="borderBottom overflow paddingBottom">
                <img class="phead" :src="baseInf.userAvatar" alt="">
                <div class="right">
                    <p class="fs30"> {{baseInf.userName}}</p>
                    <p class="gray fs26">{{baseInf.departmentName}} {{baseInf.jobTitle}}  <span class="fr"><i class="icon iconfont icon-xiala1"></i></span></p>
                    <p class="fs28">积分：{{baseInf.userScore}}   基础积分：{{baseInf.baseScore}}</p>
                </div>
            </router-link>
            <div id="main" class="bgWhite"></div>
        </div>
        <div class="pt marginTop opItem fs28">
            <div class="item">
                <router-link to="/structure">
                    <i class="leftPart icon iconfont icon-zuzhijiagou"></i>
                    <div class="rightPart">
                        企业组织架构
                        <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                    </div>
                </router-link>

            </div>
            <div class="item">
                <router-link to="/missionList">
                    <i class="leftPart icon iconfont icon-renwu1"></i>
                    <div class="rightPart">
                        我的任务
                        <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                    </div>
                </router-link>

            </div>
            <div class="item">
                <i class="leftPart icon iconfont icon-caidanlanrijihuise"></i>
                <div class="rightPart">
                    我的日记
                    <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                </div>
            </div>
            <div class="item">
                <router-link to="/manageDiary">
                    <i class="leftPart icon iconfont icon-guanli1"></i>
                    <div class="rightPart">
                        我的管理
                        <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="logout">
            退出登录
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    #main{
        height: 5rem;
    }
    .logout {
        width: 7.1rem;
        height: 0.88rem;
        line-height: 0.88rem;
        .tac;
        .blue;
        margin-top: 2rem;
        font-size: @fs36;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 8px 8px 8px 8px;
    }

    .opItem {
        .item {
            padding-top: 0.2rem;
            font-size: @fs30;
            .overflow;
            .leftPart {
                float: left;
                width: 10%;
                .blue;
            }
            .rightPart {
                float: left;
                width: 90%;
                padding-bottom: 0.2rem;
                .borderBottom;
            }
            &:last-child {
                .rightPart {
                    border: none;
                }
            }
        }
    }

    .pt {
        border: @border;
        overflow: hidden;
        .bgWhite;
        .paddingAll;
        border-radius: 8px 8px 8px 8px;
        .phead {
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
        }
        .right {
            width: 5.2rem;
            .fr;
            line-height: 0.5rem;
            span {
                transform: rotate(-90deg);
            }

        }
    }
</style>
<script>
    var echarts = require('echarts');
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'baseInf',
            ])
        },
        mounted() {
            this.$store.commit('getuserBaseInf');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                title: {text: ''},
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
</script>