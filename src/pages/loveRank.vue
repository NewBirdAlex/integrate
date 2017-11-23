<template>
    <div class="bgWhite"style="min-height: 100vh">

        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="list">
                <div class="overflow ">
                    <span class="blue fl left">{{index+1}}</span>
                    <div class="right">
                        <img :src="item.addUserAvatar" v-if="item.addUserAvatar" class="headPicture marginRight" alt="">
                        <img src="../assets/img/defaultHead.png" v-else class="headPicture marginRight" alt="">
                        <span class="fs36">{{item.addUserName}}</span>
                        <span class="fr blue">
                            <i class="icon iconfont icon-aixin-copy red marginRight"></i>
                            <span class="marginRight fs30" style="display: inline-block;width: 0.5rem">{{item.loveCount}}</span>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
        <myEmpty v-if="!list"></myEmpty>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .list {
        line-height: 1rem;
        padding: 0.3rem 0 0 0;
        &:last-child {
            .right {
                border: none;
            }
        }
        .left {
            width: 10%;
            .tac;
            font-size: 0.5rem;
        }
        .right {
            width: 90%;
            .borderBottom;
            .fl;
            .paddingBottom;
            .icon {
                font-size: 0.5rem;
                vertical-align: middle;
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                loading: false,
                pageNumber: 1,
                pageSize: 10,
                lastPage: false,
                list: null
            }
        },
        methods: {
            loadMore() {
                if (!this.lastPage) {
                    this.pageNumber += 1;
                    this.getList(0);
                } else {

                }

            },
            getList() {
                let that = this;
                this.$http.post('/love/listJson', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    aimId: this.$route.params.id
                })
                    .then(function (response) {
                        if (response.data.data.code = 200000) {
                            that.list = response.data.data.content;
                            if (response.data.data.last) that.lastPage = true;
                            that.loading = false;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>