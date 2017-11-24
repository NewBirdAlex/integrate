<template>
    <div class="wrap">
        <img class="head" :src="data.userAvatar||'../assets/img/defaultHead.png'" alt="">
        <div class="right">
            <p>
                {{data.userName}}
                <span class="blue fr" ><span v-if="data.addScore>0">+</span>{{data.addScore}}分</span>
            </p>
            <p class="gray">{{data.jobTitle}}</p>
            <p>{{data.approveTitle}}</p>
            <p>积分类型：
                <span  v-if="data.type==3">行为积分</span>
                <span  v-if="data.type==1">品德积分</span>
                <span  v-if="data.type==2">业绩积分</span>
                <span  v-if="data.type==4">基础积分</span>
            </p>
            <p>
                <span class="yellow" v-if="data.status==1">待审批</span>
                <span class="blue" v-if="data.status==2">已经审批</span>
                <span class="fr gray">{{data.createDate}}</span>
            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wrap{
        padding:0.2rem 0;
        .borderBottom;
        background: white;
        overflow: hidden;
        .head{
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 50%;
            margin:0.2rem;
            float:left;
        }
        .right{
            float:left;
            display: inline-block;
            width: 6rem;
            font-size: @fs26;
            line-height: 0.35rem;
            padding-right: 0.2rem;
            padding-top: 0.2rem;
            p{
                &:nth-child(1){
                    font-size: @fs30;
                }
                &:nth-child(2){
                    margin-bottom: 0.1rem;
                }
                &:nth-child(4){
                    margin-bottom: 0.1rem;
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {}
        },
        props:[
            'data'
        ]
    }
</script>