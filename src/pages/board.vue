<template>
    <div>

        <boardSearch  @getData="collectData" v-model="selUserName"></boardSearch>
        <div class="gray listWrap" style="font-weight: bold">
            <span>排名</span>
            <span></span>
            <span>姓名</span>
            <span>加分</span>
            <span>扣分</span>
            <span class="blue ">总分</span>
        </div>
        <myEmpty v-if="!list.length"></myEmpty>
        <!--loadmore-->
        <div style="height: 9rem;overflow: scroll;" class="marginTop">
            <mt-loadmore
                    :bottom-all-loaded="allLoaded "
                         :bottom-method="loadBottom"
                         ref="loadmore"
            >
                <ul class="">
                    <router-link tag="li" :to="'/infor/'+item.appUserId" v-for="(item,index) in list" :key="index">
                        <div class="bgWhite listWrap" >
                            <span>
                                <i v-if="index>=4||index==0">{{index+1}}</i>
                                    <i class="icon iconfont " :class="{'icon-jin':index==1,'icon-jin icon-tong':index==2,'icon-yin':index==3}"
                                       v-if="index<4"></i>
                            </span>
                            <span>
                                <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture" alt="">
                                <img src="../assets/img/defaultHead.png" v-else class="headPicture" alt="">
                            </span>
                            <span>{{item.userName}}</span>
                            <span>{{item.addScore}}</span>
                            <span>{{item.minusScore}}</span>
                            <span class="blue ">{{item.plusScore}}</span>
                        </div>
                    </router-link>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">Loading...</span>
                </div>
            </mt-loadmore>

        </div>

        <!--loadmore-->

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .listWrap{
        .overflow;
        .fs30;
        .borderBottom;
        span{
            display: inline-block;
            line-height: 1.2rem;
            width: calc(~"7.5rem/6 - 5px");
            .tac;
            .icon {
                font-size: 0.6rem;
            }
        }
    }

    /*loadmore*/
    ul {
        li {
            .tac;
            font-size: 0.4rem;
            &:first-child{
                .marginBottom;
            }
        }
    }

    /*loadmore*/





    .icon-jin {
        color: #ffe157
    }

    .icon-tong {
        color: #d5e3eb
    }

    .icon-yin {
        color: #f0c789
    }
</style>
<script>
    import boardSearch from '../components/boardSearch.vue'
    export default {
        data() {
            return {

                topStatus: '',
                selUserName:'',
                departmentId:'',
                jobId:'',
                type:'',
                startTime:'',
                endTime:'',
                allLoaded:false,
                pageNumber:1,
                pageSize:20,
                lastPage:false,
                loading:false,
                list: [],
//                list: [1, 2, 4, 5, 3, 3, 3, 33, 3, 3, 2, 3, 3, 2, 3, 23,3]
            }
        },
        components:{
            boardSearch
        },
        mounted(){
            this.getList();
        },
        watch:{
            selUserName(val){

                this.searchByName();
            }
        },
        methods: {
            searchByName(){
                if(!this.selUserName) return;
                this.getList();
            },
            collectData(msg){
                //获取搜索栏的数据
                console.log(msg)
                msg.apartment?this.departmentId=msg.apartment.id:this.departmentId='';
                msg.job?this.jobId=msg.job.id:this.jobId='';
                msg.type?this.type=msg.type.value:this.type='';
                msg.startTime?this.startTime=msg.startTime:this.startTime='';
                msg.endTime?this.endTime=msg.endTime:this.endTime='';
                this.pageNumber=1;
                this.getList();
            },
            loadBottom(){
                 // 加载更多数据
                //this.allLoaded = true;// 若数据已全部获取完毕
                //this.$refs.loadmore.onBottomLoaded();
                console.log(3)
                if(!this.lastPage){
                    this.getList();
                    this.pageNumber+=1;
                }else{
                    this.allLoaded = true;
                }
            },
            getList(){
                let that = this;
                this.$http.post('/approveRecord/scoreSortByComId', {
                    departmentId: this.departmentId,
                    jobId:this.jobId,
                    endTime:this.endTime,
                    type:this.type,
                    startTime:this.startTime,
                    userName:this.selUserName,
                    pageNumber: this.pageNumber,
                    pageSize:this.pageSize
                })
                    .then(function (response) {
                        if(response.data.data.code=200000){
                            that.list = response.data.data.content;
                            if(response.data.data.last) that.lastPage = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            go() {
                //路由跳转
                this.$router.push('/infor')
            }
        }
    }
</script>