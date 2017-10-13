<template>
    <div>
        <div class="paddingAll">
            <div class="bgWhite  search">
                <i class="icon iconfont icon-sousuo gray"></i>
                <input type="text" placeholder="请输入搜索的内容">
            </div>
        </div>
        <div class="paddingAll  bgWhite fs30">
            <span class="blue">联系人</span>
            <span class="rightArrow"><i class="icon iconfont icon-xiala1 gray"></i></span>
            <span class="gray">美蜂科技</span>
        </div>
        <div class="marginTop bgWhite fs30">
            <div class="borderBottom paddingAll" v-for="i in 5">
                行政部
                <span class="fr rightArrow">
                   <i class="icon iconfont icon-xiala1 gray"></i>
                </span>
            </div>
        </div>
        <div class="marginTop bgWhite">
            <div class="overflow paddingAll people fs30 borderBottom" v-for="i in 3">
                <img src="../assets/img/head.png" class="headPicture fl marginRight" alt="">
                <div class="fl">
                    <p>欧阳诗曼 <span class="rp">管理员</span></p>
                    <p class="gray">行政总裁</p>
                </div>
                <span class="blue fr">15177895267</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .people{
        line-height: 0.5rem;
        .rp{
            padding: 0.1rem 0.2rem;
            color: white;
            background: @red;
            border-radius: 0.3rem;
        }
        .blue{
            margin-top: 0.2rem;
        }
    }
    .search{
        padding: 0.2rem;
        .borderRadius;
        i{
            .fs34;
            margin-right: 0.2rem;
            vertical-align: middle;
        }

        input{
            border: none;
            outline: none;
            vertical-align: middle;
            width: 5rem;
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