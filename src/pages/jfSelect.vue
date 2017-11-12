<template>
    <div>
        <div class="nav fs30" >
            <span v-for="(item,index) in idList" :key="index" @click="selId(item)" :class="{'active':item.sel}">
                {{item.name}}
                <i class="iconfont icon icon-arrLeft-fill"></i>
            </span>
        </div>
        <div class="marginAll bgWhite search">
            <i class="icon iconfont icon-sousuo"></i>
            <input type="text" class="myInput fs26 marginLeft" placeholder="请输入你要找的关键字">
        </div>


        <ul  class=" "
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-immediate-check="true"
             infinite-scroll-distance="10"
             v-if="list.length"
        >
            <li v-for="(item,index) in list" :key="index" class="marginBottom ">
                <div @click="go(item)" class=" paddingAll bgWhite lh50" >
                    <h4 class="fs30 ">{{item.title}}</h4>
                    <p class="fs26 lh30 littleSpace">积极帮助公司宣传公司的产品可以获得积分,获得额外的积分申
                        请积分获得积分资格</p>
                    <p class="fs28 littleSpace">
                        积分奖励：<span class="blue">20-600分</span>
                        <span class="fr gray fs26">每天一次</span>
                    </p>
                </div>
            </li>

            <li class="tac" v-if="loading">
                <div class="loadmore">
                    <mt-spinner color="#26a2ff"></mt-spinner>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .loadmore{
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
    .littleSpace{
        margin-top: 0.1rem;
    }
    .search{
        line-height: 0.6rem;
        height: 0.6rem;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0.08rem;
        i{
            .fs36;
            .marginLeft;
        }
    }
    .nav {
        .borderBottom;
        .overflow;
        span {
            .fl;
            width: 33%;
            .tac;
            padding: 0.3rem 0;
            &.active {
                color: #338ecc;
                border-bottom: 2px solid @blue;
            }

        }
    }
</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                type:1,
                idList: [
                    {
                        type:1,
                        name: '行为积分',
                        sel: true
                    },
                    {
                        type:2,
                        name: '品德积分',
                        sel: false
                    },
                    {
                        type:3,
                        name: '业绩积分',
                        sel: false
                    }
                ],
                list:[],
                num:3,
                pageNumber:1,
                pageSize:5,
                lastPage:false,
                loading:false
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        mounted(){
            this.getList();
        },
        methods: {
            selId(item) {
                this.idList.forEach(function (a) {
                    a.sel = false;
                })
                item.sel = true;
                this.type=item.type;

                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
                this.getList();
            },
            go(item){
                this.$router.push('/apply/'+item.id+'/'+this.type);
            },
            loadMore() {
                if(!this.lastPage && !this.loading){
                    this.getList();
                    this.loading = true;
                }else{
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getList(){
                let that = this;
                console.log(that.pageNumber)
                if(!that.lastPage){
                    this.$http.post('/actionModel/modelListByCom',{
                        type:this.type,
                        pageNumber: this.pageNumber,
                        pageSize: this.pageSize,
                        sortOrder: "asc",
                        token:this.userMessage.token,
                        userId:this.userMessage.userId
                    })
                        .then(function (response) {
                            that.pageNumber+=1;
                            if(response.data.data.last){
                                that.lastPage=true;
                            }
                            that.list=that.list.concat(response.data.data.content) ;
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }else{
                    that.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }

            }
        }
    }
</script>