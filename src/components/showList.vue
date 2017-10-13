<template>
    <div class="wrap">
        <img class="head" src="../assets/img/head.png" alt="">
        <div class="right">
            <p>李梦洁的审批 <span class="blue fr">+100分</span></p>
            <p class="gray">普通员工</p>
            <p>审批本月月季</p>
            <p>积分类型：品德A分</p>
            <p><span class="yellow">待审批</span> <span class="fr gray">08-16 16:08</span></p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";
    .wrap{
        padding:0.2rem 0;
        .borderBottom;
        background: white;
        overflow: hidden;
        .head{
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 50%;
            margin:0.2rem;
            float:left;
        }
        .right{
            float:left;
            display: inline-block;
            width: 6rem;
            font-size: @fs26;
            line-height: 0.35rem;
            padding-right: 0.2rem;
            padding-top: 0.2rem;
            p{
                &:nth-child(1){
                    font-size: @fs30;
                }
                &:nth-child(2){
                    margin-bottom: 0.1rem;
                }
                &:nth-child(4){
                    margin-bottom: 0.1rem;
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>