<template>
    <div>
        <div class="top  fs30 tac">
            <span :class="{'active':chooseNum}" @click="change">本日统计</span>
            <span :class="{'active':!chooseNum}" @click="change">本月统计</span>
        </div>

        <div class="bgWhite paddingAll fs28 borderBottom">
            按上班时间排序
            <span class="fr" @click="pickTime">
                 <span v-if="rightTime">{{rightTime}}</span>
               <span v-else>{{now}}</span>
                <i class="icon iconfont icon-xiala1 "></i>
            </span>
        </div>

        <mt-datetime-picker
                v-model="pickerVisible"
                type="date"
                ref="picker"
                @confirm="handleConfirm"
                :startDate="new Date(new Date().getFullYear() - 3, 0, 1)"
                :endDate="new Date()"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>
        <!--本日统计-->
        <myInfinite :loading="loading" @getList="getList">
            <div >
                <div class="list marginBottom" v-if="chooseNum">
                    <span class="left fl sg tac"></span>
                    <div class="right fl">
                        <img :src="selfInfo.userAvatar" v-if="selfInfo.userAvatar" class="headPicture fl marginRight"  alt="">
                        <img src="../assets/img/defaultHead.png" v-else  class="headPicture fl marginRight" alt="">
                        <div class="fl md">
                            <p class="fs30">{{selfInfo.userName}}</p>
                            <div class="gray fs28">
                                <span>发布日记：{{selfInfo.sendCount||0}}</span>
                                <span>累计点赞：{{selfInfo.likeCount||0}}</span>
                            </div>
                        </div>
                        <div class="fr blue sg marginRight">
                            {{selfInfo.totalScore||0}}分
                        </div>
                    </div>
                </div>
                <div class="list " v-for="(item,index) in list">
                    <span class="left fl sg tac fs30">{{index+1}}</span>
                    <div class="right fl">
                        <img :src="item.userAvatar" class="headPicture fl marginRight"  alt="">
                        <div class="fl md">
                            <p class="fs30">{{item.userName}}</p>
                            <div class="gray fs28" v-if="chooseNum">
                                <span>发布日记：{{item.sendCount||0}}</span>
                                <span>累计点赞：{{item.likeCount||0}}</span>
                            </div>
                            <div class="gray fs28" v-else>
                                <span>{{item.departmentName}}</span>
                            </div>
                        </div>
                        <div class="fr paddingRight tac" v-if="!chooseNum">
                            <p>{{item.likeCount||0}}</p>
                            <i class="icon iconfont icon-dianzanmw gray" :class="{'blue':item.likeCount>0}" @click="makeAwsome(item)"></i>
                        </div>
                        <div class="fr blue sg marginRight">
                            {{item.totalScore||0}}分
                        </div>
                    </div>
                </div>
            </div>
        </myInfinite>

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .list{
        .overflow;
        .bgWhite;
        line-height: 0.4rem;
        .fs28;
        .borderBottom;
        &.rb{
            border:none;
            .right{
                .borderBottom;
            }
        }
        .paddingTop;
        .sg{
            margin-top: 0.25rem;
        }
        .left{
            width: 10%;
            height: 100%;
            .tac;
        }
        .right{
            width: 90%;
            .paddingBottom;
            .md{
                width: 3.6rem;
            }
            .icon{
                font-size: 0.5rem;
            }
        }

    }
    .top{
        .active{
            .blue;
            border-bottom: 1px solid @blue;
        }
        .borderBottom;
        span{
            display: inline-block;
            width: 30%;
            margin: 0 5%;
            .paddingAll;
        }
    }
</style>
<script>
    import myInfinite from '../components/myInfinite.vue'

    export default {
        data() {
            return {
                chooseNum:true,
                pageNumber: 1,
                pageSize: 10,
                lastPage: false,
                loading: false,
                rightTime:'',
                pickerVisible:'',
                list:[],
                selfInfo:[]
            }
        },
        computed:{
            now(){
                let data = new Date();
                return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
            }
        },
        methods:{
            change(){
                this.chooseNum=!this.chooseNum;
                this.rightTime = this.now;
                this.reset();
                this.getList();
            },
            pickTime(){
                this.$refs.picker.open();
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
            },
            handleConfirm(data){
                this.rightTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
                this.reset();
                this.getList();
            },
            makeAwsome(item){
                let that = this;
                this.$http.post('/dailyRecord/goodDaily', {
                    addUserId: item.userId,
                    id:item.id,
                })
                    .then(function (response) {
                        if(response.data.code=='200000') item.likeCount+=1;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getList(){

                if(this.lastPage){
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                    return
                }
                let that = this;
                if(this.chooseNum){
                    var url = '/dailyRecord/todayList'
                }else{
                    var url = '/dailyRecord/monthList'
                }

                this.$http.post(url, {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    selectTime: "",
                })
                    .then(function (response) {
                        that.$nextTick(()=>{
                            that.pageNumber += 1;
                            if(that.chooseNum){
                                //today
                                if (response.data.data.dailyList.last) {
                                    that.lastPage = true;
                                }
                                that.list = that.list.concat(response.data.data.dailyList.content);
                                that.selfInfo = response.data.data.selfInfo;
                            }else{
                                //month
                                if (response.data.data.last) {
                                    that.lastPage = true;
                                }
                                that.list = that.list.concat(response.data.data.content);
                            }

                            that.loading = false;
                        })

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components:{
            myInfinite
        },
        mounted(){
            this.getList();
        }
    }
</script>