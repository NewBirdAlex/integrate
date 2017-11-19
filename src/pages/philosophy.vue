<template>
    <div>
        <div class="search paddingAll" v-if="false">
            <div class="left" @click="showOption=!showOption">
                企业经营哲学
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="搜索">
            </div>
            <div style="clear: both"></div>
            <div class="option " v-if="showOption">
                <div v-for="i in 4">
                    <p class="subt">时间段</p>
                    <div class="overflow">
                        <span class="btn">今日</span>
                        <span class="btn active">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                    </div>
                </div>
                <div class="tac cbtn overflow">
                    <span class="fl">重置</span>
                    <span class="fr">确认</span>
                </div>
            </div>
        </div>

        <ul class="marginLeft marginRight"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom bgWhite">
                <div class="marginTop paddingAll bgWhite lh40" @click="go(item)">
                    <div class="fs30" v-html="item.title"></div>
                    <div class="gray fs26 marginTop">
                        每天可阅读 {{item.isOnly}}次
                        <i class="icon iconfont icon-yanjing"></i>
                        1111
                        <span class="fr blue" v-if="!item.isRead">未阅读</span>
                        <span class="fr" v-if="item.isRead">已阅读</span>
                    </div>
                </div>
            </li>

            <li class="tac" v-if="loading">
                <div class="loadmore">
                    <mt-spinner color="#26a2ff"></mt-spinner>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .option{
        position: absolute;
        left:0;
        top:1rem;
        width: 7.1rem;
        z-index: 10;
        .bgWhite;
        .paddingAll;
        overflow: hidden;
        .subt{
            line-height: 0.5rem;
            font-size: @fs30;
        }
        .btn{
            .fl;
            padding:0.2rem 0.4rem;
            .border;
            margin:0.1rem 0.2rem;
            &.active{
                background: @blue;
                color:white;
            }
        }
    }
    .search{
        .borderBottom;

        position: relative;
        .left{
            width: 2.5rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right{
            .fl;
            width: 4.5rem;
            text-indent: 1em;
            padding:0.1rem 0;
            .borderRadius;
            input{
                margin-left: 0.2rem;
                border: none;
                outline: none;
            }
        }
    }
    .cbtn{
        span{
            display: inline-block;
            width: 40%;
            line-height: 0.5rem;
            .border;
            .borderRadius;
            margin:0.3rem;
        }
    }
</style>
<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                showOption:false,
                list: [],
                pageNumber: 1,
                pageSize: 5,
                lastPage: false,
                loading: false
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        methods: {
            go(item){
                //路由跳转
                this.$router.push({ name: 'PhilosophyDetail', params: { id: item.id }})
            },
            loadMore() {
                if (!this.lastPage && !this.loading) {
                    this.getList();
                    this.loading = true;
                } else {
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getList() {
                let that = this;
                console.log(that.pageNumber)
                if (!that.lastPage) {
                    this.$http.post('/culture/cultureListByUser', {
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        sortOrder: "asc",
                        token: this.userMessage.token,
                        userId: this.userMessage.userId
                    })
                        .then(function (response) {
                            that.pageNumber += 1;
                            if (response.data.data.last) {
                                that.lastPage = true;
                            }
                            that.list = that.list.concat(response.data.data.content);
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    that.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }

            },
        },
        mounted() {
            this.getList();
        }
    }
</script>