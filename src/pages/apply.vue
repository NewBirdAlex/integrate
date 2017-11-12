<template>
    <div>

        <div class=" wrap">
            <div class="bgWhite">
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom firstItem">
                    <strong class="fs30 lh40">审批标题 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">{{detail.title}}</span>
                    <!--<label for="">-->
                        <!--<i class="icon iconfont icon-xiala gray fs30"></i>-->
                    <!--</label>-->
                </div>
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
                    <strong class="fs30 lh40">审批内容 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">{{detail.context}}</span>
                </div>
                <div class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
                    <strong class="fs30">积分类型 <span class="red">*</span></strong>
                    <span class="rightPart fs30 lh40 ">A</span>
                </div>
            </div>

            <myInput v-for="(item,index) in inputData" :key="index"
                     :conttitle="item.title"
                     :need="item.need"
                     :note="item.ph"
                     v-model="item.content"
                     :inpType="item.type"
                     :inputType="item.inputType?item.inputType:'text'"
            ></myInput>
            <div class="marginTop"></div>
            <!--上传图片-->
            <uploadImg @getData="getImgList"></uploadImg>
            <div class="marginTop"></div>

            <subTitle :content="'申请人'" :subWord="'(默认申请自己的，可帮其他同事申请)'" :need="true"></subTitle>

            <choosePeople v-for="(item,index) in peopleList" :name="item.userName"
                          :key="index" :point="item.selectAddScore" :range="scoreRange"
                          :ind="index"
                          :head="item.userAvatar"
                          ref="choosePeople"
                          @changePoint="changePoint">
                <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
            </choosePeople>


            <div class="bgWhite paddingAll lh40 fs28">
                <strong>全选积分</strong>
                <span class="gray">(选择可批量修改申请的积分)</span>
                <span class="fr marginRight cl" :class="{'border':!selAll}" @click="selAll=!selAll"><i class="icon iconfont icon-gouxuan blue fs36" v-if="selAll"></i></span>
            </div>

            <!--选择员工-->
            <chooseStaff  @getData="accept"></chooseStaff>


            <!--审批人-->
            <div class="marginTop">
                <subTitle :content="'审批人'" :subWord="''" :need="true"></subTitle>
                <div class="paddingAll overflow bgWhite tac fs28">
                    <div class="spr overflow fl marginBottom" v-for="(item,index) in approveUser">
                        <div class="ps fl">
                            <img :src="item.userAvatar" class="headPicture" alt="">
                            <p class="marginTop" v-html="item.userName"></p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="spr overflow fl marginBottom" v-for="(item,index) in shenpiList">
                        <div class="ps fl">
                            <img :src="item.userAvatar" class="headPicture" alt="">
                            <p class="marginTop" v-html="item.userName"></p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <!--<div class="add fl" @click="markPerson('shenpi')" v-if="!approveUser.length">-->
                    <div class="add fl" @click="shenpi" v-if="!approveUser.length">
                        <i class="icon iconfont icon-jia gray"></i>
                    </div>
                </div>
            </div>
            <!--抄送-->
            <div class="marginTop">
                <subTitle :content="'抄送'" :subWord="''" :need="false"></subTitle>
                <div class="paddingAll overflow bgWhite tac fs28">
                    <div class="spr overflow fl marginBottom"  v-for="(item,index) in chaosongList" :key="index" v-if="item">
                        <div class="ps fl" >
                            <img :src="item.userAvatar" class="headPicture" alt="">
                            <p class="marginTop" v-html="item.userName"></p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="add fl" @click="markPerson('chaosong')">
                        <i class="icon iconfont icon-jia gray"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="confBtn" @click="subData">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    /*@import "../assets/font/font1/iconfont.css";*/
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

    .ps{
        width: 1.1rem;
    }
    .firstItem{
        position: relative;
        label{
            position: absolute;
            right: 0.2rem;
            top:0.4rem;
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
        background:@grayBg;
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
    import chooseStaff from '../components/chooseStaff.vue'
    import uploadImg from '../components/uploadImg.vue'
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                showStaff:false,
                dialogImageUrl: '',
                dialogVisible: false,
                selAll:false,
                detail:{},
                approveUser:[],
                scoreRange:[],
                selfInf:{
                },
                inputData: [
                    {
                        title: "审批备注",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea'
                    }
                ],
                selectType:{
                    name: '积分类型',
                    need: true,
                    selValue: '',
                    selectRange: [
                        '品德',
                        '行为',
                        '业绩'
                    ]
                },
                peopleList:null,
                chaosongList:null,
                shenpiList:null,
                imgList:'',
                imgData:{},
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        methods: {
            shenpi(){
                localStorage.setItem('shenpiren',true)
                document.getElementById('selectPeople').click();
            },
            markPerson(msg){
                console.log(msg )
                localStorage.setItem('chaosong',true)
                document.getElementById('selectPeople').click();
            },
            accept(data){
                // accpet  staff person
                if(localStorage.getItem('chaosong')){
                    this.chaosongList = data;
                    localStorage.removeItem('chaosong')
                }else if(localStorage.getItem('shenpiren')){
                    this.shenpiList = data;
                    localStorage.removeItem('shenpiren')
                }else{
                    let that =this
                    this.peopleList = data;
                    this.peopleList.unshift(this.selfInf);
                    this.peopleList.forEach(item=>item.selectAddScore=that.scoreRange[0])
                }

            },

            delPerson(index){
                if(this.peopleList[index].userName==this.userMessage.userName){
                    this.$toast({
                        message: '不能删除自己哦',
                        duration: 2000
                    });
                    return;
                }
                this.peopleList.splice(index, 1)
            },
            changePoint(msg){
                //选择分数
                if(this.selAll){//select all
                    for(let i = 0 ; i<this.peopleList.length;i++){
                        console.log(i);
                        var obj =  this.peopleList[i];
                        obj.selectAddScore=msg.value;
                        this.$set(this.peopleList,i,obj);
                    }
                    console.log(this.peopleList)
                }else{
                    //select one
                    this.peopleList[msg.index].selectAddScore=msg.value;
                    console.log(this.peopleList[msg.index].selectAddScore)

                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            imgStatuChange(file){
                console.log(file)
            },
            getImgList(msg){
                console.log(msg)
                this.imgList = msg.join(',')
            },
            getDetail(){
                let that = this;
                this.$http.post('/actionList/getActionDetail', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        that.detail = response.data.data.detail;
                        that.approveUser = response.data.data.approveUser;
                        // get score select range
                        let score = that.detail.minuxScore;
                        for(let i = 0; i<(that.detail.maxScore-that.detail.minuxScore)/that.detail.scoreLevel;i++){
                            that.scoreRange.push(that.detail.minuxScore+i*that.detail.scoreLevel)
                        }
                        that.peopleList = [];
                        that.selfInf = {
                            id:that.userMessage.userId,
                            userName:that.userMessage.userName,
                            selectAddScore:that.scoreRange[0]
                        }
                        that.peopleList.push(that.selfInf)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            subData(){
                let score = [];
                let that = this;
                this.peopleList.forEach(item=>{
                    score.push(item.selectAddScore)
                })
                let approveUserId = [];
                if(this.approveUser.length){
                    this.approveUser.forEach(item=>{
                        approveUserId.push(item.id);
                    })
                }else if(this.shenpiList){
                    this.shenpiList.forEach(item=>{
                        approveUserId.push(item.id);
                    })
                }
                let beApproveUserId = [];
                this.peopleList.forEach(item=>{
                    beApproveUserId.push(item.id);
                })
                let copyUserId = [];
                if(this.chaosongList) {
                    this.chaosongList.forEach(item=> copyUserId.push(item.id));
                }



                this.$http.post('/missionApprove/submitMissionApprove', {
                    addScore: score.join(','),
                    aimId: this.$route.params.id,
                    approveContext: this.detail.context,
                    approveRemark: this.inputData[0].content,
                    approveTitle: this.detail.title,
                    approveUserId: approveUserId.join(','),
                    beApproveUserId: beApproveUserId.join(','),
                    copyUserId: copyUserId.join(','),
                    missionPics: this.imgList,
                    type:this.$route.params.type,
                })
                    .then(function (response) {
                        if(response.data.code==200000){
                            that.$toast({
                                message:'提交成功',
                                duration: 2000
                            });
                            that.$router.go(-1);
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


        },
        components: {
            myInput,
            subTitle,
            uploadImg,
            choosePeople,
            chooseStaff
        }
    }
</script>