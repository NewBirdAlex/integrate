<template>
    <div>
        <div class="marginBottom bgWhite paddingAll lh40" v-for="i in 6" @click="go">
            <p class="fs30">企业经营管理企业经营管理者是如何经营？如何快速
                提升公司的经营模式？</p>
            <div class="fs24 marginTop gray">
                <span class="marginRight">仅可考核一次</span>
                <i class="icon iconfont icon-yanjing"></i>1220
                <span class="blue fr">未考核</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

</style>
<script>
    export default {
        data() {
            return {}
        },
        methods:{
            go(){
                //路由跳转
                this.$router.push('/kpiDetail')
            }
        }
    }
</script>