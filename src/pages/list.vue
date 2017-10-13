<template>
    <div>
        <ul>
            <li v-for="item in 30">{{item}} jks加快速度积分</li>
        </ul>
        <router-link to="/home">go home</router-link>
        <router-link to="/upload">go upload</router-link>

    </div>
</template>
<style lang="less" scoped>
    @import '../assets/css/common.less';
    ul{
        li{
            line-height: 40px;
//            .blue;
        }
    }
</style>
<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>