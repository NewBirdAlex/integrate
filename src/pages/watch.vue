<template>
    <div>
        <div class="spTop">
            <span :class="{active:spType}" @click="spType=!spType">我收到的</span>
            <span :class="{active:!spType}" @click="spType=!spType">我发出的</span>
        </div>
        <div class="sel">
            <span class="filterType "  @click="handlehide('search')">
                <i class="icon iconfont icon-sousuo"></i>
                搜索
            </span>
            <span class="filterType"  @click="handlehide('filter')">
                <i class="icon iconfont icon-shaixuan"></i>
                筛选
            </span>
            <div class="filter" ref="myFilter" :style="{height:filterHeight+'px'}"  v-show="showWrap">
                <div class="sel_type" v-if="!showSearch">
                    <p class="gray">积分类型</p>
                    <span>行为分</span>
                    <span>品德分</span>
                    <span class="active">业绩分</span>
                    <span>积分申诉</span>
                    <span>申请减分</span>
                    <span>申请加分</span>
                    <span>日常任务分</span>
                    <span>悬赏任务分</span>
                    <span>挑战任务分</span>
                    <div class="confBtn" @click="showWrap=!showWrap">确定</div>
                </div>
                <div class="search" v-if="showSearch">
                    <div class="st grayBg">
                        <div class="bgWhite">
                            <i class="icon iconfont icon-sousuo"></i>
                            <input type="text" placeholder="搜索标题、编号、正文内容">
                        </div>
                        <span class="blue fr" @click="showWrap=!showWrap">取消</span>
                    </div>
                    <div class="sh gray paddingAll">
                        <p>
                            搜索历史
                            <i class="icon iconfont icon-guanbi fr "></i>
                        </p>
                        <div class="overflow">
                            <span v-for="(item,index) in searchHistory"> {{item}}</span>
                        </div>
                    </div>
                    <div class="sn">
                        <div class="snt">
                            <span class="gray">在这里可以搜索到</span>
                        </div>
                        <div class="snc">
                            <span>
                                <i class="icon iconfont icon-renwu"></i>
                                申请人
                            </span>
                            <span>
                                <i class="icon iconfont icon-biaoti"></i>
                                标题
                            </span>
                            <span>
                                <i class="icon iconfont icon-bianhao"></i>
                                编号
                            </span>
                            <span>
                                <i class="icon iconfont icon-leixing"></i>
                                积分类型
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="paddingTop paddingLeft paddingRight bgWhite marginBottom" v-for="i in 5" @click="go">
            <div class="overflow">
                <img src="../assets/img/head.png" class="marginRight headPicture fl" alt="">
                <span class="fr read fs30 borderRadius">已读</span>
                <div class="lh40">
                    <p class="fs30">李梦洁的审批</p>
                    <p class="gray fs26">行政部</p>
                </div>
            </div>
            <div class="fs30 lh40 marginTop borderBottom paddingBottom wp">
                <p>日报</p>
                <div class="overflow">
                    <div class="left fl gray">奖励积分:</div>
                    <div class="right fl">
                        20分
                    </div>
                </div>
                <div class="overflow">
                    <div class="left fl gray">今日完成:</div>
                    <div class="right fl">
                        发宣传单200份
                    </div>
                </div>
                <div class="overflow">
                    <div class="left fl gray ">未 完 成 :</div>
                    <div class="right fl">
                        未达成签约数量目标
                    </div>
                </div>
                <div class="overflow">
                    <div class="left fl gray">工作总结:</div>
                    <div class="right fl">
                        未达成签约数量目标,需要加强更大的努力来完
                        成自己预定的目标
                    </div>
                </div>
            </div>
            <div class="paddingAll gray fs26">
                <span>08-16 16:08</span>
                <span class="fr">
                    <i class="icon iconfont icon-aixin-copy"></i> 200
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wp>div{
        margin-top: 0.1rem;
    }
    .lh50{
        line-height: 0.5rem;
    }
    .left{
        width: 20%;
        .fs28;
    }
    .right{
        width: 80%;
    }
    .read{
        padding: 0.15rem 0.3rem;
        background: @grayBg;
        color: #646464;
    }
    .unread{
        padding: 0.15rem 0.3rem;
        background: @blue;
        color: white;
    }
    .search{
        text-align: left;

        .st{
            .paddingAll;
            overflow: hidden;
            line-height: 0.6rem;
            .bgWhite{
                float: left;
                width: 6rem;
                font-size: @fs26;
                border-radius: 8px 8px 8px 8px;
                line-height: 0.6rem;
                height: 0.6rem;
                i{
                    font-size: @fs36;
                    margin: 0 0.2rem;
                }
                input{
                    border: none;
                    outline: none;
                    width: 5rem;
                }
            }
        }
        .sh{
            line-height: 0.4rem;
            .overflow{
                span{
                    .grayBg;
                    border-radius: 6px 6px 6px 6px;
                    padding:0.1rem 0.2rem;
                    float: left;
                    margin: 0.1rem;
                }
            }
        }
        .sn{
            .snt{
                .borderBottom;
                position: relative;
                .tac;
                line-height: 0;
                margin: 1rem 0.2rem;

                span{
                    position: relative;
                    background: white;
                    z-index: 2;
                    padding: 0 0.3rem;
                }
            }
            .snc{
                .tac;
                span{
                    display: inline-block;
                    line-height: 0.7rem;
                    margin:0 0.2rem;
                    .gray;
                    i{
                        font-size: 0.6rem;
                        display: block;
                    }
                }
            }
        }
    }

    .spTop {
        background: @grayBg;
        .tac;
        font-size: @fs30;
        height: 0.9rem;
        line-height: 0.9rem;
        .borderBottom;
        span {
            display: inline-block;
            width: 35%;
            margin: 0 5%;
        }
        .active{
            border-bottom:2px solid @blue;
            color:@blue;
        }
    }
    .sel{
        height: 0.9rem;
        line-height: 0.9rem;
        background: @grayBg;
        .tac;
        font-size: @fs30;
        .borderBottom;
        position: relative;
        .filter{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            z-index: 100;
            /*display: none;*/
            background: white;
            .sel_type{
                .paddingAll;
                text-align: left;
                span{
                    width: 3rem;
                    height: 0.8rem;
                    .tac;
                    display: inline-block;
                    line-height: 0.8rem;
                    background-color: rgba(240, 240, 240, 1);
                    border-radius: 6px 6px 6px 6px;
                    margin-bottom: 0.2rem;
                    &:nth-child(odd){
                        float:right;
                    }
                    &:nth-child(even){
                        float:left;
                    }
                }
                .active{
                    background: @blue;
                    color: white;
                }
                .confBtn{
                    position: absolute;
                    bottom: 0;
                    left:0;
                    width: 100%;
                    margin:0;
                }
            }
        }
        .filterType{
            float: left;
            width:50%;
            display: inline-block;
            color: @gray;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                spType:true,
                filterHeight:0,
                showWrap:true,
                showSearch:false,
                searchHistory:[
                    '品德积分',
                    '人气奖',
                    'FG123353525631521',
                    '品德积分',
                    '最佳人气',
                    '人气奖',
                ]
            }
        },
        methods:{
            init(){
                //init height
                this.filterHeight = document.documentElement.clientHeight - this.$refs.myFilter.getBoundingClientRect().top;
            },
            handlehide(msg){
                if(msg=='search'){
                    this.showSearch=this.showWrap=true;
                }else{
                    this.showSearch=false;
                    this.showWrap=true;
                }
            },
            go(){
                this.$router.push('/workDiary/diary');
            }
        },
        mounted(){
            this.init();
            this.showWrap=false;
        },
        components:{

        }
    }
</script>