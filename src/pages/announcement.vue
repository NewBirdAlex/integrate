<template>
    <div>
        <h3>发布公告</h3>
        <myInput
                 :conttitle="inputData.title"
                 :need="inputData.need"
                 :note="inputData.ph"
                 v-model="inputData.content"
                 :inpType="inputData.type"
                 :inputType="inputData.inputType?inputData.inputType:'text'"
        ></myInput>

        <showRange @getData="collectData"></showRange>

        <div class="confBtn" @click="subData">发布公告</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .confBtn {
        margin-top: 2rem;
    }

    h3 {
        .tac;
        padding: 0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
</style>
<script>
    import showRange from '../components/showRange.vue'
    import myInput from '../components/myInput.vue'
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                apartmentId:[],
                inputData: {
                    title: "公告内容",
                    need: true,
                    ph: "请输入公告内容",
                    content: "",
                    type: 'textarea'
                }
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        methods: {
            collectData(msg){
                console.log(msg)
                msg.forEach(item=>this.apartmentId.push(item.id))

            },
            subData(){
                console.log(this.userMessage.token);
                let that = this;
                this.$http.post('/notes/save', {
                    context: this.inputData.content,
                    permissionDepartment: this.apartmentId.join(','),
                    token:this.userMessage.token ,
                    userId: this.userMessage.userId
                })
                    .then(function (response) {
                        console.log(response)
                        if(response.data.code==200000){
                            that.$toast({
                                message: '发布公告成功',
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
            showRange,
            myInput
        }
    }
</script>