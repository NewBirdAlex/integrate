<template>
    <div>
        <div class="bgWhite paddingLeft">
            <div class="paddingTop paddingBottom paddingRight borderBottom fs30">
                <span>奖励积分</span>
                <span class="fr ">{{detail.addScore}}分</span>
            </div>
            <div class="paddingTop paddingBottom paddingRight borderBottom fs30 overflow" v-for="(item,index) in inputList" :key="index">
                <span class="lp fl">{{item.title}}</span>
                <input type="text" placeholder="请输入" v-model="item.content" class="rp" v-if="item.type==1">
                <textarea name="" id="" class="rp mul"v-model="item.content" placeholder="请输入" v-else></textarea>
            </div>
        </div>
        <uploadImg v-model="imgList" class="marginTop"></uploadImg>
        <div class="paddingAll bgWhite fs30 marginTop borderBottom"><strong>抄送人</strong></div>
        <selectStaff v-model="chaosongId"></selectStaff>

        <div class="confBtn" style="margin-top: 1rem" @click="subData">提交</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .mul{
        resize: none;
        height: 1rem;
        text-align: left!important;
    }
    .lp{
        .marginRight;
    }
    .rp{
        .fl;
        width: 4rem;
        /*text-align: right;*/
        border:none;
        outline: none;
        padding-left: 0.2rem;
    }
</style>
<script>
    import uploadImg from '../components/uploadImg.vue'
    import selectStaff from '../components/selectStaff.vue'
    export default {
        data() {
            return {
                detail:{

                },
                chaosongId:'',
                imgList:'',
                inputList:[]
            }
        },
        components: {
            uploadImg,
            selectStaff
        },
        methods:{
            subData(){
                let that = this;
                let str = '';
                for(let i = 0;i<this.inputList.length;i++){
                    str+=JSON.stringify(this.inputList[i]);
                    if(i!=this.inputList.length-1) str+=',';
                }
                let content = '['+str+']';
                console.log(content)
                this.$http.post('/dailyRecord/submitDaily', {
                    checkUser: this.chaosongId,
                    content: content,
                    pics:this.imgList,
                    modelId: this.detail.id,
                })
                    .then(function (response) {
                        that.$router.go(-1)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.detail = JSON.parse(localStorage.getItem('diaryInf'));
            this.inputList = JSON.parse(this.detail.modelContent);
            console.log(this.detail);
            localStorage.removeItem('diaryInf')
        }
    }
</script>