<template>
    <div>
        <boardSearch @getData="getData"></boardSearch>

        <!--爱心排行榜-->
        <div class="paddingAll borderBottom">
            <span>您本月可用的爱心分：600分</span>
            <span class="fr">
                <span class="marginRight"><i class="icon iconfont icon-sun3 yellow fs36"></i> 10分</span>
                <span><i class="icon iconfont icon-hongxin red fs36"></i> 1分</span>
            </span>
        </div>

        <div class="bgWhite">

            <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10">
                <li v-for="(item,index) in list" :key="index" class="loveList">
                    <div class="overflow  fs36  ">
                        <div class="fl left  ">{{index+1}}</div>
                        <div class="fl right">
                            <router-link to="/loveRank" tag="div" class="fl marginRight"><img :src="item.userAvatar" class="headPicture" alt=""></router-link>
                            <div class="fl">
                                <p><strong>{{item.userName}}</strong></p>
                                <p class="gray fs30">本月 {{item.userScore}}分</p>
                            </div>
                            <div class="fr  tac marginRight">
                                <p>{{item.loveAdd}}</p>
                                <p><i class="icon iconfont icon-hongxin gray" @click="kissU"></i></p>
                            </div>
                            <div class="fr marginRight tac">
                                <p>{{item.loveAddAdmin}}</p>
                                <p><i class="icon iconfont icon-sun3 yellow"></i></p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--<transition-->
                <!--name="custom-classes-transition"-->
                <!--enter-active-class="animated zoomIn"-->
                <!--leave-active-class="animated fadeOut"-->
        <!--&gt;-->
             <i class="icon iconfont icon-kiss red specilIcon" :class="{'activeIcon':clickHeart}" v-if="clickHeart"></i>
        <!--</transition>-->
    </div>
</template>
<style  lang="less">
    @import "../assets/css/common.less";
    .specilIcon{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        font-size: 4rem;
        /*animation-duration: 1s;*/
        transition: all 1s;
        /*animation: kiss 0s linear 1s infinite ;*/
    }
    .activeIcon{
        /*transform: translate(-50%,-50%) scale(3)!important;*/
        animation: kiss 1s linear 500ms 1 ;
    }
    @keyframes kiss {
        0%{ transform: translate(-50%,-50%) scale(1);}
        100%{transform: translate(-50%,-50%) scale(6);opacity: 0;}
    }
    .yellow{color:#f5b739;}
    .red{color:#f55839;}
    i{vertical-align: middle}
    .loveList{
        line-height: 0.5rem;
        padding: 0.3rem 0 0 0 ;
        &:last-child{
            .right{
                border: none;
            }
        }
        .icon{font-size: 0.5rem}
        .left{
            width: 10%;
            .tac;
            font-size: 0.5rem;
            padding-top: 0.2rem;
        }
        .right{
            width: 90%;
            .borderBottom;
            padding-bottom: 0.2rem;
        }
    }

</style>
<script>
    import boardSearch from '../components/boardSearch.vue'
    export default {
        data() {
            return {
                showOption:false,
                clickHeart:false,
                loading:false,
                lastPage:false,
                pageNumber:1,
                pageSize:10,
                list:null
            }
        },
        methods:{
            kissU(){
                let that = this;
                this.clickHeart=true;
                let timer = null;
                clearTimeout(timer);
                setTimeout(()=>this.clickHeart=false,1000)
            },
            loadMore() {
                if(!this.lastPage){
                    this.loading = true;
                    this.getList();
                }
            },
            getBaseInf(){
                let that = this;
                this.$http.post('/user/canUseLoveScore', {
                })
                    .then(function (response) {
                        if(response.data.data.code=200000){

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getList(){
                let that = this;
                this.$http.post('/user/loveOrder', {
                    departmentId: '',
                    jobId: '',
                    month: '',
                    pageNumber: this.pageNumber,
                    pageSize:this.pageSize
                })
                    .then(function (response) {
                        if(response.data.data.code=200000){
                            that.list = response.data.data.content;
                            if(response.data.data.last) that.lastPage = true;
                            that.loading = false;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getData(msg){
                console.log(msg)
            }
        },
        mounted(){
//            this.getList();
            this.getBaseInf();
        },
        components:{
            boardSearch
        }
    }
</script>