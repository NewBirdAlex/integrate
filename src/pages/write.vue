<template>
    <div>
        <div class="bgWhite paddingLeft">
            <div class="paddingTop paddingBottom paddingRight borderBottom fs30">
                <span>奖励积分</span>
                <span class="fr ">20分</span>
            </div>
            <div class="paddingTop paddingBottom paddingRight borderBottom fs30 overflow" v-for="(item,index) in inputList" :key="index">
                <span class="lp fl">{{item.label}}</span>
                <input type="text" :placeholder="item.ph" class="rp" v-if="item.type=='input'">
                <textarea name="" id="" class="rp mul" :placeholder="item.ph" v-else></textarea>
            </div>
        </div>
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
    export default {
        data() {
            return {
                inputList:[
                    {
                        ph:'请填写文字',
                        label:"今日完成工作",
                        type:'input'
                    },
                    {
                        ph:'请填写文字',
                        label:"今日完成工作",
                        type:'input'
                    },
                    {
                        ph:'请填写文字',
                        label:"今日完成工作",
                        type:'input'
                    },
                    {
                        ph:'请填写文字',
                        label:"今日完成工作",
                        type:'textarea'
                    }
                ]
            }
        }
    }
</script>