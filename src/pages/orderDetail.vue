<template>
    <div>
        <div class="content">
            <div class="head fs30">
                <img :src="orderDetail.userAvatar" v-if="orderDetail.userAvatar" alt="">
                <img src="../assets/img/defaultHead.png" v-else class="head" alt="">
                <span>{{orderDetail.userName}}</span>
                <span class="yellow fr" v-if="orderDetail.checkStatus==1">等待审批</span>
                <span class="green fr" v-if="orderDetail.checkStatus==2">审批通过</span>
                <span class="red fr" v-if="orderDetail.checkStatus==3">审批不通过</span>
            </div>
            <ul class="myUl">
                <li >
                    <span class="gray">审批编号</span>
                    <span class="fr" >{{orderDetail.approveCode}}</span>
                </li><li >
                    <span class="gray">所在部门</span>
                    <span class="fr" >{{orderDetail.departmentName}}</span>
                </li><li >
                    <span class="gray">审批标题</span>
                    <span class="fr" >{{orderDetail.approveTitle}}</span>
                </li><li >
                    <span class="gray">审批时间</span>
                    <span class="fr" >{{orderDetail.approveDate}}</span>
                </li><li >
                    <span class="gray">积分类型</span>
                    <span class="fr" >{{orderDetail.type}}</span>
                </li><li >
                    <span class="gray">申请积分</span>
                    <span class="fr" >{{orderDetail.missionScore}}</span>
                </li><li >
                    <span class="gray">备注</span>
                    <span class="fr" >{{orderDetail.approveRemark}}   </span>
                </li>
            </ul>
            
            <div class="showImg" v-if="orderDetail.missionPics">
                <img :src="item"  v-for="item in orderDetail.missionPics.split(',')" alt="">
            </div>
        </div>
        <div class="progress" v-if="orderDetail.approveUserList&&orderDetail.approveUserList.length">
            <div class="prog_list" v-for="item in orderDetail.approveUserList">
                <div class="time">
                    <i class="icon iconfont icon-gouxuan blue" v-if="item.checkStatus==0||item.checkStatus==2"></i>
                    <i class="icon iconfont icon-wait gray" v-if="item.checkStatus==1"></i>
                    <i class="icon iconfont icon-reject red" v-if="item.checkStatus==3"></i>
                </div>
                <div class="content">
                    <div class="left">
                        <img :src="item.userAvatar" v-if="item.userAvatar" class="headPicture" alt="">
                        <img src="../assets/img/defaultHead.png" v-else class="headPicture" alt="">
                    </div>
                    <div class="right">
                        <p class="overflow">
                            {{item.userName}}
                            <span class="yellow fr" v-if="item.checkStatus==0">提交审批</span>
                            <span class="yellow fr" v-if="item.checkStatus==1">审批中</span>
                            <span class="green fr" v-if="item.checkStatus==2">审批通过</span>
                            <span class="red fr" v-if="item.checkStatus==3">审批不通过</span>

                        </p>
                        <p class="overflow">
                            <span class="gray">{{item.departmentName}}</span>
                            <span class="gray fr">{{item.approveDate}}</span>
                        </p>
                        <div class="triangle-left"></div>
                    </div>
                    <div class="recommend">
                        <p class="borderTop" v-if="item.context">
                            {{item.context}}
                        </p>
                        <div class="rec_img" v-if="item.pics">
                            <img :src="item" alt="" v-for="item in item.pics.split(',')">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="opBtn" v-if="orderDetail.btnStatus==1">
            <span class="green" @click="go(2)"> 同意</span>
            <span class="yellow" @click="go(3)"> 拒绝</span>
            <span class="blue" @click="go(4)"> 撤回</span>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .myUl{
        padding-top: 0.2rem;
        li{
            font-size: @fs28;
            padding: 0.1rem 0;
        }
    }
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
        padding:0.3rem 0;
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
                orderDetail:{
                    userAvatar:'',
                    missionPics:''
                }
            }
        },
        methods:{
            addActive(){
                this.active=true;
            },
            go(type){
                this.$store.commit('saveSporder',this.orderDetail)
                this.$router.push('/spDetail/'+type+'/'+this.$route.params.id+'/'+this.$route.params.spType);
            },
            getDetail(){
                let that = this;
                this.$http.post('/missionApprove/approveDetail', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        that.orderDetail = response.data.data;
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