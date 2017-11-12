<template>
    <div>
        <div class="content">
            <div class="head">
                <img src="../assets/img/head.png" alt="" @click="addActive" :class="active==true?'active':''">
                <span>李萌萌</span>
                <span class="yellow fr">等待我审批</span>
            </div>
            <itemList :itemArray="itemArray"></itemList>
            
            <div class="showImg">
                <img src="../assets/img/square.jpg" v-for="i in 5" alt="">
            </div>
        </div>
        <div class="progress">
            <div class="prog_list" v-for="item in 6">
                <div class="time"><i class="icon iconfont icon-gouxuan"></i></div>
                <div class="content">
                    <div class="left"><img src="../assets/img/head.png" alt=""></div>
                    <div class="right">
                        <p>审批我的最佳人气奖 <span class="blue fr">+80分</span></p>
                        <p class="yellow">审批中 <span class="gray fr">07-02 12:06</span></p>
                        <div class="triangle-left"></div>
                    </div>
                    <div class="recommend" v-if="item%2==0">
                        <p>工作积极表象认真，值得表扬赞赏!纠纷解决的聚集地借款
                            方会计科.
                        </p>
                        <div class="rec_img">
                            <img src="../assets/img/square.jpg" alt="" v-for="i in 10">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="opBtn">
            <router-link to="/spDetail"><span class="green"> 同意</span></router-link>
            <span class="yellow">拒绝</span>
            <span class="blue">撤回</span>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";
    h3{
        .tac;
        padding:0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
    .opBtn{
        font-size: @fs30;
        text-align: center;
        padding:0.2rem 0;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        span{
            display: inline-block;
            width: 32%;
            border-right: @border;
            &:last-child{
                border-right: none;
            }
        }
    }

    .content{
        .paddingAll;
        background: white;
    }
    .head{
        .borderBottom;
        line-height: 0.9rem;
        padding:0.2rem 0;


        img{
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 0.2rem;
            font-size: @fs30;
            transition: all 3s;
        }
    }
    .active{
        transform: rotate(1800deg);
    }
    .showImg{
        overflow: hidden;
        img{
            float: left;
            width: 1.2rem;
            height: 1.2rem;
            margin: 0.2rem 0.1rem;
            border-radius: 6px 6px 6px 6px;
        }
    }
    .triangle-left {
        width: 0;
        height: 0;
        border-top: 0.1rem solid transparent;
        border-right: 0.2rem solid white;
        border-bottom: 0.1rem solid transparent;
    }
    .progress{
        background: #efeff4;
        margin-bottom: 1rem;
        .paddingAll;
        .prog_list{
            overflow: hidden;
            padding-bottom: 0.2rem;
            .time{
                width: 0.58rem;
                float: left;
                height: 0.2rem;
                i{
                    margin-top: 0.6rem;
                    display: inline-block;
                    color:@blue;
                }
            }
            .content{
                float: left;
                width: 6.1rem;
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
                    width: 5rem;
                    vertical-align: top;
                    text-indent: 0.2rem;
                    line-height: 0.4rem;
                    font-size: @fs30;
                    position: relative;
                    .triangle-left{
                        position: absolute;
                        left:-1.3rem;
                        top:0.4rem;
                    }
                    p{
                        padding-top: 0.05rem;
                        &:nth-child(2){
                            font-size: @fs28;
                            span{font-size: @fs24;}
                        }
                    }
                }
                .recommend{
                    border-top: @border;
                    margin-top: 0.2rem;
                    p{
                       font-size: @fs30;
                        line-height: 0.4rem;
                        padding-top: 0.1rem;
                    }
                    .rec_img{
                        overflow: hidden;
                        img{
                            width: 0.8rem;
                            height: 0.8rem;
                            margin:0.1rem 0.1rem;
                        }
                    }
                }
            }
        }
    }
</style>
<script>


    import itemList from '../components/itemList.vue'
    export default {
        data() {
            return {
                active:false,
                itemArray:[
                    {
                        name:"审批编号",
                        content:"JFB21225233321224122"
                    },{
                        name:"所在部门",
                        content:"都兰工厂"
                    },{
                        name:"审批标题",
                        content:"每月月底通过客户的好评获得最佳人气奖"
                    },{
                        name:"审批标题",
                        content:"2017-07-16  22:08:06"
                    },{
                        name:"积分类型",
                        content:"人物积分"
                    },{
                        name:"申请积分",
                        content:"+80分",
                        addClass:true
                    },{
                        name:"备注",
                        content:"科技任务精选"
                    },{
                        name:"照片",
                        content:""
                    }
                ]
            }
        },
        methods:{
            addActive(){
                this.active=true;
            },
            getDetail(){
                let that = this;
                this.$http.post('/missionApprove/approveDetail', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        if(response.data.data.code=200000){

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getDetail();
        },
        components:{
            itemList
        }
    }
</script>