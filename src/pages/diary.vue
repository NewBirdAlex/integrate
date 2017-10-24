<template>
    <div>
        <div class="paddingAll borderBottom bgWhite overflow">
            <img src="../assets/img/head.png" class="headPicture fl marginRight"  alt="">
            <i class="icon iconfont "></i>
            <p class="lh40 fs30">欧阳诗曼</p>
            <p class="lh40 fs26 gray">行政部</p>
        </div>
        <div class="paddingAll fs30 bgWhite">
            奖励积分
            <span class="fr">20分</span>
        </div>
        <div class="marginTop"></div>
        <div class="paddingAll borderBottom  bgWhite">
            <div class="  ">
                <div class=" fs30 gray">今日完成</div>
                <div class="lh40 fs30 marginTop">
                    发传单200份,发传单200份发传单200份发传单200份发
                    传单200份
                </div>
                <div class="overflow">
                    <img src="../assets/img/1.jpg" v-for="i in 5" class="fl iw" alt="">
                </div>
                <div class="paddingAll gray fs26">
                    <span>08-16 16:08</span>
                    <span class="fr">
                    <i class="icon iconfont icon-aixin-copy"></i> 200
                </span>
                </div>
            </div>
        </div>
        <!--已点赞-->
        <div class="marginTop"></div>
        <div class="paddingAll bgWhite borderBottom fs30">
            已点赞（5）
        </div>
        <div class="overflow bgWhite paddingAll">
            <div class="hd" v-for="i in 6">
                <img src="../assets/img/1.jpg"  class="headPicture" alt="">
                <p class="fs24 lh40">欧阳莉</p>
            </div>
        </div>
        <!--评论-->
        <div class="marginTop"></div>
        <div class="paddingAll bgWhite borderBottom fs30">
            已点赞（5）
        </div>
        <div class=" bgWhite">
            <div class="list" v-for="i in 5">
                <div class="left">
                    <img src="../assets/img/head.png" class="headPicture" alt="">
                </div>
                <div class="right">
                    <div class="fs30">
                        <span>欧阳莉</span>
                        <span class="fr fs26 gray">10月12 12:10</span>
                        <p class="gray marginTop">
                            做的非常好，从中学到好多，感谢分享哦
                            做的非常好，从中学到好多，感谢分享哦
                            做的非常好，从中学到好多，感谢分享哦
                            做的非常好，从中学到好多，感谢分享哦
                            做的非常好，从中学到好多，感谢分享哦
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cmbtn">
            <input type="text" placeholder="请输入您的评论内容">
            <span class="fs36">发送</span>
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
    export default {
        data() {
            return {}
        }
    }
</script>