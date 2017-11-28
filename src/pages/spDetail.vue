<template>
    <div>
        <div class=" wrap">
            <div v-if="needRange">
                <selectSpPeople
                        v-for="(item,index) in peopleList" v-if="index==0" :name="item.userName"
                        :key="index" :point="item.addScore" :range="scoreRange"
                        :ind="index"
                        :head="item.userAvatar"
                        @changePoint="changePoint">
                </selectSpPeople>
            </div>
            <div v-else>
                <div v-if="index==0"  v-for="(item,index) in peopleList"  :key="index" class="paddingAll bgWhite">
                    <img :src="item.userAvatar" class="headPicture marginRight" alt="">
                    {{item.userName}}
                    <input type="text" class="fr myInput tar fs30 marginTop" placeholder="输入分数" v-model="item.addScore">
                </div>
            </div>

            <subTitle :content="'他们也申请了'" v-if="peopleList.length>1" :subWord="'(勾选后可以一次性审批)'" :need="true"></subTitle>
            <div v-if="needRange">
                <selectSpPeople v-for="(item,index) in peopleList" v-if="index>0" :name="item.userName"
                                :key="index" :point="item.addScore" :range="scoreRange"
                                :ind="index" :head="item.userAvatar"
                                :checkStatus="item.checkStatus"
                                @changePoint="changePoint">
                    <span class="cl" :class="{'border':!item.select}"  @click="selPerson(item)"><i class="icon iconfont icon-gouxuan " v-if="item.select"></i></span>
                </selectSpPeople>
            </div>
            <div v-else>
                <div v-if="index>0"  v-for="(item,index) in peopleList"  :key="index"  class="paddingAll bgWhite">
                    <img :src="item.userAvatar" class="headPicture marginRight" alt="">
                    {{item.userName}}
                    <input type="text" class="fr myInput tar fs30 marginTop" placeholder="输入分数" v-model="item.addScore">
                </div>
            </div>

            <subTitle :content="'审批备注'"></subTitle>
            <div class="bgWhite paddingAll overflow">
                <textarea class="spbz" name="" maxlength="100" v-model="noteContent"  placeholder="添加备注信息" id="" cols="30" rows="10"></textarea>
                <p>
                    <span class="fr gray"> {{leftWord}}/100</span>
                </p>
            </div>

            <!--上传图片-->
            <uploadImg v-model="imgList"></uploadImg>
        </div>
        <div class="confBtn" @click="confirmHandle">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .cl{

        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        .tac;
        vertical-align: middle;
        line-height: 0.4rem;
        border-radius: 50%;
        .overflow;
        i{
            font-size: 0.4rem;
            display: inline-block;
        }
    }
    .wrap{
        background:@grayBg;
        .icon-gouxuan {
            color:@blue!important;
        }
    }

    .spbz{
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        height: 2rem;
        line-height: 0.4rem;
        font-size: @fs30;
    }
</style>
<script>

    import subTitle from '../components/subTitle.vue'
    import uploadImg from '../components/uploadImg.vue'
    import choosePeople from '../components/choosePeople.vue'
    import selectSpPeople from '../components/selectSpPeople.vue'
    import { mapGetters } from 'vuex'
    import {myTool} from '../lib/myTool'
    export default {
        computed:{
            leftWord(){
                let num =this.noteContent.length>=100?100:this.noteContent.length;
                return num;
            }
        },
        data() {
            return {
                noteContent:"",
                mainPerson:[],
                peopleList:[],
                orderDetail:{},
                scoreRange:[],
                imgList:'',
                pageNumber:1,
                pageSize:100,
                spOrder:{},
                needRange:true,
                lastPage:false,
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
            }
        },
        mounted(){
            this.getList();
        },
        created(){
            this.getDetail();
        },
        methods: {
            getDetail() {
                let that = this;
                this.$http.post('/missionApprove/approveDetail', {
                    id: this.$route.params.id
                })
                    .then(function (response) {
                        if(response.data.code!=200000) return
                        that.spOrder = response.data.data;
                        //get self information
                        let selfData = {
                            userName:that.spOrder.userName,
                            addScore:that.spOrder.missionScore,
                            id:that.$route.params.id,
                            userAvatar:that.spOrder.userAvatar,
                            select:true
                        }
                        that.peopleList.unshift(selfData)
                        that.getScoreRange();
                        //11 品德积分12 行为积分13 业绩积分
                        if(that.spOrder.rootId==11||that.spOrder.rootId==12||that.spOrder.rootId==13){
                            that.needRange=true;
                        }else{
                            that.needRange=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getScoreRange(){
                let that = this;

                this.$http.post('/actionList/getActionDetail', {
                    id:this.spOrder.aimId
                })
                    .then(function (response) {
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
            getList(){
                let that = this;
                this.$http.post('/missionApprove/sameTypeList', {
                    aimId:this.$route.params.id,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                })
                    .then(function (response) {
                        response.data.data.content.forEach(item=>{
                            item.select=false;
                            item.addScore=that.spOrder.missionScore;
                        });
                        that.peopleList = that.peopleList.concat(response.data.data.content) ;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getData(data) {
                this.inputData[data.index].content = data.content;
            },
            confirmHandle(){
                let that = this;
                let bol = true;
                let otherIds = [];
                let otherScores = [];

                this.peopleList.forEach(item=>{
                    if(item.select){
                        otherIds.push(item.id);
                        otherScores.push(item.addScore)
                    }
                });
                console.log(otherIds.join(','))
                console.log(otherScores.join(','))
                this.$http.post('/missionApprove/approveById', {
                    approveRemark: this.noteContent,
                    checkedStatus: this.$route.params.type,
                    //aimId:this.$route.params.id,
                    otherIds: otherIds.join(','),
                    otherScores: otherScores.join(','),
                    pics: this.imgList
                })
                    .then(function (response) {

                        if(response.data.code=='200000'){
                            that.$toast('成功');
                            that.$router.go(-2);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            上传图片recall
            imageuploaded(res) {
                if (res.errcode == 0) {
                    this.src = res.data.src;
                }
            },
            selPerson(item){
                item.select=!item.select;
            },
            changePoint(msg){
                this.peopleList[msg.index].addScore=msg.value;
            }
        },
        components: {
            subTitle,
            uploadImg,
            selectSpPeople,
            choosePeople
        }
    }
</script>