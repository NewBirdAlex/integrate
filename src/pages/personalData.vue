<template>
    <div>

        <div class="bgWhite marginTop ">
            <div class="borderBottom paddingAll overflow tar fs30">
                 <span class=" fl">头像</span>
                <img src="../assets/img/head.png" class="littleHead " alt="">
                <span class="rightArrow fr">
                   <i class="icon iconfont icon-xiala1"></i>
                </span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">头像</span>
                <span class="fr gray">欧阳诗曼dd</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">所在部门</span>
                <span class="fr gray">设计部</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">职位</span>
                <span class="fr gray">欧阳诗曼</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">工号</span>
                <span class="fr gray">120002</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">总积分</span>
                <span class="fr gray">20000</span>
            </div>
            <router-link tag="div" to='/baseInfor' class="borderBottom paddingAll overflow  fs30">
                <span class=" ">基础积分</span>
                <span class="rightArrow fr">
                   <i class="icon iconfont icon-xiala1"></i>
                </span>
                <span class="fr gray">80</span>
            </router-link>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

</style>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>