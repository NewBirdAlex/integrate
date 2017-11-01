<template>
    <div>

        <boardSearch @getData="collectData"></boardSearch>
        <div class="gray listWrap" style="font-weight: bold">
            <span>排名</span>
            <span></span>
            <span>姓名</span>
            <span>加分</span>
            <span>扣分</span>
            <span class="blue ">总分</span>
        </div>
        <div class="bgWhite listWrap" v-for="(i,index) in 1">
            <span>
                <i v-if="index>=3">{{index}}</i>
                    <i class="icon iconfont " :class="{'icon-jin':index==0,'icon-tong':index==1,'icon-yin':index==2}"
                       v-if="index<3"></i>
            </span>
            <span><img src="../assets/img/head.png" class="headPicture" alt=""></span>
            <span>欧阳诗</span>
            <span>2000</span>
            <span>2000</span>
            <span class="blue ">222</span>
        </div>
        <!--loadmore-->
        <div style="height: 9rem;overflow: scroll;" class="marginTop">
            <mt-loadmore
                    :bottom-all-loaded="allLoaded "
                         :bottom-method="loadBottom"
                         ref="loadmore"
            >
                <ul class="">
                    <li @click="go" v-for="(item,index) in list">
                        <div class="bgWhite listWrap" >
                            <span>
                                <i v-if="index>=3">{{index}}</i>
                                    <i class="icon iconfont " :class="{'icon-jin':index==0,'icon-jin icon-tong':index==1,'icon-yin':index==2}"
                                       v-if="index<3"></i>
                            </span>
                            <span><img src="../assets/img/head.png" class="headPicture" alt=""></span>
                            <span>欧阳诗</span>
                            <span>2000</span>
                            <span>2000</span>
                            <span class="blue ">222</span>
                        </div>
                    </li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">Loading...</span>
                </div>
            </mt-loadmore>
        </div>

        <!--loadmore-->

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .listWrap{
        .overflow;
        .fs30;
        .borderBottom;
        span{
            display: inline-block;
            line-height: 1.2rem;
            width: calc(~"7.5rem/6 - 5px");
            .tac;
            .icon {
                font-size: 0.6rem;
            }
        }
    }

    /*loadmore*/
    ul {
        li {
            .tac;
            font-size: 0.4rem;
        }
    }

    /*loadmore*/





    .icon-jin {
        color: #ffe157
    }

    .icon-tong {
        color: #d5e3eb
    }

    .icon-yin {
        color: #f0c789
    }
</style>
<script>
    import boardSearch from '../components/boardSearch.vue'
    export default {
        data() {
            return {

                topStatus: '',
                allLoaded:false,
                list: [1, 2, 4, 5, 3, 3, 3, 33, 3, 3, 2, 3, 3, 2, 3, 23,3]
            }
        },
        components:{
            boardSearch
        },
        methods: {
            collectData(msg){
                //获取搜索栏的数据
                console.log(msg)
            },
            loadBottom(){
                 // 加载更多数据
                //this.allLoaded = true;// 若数据已全部获取完毕
                //this.$refs.loadmore.onBottomLoaded();
                console.log(3)
            },
            go() {
                //路由跳转
                this.$router.push('/infor')
            }
        }
    }
</script>