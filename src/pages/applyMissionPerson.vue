<template>
    <div class="bgWhite" style="height:100vh">
        <ul class="marginLeft marginRight"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            v-if="list.length!=0"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" :key="index" class="marginBottom bgWhite">
                <div class="paddingAll borderBottom item">
                    <img :src="item.userAvatar" class="headPicture fl marginRight" alt="">
                    <p class="fs30 lh50">
                        {{item.userName}}
                        <span class="fr blue">+{{item.missionAddScore}}分</span>
                    </p>
                    <p class="gray fs28">
                        {{item.departmentName}}
                        <span class="fr">
                        挑战时间:
                            <span>{{item.createDate}}</span>
                        </span>
                    </p>
                    <i class="icon iconfont icon-iconcompleted blue" v-if="item.missionStatus"></i>
                    <i class="icon iconfont icon-uncomplete gray" v-else></i>
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
    .item{
        position: relative;
        .icon{
            position: absolute;
            right: 1rem;
            top:0.1rem;
            font-size: 1rem;
        }
    }
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
            loadMore() {
                if (!this.lastPage) {
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
                this.$http.post('/missionRecord/getUserRecordList', {
                    missionId: this.$route.params.id,
                    type: this.$route.params.type,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
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
            }
        },
        mounted() {
            let that = this;
            this.getList();
        }
    }

</script>