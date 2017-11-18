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
        <div class="confBtn" style="margin-top: 1rem">提交</div>
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
    export default {
        data() {
            return {
                detail:{},
                imgList:'',
                inputList:[]
            }
        },
        components: {
            uploadImg
        },
        mounted(){
            this.detail = JSON.parse(localStorage.getItem('diaryInf'));
            this.inputList = JSON.parse(this.detail.modelContent);
            console.log(this.detail);
            localStorage.removeItem('diaryInf')
        }
    }
</script>