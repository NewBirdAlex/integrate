<template>
    <div>

        <router-view></router-view>

        <ul class="bnav" v-show="!$route.meta.diaryNav">
            <router-link tag="li" v-for="(item,index) in navList" :key="index" active-class="blue" :to="item.path">
                <span>
                    <i class="icon iconfont " :class="item.icon"></i><br>
                    <span>{{item.name}}</span>
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
        background: @grayBg;
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
                navList:[
                    {
                        path:'/workDiary/menu',
                        icon:'icon-bianji',
                        name:"写日记"
                    },
                    {
                        path:'/workDiary/watch',
                        name:"看日记",
                        icon:'icon-yanjing'
                    },
                    {
                        path:'/workDiary/diaryCount',
                        icon:'icon-tongji',
                        name:"日记统计"
                    }
                ]
            }
        }
    }
</script>