<template>
    <div>
        <div class="bgWhite">

        </div>

        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <li v-for="item in list">
                <div class="paddingAll borderBottom exr overflow" >
                    <img :src="item.shopCover" class=" marginRight" alt="">
                    <div class="lh40">
                        <p class="fs30 "> <strong>{{item.shopName}}</strong></p>
                        <p class="fs26 gray">兑换时间：{{item.creatDate}}</p>
                        <span class="yellow type fs30" v-if="item.checkStatus==2">审核中</span>
                        <span class="green type fs30" v-if="item.checkStatus==1">已兑换</span>
                        <span class="red type fs30" v-if="item.checkStatus==3">兑换失败</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .exr{
        position: relative;
        img{
            .fl;
            width: 1.2rem;
            height: 1.2rem;
            .borderRadius;
        }
        p{
            margin-top: 0.15rem;
        }
        .type{
            position: absolute;
            right: 0.2rem;
            top:50%;
            transform: translateY(-50%);
        }

    }
</style>
<script>
    export default {
        data() {
            return {
                list: [],
                pageNumber: 1,
                pageSize: 20,
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
                this.$http.post('/shopbuylist/shopBuyRecordByUser', {
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