<template>
    <div>
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in swipeList" :key='index'>
                    <img :src="item.cover" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="marginAll marginTop border borderRadius bgWhite" v-if="todayMission.length">
            <div class="subt">
                <i class="icon iconfont icon-daiban blue"></i>
                <span class="gray">今日待办</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
            <div class="subt" v-for="(item,index) in todayMission" :key="index" v-if="index<5">
                {{item.missionTitle}}
                <span class="blue fr">+{{item.missionAddScore}}</span>
            </div>
        </div>
        <!--今日积分排名-->
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-paiming yellow"></i>
                <span class="gray">今日积分排名</span>
            </div>
            <div class="subt overflow ">
                <div class="fl half">
                    <p class="blue">{{scoreRank.myOrderNum}}</p>
                    <p class="gray">排名</p>
                </div>
                <div class="fl half">
                    <p class="blue">{{scoreRank.myScore}}</p>
                    <p class="gray">今日积分</p>
                </div>
            </div>
            <div class="subt addHead" v-if="scoreRank.noOneName">
                <img :src="scoreRank.noOneAvatar" alt="">
                <span class="blue">{{scoreRank.noOneName}}获得今日的积分冠军</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
        </div>
        <!--积分福利-->
        <div class="marginAll marginTop border borderRadius bgWhite" v-if="false">
            <div class="subt">
                <i class="icon iconfont icon-fuli red"></i>
                <span class="gray">积分福利</span>
            </div>
            <div class="subt overflow ">
                <div class="fl half showImg">
                    <div>
                        <img src="../assets/img/1.jpg" alt="">
                    </div>
                    <h4>红色炫酷车模型</h4>
                    <p>
                        <span class="yellow">¥ 600分</span>
                        <span class="gray">还差100分</span>
                    </p>
                </div>
                <div class="fl half showImg">
                    <div>
                        <img src="../assets/img/1.jpg" alt="">
                    </div>
                    <h4>红色炫酷车模型</h4>
                    <p>
                        <span class="yellow">¥ 600分</span>
                        <span class="gray">还差100分</span>
                    </p>
                </div>
            </div>
            <router-link tag="div" to="/lottery" class="subt">
                <span class="blue">你有3个积分抽奖活动正在进行</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </router-link>
        </div>
        <!--积分动态-->

        <jfdt></jfdt>
    </div>
</template>
<style scoped lang="less">
    @import '../assets/css/common.less';

    .subt{
        font-size: @fs28;
        padding:0.3rem 0;
        margin: 0 0.2rem;
        .borderBottom;
        &:nth-child(1){
            margin: 0;
            padding:0.3rem 0.2rem;
        }
        .icon{
            .fs34;
        }
    }
    .addHead{
        img{
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            vertical-align: middle;
        }
        .gray{margin-top: 0.15rem}
    }
    .showImg{
        text-align: left!important;
        line-height: 0.5rem;
        p,h4{
            text-indent: 1em;
        }
        img{
            width: 95%;
            border-radius: 2px 2px 2px 2px;
        }
    }
    .half{
        width: 50%;
        .tac;
        .blue{
            font-size: 0.6rem;
            margin-bottom: 0.2rem;
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
    import '../assets/css/animate.css'
    import jfdt from '../components/jifendongtai.vue'
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return{
                swipeList:[],
                todayMission:[],
                scoreRank:{
                    myOrderNum:0,
                    myScore:0
                }
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        components:{
            jfdt
        },
        mounted(){
            let that = this;

            //获取是否登录
            if(localStorage.getItem('HXuserMessage')){
                this.$store.commit('getLocalUserMessage');
            }else{
                this.$router.push('/login');
            }
            //今日积分排名接口
            this.$http.post('/approveRecord/todayScoreOrder',{
                token:this.userMessage.token,
                userId:this.userMessage.userId
            })
            .then(function (response) {
                that.scoreRank = response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
            //今日任务
            this.$http.post('/missionRecord/todayMission',{
                pageNumber: 1,
                pageSize: 10,
                userId:this.userMessage.userId
            })
            .then(function (response) {
                that.todayMission = response.data.data.list;
            })
            .catch(function (error) {
                console.log(error);
            });
            //swiper
           this.$http.post('/advert/listByCom',{
               companyId:this.userMessage.companyId,
               locationType:1,
               sortOrder:"desc",
               sortType:'id',
               token:this.userMessage.token,
               userId:this.userMessage.userId

           })
           .then(function (response) {
               that.swipeList = response.data.data.content;
           })
           .catch(function (error) {
               console.log(error);
           });
        }
    }

</script>