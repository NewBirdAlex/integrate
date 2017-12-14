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

            <jifenType v-model="jfType"></jifenType>
            <div class="paddingAll bgWhite fs30" v-if="$route.params.type==2">
                <strong>奖扣时间</strong>
                <span class="fr gray" v-if="!selTime" @click="pickTime">请选择时间</span>
                <span class="fr" @click="pickTime" v-else>{{selTime}}</span>
            </div>
            <!--//pick time-->
            <mt-datetime-picker
                    v-model="pickerVisible"
                    type="date"
                    ref="picker"
                    @confirm="handleConfirm"
                    :startDate="new Date(new Date().getFullYear() - 3, 0, 1)"
                    :endDate="new Date()"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日">
            </mt-datetime-picker>
            <div class="marginTop"></div>

            <!--上传图片-->

            <uploadImg v-model="imgList"></uploadImg>

            <div class="marginTop"></div>

            <subTitle :content="$route.params.type==1?'表扬可用积分':'奖扣员工'" v-if="$route.params.type==1" :subWord="'（可用积分'+baseInf.flowScore+')'" :need="true"></subTitle>
            <subTitle :content="$route.params.type==1?'表扬可用积分':'奖扣员工'" v-else :subWord="''" :need="true"></subTitle>

            <choosePeople v-for="(item,index) in peopleList"
                          v-if="$route.params.type==1"
                          :name="item.userName"
                          :key="index"
                          :showValue="item.selectAddScore"
                          :range="scoreRange"
                          :ind="index"
                          :head="item.userAvatar"
                          ref="choosePeople"
                          @changePoint="changePoint">
                <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
            </choosePeople>
            <div v-if="$route.params.type!=1">
                <div class="paddingAll borderBottom fs30 newList bgWhite" v-for="(item,index) in peopleList" :key="index">
                    <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
                    <img :src="item.userAvatar" class="headPicture marginRight" alt="">
                    <span>{{item.userName}}</span>
                    <input type="text" class="fr tar vam marginTop myInput" v-model="item.selectAddScore" placeholder="输入奖扣分数" style="padding-right: 0.2rem">
                </div>
            </div>

            <div class="bgWhite paddingAll lh40 fs28" v-if="$route.params.type==1&&peopleList.length">
                <strong>全选积分</strong>
                <span class="gray">(选择可批量修改申请的积分)</span>
                <span class="fr marginRight cl" :class="{'border':!selAll}" @click="selAll=!selAll"><i class="icon iconfont icon-gouxuan blue fs36" v-if="selAll"></i></span>
            </div>
            <!--选择员工-->
            <chooseStaff  @getData="accept"></chooseStaff>

        </div>
        <div class="confBtn" @click="subData">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    label{
        position: absolute;
        right: 0.2rem;
        top:0.4rem;
        z-index: 10;
    }
    #selList{
        position: absolute;
        top:-100rem;
        width: 0;
        height: 0;
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
    import uploadImg from '../components/uploadImg.vue'
    import choosePeople from '../components/choosePeople.vue'
    import chooseStaff from '../components/chooseStaff.vue'
    import jifenType from '../components/jifenType.vue'
    import { mapGetters } from 'vuex';
    import {myTool} from '../lib/myTool'

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                jfType:1,
                selTime:'',
                pickerVisible:'',
                inputData: [
                    {
                        title: "表扬标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "表扬内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input',
                        selRange:[]
                    }
                ],
                peopleList:[],
                scoreRange:[],
                imgList:'',
                selAll:false
            }
        },
        methods: {
            accept(data){
                // accpet  staff person
                let that =this;
                console.log(data)
                data.forEach(item=>{
                    item.selectAddScore=that.scoreRange[0];
                    this.peopleList.push(item);
                });
            },
            getScoreRange(){
                let that = this;
                this.$http.post('/module/getModuleDetail', {
                })
                    .then(function (response) {
                        // get score select range
                        let minScore = response.data.data.moduleDetail.minuxScore;
                        let maxScore = response.data.data.moduleDetail.maxScore;
                        let level = response.data.data.moduleDetail.level;
                        that.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
                        // get score select range
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //            上传图片recall

            delPerson(index){
                this.peopleList.splice(index, 1)
            },
            pickTime(){
                this.$refs.picker.open();
            },
            handleConfirm(data){
                console.log(data)
                this.selTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();

            },
            changePoint(msg){
                //选择分数
                if(this.selAll){//select all
                    for(let i = 0 ; i<this.peopleList.length;i++){
                        this.peopleList[i].selectAddScore=msg.value;
                        let newObj=this.peopleList[i];
                        this.$set(this.peopleList,i,newObj)
                    }
                }else{
                    //select one
                    this.peopleList[msg.index].selectAddScore=msg.value;
                    let newObj=this.peopleList[msg.index];
                    this.$set(this.peopleList,msg.index,newObj)
                }
            },
            subData(){
                if(!this.inputData[0].content||!this.inputData[1].content){
                    this.$toast('请填写完整资料');
                    return
                }
                if(!this.peopleList.length){
                    this.$toast('请选择员工');
                    return
                }
                let score = [];
                let that = this;
                this.peopleList.forEach(item=>{
                    score.push(item.selectAddScore)
                })
                let approveUserId = [];
                this.peopleList.forEach(item=>{
                    approveUserId.push(item.id);
                })
                let params = {
                    addScore: score.join(','),
                    beApproveUserId :approveUserId.join(','),
                    praiseContext:this.inputData[1].content,
                    praisePics :this.imgList,
                    praiseTitle :this.inputData[0].content,
                    type :this.jfType,
                }
                let url = '/missionApprove/praiseUser';
                if(this.$route.params.type==2){
                    params.dealDate = this.selTime;
                    url = '/missionApprove/dealScore'
                }
                this.$http.post(url, params)
                    .then(function (response) {
                        if(response.data.code=='200000'){
                            that.$toast('成功')
                            that.$router.go(-1);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.$store.commit('getuserBaseInf');
            this.getScoreRange();
        },
        created(){
            if(this.$route.params.type==1){
                this.inputData = [
                    {
                        title: "表扬标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "表扬内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea',
                        selRange:[]
                    }
                ]
            }else{
                this.inputData = [
                    {
                        title: "奖扣标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "奖扣内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea',
                        selRange:[]
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'baseInf',
            ])
        },
        components: {
            subTitle,
            uploadImg,
            choosePeople,
            myInput,
            jifenType,
            chooseStaff
        }
    }
</script>