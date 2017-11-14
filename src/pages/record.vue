<template>
    <div>
        <ul class=" "
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom bgWhite">
                <div class="left"><img :src="item.userAvatar" alt=""></div>
                <div class="right">
                    <p>{{item.approveTitle}} <span class="blue fr">+{{item.addScore}}分</span></p>
                    <p >
                        <span class="yellow" v-if="item.status==1">审批中</span>
                        <span class="green" v-if="item.status==2">审批通过</span>
                        <span class="red" v-if="item.status==3">审批不通过</span>
                        <span class="gray fr">{{item.createDate}}</span>
                    </p>
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
                pageSize: 10,
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
                if (!this.lastPage ) {
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
                this.$http.post('/missionApprove/userGetRecordList', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
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

            },
        },
        mounted() {
            this.getList();
        },
        components:{

        }
    }
</script>