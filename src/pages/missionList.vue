<template>
    <div>
        <div class="nav fs30" >
            <span v-for="item in idList" @click="selId(item)" :class="{'active':item.sel}">{{item.name}}</span>
        </div>
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
                    <p class=" fs26 gray">
                        <span v-if="active!=1">剩余： {{item.remainCount}}</span>
                        <span v-else>
                            <span v-if="item.isRepeat==1">每天一次</span>
                            <span v-if="item.isRepeat==2">每周一次</span>
                            <span v-if="item.isRepeat==3"> 每月一次</span>
                            <span v-if="item.isRepeat==4">每季一次</span>
                            <span v-if="item.isRepeat==5">每年一次</span>
                            <span v-if="item.isRepeat==6"> 无限制 </span>
                            <span v-if="item.isRepeat==7">仅限一次</span>
                        </span>
                        <span class="fr qd borderRadius" v-if="active==2&&item.getStatus==0" @click="getOrder(item)">抢单</span>
                        <span class="fr qd borderRadius" v-if="active==3&&item.getStatus==0" @click="getOrder(item)">挑战</span>
                    </p>
                    <!--<i class="icon iconfont icon-icon" v-if="item.isComplete"></i>-->
                    <span v-if="item.getStatus==1">
                         <i class="icon iconfont icon-iconcompleted blue" v-if="item.isComplete"></i>
                         <i class="icon iconfont icon-uncomplete gray" v-else></i>
                    </span>

                </div>
                <div class="paddingAll gray overflow" v-if="item.list.length" @click="go(item)">
                    他们已抢单：
                    <span class="rightArrow fr">
                           <i class="icon iconfont icon-xiala1"></i>
                       </span>
                    <div class="fr countPeople">
                        <img :src="imgitem.userAvatar" class="littleHead" v-for="(imgitem,ind) in item.list" :key="ind" alt="">
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
        .icon-icon,.icon-iconcompleted,.icon-uncomplete{
            position: absolute;
            right: 1.3rem;
            top:1rem;
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
            go(item){
                this.active==3?this.active=2:'';
                this.$router.push({ name: 'ApplyMissionPerson', params: { id: item.missionId,type:this.active }})
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
                this.getList();
            },
            getOrder(item){
                let that = this;
                this.$http.post('/missionRecord/getMission',{
                    missionId:item.missionId
                })
                    .then(function (response) {

                        that.$toast({
                            message: '成功获取任务',
                            duration: 2000
                        });
                        that.reset();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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
                this.reset();
            }
        }
    }
</script>