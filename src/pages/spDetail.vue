<template>
    <div>
        <div class=" wrap">
            <selectSpPeople v-for="(item,index) in peopleList" v-if="index==0" :name="item.userName"
                          :key="index" :point="item.addScore" :range="scoreRange"
                          :ind="index"
                            :head="item.userAvatar"
                          @changePoint="changePoint">
            </selectSpPeople>

            <subTitle :content="'他们也申请了'" :subWord="'(勾选后可以一次性审批)'" :need="true"></subTitle>

            <selectSpPeople v-for="(item,index) in peopleList" v-if="index>0" :name="item.userName"
                          :key="index" :point="item.addScore" :range="scoreRange"
                          :ind="index" :head="item.userAvatar"
                            :checkStatus="item.checkStatus"
                          @changePoint="changePoint">
                <span class="cl" :class="{'border':!item.select}"  @click="selPerson(item)"><i class="icon iconfont icon-gouxuan " v-if="item.select"></i></span>
            </selectSpPeople>

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
    import { mapGetters } from 'vuex';
    export default {
        computed:{
            leftWord(){
                let num =this.noteContent.length>=100?100:this.noteContent.length;
                return num;
            },
            ...mapGetters([
                'spOrder',
            ])
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
                lastPage:false,
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
            }
        },
        mounted(){

            //get self information
            let selfData = {
                userName:this.spOrder.userName,
                addScore:this.spOrder.missionScore,
                id:this.$route.params.id,
                userAvatar:this.spOrder.userAvatar,
                select:true
            }
            this.peopleList.unshift(selfData)

            this.getList();
            this.getScoreRange();
        },
        methods: {
            getScoreRange(){
                let that = this;
                this.$http.post('/module/getModuleDetail', {
                })
                    .then(function (response) {

                        // get score select range
                        let minScore = response.data.data.moduleDetail.minuxScore;
                        let maxScore = response.data.data.moduleDetail.maxScore;
                        let level = response.data.data.moduleDetail.level;
                        let max = null;
                        let min = null;
                        let numArr = [];
                        if(maxScore==minScore){
                            that.scoreRange=[minScore]
                        }else{

                            if(maxScore>minScore){
                                max = maxScore;
                                min = minScore;
                            }else{
                                max = minScore;
                                min = maxScore;
                            }
                            console.log(min)
                            for(let i = 0; i<=Math.ceil((max-min)/level);i++){
                                numArr.push(min+i*level)
                            }
                            if(max<0&&min<0){
                                numArr.reverse();
                            }
                        }
                        that.scoreRange = numArr;
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
                        response.data.data.content.forEach(item=>item.select=false);
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