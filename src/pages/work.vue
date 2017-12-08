<template>
    <div style="padding-bottom: 1.3rem;">
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in swipeList" :key='index'>
                    <img :src="item.cover" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="normalTille">审批日记</div>
        <ul class="itemList vpadding">
            <router-link :to="item.router"  tag="li" v-for="(item,index) in aboutMe" :key="index" >
                <!--<span class="hline"></span>-->
                <span class="vline"></span>
                <!--红点-->
                <!--<span class="redpoint" v-if="index%3==0"></span>    -->
                <p style="padding-top: 0.5rem"> <span class="num">{{item.num}}</span></p>
                <p>{{item.name}}</p>
            </router-link>
        </ul>
        <div v-if="userMessage.isAdmin!=0">
            <div class="normalTille">管理应用（仅管理员可见）</div>
            <ul class="itemList ">
                <router-link :to="item.router" tag="li" v-for="(item,index) in subList" :key="index" class="vpadding" v-if="item.show">
                    <!--<span class="hline"></span>-->
                    <span class="vline"></span>
                    <p > <i class="icon iconfont " :class="item.icon" :style="{color:item.color}"></i></p>
                    <p>{{item.name}}</p>
                </router-link>
            </ul>
        </div>

        <div class="normalTille">日常积分</div>
        <ul class="itemList ">
            <router-link :to="item.router" tag="li" v-for="(item,index) in thirList" :key="index" class="vpadding" v-if="item.show">
                <span class="new" v-if="false">New</span>
                <span class="hline"></span>
                <span class="vline" ></span>
                <p > <i class="icon iconfont " :class="item.icon" :style="{color:item.color}"></i></p>
                <!--<p ><img :src="item.moduleCover" alt=""></p>-->

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
        /*padding:0.35rem 0*/
    }
    .itemList{
        overflow: hidden;
        .bgWhite;
        li{
            float: left;
            width: 25%;
            padding-bottom: 0.3rem;
            .tac;
            font-size: @fs28;
            position: relative;
            overflow: hidden;
            /*width: 1.875rem;*/
            /*min-height: 1.875rem;*/
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
                padding-top: 0.3rem;
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
                top:0.3rem;
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
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                swipeList:[],
                msg:"2sdfsdf",
                shenpiNumber:{},
                aboutMe:[
                    {
                        name:"审批日志",
                        num:" ",
                        router:'/record'
                    },{
                        name:"待我审批",
                        num:" ",
                        router:'/spList/1'
                    },{
                        name:"我发起的",
                        num:" ",
                        router:'/spList/2'
                    },{
                        name:"抄送我的",
                        num:" ",
                        router:'/spList/3'
                    }
                ],

            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
                'thirList',
                'subList'
            ])
        },
        methods:{
            getNumber(){
                let that = this;
                this.$http.post('/approveLogs/getCount',{
                })
                    .then(function (response) {
                        that.aboutMe[0].num= response.data.data[0].approveLog;
                        that.aboutMe[1].num= response.data.data[0].waitApprove;
                        that.aboutMe[2].num= response.data.data[0].sendApprove;
                        that.aboutMe[3].num= response.data.data[0].copy;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getSwipe(){
                //swiper
                let that = this;
                this.$http.post('/advert/listByCom',{
                    companyId:this.userMessage.companyId,
                    locationType:2
                })
                    .then(function (response) {
                        that.swipeList = response.data.data.content;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getModule(){
                console.log(this.userMessage.token)
                let that = this;
                this.$http.post('/module/listModuleByUser',{
                    token:this.userMessage.token,
                    userId:this.userMessage.userId
                })
                    .then(function (response) {
                        console.log(response)
                        that.$nextTick(()=>{
                            that.thirList.forEach(item=>{
                                for(let i = 0 ; i<response.data.data.length;i++){
                                    if(response.data.data[i].moduleTitle==item.name){

                                        item.show=response.data.data[i].status==1?true:false;
                                        item.moduleCover=response.data.data[i].moduleCover;
                                        break;
                                    }
                                }
                            })
                        })

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            //work stage
            this.getSwipe();
            this.$store.commit('getWorkStation')
            this.getNumber();
//            setTimeout(t  his.getModule,500)
        }
    }
</script>