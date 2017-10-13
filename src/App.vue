<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <!--<h1>{{ msg }}</h1>-->
        <router-view></router-view>
        <ul class="nav">
            <li v-for="(item,index) in navList"
                         :key="index"
                         :class="{active:navIndex==index}"
                         @click="handleClick(item,index)">
                <p><i class="icon iconfont" :class="item.icon" ></i></p>
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: '',
                navIndex:0,
                navList:[
                    {
                        name:'首页',
                        icon:'icon-shouye',
                        router:'/home'
                    },
                    {
                        name:'工作台',
                        icon:'icon-gongzuotai',
                        router:'/work'
                    },
                    {
                        name:'积分榜',
                        icon:'icon-tongji',
                        router:'/board'
                    },
                    {
                        name:'个人中心',
                        icon:'icon-gerenzhongxin',
                        router:'/person'
                    }
                ]
            }
        },
        methods:{
            handleClick(item,index){
                this.navIndex = index;
                this.$router.push({ path: item.router })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "assets/css/common.less";
    /*@import "assets/font/font1/iconfont.css";*/

.nav{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    overflow: hidden;
    border-top: @border;
    li{
        float: left;
        width: 25%;
        text-align: center;
        .gray;
        font-size: 0.2rem;
        padding:0.2rem 0;
        background: @grayBg;
        font-size: @fs24;
        i{
            font-size: 0.5rem!important;
        }
    }
    .active{
        .blue;
    }
}
</style>
