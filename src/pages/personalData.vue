<template>
    <div>

        <div class="bgWhite marginTop ">
            <router-link tag="div" to="/uploadUserPic" class="borderBottom paddingAll overflow tar fs30" style="line-height: 0.5rem">
                 <span class=" fl">头像</span>
                <img :src="baseInf.userAvatar" class="littleHead " alt="">
                <span class="rightArrow fr">
                   <i class="icon iconfont icon-xiala1"></i>
                </span>
            </router-link>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">用户名</span>
                <span class="fr gray">{{baseInf.userName}}</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">所在部门</span>
                <span class="fr gray">{{baseInf.departmentName}}</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">职位</span>
                <span class="fr gray">{{baseInf.jobTitle}}</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">工号</span>
                <span class="fr gray">{{baseInf.employeeNo}}</span>
            </div>
            <div class="borderBottom paddingAll overflow  fs30">
                <span class=" ">总积分</span>
                <span class="fr gray">{{baseInf.userScore}}</span>
            </div>
            <router-link tag="div" :to='"/baseInfor/"+baseInf.userId' class="borderBottom paddingAll overflow  fs30">
                <span class=" ">基础积分</span>
                <span class="rightArrow fr">
                   <i class="icon iconfont icon-xiala1"></i>
                </span>
                <span class="fr gray">{{baseInf.baseScore}}</span>
            </router-link>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'baseInf',
            ])
        },
        mounted(){
            this.$store.commit('getuserBaseInf')
        }
    }
</script>