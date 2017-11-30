<template>
    <div class="bgWhite">
        <div class="bgWhite">

        </div>

        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <li v-for="item in list">
                <div class="paddingAll borderBottom exr overflow" >
                    <img :src="item.shopCover" class="fl marginRight headPicture" alt="">
                    <div class="lh40">
                        <p class="fs30">
                            {{item.userName}}
                            <span class="fr">{{item.price}}</span>
                        </p>
                        <p class="gray fs26">{{item.departmentName}}</p>
                        <p class="gray fs28">兑换时间 {{item.creatDate}}
                            <span class="yellow fr  fs30" v-if="item.checkStatus==2">审核中</span>
                            <span class="green fr fs30" v-if="item.checkStatus==1">已兑换</span>
                            <span class="red  fr fs30" v-if="item.checkStatus==3">兑换失败</span>
                        </p>
                    </div>

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
                pageSize: 5,
                lastPage: false,
                loading: false
            }
        },
        methods:{
            loadMore() {
                if (!this.lastPage) {
                    this.getList();
                    this.loading = true;
                } else {
                    this.loading = false;
                    this.$toast({
                        message: '已加载所有数据',
                        duration: 2000
                    });
                }

            },
            getList() {
                let that = this;
                this.$http.post('/shopbuylist/shopBuyRecordByAll', {
                    id:this.$route.params.id,
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
        mounted(){
//            this.getList();
        }
    }
</script>