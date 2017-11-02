<template>
    <div>
        <boardSearch @getData="getData"></boardSearch>

        <!--爱心排行榜-->
        <div class="paddingAll borderBottom">
            <span>您本月可用的爱心分：600分</span>
            <span class="fr">
                <span class="marginRight"><i class="icon iconfont icon-liang-huangjin yellow fs36"></i> 10分</span>
                <span><i class="icon iconfont icon-love red fs36"></i> 10分</span>
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
                        <p><i class="icon iconfont icon-love gray"></i></p>
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

</style>
<script>
    import boardSearch from '../components/boardSearch.vue'
    export default {
        data() {
            return {
                showOption:false
            }
        },
        methods:{
            getData(msg){
                console.log(msg)
            }
        },
        components:{
            boardSearch
        }
    }
</script>