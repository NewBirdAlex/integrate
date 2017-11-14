<template>
    <div>

        <div class=" wrap">
            <div >
                <label for="selList">
                    <i class="icon iconfont icon-xiala gray fs30"></i>
                </label>
                <select name="" id="selList" v-model="inputData[0].content">
                    <option value="租房">租房</option>
                    <option value="煮饭">煮饭</option>
                    <option value="游泳">游泳</option>
                </select>
            </div>

            <myInput v-for="(item,index) in inputData" :key="index"
                     :conttitle="item.title"
                     :need="item.need"
                     :note="item.ph"
                     v-model="item.content"
                     :inpType="item.type"
                     :inputType="item.inputType?item.inputType:'text'"
            ></myInput>
            <mySelect :content="selectType" :selProp="'selectType'" @getData="getSelect"></mySelect>
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
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日">
            </mt-datetime-picker>
            <div class="marginTop"></div>

            <!--上传图片-->

            <uploadImg @getData="getImgList"></uploadImg>

            <div class="marginTop"></div>

            <subTitle :content="'表扬员工'" :subWord="''" :need="true"></subTitle>

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
    import mySelect from '../components/mySelect.vue'
    import subTitle from '../components/subTitle.vue'
    import uploadImg from '../components/uploadImg.vue'
    import choosePeople from '../components/choosePeople.vue'
    import chooseStaff from '../components/chooseStaff.vue'

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                selectType:{
                    name: '积分类型',
                    need: true,
                    selValue: '品德',
                    selectRange: [
                        '品德',
                        '行为',
                        '业绩'
                    ]
                },
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
            getSelect(data) {
                this[data.name].selValue = data.val;
            },
            accept(data){
                // accpet  staff person
                this.peopleList = data;
                this.peopleList.forEach(item=>item.selectAddScore=this.scoreRange[0])
            },
            getScoreRange(){
                let that = this;
                this.$http.post('/module/getModuleDetail', {
                })
                    .then(function (response) {
                        for(let i = 0 ; i<=(response.data.data.moduleDetail.maxScore-response.data.data.moduleDetail.minuxScore)/response.data.data.moduleDetail.level ; i++){
                            that.scoreRange.push(response.data.data.moduleDetail.minuxScore+i*response.data.data.moduleDetail.level)
                        }
                        console.log(that.scoreRange)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //            上传图片recall
            getImgList(msg){
                console.log(msg)
                this.imgList = msg.join(',')
            },
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
                console.log(msg)
//                this.peopleList[msg.index].point=msg.value;
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
            subData(){
                let score = [];
                let that = this;
                this.peopleList.forEach(item=>{
                    score.push(item.selectAddScore)
                })
                let approveUserId = [];
                this.peopleList.forEach(item=>{
                    approveUserId.push(item.id);
                })
                if (this.selectType.selValue == '品德') {
                    var jfType = 1;
                }
                if (this.selectType.selValue == '行为') {
                    var jfType = 2;
                }
                if (this.selectType.selValue == '业绩') {
                    var jfType = 3;
                }
                let params = {
                    addScore: score.join(','),
                    beApproveUserId :approveUserId.join(','),
                    praiseContext:this.inputData[1].content,
                    praisePics :this.imgList,
                    praiseTitle :this.inputData[0].content,
                    type :jfType,
                }
                let url = '/missionApprove/praiseUser';
                if(this.$route.params.type==2){
                    params.dealDate = this.selTime;
                    url = '/missionApprove/dealScore'
                }
                this.$http.post(url, params)
                    .then(function (response) {
                        that.$router.push('/work');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getScoreRange();
        },
        components: {
            subTitle,
            uploadImg,
            choosePeople,
            mySelect,
            myInput,
            chooseStaff
        }
    }
</script>