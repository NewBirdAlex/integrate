<template>
    <div>
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                筛选排名
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

        <!--爱心排行榜-->
        <div class="paddingAll borderBottom">
            <span>您本月可用的爱心分：600分</span>
            <span class="fr">
                <span class="marginRight"><i class="icon iconfont icon-liang-huangjin yellow fs36"></i> 10分</span>
                <span><i class="icon iconfont icon-aixin-copy red fs36"></i> 10分</span>
            </span>
        </div>

        <div class="bgWhite">
            <div class="overflow  fs36 loveList " v-for="(i,index) in 5">
                <div class="fl left  ">{{index+1}}</div>
                <div class="fl right">
                    <router-link to="/loveRank" tag="div" class="fl marginRight"><img src="../assets/img/head.png" class="headPicture" alt=""></router-link>
                    <div class="fl">
                        <p><strong>我</strong></p>
                        <p class="gray fs30">本月 960分</p>
                    </div>
                    <div class="fr  tac marginRight">
                        <p>6</p>
                        <p><i class="icon iconfont icon-aixin-copy gray"></i></p>
                    </div>
                    <div class="fr marginRight tac">
                        <p>6</p>
                        <p><i class="icon iconfont icon-liang-huangjin yellow"></i></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .yellow{color:#f5b739;}
    .red{color:#f55839;}
    i{vertical-align: middle}
    .loveList{
        line-height: 0.5rem;
        padding: 0.3rem 0 0 0 ;
        &:last-child{
            .right{
                border: none;
            }
        }
        .icon{font-size: 0.5rem}
        .left{
            width: 10%;
            .tac;
            font-size: 0.5rem;
            padding-top: 0.2rem;
        }
        .right{
            width: 90%;
            .borderBottom;
            padding-bottom: 0.2rem;
        }
    }
    /*belov is search css*/
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
    .option{
        position: absolute;
        left:0;
        top:0.8rem;
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
    .triangle-down {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid @gray;
        display: inline-block;
        vertical-align: middle;

    }
    .search{
        .borderBottom;

        position: relative;
        .left{
            width: 2rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right{
            .fl;
            width: 5rem;
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
</style>
<script>
    export default {
        data() {
            return {
                showOption:false
            }
        }
    }
</script>