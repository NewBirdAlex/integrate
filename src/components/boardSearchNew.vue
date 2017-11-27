<template>
    <div class="searchWrap bgWhite">
        <!--<span>筛选 <i class="icon iconfont icon-arrLeft-fill"></i></span>-->
        <span>选择条件</span>
        <span v-for="(item,index) in searchType" :key="index" :class="{'blue':item.active}" @click="changeType(item)">{{item.name}}</span>
        <span class="fr lastSpan" @click="showSearch=!showSearch"> <i class="icon iconfont icon-sousuo fs36 gray"></i></span>

        <transition
                name="custom-classes-transition"
                enter-active-class="animated slideInDown"
                leave-active-class="animated  slideOutUp"
        >
            <div class="inside" v-if="showSearch">
                <i class="icon iconfont icon-sousuo fs36 gray"></i>
                <input type="text" class="myInput" placeholder="输入搜索内容" v-model="keyWord">
                <span class="blue" @click="confirm">确定</span>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .icon{vertical-align: bottom}
    .searchWrap{
        position: relative;
        .paddingAll;
        .lh40;
        span{
            margin-right: 0.45rem;
            font-weight: bold;
            .fs30;
        }
        .lastSpan{
            .tac;
            display: inline-block;
            width: 1rem;
            border-left: @border;
            margin-right: 0;
        }
        .inside{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            .bgWhite;
            line-height: 100%;
            .overflow;
            line-height: 1rem;
            /*transition: all 1s ease-in-out;*/
            /*transform: translate(100%);*/
            .icon{
                margin-left: 0.2rem;
                .marginRight;
            }
            input{
                width: 5rem;
                vertical-align: middle;
                position: relative;
                top:-0.1rem;
                margin-left: 0.5rem;
                .fs30;
            }
        }
        .move{
            transform: translate(0);
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                showSearch:false,
                keyWord:'',
                searchType:[
                    {
                        type:1,
                        name:'按日',
                        active:true
                    },{
                        type:2,
                        name:'按月',
                        active:false
                    },{
                        type:3,
                        name:'按季',
                        active:false
                    },{
                        type:4,
                        name:'按年',
                        active:false
                    },
                ]
            }
        },
        computed:{

        },

        methods:{
            confirm(){
                this.showSearch=false;
                this.submitData();
                this.keyWord='';
            },
            submitData(){
                let obj = {
                    keyWord:this.keyWord
                };
                this.searchType.forEach(item=>{
                    if(item.active) obj.type=item.type;
                });
                this.$emit('getData',obj)
            },
            changeType(item){
                this.searchType.forEach(item=>{
                    item.active=false;
                });
                item.active=true;
                this.submitData();
            }
        },
        props:{

        },
        mounted(){

        }
    }
</script>