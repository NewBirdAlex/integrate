<template>
    <div>

        <div class=" wrap">
            <myInput v-for="(item,index) in inputData" :key="index"
                     :conttitle="item.title"
                     :need="item.need"
                     :note="item.ph"
                     v-model="item.content"
                     :inpType="item.type"
                     :inputType="item.inputType?item.inputType:'text'"
            ></myInput>
            <jifenType v-model="jifenType"></jifenType>
            <div class="marginTop"></div>
            <!--上传图片-->
            <uploadImg v-model="imgList"></uploadImg>
            <div class="marginTop"></div>

            <subTitle :content="'申请人'" :subWord="'(默认申请自己的，可帮其他同事申请)'" :need="true"></subTitle>

            <!--<choosePeople v-for="(item,index) in peopleList" :name="item.userName"-->
                          <!--:key="index" :point="item.selectAddScore" :range="scoreRange"-->
                          <!--:ind="index"-->
                          <!--:head="item.userAvatar"-->
                          <!--ref="choosePeople"-->
                          <!--@changePoint="changePoint">-->
                <!--<span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>-->
            <!--</choosePeople>-->

            <div class="paddingAll borderBottom fs30 newList bgWhite" v-for="(item,index) in peopleList" :key="index">
                <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
                <img :src="item.userAvatar" class="headPicture marginRight" alt="">
                <span>{{item.userName}}</span>
                <input type="text" class="fr tar vam marginTop " v-model="item.selectAddScore" placeholder="输入奖扣分数">
            </div>

            <div class="bgWhite paddingAll lh40 fs28" v-if="false   ">
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
                    <div class="spr overflow fl marginBottom" v-for="(item,index) in approveUserList" :key="index">
                        <div class="ps fl">
                            <img :src="item.userAvatar" class="headPicture" alt="">
                            <p class="marginTop" v-html="item.userName"></p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="spr overflow fl marginBottom" v-for="(item,index) in shenpiList" :key="index">
                        <div class="ps fl">
                            <img :src="item.userAvatar" class="headPicture" alt="">
                            <p class="marginTop" v-html="item.userName"></p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="add fl" @click="shenpi" v-if="!approveUserList">
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

    .newList{
        input{
            border: none;
            outline: none;
        }
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

    import jifenType from '../components/jifenType.vue'
    import myInput from '../components/myInput.vue'
    import subTitle from '../components/subTitle.vue'
    import choosePeople from '../components/choosePeople.vue'
    import chooseStaff from '../components/chooseStaff.vue'
    import uploadImg from '../components/uploadImg.vue'
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                num:1,
                jifenType:0,
                showStaff:false,
                dialogImageUrl: '',
                dialogVisible: false,
                selAll:false,
                detail:{},
                scoreRange:[],
                selfInf:{
                },
                inputData: [
                    {
                        title: "申请标题",
                        need: true,
                        ph: "请输入标题",
                        content: "",
                        type: 'input'
                    },{
                        title: "申请内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea'
                    }
                ],
                peopleList:[],
                chaosongList:null,
                shenpiList:null,
                approveUserList:null,
                scoreRange:[],
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
            getSelfInf(){
                //获取自己分数
                this.selfInf = {
                    id:this.userMessage.userId,
                    userName:this.userMessage.userName,
                    userAvatar:this.userMessage.userAvatar,
                    selectAddScore:''
                }
                this.peopleList.push(this.selfInf);
            },
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
                    data.forEach(item=>{
                        item.selectAddScore='';
                        this.peopleList.push(item)
                    });

                }

            },

            delPerson(index){

                this.peopleList.splice(index, 1)
            },
            changePoint(msg){
                //选择分数
                if(this.selAll){//select all
                    for(let i = 0 ; i<this.peopleList.length;i++){

                        var obj =  this.peopleList[i];
                        obj.selectAddScore=msg.value;
                        this.$set(this.peopleList,i,obj);
                    }

                }else{
                    //select one
                    this.peopleList[msg.index].selectAddScore=msg.value;


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
            getScoreRange(){
                let that = this;
                this.$http.post('/module/getModuleDetail', {
                })
                    .then(function (response) {
                        for(let i = 0 ; i<=(response.data.data.moduleDetail.maxScore-response.data.data.moduleDetail.minuxScore)/response.data.data.moduleDetail.level ; i++){
                            that.scoreRange.push(response.data.data.moduleDetail.minuxScore+i*response.data.data.moduleDetail.level)
                        }
                        //获取自己得信息
                        that.getSelfInf();
                        that.peopleList = [];
                        that.peopleList.unshift(that.selfInf);
                        that.peopleList.forEach(item=>item.selectAddScore=that.scoreRange[0])

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getLeader(){
                let that = this;
                this.$http.post('/approvePermission/getApproveUser', {

                })
                    .then(function (response) {
                        if(response.data.data.length!=0){
                            that.approveUserList=response.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            subData(){
                let score = [];
                let that = this;
                if(!this.inputData[0].content||!this.inputData[1].content){
                    this.$toast('请填写完整资料');
                    return
                }
                if(!this.jifenType){

                    this.$toast('请选择积分类型');
                    return
                }
                if(this.peopleList.length==0){
                    this.$toast('至少选择一名员工');
                    return
                }
                this.peopleList.forEach(item=>{
                    score.push(item.selectAddScore)
                })
                let haveScore =true;
                score.forEach(item=>{
                    if(!item){
                        haveScore=false;
                    }
                });
                if(!haveScore){
                    that.$toast('请输入相应分数');
                    return
                }
                let approveUserId = [];
                if(this.approveUserList){
                    this.approveUserList.forEach(item=>{
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
                    aimId: '',
                    approveContext: this.inputData[1].content,
                    approveTitle: this.inputData[0].content,
                    approveUserId: approveUserId.join(','),
                    beApproveUserId: beApproveUserId.join(','),
                    copyUserId: copyUserId.join(','),
                    missionPics: this.imgList,
                    rootId:16,
                    type:this.jifenType,
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
            this.getSelfInf();

            this.getLeader();
        },
        components: {
            myInput,
            subTitle,
            uploadImg,
            choosePeople,
            jifenType,
            chooseStaff
        }
    }
</script>