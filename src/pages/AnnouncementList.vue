<template>


    <ul class="marginLeft marginRight"
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
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .list {
        line-height: 0.4rem;
    }

    .loadmore {
        width: 10%;
        margin: 0 auto;
        .paddingAll;
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
                    this.$http.post('/notes/noteList', {
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        sortOrder: "asc"
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