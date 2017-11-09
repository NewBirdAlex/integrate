<template>
    <div>
        <!--<h3>审批日记</h3>-->
        <ul>
            <li v-for="item in list" class="bgWhite">
                <div class="left"><img src="../assets/img/head.png" alt=""></div>
                <div class="right">
                    <p>审批我的最佳人气奖 <span class="blue fr">+80分</span></p>
                    <p class="yellow">审批中 <span class="gray fr">07-02 12:06</span></p>
                </div>
            </li>
        </ul>

        <ul class=" "
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom bgWhite">
                <div class="overflow bgWhite paddingAll list marginTop">
                    <p class="fs30">{{item.context}}</p>
                    <p class="fs28 gray overflow"><span class="fr">{{item.companyName}}</span></p>
                    <p class="fs26 gray overflow"><span class="fr">{{item.createDate}}</span></p>
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
    .loadmore {
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
    h3{
        .tac;
        padding:0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
        .borderBottom;
    }
    ul{
        li{
            .paddingAll;
            .borderBottom;
            .left{
                display: inline-block;
                img{
                    width: 0.9rem;
                    width: 0.9rem;
                    border-radius: 50%;
                }
            }
            .right{
                display: inline-block;
                width: 6.1rem;
                vertical-align: top;
                text-indent: 0.2rem;
                line-height: 0.4rem;
                font-size: @fs30;
                p{
                    padding-top: 0.05rem;
                    &:nth-child(2){
                        font-size: @fs28;
                        span{font-size: @fs24;}
                    }
                }
            }
        }
    }
</style>
<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
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
                    this.$http.post('/missionApprove/userGetRecordList', {
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
        },
        components:{

        }
    }
</script>