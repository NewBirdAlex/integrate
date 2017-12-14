<template>
    <div>
        <myEmpty v-if="!list.length"></myEmpty>
        <ul class=" "
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom ">
                <div class=" bgWhite paddingAll lh40" @click="go(item)">
                    <p class="fs30">{{item.title}}</p>
                    <div class="fs24 marginTop gray">
                        <span class="marginRight"v-if="item.ifOnly==1">每天一次</span>
                        <span class="marginRight"v-if="item.ifOnly==2">每周一次</span>
                        <span class="marginRight"v-if="item.ifOnly==3"> 每月一次</span>
                        <span class="marginRight"v-if="item.ifOnly==4">每季一次</span>
                        <span class="marginRight"v-if="item.ifOnly==5">每年一次</span>
                        <span class="marginRight"v-if="item.ifOnly==6"> 无限制 </span>
                        <span class="marginRight"v-if="item.ifOnly==7">仅限一次</span>
                        <i class="icon iconfont icon-yanjing marginRight"></i>{{item.sums}}
                        <span class="blue fr" v-if="item.isRead">已考核</span>
                        <span class="red fr" v-else>未考核</span>
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

</style>
<script>
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
        methods: {
            go(item){
                //路由跳转
                this.$router.push({ name: 'KpiDetail', params: { id: item.id }})
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
                    this.$http.post('/quetions/quetionsListByUser', {
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