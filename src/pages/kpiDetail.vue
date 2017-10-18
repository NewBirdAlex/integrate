<template>
    <div>
        <div class="paddingAll bgWhite lh40">
            <p class="fs30">企业经营管理哲学的重要性你是否知道？是如何
                快速进行操作的？</p>
            <p class="fs24 gray marginTop">美峰科技发布于 2017-8-6 16：16：08</p>
            <div class="gray">
                <span class="marginRight">每天可阅读一次</span>
                <i class="icon iconfont icon-renwu1"></i>1220
                <span class="fr gray">已阅读</span>
            </div>
        </div>
        <div v-for="i in 3">
            <div class="paddingAll fs30 lh40">
                1.以下哪个才是正确的做法？<span class="red">*</span>
                <span class="gray">（答对得6分，答错不扣分）</span>
            </div>
            <div class="marginLeft marginRight bgWhite borderRadius fs28">
                <div class="paddingAll borderBottom">
                    <span class="crl"><i class="icon iconfont icon-gouxuan blue fs36"></i></span> A. 遇到客户要面露笑脸
                </div>
                <div class="paddingAll borderBottom">
                    <span class="crl"></span> A. 遇到客户要面露笑脸
                </div>
                <div class="paddingAll borderBottom">
                    <span class="crl"></span> A. 遇到客户要面露笑脸
                </div>
                <div class="paddingAll borderBottom">
                    <span class="crl"></span> A. 遇到客户要面露笑脸
                </div>
            </div>
        </div>

        <div class=" bgWhite marginTop">
            <p class=" paddingAll borderBottom fs30">他们都考核了</p>
            <div class=" paddingAll overflow">
                <div class="people tac fl marginRight marginTop marginLeft" v-for="i in 9">
                    <img src="../assets/img/head.png" class="headPicture" alt="">
                    <p class="fs24 lh40">欧阳莉</p>
                </div>
            </div>
        </div>

        <div class="confBtn">提交</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .crl{
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        .border;
        vertical-align: middle;
        .marginRight;
        i{font-size: 0.4rem}
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>