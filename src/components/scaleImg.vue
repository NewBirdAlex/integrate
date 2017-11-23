<template>
    <div class="">
        <div class="showList">
            <img :src="item" alt="" v-for="(item,index) in imgList" :key="index" @click="handleScale(item,index)">
        </div>
        <div class="mask" v-show="showMask" @click="showMask=!showMask">
            <!--<swipe class="my-swipe" style="height: 3rem" :auto='10000000' ref="myswipe">-->
            <!--<swipe-item class="slide1" v-for="item in imgList" :key="1">-->
            <!--<img :src="item" alt="">-->
            <!--</swipe-item>-->
            <!--</swipe>-->

            <swiper class="my-swipe" ref="myswipe">
                <div v-for="item in imgList" :key="1"><img :src="item" alt=""></div>
            </swiper>
            <!--<swipe v-model="showIndex" class="my-swipe">-->
            <!--<swipe-item class="slide1" v-for="item in imgList" :key="1">-->
            <!--<img :src="item" alt="">-->
            <!--</swipe-item>-->
            <!--</swipe>-->
        </div>

    </div>
</template>
<script>
    //    require('vue-swipe/dist/vue-swipe.css');
    ////
    //    import { Swipe, SwipeItem } from 'vue-swipe';

    // import css file
    //    require('c-swipe/dist/swipe.css');

    // import c-swipe files into main.js
    //    import { Swipe, SwipeItem } from 'c-swipe';
    import {Swiper} from 'vue2-swiper'
    export default {
        data(){
            return {
                showMask: false,
                showIndex: 1,
            }
        },
        props: {
            imgList: {
                type: Array
            }
        },
        components: {
            Swiper
        },
        methods: {
            handleScale(item, index){
                let that = this;

                this.showMask = true;
                setTimeout(() => {

                    this.$refs.myswipe.setPage(index+1, true);
                }, 100)

            }
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .overflow;
        background: rgba(0, 0, 0, 0.7);
        z-index: 100;
        .my-swipe {
            position: absolute;
            top: 50%;
            width: 100%;
            height: auto !important;
            transform: translateY(-50%);
            img {
                width: 100%;
            }
        }
    }

    .showList {
        img {
            width: 2rem;
            height: 2rem;
            .marginRight;
            .marginTop;
        }
    }
</style>