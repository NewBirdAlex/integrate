<template>
    <div>
        <div class="head bgWhite paddingAll overflow">
            <div class="left">
                <img class="headPicture" :src="userInf.userAvatar" alt="">
            </div>
            <div class="right">
                <p>
                    <strong>{{userInf.userName}}</strong>
                    <span>{{userInf.jobTitle}}</span>
                </p>
                <p class="gray">
                    总积分：{{userInf.userScore}}
                    基础积分：{{userInf.baseScore}}
                </p>
            </div>
        </div>

        <div class="showList bgWhite paddingAll fs30" v-for="(item,index) in itemList" :key="index" :class="{'marginTop':index==2}" @click="go(item)">
            {{item.name}}
            <span class="fr blue" v-if="item.right">{{item.right}}</span>
            <span class="fr rightArrow" v-if="!item.right">
                <i class=" icon iconfont icon-xiala1"></i>
            </span>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .showList{
        padding: 0.3rem 0.2rem;
        .borderBottom;
        &:last-child{
            border: none;
        }
    }
    .head {
        margin-bottom: 0.2rem;
        .left {
            .fl;
            width: 1.1rem;
        }
        .right {
            .fl;
            width: 6rem;
            line-height: 0.4rem;
            p {
                margin-bottom: 0.1rem;
                &:nth-child(1) {
                    font-size: @fs30;
                    span {
                        font-size: @fs26;
                        margin-left: 0.3rem;
                        background: @red;
                        border-radius: 0.18rem;
                        color: white;
                        padding: 0.05rem 0.2rem;
                    }
                }
                &:nth-child(2) {
                    font-size: @fs26;
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                itemList:[
                    {
                        name:'基础信息',
                        right:'',
                        router:'/baseInfor'
                    },
                    {
                        name:'电话号码',
                        right:'',
                        router:''
                    },
                    {
                        name:'工作日记',
                        right:'',
                        router:''
                    },
                    {
                        name:'积分日记',
                        right:'',
                        router:''
                    },
                    {
                        name:'抽奖记录',
                        right:'',
                        router:''
                    },
                    {
                        name:'积分兑换记录',
                        right:'',
                        router:''
                    }
                ],
                userInf:{}
            }
        },
        methods:{
            go(item){
                if(item.router){
                    this.$router.push(item.router)
                }
            },
            getDetail(){
                let that = this;
                this.$http.post('/user/getUserInfo', {
                    getInfoUserId:this.$route.params.id
                })
                    .then(function (response) {
                        if(response.data.code=200000){
                            that.userInf = response.data.data;
                            that.itemList[0].router = '/baseInfor/'+ response.data.data.userId
                            that.itemList[1].right = response.data.data.userPhone
                        }
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