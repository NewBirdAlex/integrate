<template>
    <div>
        <div class="jfNav fs30" >
            <span v-for="(item,index) in idList" :key="index" @click="selId(item,index)" :class="{'active':item.sel}">
                {{item.name}}
                <i class="iconfont icon icon-arrLeft-fill"></i>
                <ul v-if="item.showNav" class="black">
                    <li v-for="(obj,index2) in item.subList" @click="selModelType(obj)" :key="index2">{{obj.title}}</li>
                </ul>
            </span>
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
        >
            <li v-for="(item,index) in list2" :key="index" class="marginBottom " >
                <div @click="go(item)" class=" paddingAll bgWhite lh50" >
                    <h4 class="fs30 ">{{item.title}}</h4>
                    <p class="fs26 lh30 littleSpace">{{item.context}}</p>
                    <p class="fs28 littleSpace">
                        积分奖励：<span class="blue">{{item.minuxScore}}-{{item.maxScore}}分</span>
                        <span v-if="item.isOnly==1" class="fr gray">每天一次</span>
                        <span v-if="item.isOnly==2" class="fr gray">每周一次</span>
                        <span v-if="item.isOnly==3" class="fr gray"> 每月一次</span>
                        <span v-if="item.isOnly==4" class="fr gray">每季一次</span>
                        <span v-if="item.isOnly==5" class="fr gray">每年一次</span>
                        <span v-if="item.isOnly==6" class="fr gray"> 无限制 </span>
                        <span v-if="item.isOnly==7" class="fr gray">仅限一次</span>
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
    .jfNav {
        .borderBottom;
        height: 0.8rem;
        span {
            .fl;
            width: 33%;
            .tac;
            height: 0.8rem;
            line-height: 0.8rem;
            display: inline-block;
            position: relative;
            ul{
                position: absolute;
                left:0;
                top:0.81rem;
                width: 100%;
                z-index: 10;
                background: white;
                li{
                    line-height: 0.7rem;
                    .border;
                    border-top:0;
                    .tac;
                }
            }
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
                        sel: false,
                        showNav:false,
                        subList:[]
                    },
                    {
                        type:2,
                        name: '品德积分',
                        sel: false,
                        showNav:false,
                        subList:[]
                    },
                    {
                        type:3,
                        name: '业绩积分',
                        sel: false,
                        showNav:false,
                        subList:[]
                    }
                ],
                typeList:[],
                list2:[],
                num:3,
                modelType:'',
                pageNumber:1,
                pageSize:10,
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
            this.getTypeList();
            this.chooseMissionType();
            this.pageNumber=1;
        },
        methods: {
            selModelType(item){
                  this.modelType=item.id;
                  this.type=item.type;
                  this.goReset=true;
                  this.chooseMissionType();
            },
            serchList(){
                // key word search
                if(!this.searchKeyword) return
                this.goReset=true;
                this.chooseMissionType();
            },
            selId(item) {
                this.searchKeyword = '';
                if(item.sel){
                    item.sel=!item.sel;
                    if(item.showNav){
                        item.sel=!item.sel;
                        item.showNav=false;
                    }else{
                        item.sel=true;
                        item.showNav=true;
                        this.modelType='';

                    }
                }else{
                    this.idList.forEach(function (a) {
                        a.sel = false;
                    })
                    item.sel = true;
                    this.type = item.type;
                    this.modelType = '';
                    this.goReset=true;
                    this.chooseMissionType();
                }
            },
            reset(){
                this.list2=[];
                this.pageNumber=1;
                this.lastPage=false;
            },
            chooseMissionType(){
                let that = this;
                if(that.goReset){
                    that.reset();
                    that.goReset=false;
                }
                this.$http.post('/actionList/getActionListByCompany',{
                    modelType: this.modelType,
                    type:this.type,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    title:this.searchKeyword
                })
                    .then(function (response) {

                        that.pageNumber+=1;
                        that.list2=that.list2.concat(response.data.data.content)
                        if(response.data.data.last){
                            that.lastPage=true;
                        }

                        that.loading = false;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            go(item){

                this.$router.push('/apply/'+item.id+'/'+this.type+'/fasle');
            },
            loadMore() {
                if(!this.lastPage){
                    this.chooseMissionType();
                    this.loading = true;
                }else{
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getTypeList(){
                let that = this;
                this.$http.post('/actionModel/modelListByCom',{
                })
                    .then(function (response) {
                        response.data.data.content.forEach(item=>{
                            switch (item.type){
                                case 1:
                                    that.idList[0].subList.push(item);
                                    break;
                                case 2:
                                    that.idList[1].subList.push(item);
                                    break;
                                case 3:
                                    that.idList[2].subList.push(item);
                                    break;
                            }
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }
    }
</script>