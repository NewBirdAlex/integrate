<template>
    <div class="bgWhite">
        <div class="overflow list" v-for="i in 5">
            <span class="blue fl left">1</span>
            <div class="right">
                <img src="../assets/img/head.png" class="headPicture marginRight" alt="">
                <span class="fs36">欧阳啦啦</span>
                <span class="fr blue">
                <i class="icon iconfont icon-aixin-copy red marginRight"></i>
                <span class="marginRight fs30">5000</span>
            </span>
            </div>

        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .list{
        line-height: 1rem;
        padding:0.3rem 0 0 0;
        &:last-child{
            .right{
                border: none;
            }
        }
        .left{
            width: 10%;
            .tac;
            font-size: 0.5rem;
        }
        .right{
            width: 90%;
            .borderBottom;
            .fl;
            .paddingBottom;
            .icon{
                font-size: 0.5rem;
                vertical-align: middle;
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>