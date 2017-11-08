<template>
    <div class="wrap ">
        <div class="inner">
            <strong>
                {{content.name}}
                <span class="red" v-if="content.need">*</span>
            </strong>
            <label :for="selId"><span class="fs30" :class="{'gray':selValue.length==0}" v-html="selValue?selValue:'请选择'"></span></label>
            <label :for="selId" class="fr"><i class="icon iconfont icon-xiala1"></i></label>
        </div>
        <select  name="" :id="selId" @change="getSelect" v-model="selValue">
            <option :value="item" v-for="item in content.selectRange">{{item}}</option>
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
        overflow: hidden;
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
            color: @gray;
            font-size: 12px;
            /*margin-top: 0.1rem;*/
            i{
                font-size: @fs36;
            }
        }
        select{
            width: 0;
            height: 0;
            position: absolute;
            left:2rem;
            top:0.1rem;
            -webkit-appearance: none;
            background: white;
        }
    }
</style>
<script>

    export default {
        data() {
            return {
                selValue:''
            }
        },
        computed:{
            selId(){
                return Math.random().toString(36).substr(3)
            }
        },
        methods:{
            getSelect(){
                this.$emit('getData',{
                    name:this.selProp,
                    val:this.selValue
                });
            }
        },
        mounted(){
            if(this.selRange) this.selValue=this.selRange[0]
            this.inpValue = this.content;
        },
        props:{
            content:{type:Object},
            selProp:{type:String}
        }
    }
</script>