<template>
    <div class="" style="padding-bottom: 2rem">
        <!--<h3 class="tac paddingAll ">个人中心</h3>-->
        <div class="paddingAll">
            <div class="pt">
                <router-link to="/personalData" tag="div" class="borderBottom overflow paddingBottom">
                    <img class="phead" v-if="baseInf.userAvatar" :src="baseInf.userAvatar" alt="">
                    <img src="../assets/img/defaultHead.png" v-else class="phead" alt="">
                    <div class="right">
                        <p class="fs30"> {{baseInf.userName}}</p>
                        <p class="gray fs26">{{baseInf.departmentName}} {{baseInf.jobTitle}}  <span class="fr"><i class="icon iconfont icon-xiala1"></i></span></p>
                        <p class="fs28">积分：{{baseInf.userScore}}   基础积分：{{baseInf.baseScore}}</p>
                    </div>
                </router-link>
                <!--echarts-->
                <router-link :to="'/manageDiary/'+userMessage.userId">
                    <div id="main" class="bgWhite marginTop"></div>
                </router-link>

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
                    <router-link to="/missionList/2">
                        <i class="leftPart icon iconfont icon-renwu1"></i>
                        <div class="rightPart">
                            我的任务
                            <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                        </div>
                    </router-link>

                </div>
                <router-link tag="div" to="/workDiary/watch" class="item">
                    <i class="leftPart icon iconfont icon-caidanlanrijihuise"></i>
                    <div class="rightPart">
                        我的日记
                        <span class="fr rightArrow">
                                            <i class=" icon iconfont icon-xiala1"></i>
                    </span>
                    </div>
                </router-link>
                <!--<div class="item">-->
                    <!--<router-link to="/manageDiary">-->
                        <!--<i class="leftPart icon iconfont icon-guanli1"></i>-->
                        <!--<div class="rightPart">-->
                            <!--我的管理-->
                            <!--<span class="fr rightArrow">-->
                                            <!--<i class=" icon iconfont icon-xiala1"></i>-->
                    <!--</span>-->
                        <!--</div>-->
                    <!--</router-link>-->
                <!--</div>-->
            </div>
            <div class="logout" @click="logOut">
                退出登录
            </div>
        </div>

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    #main{
        height: 5rem;
        width: 120%;
        position: relative;
        left:-3%;
    }
    .logout {
        width: 7.1rem;
        height: 0.88rem;
        line-height: 0.88rem;
        .tac;
        .blue;
        margin-top: 1rem;
        font-size: @fs36;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 8px 8px 8px 8px;
    }

    .opItem {
        .item {
            padding-top: 0.3rem;
            font-size: @fs30;
            .overflow;
            &:first-child{padding-top: 0}
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
        padding-bottom: 0;
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
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                loading: true,
                ins:null,
                bar: {
                    title: {
                        text: 'Personnal Score'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['基础', '业绩', '行为', '月度', '季度', '总','']
                    },
                    yAxis: {

                    },
                    series: [{
                        name: '分数',
                        type: 'bar',
                        data: [0, 0, 0, 0, 0, 0,0]
                    }]
                }
            }
        },
        computed: {
            ...mapGetters([
                'baseInf',
                'userMessage'
            ])
        },
        methods:{
            doRandom() {
                const that = this;
                let data = [];
                for (let i = 0, min = 5, max = 99; i < 6; i++) {
                    data.push(Math.floor(Math.random() * (max + 1 - min) + min));
                }
                that.loading = !that.loading;
                that.bar.series[0].data = data;
            },
            onReady (instance) {
                this.ins = instance
            },
            onClick(event, instance, echarts) {
                console.log(arguments);
            },
            logOut(){
                this.$store.commit('logOut');
                this.$router.push('/login');
            },
            getScoreList(){
                let that = this;
                this.$http.post('/approveRecord/getLeftPieData', {
                    type:4,
                    getUserId:this.userMessage.userId
                })
                    .then(function (response) {
                        that.loading=false;
                        let bar = {
                            title: {
                                text: ''
                            },
                            tooltip: {},
                            xAxis: {
                                data: ['A分', 'B分', 'C分', '基础', '加分', '减分','总分']
                            },
                            yAxis: {

                            },
                            series: [{
                                name: '分数',
                                type: 'bar',
                                data: [0, 0, 0, 0, 0, 0,0]
                            }]
                        };
                        bar.series[0].data[0]=response.data.data.morally||0;
                        bar.series[0].data[1]=response.data.data.achivment||0;
                        bar.series[0].data[2]=response.data.data.behavior||0;
                        bar.series[0].data[3]=response.data.data.baseScore||0;
                        bar.series[0].data[4]=response.data.data.plusScore||0;
                        bar.series[0].data[5]=response.data.data.minusScore||0;
                        bar.series[0].data[6]=response.data.data.sumScore||0;
                        var myChart = echarts.init(document.getElementById('main'));
                        // 绘制图表
                        console.log('bar='+bar)
//                        myChart.setOption(this.bar);
                        myChart.setOption(bar);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components:{
//            IEcharts
        },
        mounted() {
            let that =this;
            setTimeout(function(){ that.getScoreList();},500)

            this.$nextTick(()=>{
                // 基于准备好的dom，初始化echarts实例

            })
        },
        created(){
            this.$store.commit('getuserBaseInf');
        }
    }
</script>