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
            <router-view class="child-view"></router-view>
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
            $route(to){
                this.$store.commit('hideLoading');
                document.body.scrollTop=0;
                const noncePath = to.fullPath,
                    format = JSON.stringify([noncePath])

                const KEY = 'history'

                let historyInd = -1, exist;

                if(this.isInitial) {
                    window.sessionStorage.setItem(KEY, '')
                }
                this.isInitial = false

                exist = window.sessionStorage.getItem(KEY) ?
                    JSON.parse(window.sessionStorage.getItem(KEY)) :
                    window.sessionStorage.getItem(KEY);
                if(!exist) {
                    this.transitionName = 'slide-left'
                    window.sessionStorage.setItem(KEY, format)
                } else {
                    if((historyInd = exist.indexOf(noncePath)) == -1) {
                        exist.push(noncePath)
                        this.transitionName = 'slide-left'
                    } else {
                        exist.splice(historyInd)
                        this.transitionName = 'slide-right'
                    }
                    window.sessionStorage.setItem(KEY, JSON.stringify(exist))
                }

            }
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
        width: 100%;
        padding-bottom: 1rem;
        transition: all .8s cubic-bezier(.55, 0, .1, 1) ;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        /*-webkit-transform: translate(50px, 0);*/
        /*transform: translate(50px, 0);*/
    }
    .slide-left-enter,.slide-right-enter{

    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        /*-webkit-transform: translate(-50px, 0);*/
        /*transform: translate(-50px, 0);*/
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
