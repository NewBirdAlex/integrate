<template>
    <div>
        <div class="normalTille">您本月的可用积分：{{baseInf.flowScore}}分</div>
        <myInput v-for="(item,index) in inputData" :key="index"
                 :conttitle="item.title"
                 :need="item.need"
                 :note="item.ph"
                 v-model="item.content"
                 :inpType="item.type"
                 :inputType="item.inputType?item.inputType:'text'"
        ></myInput>
        <jifenType v-model="jfType"></jifenType>
        <showRange @getData="getRange"></showRange>
        <div class="confBtn marginTop" @click="subMission">提交</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .wrap:nth-child(odd) {
        margin-bottom: 0.2rem;
    }

    .confBtn {
        margin-top: 1rem;
    }
</style>
<script>
    import myInput from '../components/myInput.vue'
    import jifenType from '../components/jifenType.vue'
    import showRange from '../components/showRange.vue'
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                apartMentId: [],
                jfType:1,
                inputData: [
                    {
                        title: "任务标题",
                        need: true,
                        ph: "任务类型固定为抢单任务",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "任务描述",
                        need: true,
                        ph: "请描述任务",
                        content: "",
                        type: 'textarea'
                    },
                    {
                        title: "任务积分",
                        need: true,
                        ph: "每人都会获得，积分为整数，如100",
                        content: "",
                        inputType: 'tel',
                        type: 'input'
                    },
                    {
                        title: "限制人数",
                        need: true,
                        ph: "请输入任务限制人数",
                        content: "",
                        inputType: 'tel',
                        type: 'input'
                    }
                ],
            }
        },
        computed: {
            ...mapGetters([
                'baseInf',
            ])
        },
        mounted(){
            this.$store.commit('getuserBaseInf');
        },
        methods: {
            getRange(data) {
                let that = this;
                data.forEach(item => that.apartMentId.push(item.id))
            },
            subMission() {
                if(!this.inputData[0].content||!this.inputData[1].content||!this.inputData[2].content||!this.inputData[3].content){
                    this.$toast('请填写完整资料')
                    return
                }
                let that =this;

                this.$http.post('/mission/userCreateMission', {
                    isRepeat: 7,
                    missionAddScore: this.inputData[2].content,
                    missionAuthority: this.apartMentId.join(','),
                    missionContext: this.inputData[1].content,
                    missionTitle: this.inputData[0].content,
                    missionType: 2,
                    token:this.baseInf.token ,
                    type: this.jfType,
                    userCount: this.inputData[3].content,
                    userId: this.baseInf.userId
                })
                    .then(function (response) {
                        console.log(response)
                        if(response.data.code==200000){
                            that.$toast({
                                message: '提交任务成功',
                                duration: 2000
                            });
                            that.$router.push('/work');
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
            }
        },
        components: {
            myInput,
            jifenType,
            showRange
        }
    }
</script>