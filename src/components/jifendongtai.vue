<template>
    <div>
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-jifen1 blue"></i>
                <span class="gray">积分动态</span>
                <span class="fr"> 9 yue</span>
            </div>
            <div class="paddingAll">
                <div class="showdt" v-for="i in 3">
                    <div class="left">
                        <img src="../assets/img/head.png" alt="">
                    </div>
                    <div class="right">
                        <h4>
                            <strong>李梦洁</strong>
                            <span class="fr blue">
                                <span class="marginAll">+300</span>
                                <span>A分</span>
                            </span>
                        </h4>
                        <p class="gray">设计师</p>
                        <p> <strong>本月业绩目标8000达标，奖励200分</strong></p>
                        <p>本月业绩已经超额完成，谢谢领导的栽培，我会继
                            续努力实现更大的目标
                        </p>
                        <div class="cp">
                            <img src="../assets/img/1.jpg" v-for="i in 5" alt="">
                        </div>
                        <p class="gray">
                            <i class="icon iconfont icon-shijian"></i>
                            18:16
                            <span class=" fr ">
                                 <i class="icon iconfont icon-aixin-copy"></i>
                                100
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
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

    .showdt{
        margin-top: 0.2rem;
        .borderBottom;
        padding:0.2rem 0;
        .overflow;
        &:last-child{
            border-bottom: none;
        }
        .left{
            width: 1.1rem;
            .fl;
            img{
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 50%;
            }
        }
        .right{
            width: 5.5rem;
            .fl;
            line-height: 0.4rem;
            font-size: @fs26;
            h4{font-size: @fs30;}
            .cp{
                .overflow;
                img{
                    float: left;
                    width: 1.6rem;
                    height: 1.6rem;
                    margin: 0.1rem 1.5%;
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