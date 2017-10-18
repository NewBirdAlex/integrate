<template>
    <div>
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                企业经营哲学
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="搜索">
            </div>
            <div style="clear: both"></div>
            <div class="option " v-if="showOption">
                <div v-for="i in 4">
                    <p class="subt">时间段</p>
                    <div class="overflow">
                        <span class="btn">今日</span>
                        <span class="btn active">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                    </div>
                </div>
                <div class="tac cbtn overflow">
                    <span class="fl">重置</span>
                    <span class="fr">确认</span>
                </div>
            </div>
        </div>

        <div class="marginTop paddingAll bgWhite lh40" v-for="i in 5" @click="go">
            <p class="fs30">企业经营管理企业经营管理者是如何经营？如何快速
                提升公司的经营模式？</p>
            <div class="gray fs26 marginTop">
                每天可阅读一次
                <i class="icon iconfont icon-yanjing"></i>
                1111
                <span class="fr">已阅读</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .option{
        position: absolute;
        left:0;
        top:1rem;
        width: 7.1rem;
        z-index: 10;
        .bgWhite;
        .paddingAll;
        overflow: hidden;
        .subt{
            line-height: 0.5rem;
            font-size: @fs30;
        }
        .btn{
            .fl;
            padding:0.2rem 0.4rem;
            .border;
            margin:0.1rem 0.2rem;
            &.active{
                background: @blue;
                color:white;
            }
        }
    }
    .search{
        .borderBottom;

        position: relative;
        .left{
            width: 2.5rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right{
            .fl;
            width: 4.5rem;
            text-indent: 1em;
            padding:0.1rem 0;
            .borderRadius;
            input{
                margin-left: 0.2rem;
                border: none;
                outline: none;
            }
        }
    }
    .cbtn{
        span{
            display: inline-block;
            width: 40%;
            line-height: 0.5rem;
            .border;
            .borderRadius;
            margin:0.3rem;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                showOption:false
            }
        },
        methods:{
            go(){
                //路由跳转
                this.$router.push('/philosophyDetail')
            }
        }
    }
</script>