<template>
    <div>
        <div class="paddingAll borderBottom bgWhite overflow">
            <img :src="detail.userAvatar" v-if="detail.userAvatar" class="headPicture fl marginRight"  alt="">
            <img src="../assets/img/defaultHead.png" v-else class="headPicture fl marginRight" alt="">
            <i class="icon iconfont "></i>
            <p class="lh40 fs30">{{detail.userName}}</p>
            <p class="lh40 fs26 gray">{{detail.departmentName}}</p>
        </div>
        <div class="paddingAll fs30 bgWhite">
            奖励积分
            <span class="fr">{{detail.addScore}}分</span>
        </div>
        <div class="marginTop"></div>
        <div class="paddingAll borderBottom  bgWhite">
            <div class="  ">
                <div class="lh50 fs30" v-for="(item,index) in JSON.parse(detail.content)">
                    <span class="gray" style="display: inline-block;">{{item.title}}:</span>
                    <span class="fr">{{item.content}}</span>
                </div>
                <div class="overflow" v-if="detail.pics">
                    <scaleImg :imgList="detail.pics.split(',')"></scaleImg>
                </div>
                <!--<div class="paddingTop paddingBottom gray fs26">-->
                    <!--<span>{{detail.createDate}}</span>-->
                    <!--<span class="fr">-->
                        <!--<i class="icon iconfont icon-aixin-copy"></i> {{detail.likeCount}}-->
                    <!--</span>-->
                <!--</div>-->
            </div>
        </div>
        <!--已点赞-->
        <!--<div class="marginTop"></div>-->
        <div class="paddingAll bgWhite borderBottom fs30" v-if="goodList.length">
             <strong>已点赞</strong>
        </div>
        <div class="overflow bgWhite paddingAll" v-if="goodList.length">
            <div class="hd" v-for="(item,index) in goodList">
                <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture" alt="">
                <img src="../assets/img/defaultHead.png" v-else class="headPicture" alt="">
                <p class="fs24 lh40">{{item.userName}}</p>
            </div>
        </div>
        <!--评论-->
        <div class="marginTop" v-if="commentList.length"></div>
        <div class="paddingAll bgWhite borderBottom fs30 " v-if="commentList.length">
            <strong>评论</strong>
        </div>
        <div class=" bgWhite">
            <div class="list" v-for="(item,index) in commentList">
                <div class="left">
                    <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture" alt="">
                    <img src="../assets/img/defaultHead.png" v-else class="headPicture" alt="">
                </div>
                <div class="right">
                    <div class="fs30 overflow">
                        <span>{{item.userName}}</span>
                        <span class="fr fs26 gray">{{item.createDate}}</span>
                        <p class="gray marginTop">
                            {{item.content}}
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="cmbtn" v-if="$route.params.type=='true'">
            <input type="text" placeholder="请输入您的评论内容" v-model="comment">
            <span class="fs36" @click="subComment">发送</span>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .cmbtn{
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        background: @grayBg;
        height: 0.98rem;
        input{
            .marginTop;
            .marginLeft;
            border: none;
            background: white;
            outline: none;
            height: 0.66rem;
            width: 5.3rem;
            .borderRadius;
            text-indent: 1em;
        }
        span{
            .fr;
            background: @blue;
            .tac;
            height: 0.98rem;
            width: 1.7rem;
            line-height: 0.98rem;
            color: white;
        }
    }
    .list{
        .bgWhite;
        .overflow;
        .left{
            .fl;
            width: 1.3rem;
            .tac;
            .paddingTop
        }
        .right{
            .fr;
            width: 6rem;
            .paddingRight;
            .paddingTop;
            .borderBottom;
            .lh40;
            .paddingBottom;
        }
    }
    .hd{
        .fl;
        .tac;
        margin-right: 0.5rem;
        .marginTop;
    }
    .iw{
        width: 2rem;
        height: 2rem;
        .marginRight;
        .marginTop;
    }
</style>
<script>
    import scaleImg from '../components/scaleImg.vue'
    export default {
        data() {
            return {
                detail:{
                    content:'[]'
                },
                comment:'',
                goodList:[],
                commentList:[]
            }
        },
        components:{
            scaleImg
        },
        methods:{
            getDetail(){
                let that = this;
                this.$http.post('/dailyRecord/dailyDetail', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        that.detail = response.data.data.dailyRecordDetail;
                        that.goodList = response.data.data.goodList;
                        that.commentList = response.data.data.cmtUserList;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            subComment(){
                let that = this;
                this.$http.post('/dailyRecord/commentDaily', {
                    id:this.$route.params.id,
                    content:this.comment
                })
                    .then(function (response) {
                        that.comment = '';
                        that.$toast({
                            message:'评论成功',
                            duration:2000
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            setRead(){
                let that = this;
                this.$http.post('/dailyRecord/cmtDaily', {
                    id:this.$route.params.id
                })
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getDetail();
//            this.setRead();
        }
    }
</script>