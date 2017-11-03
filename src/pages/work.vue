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
        <div class="normalTille">审批日记</div>
        <ul class="itemList vpadding">
            <router-link :to="item.router"  tag="li" v-for="(item,index) in aboutMe" :key="index">
                <!--<span class="hline"></span>-->
                <span class="vline"></span>
                <span class="redpoint" v-if="index%3==0"></span>
                <p > <span class="num">{{item.num}}</span></p>
                <p>{{item.name}}</p>
            </router-link>
        </ul>
        <div class="normalTille">管理应用（仅管理员可见）</div>
        <ul class="itemList ">
            <router-link :to="item.router" tag="li" v-for="(item,index) in subList" :key="index" class="vpadding">
                <!--<span class="hline"></span>-->
                <span class="vline"></span>
                <p > <i class="icon iconfont " :class="item.icon" :style="{color:item.color}"></i></p>
                <p>{{item.name}}</p>
            </router-link>
        </ul>
        <div class="normalTille">日常积分</div>
        <ul class="itemList ">
            <router-link :to="item.router" tag="li" v-for="(item,index) in thirList" :key="index" class="vpadding">
                <span class="new" v-if="index%3==0">New</span>
                <span class="hline"></span>
                <span class="vline" v-if="(index+1)%4!=0"></span>
                <p > <i class="icon iconfont " :class="item.icon" :style="{color:item.color}"></i></p>
                <p>{{item.name}}</p>
            </router-link>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
/**/
    .slide{
        height: 3rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .vpadding{
        padding:0.35rem 0
    }
    .itemList{
        overflow: hidden;
        .bgWhite;
        li{
            float: left;
            width: 25%;
            .tac;
            font-size: @fs28;
            position: relative;
            overflow: hidden;
            .vline{
                position: absolute;
                right: 0;
                top:0;
                height: 100%;
                border-right: @border;
            }
            .hline{
                position: absolute;
                left:0;
                bottom: 0;
                height: 0;
                width: 100%;
                border-bottom: @border;
            }
            .num{
                font-size: @fs36;

            }
            p{
                &:last-child{
                    margin-top: 0.3rem;
                }
            }
            .icon{
                font-size: 0.6rem;
            }
            .redpoint{
                position: absolute;
                width: 0.2rem;
                height: 0.2rem;
                background: red;
                border-radius: 50%;
                right: 0.4rem;
                top:0rem;
            }
            .new{
                position: absolute;
                width: 100%;
                line-height: 0.4rem;
                .tac;
                background: #f75555;
                color:white;
                left:0;
                top:0;
                transform: rotate(45deg) translate(0.5rem,-0.5rem);
            }
        }
    }
</style>
<script>

    export default {
        data() {
            return {
                msg:"2sdfsdf",
                aboutMe:[
                    {
                        name:"审批日志",
                        num:"7",
                        router:'/record'
                    },{
                        name:"待我审批",
                        num:"70",
                        router:'/spList'
                    },{
                        name:"我发起的",
                        num:"17",
                        router:'/spList'
                    },{
                        name:"抄送我的",
                        num:"27",
                        router:'/spList'
                    }
                ],
                subList:[
                    {
                        name:"发布任务",
                        icon:'icon-faburenwu',
                        color:'#fa6e77',
                        router:'/publicMission'
                    },
                    {
                        name:"领导表扬",
                        icon:'icon-zhicheng',
                        color:'#fec170',
                        router:'/praise'
                    },
                    {
                        name:"管理奖扣",
                        icon:'icon-guanli',
                        color:'#50bee6',
                        router:'/managePraise'
                    },
                    {
                        name:"发布公告",
                        icon:'icon-gonggao',
                        color:'#fd8f64',
                        router:'/announcement'
                    }
                ],
                thirList:[
                    {
                        name:"每天考勤",
                        icon:'icon-dingweikaoqin',
                        color:'#3da5d0',
                        router:'/checkingin'
                    },
                    {
                        name:"工作日志",
                        icon:'icon-rizhi',
                        color:'#84d76f',
                        router:'/workDiary'
                    },
                    {
                        name:"悬赏任务",
                        icon:'icon-renwuxuanshang',
                        color:'#feaa3b',
                        router:'/missionList'
                    },
                    {
                        name:"申请积分",
                        icon:'icon-daiban',
                        color:'#fe6973',
                        router:'jfSelect'
                    },
                    {
                        name:"企业公告",
                        icon:'icon-gonggao1',
                        color:'#feaa3b',
                        router:'/announcementList'
                    },
                    {
                        name:"爱心点赞",
                        icon:'icon-hongxin',
                        color:'#fb3333',
                        router:'love'
                    },
                    {
                        name:"积分申诉",
                        icon:'icon-tanhao1',
                        color:'#cbefd5',
                        router:'/complain'
                    },
                    {
                        name:"自由奖扣",
                        icon:'icon-moneychange',
                        color:'#5bb3d3',
                        router:'/freePrize'
                    },
                    {
                        name:"经济哲学",
                        icon:'icon-kaohe',
                        color:'#8ddfb9',
                        router:'/philosophy'
                    },
                    {
                        name:"水平考核",
                        icon:'icon-kaohe',
                        color:'#78c7e3',
                        router:'/kpi'
                    },
                    {
                        name:"积分商城",
                        icon:'icon-lianmengkeyongjifen',
                        color:'#fa6e77',
                        router:'/shop'
                    },
                    {
                        name:"积分抽奖",
                        icon:'icon-choujiang',
                        color:'#feaa3b',
                        router:'/lottery'
                    }
                ]
            }
        }
    }
</script>