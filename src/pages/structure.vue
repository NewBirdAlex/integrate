<template>
    <div>
        <div class="paddingAll">

            <div class="bgWhite  search">
                <i class="icon iconfont icon-sousuo gray"></i>
                <input type="text" placeholder="请输入员工名字" v-model="staffName" @input="searchStaff">
            </div>
        </div>
        <div class="paddingAll  bgWhite fs30">
            <span class="blue">联系人</span>
            <span @click="getAllApartment">
                <span class="rightArrow"><i class="icon iconfont icon-xiala1 gray"></i></span>
                <span class="gray">{{userMessage.companyName}}</span>
            </span>
            <span v-for="(item,index) in showApartment" @click="searchFromTitle(item,index)">
                <span class="rightArrow"><i class="icon iconfont icon-xiala1 gray"></i></span>
                <span class="gray">{{item.name}}</span>
            </span>

        </div>
        <!--部门-->
        <div class="marginTop bgWhite fs30">
            <div class="borderBottom paddingAll" v-for="(item,index) in companyApartment" :key="index" @click="selectApartment(item,index)">
                {{item.name}}
                <span class="fr rightArrow">
                   <i class="icon iconfont icon-xiala1 gray"></i>
                </span>
            </div>
        </div>
        <myEmpty value="找不到员工" v-if="!staffList"></myEmpty>
        <ul class=" marginTop"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in staffList" :key="index" class=" bgWhite">
                <div class="borderBottom bgWhite">
                    <div class="overflow paddingAll people fs30 ">
                        <img :src="item.userAvatar" class="headPicture fl marginRight" alt="">
                        <div class="fl">
                            <p> <span style="display: inline-block;width: 2rem">{{item.userName}}</span> <span class="rp" v-if="item.isAdmin">管理员</span></p>
                            <p class="gray">{{item.jobTitle}}</p>
                        </div>
                        <span class="blue fr">{{item.userPhone}}</span>
                    </div>
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
    .people{
        line-height: 0.5rem;
        .rp{
            padding: 0.1rem 0.2rem;
            color: white;
            background: @red;
            border-radius: 0.3rem;
        }
        .blue{
            margin-top: 0.2rem;
        }
    }
    .search{
        padding: 0.2rem;
        .borderRadius;
        i{
            .fs34;
            margin-right: 0.2rem;
            vertical-align: middle;
        }

        input{
            border: none;
            outline: none;
            vertical-align: middle;
            width: 5rem;
        }
    }
</style>
<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                list:[],
                staffName:'',
                showApartment:[],
                pageNumber: 1,
                pageSize: 10,
                lastPage: false,
                loading: false,
                departmentId:0,
                staffList:[],
                companyApartment:[]
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        mounted(){
            this.getApartment();
            this.getManager();
        },
        methods:{
            searchStaff(){
                this.staffList=[];
                this.reset();
                this.getStaff();
            },
            searchFromTitle(item,index){
                if(index+1==this.showApartment.length) {
                    return
                }
                let arr = this.showApartment;
                this.showApartment = [];
                for( let i=0;i<=index;i++){
                    this.showApartment.push(arr[i]);
                }
                this.reset();
                this.getStaff();
            },
            getAllApartment(){
                this.departmentId=0;
                this.loading=false;
                this.reset();
                this.showApartment=[];
                this.getApartment();
                this.getManager();
            },
            selectApartment(item){
                this.showApartment.push(item)
                this.departmentId = item.id;
                this.reset();
                this.getApartment();

                this.getStaff();
            },
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.staffList=[];
            },
            loadMore() {
                if (!this.lastPage) {
                    this.getStaff();
                    this.loading = true;
                } else {
                    this.loading = false;
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getStaff(){
                let that = this;
                this.$http.post('/user/userList', {
                    departmentId :this.departmentId,
                    userName :this.staffName,
                    pageNumber:this.pageNumber,
                    pageSize:this.pageSize
                })
                    .then(function (response) {
                        that.staffList = that.staffList.concat(response.data.data.content)
                        if(response.data.data.last) {
                            that.lastPage=true;
                            that.loading=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getManager(){
                let that = this;
                this.$http.post('/companyUser/getAdminList', {

                })
                    .then(function (response) {
                        that.staffList = response.data.data;
                        that.lastPage=true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getApartment(){
                let that = this;
                this.$http.post('/companyUser/listComUser', {
                    departmentId :this.departmentId,
                    departName:'',
                    pageNumber:1,
                    pageSize:1000
                })
                    .then(function (response) {
                        that.companyApartment = response.data.data.departmentList;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>