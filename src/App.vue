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
    </div>
</template>

<script>
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
        methods: {
            handleClick(item, index) {
                this.navIndex = index;
                this.$router.push({path: item.router})
            }
        },
        beforeRouteUpdate(to, from, next) {
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
            next()
        }
    }
</script>

<style scoped lang="less">
    @import "assets/css/common.less";
    /*animation    */
    .child-view {
        /*position: absolute;*/
        /*width: 100%;*/
        transition: all .8s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(50px, 0);
        transform: translate(50px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-50px, 0);
        transform: translate(-50px, 0);
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
