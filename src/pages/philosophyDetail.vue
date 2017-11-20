<template>
    <div>
        <div class="paddingAll bgWhite lh40">
            <p class="fs30">{{detail.title}}</p>
            <p class="fs24 gray marginTop">{{detail.companyName}} 布于 {{detail.createDate}}</p>
            <div class="gray">
                每天可阅读{{detail.isOnly}}次
                <i class="icon iconfont icon-yanjing"></i>{{detail.sums}}
                <span class="fr blue" v-if="!detail.isRead">未阅读</span>
                <span class="fr" v-if="detail.isRead">已阅读</span>
            </div>
        </div>

        <div v-html="detail.context" class="paddingAll bgWhite marginTop lh40">

        </div>
        <div class=" bgWhite marginTop">
            <p class=" paddingAll borderBottom fs30">他们都阅读了</p>
            <div class=" paddingAll overflow">
                <div class="people tac fl marginRight marginTop marginLeft" v-for="(item,index) in recordUser">
                    <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture" alt="">
                    <img src="../assets/img/defaultHead.png" v-else class="headPicture" alt="">
                    <p class="fs24 lh40">{{item.userName}}</p>
                </div>
            </div>
        </div>

        <div class="btn fs30 " :class="{'forbiden':forbiden}" @click="read">
            已阅读并遵守（+20分）
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .btn{
        height: 0.88rem;
        line-height:0.88rem;
        .marginAll;
        background-color: @blue;
        border-radius: 8px 8px 8px 8px;
        color:white;
        .tac;
        margin-top: 1rem;
    }
    .forbiden{
        background: #ccc;
        color: @gray;
    }
</style>
<script>
    export default {
        data() {
            return {
                detail:{},
                forbiden:false,
                recordUser:[]
            }
        },
        methods:{
            read(){
                let that = this;
                this.$http.post('/culture/userReadCulture', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        if(response.data.code=200000){
                            that.forbiden=true;
                            that.$toast({
                                message: '感谢您的阅读，继续努力。。。',
                                duration: 2000
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDetail() {
                let that = this;
                this.$http.post('/culture/cultureDetailById', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        that.detail= response.data.data.detail;
                        that.recordUser= response.data.data.recordUser;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        },
        mounted(){
            this.getDetail();
        }
    }
</script>