<template>
    <div>
        <div class="nav fs30" >
            <span v-for="(item,index) in idList" :key="index" @click="selId(item,index)" :class="{'active':item.sel}">
                {{item.name}}
                <i class="iconfont icon icon-arrLeft-fill"></i>
            </span>
        </div>
        <div class="mask" v-if="showMask" @click="hideMask">
            <ul class="bgWhite">
                <li class="paddingAll tac borderBottom" v-for="(item,index) in list" @click="chooseMissionType(item)">{{item.title}}</li>
            </ul>
        </div>
        <div class="marginAll bgWhite search">
            <i class="icon iconfont icon-sousuo"></i>
            <input type="text" class="myInput fs26 marginLeft" style="width: 5rem" placeholder="请输入你要找的关键字" v-model="searchKeyword" @keyup="serchList">
        </div>

        <myEmpty v-if="!list2.length"></myEmpty>
        <ul  class=" "
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-immediate-check="true"
             infinite-scroll-distance="10"
             v-if="list.length"
        >
            <li v-for="(item,index) in list2" :key="index" class="marginBottom " >
                <div @click="go(item)" class=" paddingAll bgWhite lh50" >
                    <h4 class="fs30 ">{{item.title}}</h4>
                    <p class="fs26 lh30 littleSpace">{{item.context}}</p>
                    <p class="fs28 littleSpace">
                        积分奖励：<span class="blue">{{item.addScore||0}}分</span>
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
    .mask{
        position: fixed;
        width: 100%;
        height: 100vh;
        left:0;
        top:0;
        background: rgba(0,0,0,0.5);
        overflow: scroll;
        ul{

        }
    }
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
//    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                type:1,
                showMask:false,
                searchKeyword:'',
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
                list2:[],
                num:3,
                modelType:'',
                pageNumber:1,
                pageNumber2:1,
                pageSize:100,
                pageSize2:10,
                lastPage:false,
                loading:false,
                goReset:false,
                enter:true
            }
        },
//        computed: {
//            ...mapGetters([
//                'userMessage',
//            ])
//        },
        mounted(){
            this.getList();
            this.chooseMissionType();
        },
        methods: {
            hideMask($event){
                if($event.srcElement.tagName=='DIV'){
                    this.showMask=false;
                }
            },
            serchList(){
                // key word search
                this.pageNumber2=1;
                this.goRest=true;
                this.chooseMissionType();
            },
            selId(item) {
                this.showMask=true;
                this.idList.forEach(function (a) {
                    a.sel = false;
                })
                item.sel = true;
                this.goRest=true;
                this.type=item.type;
                this.lastPage=false;
                this.list=[];
                this.getList();
            },
            reset(){
                this.list=[];
                for(let i = 0;i<this.list2.length;i++){
                    this.list2.pop();
                    console.log(this.list2)
                }
//                this.list2=[];
                //this.pageNumber2=1;
                this.lastPage=false;
            },
            chooseMissionType(item){
//                this.reset();
                if(this.goRest){
                    this.list2=[];
                    this.pageNumber2=1;
//                    alert(1)
                }
                if(item) this.modelType=item.id;
                this.showMask=false;
                let that = this;

                this.$http.post('/actionList/getActionListByCompany',{
                    modelType: this.modelType,
                    type:this.type,
                    pageNumber: this.pageNumber2,
                    pageSize: this.pageSize2,
                    title:this.searchKeyword
                })
                    .then(function (response) {
                        that.pageNumber2+=1;
                        that.list2=that.list2.concat(response.data.data.content)
//                        for(let i =0;i<response.data.data.content.length;i++){
//                            that.list2.push(response.data.data.content[i])
//                        }
                        that.loading = false;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            go(item){
                this.$router.push('/apply/'+item.id+'/'+this.type);
            },
            loadMore() {
                if(!this.lastPage){
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

                this.$http.post('/actionModel/modelListByCom',{
                    type:this.type,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                })
                    .then(function (response) {
                        if(that.enter){
                            that.modelType=response.data.data.content[0].id;
                            that.enter=false;
                        }
                        that.list=that.list.concat(response.data.data.content) ;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }
    }
</script>