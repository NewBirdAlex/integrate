<template>
    <div class="wrap ">
        <div class="inner">
            <strong>
                {{conttitle}}
                <span class="red" v-if="need">*</span>
            </strong>
            <input type="text" :placeholder="note" @input="handleInput" v-if="inpType=='inputSelect'|| inpType=='input'" v-model="inpValue"  ref="input">
            <textarea name="" :placeholder="note" @input="handleInput" v-model="inpValue"  v-if="inpType=='textarea'" id="" cols="30" rows="10"></textarea>
            <label :for="selId" class="fr" v-if="inpType=='inputSelect'"> <i class="icon iconfont icon-xiala1"></i></label>
        </div>
        <select  name="" :id="selId" @change="getSelect" v-model="selValue">
            <option value="aaaaaa">aaaaa</option>
            <option value="bbbbbb">bbbbb</option>
            <option value="ccccc">cccccc</option>
            <option value="ddddd">ddddddd</option>
        </select>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";

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
            padding:0.2rem 0;
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
        input{
            border: 0;
            outline: none;
            vertical-align: middle;
            position: relative;
            z-index: 2;
            background: white;
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
        textarea{
            resize: none;
            border: none;
            outline: 0;
            vertical-align: top;
            height: 1.8rem;
            width:5.21rem;
        }
    }
</style>
<script>

    export default {
        data() {
            return {
                selValue:"",
                inpValue:""
            }
        },
        computed:{
            selId(){
                return Math.random().toString(36).substr(3)
            }
        },
        methods:{
            getSelect(ev){
                this.inpValue = this.selValue;
                this.handleInput();
            },
            handleInput(){
                //输入数据变化后提交
                let data = {index:this.num,content:this.inpValue};
                this.$emit('getData',data);
            },
            upLoadData(){
                this.$emit('getData',this.inpValue);
            }
        },
        mounted(){
            this.inpValue = this.content;
            console.log(this.inpType=='inputSelect')
        },
        props:{
            conttitle:{type:String},
            need:{type:Boolean},
            note:{type:String},
            content:{type:String},
            num:{type:Number},
            inpType:{type:String}
        }
    }
</script>