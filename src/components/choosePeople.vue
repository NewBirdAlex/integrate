<template>
    <div class=" wrap bgWhite">
        <div class="inner">

            <slot></slot>
            <img src="../assets/img/head.png" alt="">
            <span>{{name}}</span>
            <div class="fr">
                {{showValue}}
                <label :for="selId" ><i class="icon iconfont icon-xialakuangtishitubiao"></i></label>
            </div>
        </div>

        <select name="" :id="selId" @change="handleSelect" v-model="selValue">
            <option :value="item" v-for="item in range">{{item}}</option>
        </select>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wrap{
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
            left: 0.5rem;
            top: 0.2rem;
            width: 1px;
            height: 1px;
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
                selValue:"",
                showValue:'+80'
            }
        },
        computed:{
            selId(){
                return Math.random().toString(36).substr(3)
            }
        },
        methods:{
            handleSelect(){
                console.log(this.selValue)
                this.showValue = this.selValue;
                this.$emit('changePoint',{index:this.ind,value:this.showValue});
            }
        },
        mounted(){
            this.showValue = this.point;
        },
        props:[
            "name",
            'point',
            'range',
            'ind'
        ]
    }
</script>