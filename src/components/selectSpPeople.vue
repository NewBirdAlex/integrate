<template>
    <div class=" wrap2 bgWhite">
        <div class="inner">

            <slot></slot>
            <img :src="head" v-if="head" class="headPicture" alt="">
            <img src="../assets/img/defaultHead.png" class="headPicture" v-else alt="">
            <div style="display: inline-block; line-height: 0.4rem;vertical-align: middle; text-align: left">
                {{name}} <br>
                <span class="yellow " v-if="checkStatus==0">提交审批</span>
                <span class="yellow" v-if="checkStatus==1">审批中</span>
                <span class="green" v-if="checkStatus==2">审批通过</span>
                <span class="red " v-if="checkStatus==3">审批不通过</span>
            </div>
            <div class="fr">

                <label :for="selId" v-if="range.length">
                    {{point}}分
                    <i class="icon iconfont icon-xialakuangtishitubiao"></i>
                </label>
                <input type="text" placeholder="请输入分数" class="myInput" v-else>
            </div>
        </div>

        <select name="" :id="selId" @change="handleSelect" v-model="selValue">
            <option :value="item" v-for="item in range">{{item}}</option>
        </select>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .myInput{
        width: 2rem;
        text-align: right;
    }
    .wrap2{
        position: relative;
        padding:0 0.2rem;
        .inner{
            position: relative;
            background: white;
            z-index: 10;
            height: 0.9rem;
            line-height: 0.9rem;
            border-bottom: @border;
            padding:0.2rem 0;
            font-size: @fs30;
            .op{
                display: inline-block;
                vertical-align: middle;
                width: 0.7rem;
                font-size: @fs26;
            }
            img{
                width: 0.9rem;
                height: 0.9rem;
                display: inline-block;
                vertical-align: middle;
                margin-right: 0.2rem;
            }

        }
        select{
            position: absolute;
            right: 0.4rem;
            top: 0.2rem;
            width: 1.5rem;
            height: 1rem;
            z-index: 100;
            opacity: 0;
        }
    }
    .icon-xialakuangtishitubiao{
        font-size: 12px;
        color: @gray;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }
</style>
<script>
    export default {
        data() {
            return {
                selValue:""
            }
        },
        computed:{
            selId(){
                return Math.random().toString(36).substr(3)
            }
        },
        methods:{
            handleSelect(){
                this.$emit('changePoint',{index:this.ind,value:this.selValue});
            }
        },
        mounted(){
//            this.showValue = this.point;
        },
        props:[
            "name",
            'point',
            'range',
            'ind',
            'head',
            'checkStatus'
        ]
    }
</script>