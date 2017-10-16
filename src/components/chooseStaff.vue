<template>
    <div class="wrap" :style="wrapStyle">
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                筛选排名
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="搜索">
            </div>
            <div style="clear: both"></div>
            <div class="option" v-show="showOption" >
                <div class="ol">
                    <div class=""> <i class="icon iconfont icon-renwu"></i>部门</div>
                    <div class=""> <i class="icon iconfont icon-zhiwei"></i>职位</div>
                </div>
                <div class="or tac">
                    <div v-for="i in 8">行政部门</div>
                </div>
            </div>
        </div>

        <div class="bgWhite listWrap" :style="{height:listWrap}">
            <div class="list overflow paddingAll borderBottom" v-for="i in 10">
                <img src="../assets/img/head.png" class="marginRight headPicture fl" alt="">
                <div class="fl">
                    <p class="fs36 ">{{i}}世纪东方</p>
                    <p class="gray marginTop">世纪东方</p>
                </div>
                <span class="cl">
                    <i class="icon iconfont icon-gouxuan blue"></i>
                </span>
            </div>
            <div class="obtn bgWhite">
                <div class="">取消</div>
                <div class="active" @click="outputData">确认</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .listWrap{
        height: 5rem;
        overflow: scroll;
    }
    .obtn{
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        height: 80px;
        .tac;
        div{
            margin-top: 0.3rem;
            width: 40%;
            margin: 0.3rem;
            line-height: 0.6rem;
            display: inline-block;
            .border;
            .borderRadius;
            &.active{
                background: @blue;
                color: white;
            }
        }
    }
    .option{
        position: absolute;
        left:0;
        top:1rem;
        width: 100%;
        z-index: 10;
        .bgWhite;
        overflow: hidden;
        .ol{
            width: 40%;
            .fl;
            text-indent: 2em;
            i{
                .fs36;
                .marginRight;
            }
            div{
                padding:0.3rem 0;
                .borderBottom;
                .fs30;

            }
        }
        .or{
            width: 59%;
            padding-top: 0.08rem;
            .border;
            border-right: none;
            .fl;
            div{
                padding:0.3rem 0;
                .borderBottom;
                .fs30;
                &:last-child{border:none;}
            }
        }
    }
    .cl{
        .fr;
        width: 0.4rem;
        height: 0.4rem;
        .border;
        margin-top: 0.2rem;
        border-radius: 50%;
        .icon{
            font-size: 0.4rem;

        }
    }
    .wrap{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0;
        .grayBg;
    }
    .search{
        .borderBottom;

        position: relative;
        .left{
            width: 2rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right{
            .fl;
            width: 5rem;
            text-indent: 1em;
            padding:0.1rem 0;
            .borderRadius;
            input{
                margin-left: 0.2rem;
                border: none;
                outline: none;
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                showOption:false,
                listWrap:''
            }
        },
        computed:{
            wrapStyle(){
                if(this.showStaff){
                    return{
                        "z-index":'10',
                        'opacity':'1',
                        'top':'0'
                    }
                }else{
                    return{
                        "z-index":'-10',
                        'opacity':'0',
                        'top':'100rem'
                    }
                }
            }
        },
        props:{
            showStaff:{type:Boolean}
        },
        methods:{
            outputData(){
                this.$emit('accept');
            }
        },
        mounted(){
            console.log(document.querySelector('.search').getClientRects()[0].height)

            this.listWrap = (document.documentElement.clientHeight-document.querySelector('.search').getClientRects()[0].height)-80 + "px";
            console.log(document.documentElement.clientHeight)
        }
    }
</script>