<template>
    <div>
        <div class="top  fs30 tac">
            <span :class="{'active':chooseNum}" @click="change">今日考勤榜</span>
            <span :class="{'active':!chooseNum}" @click="change">本月考勤榜</span>
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
                :startDate="new Date(new Date().getFullYear() - 3, 0, 1)"
                :endDate="new Date()"
                @confirm="handleConfirm"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>
        <!--今日考勤榜-->
        <!--<div ">-->
        <div class="list " v-if="myCheck.length&&chooseNum" v-for="(item,index) in myCheck" :key="index">
            <span class="left fl sg tac">{{index + 1}}</span>
            <div class="right fl">
                <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture fl marginRight" alt="">
                <img src="../assets/img/defaultHead.png" v-else alt="" class="headPicture fl marginRight">
                <div class="fl md lh40">
                    <p class="fs30">{{item.userName}}</p>
                    <p class="gray fs28"><span>{{item.checkTime.split(' ')[0]}}</span> 正常上班</p>
                </div>
                <div class="fr paddingRight tac marginLeft">
                    <p>{{item.score || 0}}</p>
                    <i class="icon iconfont icon-dianzanmw gray" :class="{'blue':item.score>0}" @click="makeAwsome(item)"></i>
                </div>
                <div class="fr blue sg">
                    {{item.checkTime.split(" ")[1]}}
                </div>
            </div>
        </div>
        <div class="marginBottom"></div>
        <myEmpty value="没有考勤记录" v-if="!list.length"></myEmpty>
        <ul class=""
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class=" bgWhite">
                <div class="list" v-if="chooseNum">
                    <!--本日考勤-->
                    <span class="left fl sg tac">{{index + 1}}</span>
                    <div class="right fl">
                        <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture fl marginRight" alt="">
                        <img src="../assets/img/defaultHead.png" v-else class="headPicture fl marginRight" alt="">
                        <div class="fl md lh40">
                            <p class="fs30">{{item.userName}}</p>
                            <p class="gray fs28">
                                <span>{{item.checkTime.split(' ')[0]}}</span>
                                <span v-if="item.checkStatus==0">缺勤</span>
                                <span v-if="item.checkStatus==1">内勤正常上班</span>
                                <span v-if="item.checkStatus==2">内勤正常下班</span>
                                <span v-if="item.checkStatus==3">外勤打卡上班成功</span>
                                <span v-if="item.checkStatus==4">外勤打卡下班成功</span>
                                <span v-if="item.checkStatus==5">上班早到</span>
                                <span v-if="item.checkStatus==6">上班迟到</span>
                                <span v-if="item.checkStatus==7">下班早退</span>
                                <span v-if="item.checkStatus==8">加班</span>
                            </p>
                        </div>
                        <div class="fr paddingRight tac marginLeft">
                            <p>{{item.score || 0}}</p>
                            <span @click="makeAwsome(item)"><i class="icon iconfont icon-dianzanmw fs36 gray"
                                                               :class="{'blue':item.score>0}"></i></span>
                        </div>
                        <div class="fr blue sg">
                            {{item.checkTime.split(" ")[1]}}
                        </div>
                    </div>
                </div>
                <!--本月考勤-->
                <div class="list rb" v-else>
                    <span class="left fl sg tac">{{index + 1}}</span>
                    <div class="right fl">
                        <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture fl marginRight" alt="">
                        <img src="../assets/img/defaultHead.png" v-else class="headPicture fl marginRight" alt="">
                        <div class="fl md">
                            <p class="fs30">{{item.userName}}</p>
                            <p class="gray fs28" v-if="chooseNum">
                                <span>{{item.checkTime.split(' ')[0]}}</span>
                                <span v-if="item.checkStatus==0">缺勤</span>
                                <span v-if="item.checkStatus==1">内勤正常上班</span>
                                <span v-if="item.checkStatus==2">内勤正常下班</span>
                                <span v-if="item.checkStatus==3">外勤打卡上班成功</span>
                                <span v-if="item.checkStatus==4">外勤打卡下班成功</span>
                                <span v-if="item.checkStatus==5">上班早到</span>
                                <span v-if="item.checkStatus==6">上班迟到</span>
                                <span v-if="item.checkStatus==7">下班早退</span>
                                <span v-if="item.checkStatus==8">加班</span>
                            </p>
                            <p class="gray fs28" v-else>{{item.departmentName}}</p>

                        </div>
                        <div class="fr paddingRight tac marginLeft">
                            <p>{{item.score || 0}}</p>
                            <span @click="makeAwsome(item)"><i class="icon iconfont icon-dianzanmw fs36 gray"
                                                               :class="{'blue':item.score>0}"></i></span>
                        </div>
                        <div class="fr blue sg">
                            {{item.totalScore}} 分
                        </div>

                    </div>
                </div>
            </li>

            <li class="tac" v-if="loading">
                <div class="loadmore">
                    <mt-spinner color="#26a2ff"></mt-spinner>
                </div>
            </li>
        </ul>
        <!--<i class="icon iconfont icon-damuzhi red specilIcon" :class="{'activeIcon':clickHeart}" v-if="clickHeart"></i>-->
        <i class="icon iconfont icon-damuzhi red specilIcon" :class="{'activeIcon':clickHeart}"
           v-if="clickHeart"></i>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .specilIcon {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        /*animation-duration: 1s;*/
        transition: all 1s;
        /*animation: kiss 0s linear 1s infinite ;*/
    }

    .activeIcon {
        /*transform: translate(-50%,-50%) scale(3)!important;*/
        animation: kiss 1s linear 500ms 1;
    }

    @keyframes kiss {
        0% {
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -75%) scale(3);
        }
        100% {
            transform: translate(-50%, -50%) scale(6);
            opacity: 0;
        }
    }

    .list {
        .overflow;
        .bgWhite;
        line-height: 0.4rem;
        .fs28;
        .borderBottom;
        &.rb {
            border: none;
            .right {
                .borderBottom;
            }
        }
        .paddingTop;
        .sg {
            margin-top: 0.25rem;
        }
        .left {
            width: 10%;
            height: 100%;
            .tac;
            .fs36;
        }
        .right {
            width: 90%;
            .paddingBottom;
            .md {
                width: 3.2rem;

            }
            .icon {
                font-size: 0.5rem;
            }
        }

    }

    .top {
        .active {
            .blue;
            border-bottom: 1px solid @blue;
        }
        .borderBottom;
        span {
            display: inline-block;
            width: 30%;
            margin: 0 5%;
            .paddingAll;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                clickHeart: false,
                chooseNum: true,
                selectTime: false,
                rightTime: '',
                pickerVisible: '',
                list: [],
                myCheck: [],
                needMycheck:true,
                pageNumber: 1,
                pageSize: 10,
                lastPage: false,
                loading: false
            }
        },
        computed: {
            now() {
                let data = new Date();
                return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            pickTime() {
                this.$refs.picker.open();
            },
            handleConfirm(data) {
                this.selectTime = true;
                this.rightTime = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
                this.reset();
                this.getList();
            },
            change() {
                this.chooseNum = !this.chooseNum;
                this.reset();
                this.getList();
            },
            makeAwsome(item) {
                let that = this;
                this.$http.post('/dailyCheck/checkGood', {
                    addUserId: item.userId,
                    id: item.id
                })
                    .then(function (response) {
                        //animation going
                        if(response.data.code=='200000'){
                            that.clickHeart = true;
                            let timer = null;
                            clearTimeout(timer);
                            setTimeout(() => that.clickHeart = false, 1000)
                            //add awsome
                            item.score += 1;
                        }


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            loadMore() {
                if (!this.lastPage) {
                    this.getList();
                    this.loading = true;
                } else {
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            reset() {
                this.lastPage = false;
                this.pageNumber = 1;
                this.list = [];
            },
            getList() {
                let that = this;
                if (this.chooseNum) {
                    this.$http.post('/dailyCheck/todayOrder', {
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        selectTime: this.rightTime
                    })
                        .then(function (response) {
                            that.pageNumber += 1;
                            if (response.data.data.list.last) {
                                that.lastPage = true;
                            }
                            that.list = that.list.concat(response.data.data.list.content);
                            console.log(response.data.data.list.content)
                            if(that.needMycheck && response.data.data.myCheck) {
                                that.needMycheck=false;
                                that.myCheck = response.data.data.myCheck;
                            }

                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$http.post('/dailyCheck/monthOrder', {
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize
                    })
                        .then(function (response) {
                            that.pageNumber += 1;
                            if (response.data.data.last) {
                                that.lastPage = true;
                            }
                            that.list = that.list.concat(response.data.data.content);
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }


            },
        }
    }
</script>