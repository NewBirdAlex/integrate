<template>
    <div>
        <div class="nav fs30" >
            <span v-for="item in idList" @click="selId(item)" :class="{'active':item.sel}">{{item.name}}</span>
        </div>
        <!--<div class=" bgWhite ml">-->
            <!--<div class="paddingAll borderBottom">-->
                <!--<p class="fs30">3设计公司logo <span class="fr blue">+600分</span></p>-->
                <!--<p class=" fs28">本周设计好公司logo,要求logo简单大气</p>-->
                <!--<p class=" gray">2017-9-26  13:30 前完成</p>-->
                <!--<p class=" fs26 gray">剩余：1 <span class="fr qd">抢单</span></p>-->
                <!--<i class="icon iconfont icon-icon"></i>-->
            <!--</div>-->
            <!--<div class="paddingAll gray overflow">-->
                <!--他们已抢单：-->
                <!--<span class="rightArrow fr">-->
                           <!--<i class="icon iconfont icon-xiala1"></i>-->
                       <!--</span>-->
                <!--<div class="fr countPeople">-->
                    <!--<img src="../assets/img/head.png" class="littleHead" v-for="i in 8" alt="">-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <ul  class="  ml"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom bgWhite">
                <div class="paddingAll borderBottom">
                    <p class="fs30">{{item.missionTitle}} <span class="fr blue">+{{item.missionAddScore}}分</span></p>
                    <p class=" fs28">{{item.missionContext}}</p>
                    <p class=" gray">{{item.missionEndTime}}2017-9-26  13:30 前完成</p>
                    <p class=" fs26 gray">剩余：1 {{item.remainCount}} <span class="fr qd borderRadius">抢单</span></p>
                    <i class="icon iconfont icon-icon" v-if="item.isComplete"></i>
                </div>
                <div class="paddingAll gray overflow">
                    他们已抢单：
                    <span class="rightArrow fr">
                           <i class="icon iconfont icon-xiala1"></i>
                       </span>
                    <div class="fr countPeople">
                        <img src="../assets/img/head.png" class="littleHead" v-for="i in 8" alt="">
                    </div>
                </div>
            </li>

            <li class="tac" v-if="loading">
                <div class="loadmore">
                    <mt-spinner color="#26a2ff"></mt-spinner>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .loadmore{
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
    .countPeople{
        width: 5rem;
        height: 0.7rem;
        .overflow;
    }
    .ml {
        line-height: 0.5rem;

        margin-bottom: 0.2rem;
        li{
            position: relative;
        }
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
                margin-top: -0.2rem;
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
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                active: 1,
                idList: [
                    {
                        id: 1,
                        name: '日常任务',
                        sel: true
                    },
                    {
                        id: 2,
                        name: '抢单任务',
                        sel: false
                    },
                    {
                        id: 3,
                        name: '挑战任务',
                        sel: false
                    }
                ],
                list:[],
                num:3,
                pageNumber:1,
                pageSize:5,
                lastPage:false,
                loading:false
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        mounted(){
            this.getList();
        },
        methods: {
            loadMore() {
                if(!this.lastPage&&!this.loading){
                    this.getList();
                    this.loading = true;
                }else{
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getList(){
                let that = this;
                console.log(that.pageNumber)
                if(!that.lastPage){
                    this.$http.post('/missionRecord/userGetMissionList',{
                        missionType:this.active,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        sortOrder: "asc",
                        token:this.userMessage.token,
                        userId:this.userMessage.userId
                    })
                        .then(function (response) {
                            that.pageNumber+=1;
                            if(response.data.data.isLastPage){
                                that.lastPage=true;
                            }
                            that.list=that.list.concat(response.data.data.list) ;
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else{
                    that.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }

            },
            selId(item) {
                this.idList.forEach(function (a) {
                    a.sel = false;
                })
                item.sel = true;
                this.active = item.id;

                //change type
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
                this.getList();
            }
        }
    }
</script>