<template>
    <div>
        <div class="spTop" ref="myFilter">
            <span :class="{active:spType==1}" @click="changeStatu(1)">待审批</span>
            <span :class="{active:spType==2}" @click="changeStatu(2)">已审批</span>
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
            <div class="filter"  :style="{height:filterHeight+'px'}"  v-show="showWrap">
                <div class="sel_type" v-if="!showSearch">
                    <p class="gray">积分类型</p>
                    <span :class="{'active':item.active}" @click="chooseType(item,index)" v-for="(item,index) in jfType" :key="index">{{item.name}}</span>
                    <div class="confBtn" @click="confirmSelect">确定</div>
                </div>
                <div class="search" v-if="showSearch">
                    <div class="st grayBg">
                        <div class="bgWhite">
                            <i class="icon iconfont icon-sousuo"></i>
                            <input type="text" placeholder="搜索标题、编号、正文内容" v-model="searchContext">
                        </div>
                        <span class="blue fr" @click="confirmInput">确定</span>
                    </div>
                    <div class="sh gray paddingAll" v-if="history.length">
                        <p>
                            搜索历史
                            <i class="icon iconfont icon-guanbi fr "></i>
                        </p>
                        <div class="overflow">
                            <span v-for="(item,index) in history" @click="historySearch(item)"> {{item}}</span>
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
        <div v-if="!showWrap">
            <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10">
                <router-link tag ='li' :to="'/orderDetail/'+item.id+'/'+$route.params.type" v-for="(item,index) in orderList" :key="index">

                    <showList :data="item"></showList>
                </router-link>
                <myEmpty v-if="!orderList||!orderList.length"></myEmpty>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

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
        .borderBottom;
        position: relative;
        .filter{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            z-index: 100;
            .fs30;
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
    import showList from '../components/showList.vue'
    export default {
        data() {
            return {
                spType:1,
                filterHeight:0,
                showWrap:true,
                showSearch:false,
                pageNumber:1,
                pageSize:10,
                lastPage:false,
                loading:false,
                orderList:[],
                history:[],
                searchContext:'',
                rootId:'',
                jfType:[
                    {
                        name:'日常任务',
                        active:false,
                        id:8
                    },{
                        name:'品德积分',
                        active:false,
                        id:11
                    },{
                        name:'行为积分',
                        active:false,
                        id:12
                    },{
                        name:'业绩积分',
                        active:false,
                        id:131
                    },{
                        name:'积分申诉',
                        active:false,
                        id:15
                    },{
                        name:'自由奖扣',
                        active:false,
                        id:16
                    },{
                        name:'抢单任务',
                        active:false,
                        id:34
                    },{
                        name:'挑战任务',
                        active:false,
                        id:34
                    }

                ],
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
                console.log(document.documentElement.clientHeight  )
                console.log(this.$refs.myFilter.getBoundingClientRect())
                console.log(this.$refs.myFilter.getBoundingClientRect().top)
                this.filterHeight = document.documentElement.clientHeight - this.$refs.myFilter.getBoundingClientRect().height;
            },
            historySearch(item){
                this.searchContext = item;
                this.showWrap = false;
                this.getList();
                this.searchContext = '';
            },
            confirmInput(){
                this.reset();
                //确定输入内容
                this.showWrap = false;
                if(!this.searchContext) return
                this.getList();

                //保存历史记录
                if(localStorage.getItem('spHistory')){
                    let arr = localStorage.getItem('spHistory').split(',');
                    if(arr.length>=10){
                        arr.pop();
                        arr.unshift(this.searchContext);
                    }else{
                        arr.unshift(this.searchContext);
                    }
                    this.history = arr;
                    localStorage.setItem('spHistory',arr.join(','))
                }else{
                    this.history.push(this.searchContext)
                    localStorage.setItem('spHistory',this.searchContext)
                }
                this.searchContext = '';
            },
            searchThroughInput(){
                this.pageNumber=1;
                this.getList();
            },
            confirmSelect(){
                this.showWrap = false;
                this.pageNumber=1;
                this.reset();
                this.getList();
            },
            chooseType(item,index){
                console.log(item.active)

                if(item.active){
                    this.jfType.forEach(item=>item.active=false);
                    item.active=false;
                    this.rootId ='';
                }else{
                    this.jfType.forEach(item=>item.active=false);
                    item.active=true;
                    this.rootId = item.id;
                }

            },
            changeStatu(msg){
                this.spType = msg;
                localStorage.setItem('spListType',msg)
                this.reset();
                this.getList();
            },
            handlehide(msg){
                if(msg=='search'){
                    this.showSearch=this.showWrap=true;
                }else{
                    this.showSearch=false;
                    this.showWrap=true;
                }
            },
            loadMore() {
                if(!this.lastPage&&!this.loading){
                    this.loading = true;
                    this.getList();
                }else if(this.lastPage){
                    this.$toast('已加载所有数据');
                }

            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.orderList=[];

            },
            getList(){
                //different type
                let url = '';
                if(this.$route.params.type==1){
                     url = '/missionApprove/waitMeApproveList'
                }else if(this.$route.params.type==2){
                     url= '/missionApprove/iApproveList'
                }else{
                     url = '/missionApprove/copyToMeList'
                }
                let that = this;
                this.$http.post(url, {
                    checkedStatus: this.spType,//1:待审批;2:已审批 ,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    searchContext:this.searchContext,
                    rootId:this.rootId
                })
                    .then(function (response) {
                        if(response.data.code!='200000') return
                        that.pageNumber+=1;
                        that.orderList = that.orderList.concat(response.data.data.content);
                        //last page
                        response.data.data.last? that.lastPage=true:'';
                        that.loading = false;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            //get last click
            if(localStorage.getItem('spListType')){
                this.spType=localStorage.getItem('spListType');
                //localStorage.removeItem('spListType')
            }

            this.init();
            this.getList();
            this.showWrap=false;

            //get history
            if(localStorage.getItem('spHistory')){
                this.history = localStorage.getItem('spHistory').split(',');

            }
        },
        components:{
            showList
        }
    }
</script>