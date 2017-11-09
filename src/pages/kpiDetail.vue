<template>
    <div>
        <div class="paddingAll bgWhite lh40">
            <p class="fs30">{{orderDetail.title}}</p>
            <p class="fs24 gray marginTop">{{orderDetail.companyName}} 布于 {{orderDetail.createDate}}</p>
            <div class="gray">
                <span class="marginRight">每天可考核 {{orderDetail.ifOnly}} 次</span>
                <i class="icon iconfont icon-renwu1"></i>1220
                <span class="fr blue" v-if="!orderDetail.isRead">未考核</span>
                <span class="fr" v-if="orderDetail.isRead">已考核</span>
            </div>
        </div>
        <div v-for="(item,index) in questions" :key="index">
            <div class="paddingAll fs30 lh40">
                {{index+1}}.{{item.context}}<span class="red">*</span>
                <span class="gray">（答对得{{item.score}}分，答错不扣分）</span>
            </div>
            <div class="marginLeft marginRight bgWhite borderRadius fs28">
                <div class="paddingAll borderBottom" v-for="(data,index2) in answers[index].questions" :key="index2">
                    <span class="crl" @click="choose(answers[index],index2)"><i class="icon iconfont icon-gouxuan blue fs36 marginRight" v-if="index2==answers[index].answerNum" ></i></span>
                    <span v-if="index2==0">A.</span>
                    <span  v-if="index2==1">B.</span>
                    <span  v-if="index2==2">C.</span>
                    <span  v-if="index2==3">D.</span>
                    <span class="answerWidth">
                        {{data}}
                    </span>
                </div>
            </div>
        </div>

        <div class=" bgWhite marginTop">
            <p class=" paddingAll borderBottom fs30">他们都考核了</p>
            <div class=" paddingAll overflow">
                <div class="people tac fl marginRight marginTop marginLeft" v-for="i in 9">
                    <img src="../assets/img/head.png" class="headPicture" alt="">
                    <p class="fs24 lh40">欧阳莉</p>
                </div>
            </div>
        </div>

        <div class="confBtn" @click="subAnswer">提交</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .crl{
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        .border;
        vertical-align: middle;
        .marginRight;
        i{font-size: 0.4rem}
    }
    .answerWidth{
        display: inline-block;
        width: 5.5rem;
        vertical-align: top;
        .lh40;
    }
</style>
<script>
    export default {
        data() {
            return {
                orderDetail:{},
                questions:[],
                answers:[]
            }
        },
        methods:{
            choose(origin,index){
                origin.answerNum = index;
            },
            subAnswer(){
                let bol = true;
                this.answers.forEach(item=>{
                    if(item.answerNum==100){
                        bol=false;
                    }
                });
                if(bol){
                    //提交
                    let arr = [];
                    let that = this;
                    this.answers.forEach(item=>{
                        arr.push(item.answerNum+1)
                    });
                    this.$http.post('/quetionsList/submitListByUser', {
                        aimId:this.$route.params.id,
                        anwsers:arr.join(',')
                    })
                        .then(function (response) {
                            console.log(response)
                            if(response.data.code==200000){
                                that.$toast({
                                    message: '考核完成，祝您好运',
                                    duration: 2000
                                });
                                that.router.push('/kpi');
                            }else{
                                that.$toast({
                                    message: response.data.message,
                                    duration: 2000
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else {
                    //您还有未填写的题目哦
                    this.$toast({
                        message: '您还有未填写的题目哦。。。',
                        duration: 2000
                    });
                }

            },
            getData(){
                let that = this;
                this.$http.post('/quetionsList/listById', {
                    id:this.$route.params.id
                })
                    .then(function (response) {
                        console.log(response)
                        that.orderDetail = response.data.data.question;
                        that.questions = response.data.data.quetionList;
                        console.log(that.questions)

                        that.questions.forEach(item=>{
                            that.answers.push({
                                answerNum:100,
                                questions:[item.queOne,item.queTwo,item.queThree,item.queFour]
                            })
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>