<template>
    <div>

        <div class=" wrap">
            <div class="bgWhite">
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom firstItem chooseList" >
                    <strong class="fs30 lh40">审批标题 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">{{detail.approveTitle}}</span>
                </div>
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
                    <strong class="fs30 lh40">审批内容 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">{{detail.approveContext}}</span>
                </div>
                <!--<jifenType v-model="jfType"></jifenType>-->
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
                    <strong class="fs30 lh40">积分类型 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 " v-if="detail.type==1">A </span>
                    <span class="rightPart fs30 lh40 " v-if="detail.type==2">B </span>
                    <span class="rightPart fs30 lh40 " v-if="detail.type==3">C </span>
                    <span class="rightPart fs30 lh40 " v-if="detail.type==4">基础积分</span>
                </div>
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
                    <strong class="fs30 lh40">审批备注 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">{{detail.approveRemark||'无'}}</span>
                </div>
                <myInput
                         conttitle="申诉理由"
                         :need=true
                         note="输入申诉理由"
                         v-model="shensuReason"
                         inpType="textarea"
                         inputType="text"
                ></myInput>
            </div>
            <div class="marginTop"></div>
            <!--上传图片-->
            <uploadImg v-model="imgList" ></uploadImg>
            <div class="marginTop"></div>

            <subTitle :content="''" :subWord="'(如果对审批项目积分有异议，请修改提交二次审批)'" :need="false"></subTitle>
            <div class="bgWhite paddingAll" v-if="!getRange">
                <img :src="detail.userAvatar" v-if="detail.userAvatar" class="headPicture marginRight" alt="">
                <img src="../assets/img/defaultHead.png" v-else class="headPicture marginRight" alt="">
                <span class="fs36">{{detail.userName}}</span>
                <input type="text" class="fr fs36 myInput tar marginTop" placeholder="输入积分" v-model="detail.missionScore">
            </div>
            <choosePeople v-if="getRange" v-for="(item,index) in peopleList" :name="item.userName"
                          :key="index" :showValue="item.selectAddScore" :range="scoreRange"
                          :ind="index"
                          :head="item.userAvatar"
                          ref="choosePeople"
                          @changePoint="changePoint">
                <!--<span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>-->
            </choosePeople>
            <!--审批人-->
            <div class="marginTop"></div>
            <subTitle :content="'审批人'" :subWord="''" :need="false"></subTitle>
            <div class="progress ">
                <div class="prog_list" v-for="item in detail.approveUserList">
                    <div class="time">
                        <i class="icon iconfont icon-gouxuan blue" v-if="item.checkStatus==0||item.checkStatus==2"></i>
                        <i class="icon iconfont icon-wait gray" v-if="item.checkStatus==1"></i>
                        <i class="icon iconfont icon-reject red" v-if="item.checkStatus==3"></i>
                    </div>
                    <div class="content bgWhite paddingAll">
                        <div class="left"><img :src="item.userAvatar" class="headPicture" alt=""></div>
                        <div class="right">
                            <p class="overflow">
                                {{item.userName}}
                                <span class="green fr" v-if="$route.params.type==1">审批通过</span>
                                <span class="red fr" v-if="$route.params.type==2">审批不通过</span>

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
                                <!--<img :src="item" alt="" v-for="item in item.pics.split(',')">-->
                                <scaleImg :imgList="item.pics.split(',')"></scaleImg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--抄送-->
            <div class="marginTop">
                <subTitle :content="'抄送'" :subWord="''" :need="false"></subTitle>
                <selectStaff v-model="chaosongren"></selectStaff>
            </div>
        </div>
        <div class="confBtn" @click="subData">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    /*@import "../assets/font/font1/iconfont.css";*/
    .hideChooseStaff{

    }

    .wrap2{
        position: relative;
        padding:0 0.2rem;
        .inner{
            position: relative;
            background: white;
            z-index: 10;
            height: 0.9rem;
            line-height: 0.9rem;
            border-bottom: @border;
            padding:0.2rem 0;
            font-size: @fs30;
            .op{
                display: inline-block;
                vertical-align: middle;
                width: 0.7rem;
                font-size: @fs26;
            }
            img{
                width: 0.9rem;
                height: 0.9rem;
                display: inline-block;
                vertical-align: middle;
                margin-right: 0.2rem;
            }

        }
        select{
            position: absolute;
            left: 0.5rem;
            top: 0.2rem;
            width: 1px;
            height: 1px;
        }
    }
    .icon-xialakuangtishitubiao{
        font-size: 12px;
        color: @gray;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }
    .progress{
        background: #efeff4;
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
    .ps{
        width: 1.1rem;
    }
    .firstItem{
        position: relative;
        overflow: hidden;
        label{
            position: absolute;
            right: 0.2rem;
            top:0.4rem;
        }
        select{
            position: absolute;
            top:-100rem;
            width: 0;
            height: 0;
        }
    }
    .inner{
        strong{
            width: 1.6rem;
            display: inline-block;
            vertical-align: middle;
        }
        .rightPart{
            display: inline-block;
            width: 5.2rem;
            vertical-align: top;
        }
    }

    .add{
        .border;
        border-radius: 50%;
        padding: 0.2rem;
        i{
            font-size: 0.5rem;
        }
    }
    .fs36{font-size: 0.36rem!important;}
    h3 {
        .tac;
        padding: 0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
    .wrap{

    }
    .icon{
        /*<!--font-size: @fs30!important;-->*/
    }
    .cl{
        .fr;
        width: 0.4rem;
        height: 0.4rem;
        .tac;
        line-height: 0.4rem;
        border-radius: 50%;
    }
</style>
<script>
    import myInput from '../components/myInput.vue'
    import subTitle from '../components/subTitle.vue'
    import choosePeople from '../components/choosePeople.vue'
    import uploadImg from '../components/uploadImg.vue'
    import jifenType from '../components/jifenType.vue'
    import scaleImg from '../components/scaleImg.vue'
    import selectStaff from '../components/selectStaff.vue'
    import { mapGetters } from 'vuex';
    import {myTool} from '../lib/myTool'
    export default {
        data() {
            return {
                shensuReason:'',
                showStaff:false,
                getRange:false,
                jfType:0,
                dialogImageUrl: '',
                dialogVisible: false,
                chaosongren:'',
                selAll:false,
                detail:{},
                scoreRange:[],
                peopleList:[],
                chaosongList:null,
                shenpiList:null,
                approveUserList:null,
                imgList:'',
                imgData:{},
                scoreRange:[],
                selfInf:{},
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        methods: {
            changePoint(msg){
                //select one
                this.peopleList[msg.index].selectAddScore=msg.value;
            },
            getSelfInf(){
                //获取自己分数
                this.selfInf = {
                    id:this.userMessage.userId,
                    userName:this.userMessage.userName,
                    userAvatar:this.userMessage.userAvatar,
                    selectAddScore:this.detail.missionScore
                }
                this.peopleList.push(this.selfInf);
            },
            getScoreRange(){
                let that = this;
                this.$http.post('/actionList/getActionDetail', {
                    id:this.$route.params.aimId
                })
                    .then(function (response) {
                        /*for(let i = 0 ; i<=(response.data.data.detail.maxScore-response.data.data.detail.minuxScore)/response.data.data.detail.scoreLevel ; i++){
                            that.scoreRange.push(response.data.data.detail.minuxScore+i*response.data.data.detail.scoreLevel)
                        }*/
                        // get score select range
                        let minScore = response.data.data.detail.minuxScore;
                        let maxScore = response.data.data.detail.maxScore;
                        let level = response.data.data.detail.scoreLevel;
                        that.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
                        // get score select range
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDetail(){
                let that = this;
                this.$http.post('/missionApprove/approveDetail', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        that.detail = response.data.data;
                        that.imgList = that.detail.imgList;
                        that.getSelfInf();//get self score
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            subData(){
                if(!this.shensuReason){
                    this.$toast('请输入申诉理由')
                    return
                }
                let score = [];
                let that = this;
                this.peopleList.forEach(item=>{
                    score.push(item.selectAddScore)
                });
                let approveUserId = [];
                if(this.detail.approveUserList.length){
                    this.detail.approveUserList.forEach(item=>{
                        approveUserId.push(item.userId);
                    })
                }
                let beApproveUserId = [];
                this.peopleList.forEach(item=>{
                    beApproveUserId.push(item.id);
                });
                /*let copyUserId = [];
                if(this.chaosongList) {
                    this.chaosongList.forEach(item=> copyUserId.push(item.id));
                }*/
                this.$http.post('/missionApprove/submitMissionApprove', {
                    addScore: score.join(','),
                    aimId: this.detail.aimId,
                    approveContext: this.detail.approveContext,
                    approveRemark: this.detail.approveRemark,
                    approveTitle: this.detail.approveTitle,
                    approveUserId: approveUserId.join(','),
                    beApproveUserId: beApproveUserId.join(','),
                    copyUserId: this.chaosongren,
                    missionPics: this.imgList,
                    rootId:this.detail.rootId,
                    type:this.detail.type,
                    submitType:1
                })
                    .then(function (response) {
                        if(response.data.code==200000){
                            that.$toast({
                                message:'提交成功',
                                duration: 2000
                            });
                            that.$router.push('/work');
                        }else{
                            that.$toast({
                                message:response.data.message,
                                duration: 2000
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getDetail();
            //                11 品德积分12 行为积分13 业绩积分
            if(this.$route.params.rootId==11||this.$route.params.rootId==12||this.$route.params.rootId==13){
                this.getRange=true;
                this.getScoreRange();// get score range
            }else{

            }
        },
        components: {
            myInput,
            subTitle,
            uploadImg,
            choosePeople,
            jifenType,
            scaleImg,
            selectStaff
        }
    }
</script>