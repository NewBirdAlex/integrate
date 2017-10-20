<template>
    <div>

        <router-view></router-view>

        <ul class="bnav">
            <router-link tag="li" to="/workDiary/menu">
                <span>
                    <i class="icon iconfont icon-icon"></i><br>
                    <span>写日记</span>
                </span>

            </router-link>
            <router-link tag="li" to="">
                <span>
                    <i class="icon iconfont icon-kan"></i><br>
                    <span>看日记</span>
                </span>

            </router-link>
            <router-link tag="li" to="">
                <span>
                    <i class="icon iconfont icon-tongji"></i>
                    <br>
                    <span>日记统计</span>
                </span>

            </router-link>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .bnav{
        position: fixed;
        bottom: 0;
        left:0;
        width: 7.5rem;
        .overflow;
        border-top: @border;
        .fs26;
        padding:0.1rem 0;
        li{
            .fl;
            width: 2.5rem;
            .tac;
            .icon{
                font-size: 0.6rem;
                display: inline-block;
                margin-bottom: 0.1rem;
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