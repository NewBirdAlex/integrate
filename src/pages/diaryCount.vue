<template>
    <div>
        <div class="top  fs30 tac">
            <span :class="{'active':chooseNum}" @click="change">本日统计</span>
            <span :class="{'active':!chooseNum}" @click="change">本月统计</span>
        </div>

        <div class="bgWhite paddingAll fs28 borderBottom">
            按上班时间排序
            <span class="fr">
                2017.09.21
                <i class="icon iconfont icon-xiala1 "></i>
            </span>
        </div>
        <!--本日统计-->
        <myInfinite :loading="loading" @getList="getList">

        </myInfinite>
        <div v-if="chooseNum">
            <div class="list marginTop" >
                <span class="left fl sg tac"></span>
                <div class="right fl">
                    <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                    <div class="fl md">
                        <p class="fs30">我</p>
                        <div class="gray fs28">
                            <span>发布日记：6</span>
                            <span>累计点赞：800</span>
                        </div>
                    </div>
                    <div class="fr blue sg marginRight">
                        588933分
                    </div>
                </div>
            </div>
            <div class="marginTop">
                <div class="list" v-for="i in 2">
                    <span class="left fl sg tac">{{i}}</span>
                    <div class="right fl">
                        <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                        <div class="fl md">
                            <p class="fs30">我</p>
                            <div class="gray fs28">
                                <span>发布日记：6</span>
                                <span>累计点赞：800</span>
                            </div>
                        </div>
                        <div class="fr blue sg marginRight">
                            588933分
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--本月统计-->
        <div v-if="!chooseNum">
            <div class="list rb">
                <span class="left fl sg tac">dd</span>
                <div class="right fl">
                    <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
                    <div class="fl md">
                        <p class="fs30">我</p>
                        <p class="gray fs28">正常上班</p>
                    </div>
                    <div class="fl blue sg">
                        588933分
                    </div>
                    <div class="fr paddingRight tac">
                        <p>10</p>
                        <i class="icon iconfont icon-dianzanmw blue"></i>
                    </div>
                </div>
            </div>
        </div>
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
                font-size: 0.4rem;
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
                list:[]
            }
        },
        methods:{
            change(){
                this.chooseNum=!this.chooseNum;
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
            },
            getList(){
                let that = this;
                this.$http.post('/dailyRecord/todayList', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    selectTime: "",
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
        components:{
            myInfinite
        },
        mounted(){
            this.getList();
        }
    }
</script>