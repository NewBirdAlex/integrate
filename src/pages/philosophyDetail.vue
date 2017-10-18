<template>
    <div>
        <div class="paddingAll bgWhite lh40">
            <p class="fs30">企业经营管理哲学的重要性你是否知道？是如何
                快速进行操作的？</p>
            <p class="fs24 gray marginTop">美峰科技发布于 2017-8-6 16：16：08</p>
            <div class="gray">
                每天可阅读一次
                <i class="icon iconfont icon-yanjing"></i>1220
                <span class="fr gray">已阅读</span>
            </div>
        </div>

        <div class="paddingAll bgWhite marginTop lh40">
            企业的作用在推动社会发展和经济的发展的过程中起
            着巨大的并且不可或缺的作用。也正因为如此，企业在社
            会中的责任就更加的巨大。一个企业的生存下来和发展壮
            大，跟社会关系密切，却也跟它之身的责任和管理。
        </div>
        <div class=" bgWhite marginTop">
            <p class=" paddingAll borderBottom fs30">他们都阅读了</p>
            <div class=" paddingAll overflow">
                <div class="people tac fl marginRight marginTop marginLeft" v-for="i in 9">
                    <img src="../assets/img/head.png" class="headPicture" alt="">
                    <p class="fs24 lh40">欧阳莉</p>
                </div>
            </div>
        </div>

        <div class="btn">
            已阅读并遵守（+20分）
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .btn{
        height: 0.88rem;
        line-height:0.88rem;
        .marginAll;
        background-color: rgba(225, 225, 225, 1);
        border-radius: 8px 8px 8px 8px;
        color: #646464;
        .tac;
        margin-top: 1rem;
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>