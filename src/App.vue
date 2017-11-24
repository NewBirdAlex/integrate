<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <!--<h1>{{ msg }}</h1>-->
        <!--<transition-->
        <!--name="custom-classes-transition"-->
        <!--enter-active-class="animated fadeInLeftBig"-->
        <!--leave-active-class="animated  fadeOutRightBig"-->
        <!--&gt;-->
            <!--<router-view></router-view>-->
        <!--</transition>-->

        <transition :name="transitionName">
            <router-view :class="{'child-view':true,'no-trans':ismove}"></router-view>
        </transition>

        <loading v-if="showLoading"></loading>
        <transition
                name="custom-classes-transition"
                enter-active-class="animated slideInUp"
                leave-active-class="animated  slideOutDown"
        >
        <ul class="nav" v-show="$route.meta.navShow">
            <router-link
                    tag="li"
                    :to="item.router"
                    v-for="(item,index) in navList"
                    :key="index"
                    active-class="active"
                >
                <p><i class="icon iconfont" :class="item.icon"></i></p>
                {{item.name}}
            </router-link>
        </ul>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import loading from './components/loading.vue'
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-left',
                msg: '',
                ismove:false,
                navIndex: 0,
                navList: [
                    {
                        name: '首页',
                        icon: 'icon-shouye',
                        router: '/home'
                    },
                    {
                        name: '工作台',
                        icon: 'icon-gongzuotai',
                        router: '/work'
                    },
                    {
                        name: '积分榜',
                        icon: 'icon-tongji',
                        router: '/board'
                    },
                    {
                        name: '个人中心',
                        icon: 'icon-gerenzhongxin',
                        router: '/person'
                    }
                ]
            }
        },
        components:{
            loading
        },
        computed: {
            ...mapGetters([
                'showLoading',
            ]),
        },
        mounted(){
            this.$store.commit('getLocalUserMessage')
            this.$store.commit('getWorkStation')
        },
        methods: {
            handleClick(item, index) {
                this.navIndex = index;
                this.$router.push({path: item.router})
            }
        },
        watch:{
            '$route'(to, from) {
                let navs = ['/index','/meWatch','/shopingMall','/aboutMe'];
                let toInd = navs.indexOf(to.path);
                let foInd = navs.indexOf(from.path);
                if(toInd!=-1 && foInd!=-1){
                    if(toInd > foInd){
                        this.transitionName = 'slide-left';
                    }else{
                        this.transitionName = 'slide-right';
                    }
                    return;
                }
            }
        },
        created(){
            window.addEventListener('touchmove',()=>{this.ismove = true;},false);
            window.addEventListener('touchend',()=>{
                setTimeout(()=>{this.ismove = false},250);
            },false);
        },
        beforeRouteUpdate  (to, from, next) {

        }
    }
</script>

<style scoped lang="less">
    @import "assets/css/common.less";
    /*animation    */
    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55,0,.1,1);
        padding-bottom: 3.5rem;
    }
    .no-trans{
       transition: all 0s!important;
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }
    .slide-left-leave-active,.slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-60%, 0);
        transform: translate(-60%, 0);
    }
    .no-trans{
        transition-duration:0s;
    }
    /*控制器*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
    }

    .nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        border-top: @border;
        li {
            float: left;
            width: 25%;
            text-align: center;
            .gray;
            font-size: 0.2rem;
            padding: 0.2rem 0;
            background: @grayBg;
            font-size: @fs24;
            i {
                font-size: 0.5rem !important;
            }
        }
        .active {
            .blue;
        }
    }
</style>
