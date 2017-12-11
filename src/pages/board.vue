<template>
    <div style="padding-bottom: 1.1rem">
        <boardSearchNew @getData="getFilterData"></boardSearchNew>
        <!--<boardSearch  @getData="collectData" v-model="selUserName"></boardSearch>-->
        <div class="gray listWrap firstList" style="font-weight: bold">
            <span>排名</span>
            <span></span>
            <span>姓名</span>
            <span>加分</span>
            <span>扣分</span>
            <span class="blue ">总分</span>
        </div>
        <myEmpty v-if="!list.length"></myEmpty>
        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">
            <router-link tag="li" :to="'/manageDiary/'+item.appUserId" v-for="(item,index) in list" :key="index">
                <div class="bgWhite listWrap tal" >
                            <span>
                                <i v-if="index>=3">{{index+1}}</i>
                                    <i class="icon iconfont " :class="{'icon-jin':index==0,'icon-jin icon-tong':index==1,'icon-yin':index==2}"
                                       v-if="index<3"></i>
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
    .firstList{
        span{
            line-height: 0.8rem!important;
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
    import boardSearchNew from '../components/boardSearchNew.vue'
    export default {
        data() {
            return {
                topStatus: '',
                keyWord:'',
                departmentId:'',
                jobId:'',
                type:'',
                jfType:'',
                searchType:1,
                startTime:'',
                endTime:'',
                allLoaded:false,
                pageNumber:1,
                pageSize:10,
                lastPage:false,
                loading:false,
                list: [],
            }
        },
        components:{
            boardSearch,
            boardSearchNew
        },
        mounted(){
            this.getList();
        },
        watch:{
            selUserName(val){

            }
        },
        methods: {
            getFilterData(msg){
                console.log(msg)
                //获取搜索栏的数据
                msg.apartment?this.departmentId=msg.apartment.id:this.departmentId='';
                msg.job?this.jobId=msg.job.id:this.jobId='';
                msg.jfType?this.jfType=msg.jfType.value:this.jfType='';
                msg.startTime?this.startTime=msg.startTime:this.startTime='';
                msg.endTime?this.endTime=msg.endTime:this.endTime='';
                msg.keyWord?this.keyWord=msg.keyWord:this.keyWord='';
                msg.type?this.searchType=msg.type:this.searchType=1;
                this.reset();
                this.getList();
            },
            searchByName(){
                this.reset();
                this.getList();
            },
            collectData(msg){
                //获取搜索栏的数据
                msg.apartment?this.departmentId=msg.apartment.id:this.departmentId='';
                msg.job?this.jobId=msg.job.id:this.jobId='';
                msg.type?this.type=msg.type.value:this.type='';
                msg.startTime?this.startTime=msg.startTime:this.startTime='';
                msg.endTime?this.endTime=msg.endTime:this.endTime='';
                this.pageNumber=1;
                this.getList();
            },
            loadMore(){
                 // 加载更多数据
                if(!this.lastPage){
                    this.loading = true;
                    this.getList();
                }else{
                    this.$toast({
                        message: '已加载全部数据',
                        duration: 2000
                    });
                }
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
            },
            getList(){
                let that = this;
                this.$http.post('/approveRecord/scoreSortSelectByCom', {
                    departmentId: this.departmentId,
                    jobId:this.jobId,
                    endTime:this.endTime,
                    scoreType:this.jfType,
                    startTime:this.startTime,
                    userName:this.selUserName,
                    pageNumber: this.pageNumber,
                    type:this.searchType,
                    userName:this.keyWord,
                    pageSize:this.pageSize
                })
                    .then(function (response) {
                        if(response.data.code==200000){
                            if(that.lastPage) return
                            if(that.keyWord) that.keyWord='';
                            that.pageNumber+=1;

                            that.list=that.list.concat(response.data.data.content) ;
                            if(response.data.data.last) that.lastPage = true;
                            that.loading=false;
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