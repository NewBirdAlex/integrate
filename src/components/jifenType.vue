<template>
    <div class="wrap ">
        <div class="inner">
            <strong>
                积分类型
                <span class="red" >*</span>
            </strong>
            <label :for="selId">
                <span class="fs30 gray" v-if="!selValue">请选择</span>
                <span class="fs30 " v-else-if="selValue==3">行为积分</span>
                <span class="fs30 " v-else-if="selValue==1">品德积分</span>
                <span class="fs30 " v-else-if="selValue==2">业绩积分</span>
                <span class="fs30 " v-else-if="selValue==4">基础积分</span>
            </label>
            <label :for="selId" class="fr"><i class="icon iconfont icon-xiala1"></i></label>
        </div>
        <select  name="" :id="selId"  v-model="selValue">
            <option :value="3" >行为积分</option>
            <option :value="1" >品德积分</option>
            <option :value="2" >业绩积分</option>
            <option :value="4" >基础积分</option>
        </select>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .wrap{
        font-size: @fs30;
        line-height: 0.3rem;
        position: relative;
        width: 100%;
        background: white;
        .inner{
            border-bottom: @border;
            margin:0 0.2rem;
            background: white;
            position: relative;
            z-index: 2;
            padding:0.3rem 0;
        }
        strong{
            width: 1.6rem;
            display: inline-block;
            vertical-align: middle;
        }
        label{
            font-size: 12px;
            /*margin-top: 0.1rem;*/
            i{
                font-size: @fs36;
            }
        }
        select{
            width: 1rem;
            height: 0.7rem;
            position: absolute;
            right:0.2rem;
            top:0.1rem;
            opacity: 0;
            z-index: 10;
            /*-webkit-appearance: none;*/
            background: white;
        }
    }
</style>
<script>

    export default {
        data() {
            return {
                selValue:'',
                selectRange:[
                    '行为积分',
                    '品德积分',
                    '业绩积分',
                    '基础积分',
                ]
            }
        },
        computed:{
            selId(){
                return Math.random().toString(36).substr(3)
            }
        },
        methods:{

        },
        watch:{
            value(val){
                this.selValue = val;
            },
            selValue(val){
                this.$emit('input', val);
            }
        },
        mounted(){
            if(this.value) this.selValue=this.value
        },
        props:{
            value:Number
        }
    }
</script>