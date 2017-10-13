<template>
    <div>
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="../assets/img/1.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item><img src="../assets/img/2.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../assets/img/3.jpg" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-daiban blue"></i>
                <span class="gray">今日待办</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
            <div class="subt">
                设计公司LOGOs
                <span class="blue fr">+600分</span>
            </div>
            <div class="subt">
                接待客户参观公司
                <span class="blue fr">+600分</span>
            </div>
            <div class="subt">
                设计公司LOGO
                <span class="blue fr">+600分</span>
            </div>
        </div>
        <!--今日积分排名-->
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-paiming yellow"></i>
                <span class="gray">今日积分排名</span>
            </div>
            <div class="subt overflow ">
                <div class="fl half">
                    <p class="blue">200</p>
                    <p class="gray">排名</p>
                </div>
                <div class="fl half">
                    <p class="blue">600</p>
                    <p class="gray">今日积分</p>
                </div>
            </div>
            <div class="subt addHead">
                <img src="../assets/img/head.png" alt="">
                <span class="blue">欧阳诗曼获得今日的积分冠军</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
        </div>
        <!--积分福利-->
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-fuli red"></i>
                <span class="gray">积分福利</span>
            </div>
            <div class="subt overflow ">
                <div class="fl half showImg">
                    <div>
                        <img src="../assets/img/1.jpg" alt="">
                    </div>
                    <h4>红色炫酷车模型</h4>
                    <p>
                        <span class="yellow">¥ 600分</span>
                        <span class="gray">还差100分</span>
                    </p>
                </div>
                <div class="fl half showImg">
                    <div>
                        <img src="../assets/img/1.jpg" alt="">
                    </div>
                    <h4>红色炫酷车模型</h4>
                    <p>
                        <span class="yellow">¥ 600分</span>
                        <span class="gray">还差100分</span>
                    </p>
                </div>
            </div>
            <div class="subt">
                <span class="blue">你有3个积分抽奖活动正在进行</span>
                <span class="fr gray rightArrow">
                    <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
        </div>
        <!--积分动态-->

        <jfdt></jfdt>
    </div>
</template>
<style scoped lang="less">
    @import '../assets/css/common.less';

    .subt{
        font-size: @fs28;
        padding:0.3rem 0;
        margin: 0 0.2rem;
        .borderBottom;
        &:nth-child(1){
            margin: 0;
            padding:0.3rem 0.2rem;
        }
    }
    .addHead{
        img{
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            vertical-align: middle;
        }
        .gray{margin-top: 0.15rem}
    }
    .showImg{
        text-align: left!important;
        line-height: 0.5rem;
        p,h4{
            text-indent: 1em;
        }
        img{
            width: 95%;
            border-radius: 2px 2px 2px 2px;
        }
    }
    .half{
        width: 50%;
        .tac;
        .blue{
            font-size: 0.6rem;
            margin-bottom: 0.2rem;
        }

    }

    .slide{
        height: 3rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
    }

</style>
<script>
    import '../assets/css/animate.css'
    import jfdt from '../components/jifendongtai.vue'

    export default {
        data(){
            return{

            }
        },
        components:{
            jfdt
        },
        mounted(){
            console.log(this.$route.path)
        }
    }

</script>