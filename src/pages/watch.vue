<template>
    <div>
        <div class="spTop">
            <span :class="{active:spType}" @click="changeType">我收到的</span>
            <span :class="{active:!spType}" @click="changeType">我发出的</span>
        </div>
        <div v-if="false" class="sel">
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


        <myInfinite :loading="loading" @getList="getList">
            <li v-for="(item,index) in list">
                <div class="paddingTop paddingLeft paddingRight bgWhite marginBottom" >
                    <router-link tag="div" :to="'/workDiary/diary/'+item.id+'/'+spType" class="overflow">
                        <img :src="item.userAvatar" class="marginRight headPicture fl" alt="">
                        <span class="fr" v-if="spType">
                             <span class="fr unread fs30 borderRadius" v-if="!item.isRead">未读</span>
                            <span class="fr read fs30 borderRadius active" v-else>已读</span>
                        </span>

                        <div class="lh40">
                            <p class="fs30">{{item.userName}}</p>
                            <p class="gray fs26">{{item.departmentName}}</p>
                        </div>
                    </router-link>
                    <div class="fs30 lh40 marginTop borderBottom paddingBottom wp">
                        <div class="overflow">
                            <div class="left fl gray">奖励积分:</div>
                            <div class="right fl">
                                {{item.addScore}}分
                            </div>
                        </div>
                        <div class="overflow" v-for="(obj ,index2) in JSON.parse(item.content)">
                            <div class="left fl gray">{{obj.title}}:</div>
                            <div class="right fl">
                                {{obj.content}}
                            </div>
                        </div>
                    </div>
                    <div class="paddingAll gray fs26">
                        <span>{{item.createDate}}</span>
                        <span class="fr">
                    <i class="icon iconfont icon-aixin-copy" :class="{'red':item.likeCount}" @click="makeAwsome(item)"></i> {{item.likeCount||0}}
                </span>
                    </div>
                </div>
            </li>
        </myInfinite>
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
    import myInfinite from '../components/myInfinite.vue'
    export default {
        data() {
            return {
                spType:true,
                filterHeight:0,
                showWrap:true,
                showSearch:false,
                pageNumber: 1,
                pageSize: 10,
                lastPage: false,
                loading: false,
                list:[],
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
            changeType(){
                this.spType=!this.spType;
                this.reset();
                this.getList();
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
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
//                this.$router.push('/workDiary/diary');
            },
            makeAwsome(item){
                let that = this;
                this.$http.post('/dailyRecord/goodDaily', {
                    addUserId: item.userId,
                    id:item.id,
                })
                    .then(function (response) {
                        item.likeCount+=1;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getList(){
                if(this.lastPage){
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                    return
                }
                let that = this;
                var type=1;
                this.spType? type=2:type=1;
                this.$http.post('/dailyRecord/listJson', {
                    departmentId:'',
                    jobId: '',
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: type,
                })
                    .then(function (response) {
                        console.log(response)
                        that.pageNumber += 1;
                        if (response.data.data.last) {
                            that.lastPage = true;
                        }
                        that.list = that.list.concat(response.data.data.content);
                        that.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
//            this.init();
            this.getList();
            this.showWrap=false;
        },
        components:{
            myInfinite
        }
    }
</script>