<template>
    <div>
        <router-view></router-view>
        <ul class=" bgWhite tac">
            <router-link to="/checkingIn/clockIn" tag="li" active-class="blue"> <i class="icon iconfont icon-dingwei"></i> <p>打卡</p></router-link>
            <router-link to="/checkingIn/checkingRec" tag="li" active-class="blue"> <i class="icon iconfont icon-tongji1"></i> <p>打卡记录</p></router-link>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    ul{
        border-top: @border;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        li{
            padding:0.2rem 0;
            .fl;
            width: 50%;
            i{
                font-size: 0.4rem;
                .marginBottom;
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