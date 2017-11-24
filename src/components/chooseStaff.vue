<template>
    <div :class="{'hidelogo':hide}" >
        <div >
            <div class="marginTop paddingAll bgWhite fs30 borderBottom" id="selectPeople" @click="showStaff=!showStaff">
                <strong>选择员工</strong>
                <span class="fr rightArrow"><i class="icon iconfont icon-xiala1 gray"></i></span>
            </div>
            <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated bounceOutLeft"
            >
                <div class="wrap" v-if="showStaff">
                    <div class="search paddingAll">
                        <div class="left" @click="showOption=!showOption">
                            筛选员工
                            <span class="triangle-down"></span>
                        </div>
                        <div class="right bgWhite">
                            <i class="icon iconfont icon-sousuo"></i>
                            <input type="text" placeholder="搜索" v-model="keyWord" @keyup="keywordSearch">
                        </div>
                        <div style="clear: both"></div>
                        <transition
                                name="custom-classes-transition"
                                enter-active-class="animated bounceInDown"
                                leave-active-class="animated bounceOutUp"
                        >
                            <div class="option" v-show="showOption">
                                <div class="overflow bgWhite">
                                    <div class="ol">
                                        <div class="" @click="showApartment=true"><i class="icon iconfont icon-renwu"></i>部门</div>
                                        <div class="" @click="showApartment=false"><i class="icon iconfont icon-zhiwei"></i>职位</div>
                                    </div>
                                    <div class="or tac">
                                        <mt-loadmore  :bottom-method="apartmenloadBottom" :bottom-all-loaded="apartmentallLoaded" ref="loadapartment">
                                            <ul class="apartmentList">
                                                <li v-for="(item,index) in apartMentList" :key="index" v-if="showApartment" @click="chooseApartment(item)">
                                                    <div>{{item.name}}</div>
                                                </li>
                                                <li v-for="(item,index) in jobList" :key="index" v-if="!showApartment" @click="chooseApartment(item)">
                                                    <div>{{item.jobTitle}}</div>
                                                </li>
                                            </ul>
                                        </mt-loadmore>

                                    </div>
                                </div>

                            </div>
                        </transition>
                    </div>

                    <div class="bgWhite listWrap" :style="{height:listWrap}">

                        <myEmpty value="搜索不到员工" v-if="!staffList.length"></myEmpty>
                        <!--load more-->
                        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                            <ul>
                                <li v-for="(item,index) in staffList" :key="index">
                                    <div class="list overflow paddingAll borderBottom">
                                        <img :src="item.userAvatar" v-if="item.userAvatar" class="marginRight headPicture fl" alt="">
                                        <img src="../assets/img/defaultHead.png" v-else  class="marginRight headPicture fl" alt="">
                                        <div class="fl">
                                            <p class="fs36 ">{{item.userName}}</p>
                                            <p class="gray marginTop">{{item.departmentName}}</p>
                                        </div>
                                        <span class="cl" :class="{'border':!item.pick}" @click="choosePeople(item,index)">
                                        <i class="icon iconfont icon-gouxuan blue" v-if="item.pick"></i>
                                    </span>
                                    </div>

                                </li>
                            </ul>

                        </mt-loadmore>
                    </div>
                    <div class="obtn bgWhite">
                        <div class="" @click="cancel">取消</div>
                        <div class="active" @click="outputData">确认</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>

</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wrap{
        position: relative;
        z-index: 1000;
    }
    .hidelogo{
        height: 1px;
        position: relative;
        overflow: hidden;
        #selectPeople{
            position: absolute;
            left:200%;
        }
    }

    .apartmentList{
        height: 7rem;
        overflow: scroll;
        li{
            padding: 0.3rem 0;
            .borderBottom;
            .fs30;
        }
    }
    .listWrap {
        height: calc(~"100% - 2rem");
        overflow: scroll;
    }

    .obtn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        .tac;
        div {
            margin-top: 0.3rem;
            width: 40%;
            margin: 0.1rem 0.3rem;
            line-height: 0.6rem;
            display: inline-block;
            .border;
            .borderRadius;
            &.active {
                background: @blue;
                color: white;
            }
        }
    }

    .option {
        position: fixed;
        left: 0;
        top: 1rem;
        height: 100%;
        width: 100%;
        /*padding-top: 1rem;*/
        background: rgba(0,0,0,0.4);
        z-index: 100;
//        .bgWhite;
        overflow: hidden;
        .ol {
            width: 40%;
            background: white;
            .fl;
            text-indent: 2em;
            i {
                .fs36;
                .marginRight;
                position: relative;
                top:-2px;
            }
            div {
                padding: 0.3rem 0;
                .borderBottom;
                .fs30;

            }
        }
        .or {
            width: 60%;
            box-sizing: border-box;
            padding-top: 0.08rem;
            .border;
            .bgWhite;
            border-right: none;
            .fl;
        }
    }

    .cl {
        .fr;
        width: 0.4rem;
        height: 0.4rem;
        .tac;
        line-height: 0.4rem;
        margin-top: 0.2rem;
        border-radius: 50%;
        .icon {
            font-size: 0.4rem;

        }
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 1;
        .grayBg;
    }

    .search {
        .borderBottom;

        position: relative;
        .left {
            width: 2rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right {
            .fl;
            width: 5rem;
            text-indent: 1em;
            padding: 0.1rem 0;
            .borderRadius;
            input {
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
                apartmentallLoaded:false,
                allLoaded: false,
                showOption: false,
                listWrap: '',
                showStaff: false,
                pageNumber: 1,
                pageSize: 20,
                apartmentNum:1,
                apartmentSize:20,
                lastPage: false,
                showApartment:true,//click show apartment or joblist
                keyWord: '',
                departmentId: '',
                jobId: '',
                jobList:[],
                staffList: [],
                apartMentList:[],
                apartmentLast:false
            }
        },
        computed: {
            wrapStyle() {
                if (this.showStaff) {
                    return {
                        "z-index": '10',
                        'opacity': '1',
                        'top': '0'
                    }
                } else {
                    return {
                        "z-index": '-10',
                        'opacity': '0',
                        'top': '100rem'
                    }
                }
            }
        },
        props: {
            hide:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            keywordSearch(){
                this.reset();
                this.getStaff();
            },
            apartmenloadBottom(){
                if(!this.apartmentLast){
                    this.apartmentNum +=1;
                    if(this.showApartment){
                        this.getApartment();
                    }else{
                        this.getJobList();
                    }

                }else{
                    this.apartmentallLoaded = true;
                }
            },
            getApartment(){
                let that = this;
                this.$http.post('/companyUser/departmentList', {
                    pageNumber: this.apartmentNum,
                    pageSize: this.apartmentSize,
                })
                    .then(function (response) {
                        console.log(response)
                        that.apartMentList = that.apartMentList.concat(response.data.data.content) ;
                        if(response.data.data.last){
                            that.apartmentLast = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            loadBottom() {
                // 加载更多数据
                if(this.lastPage){
                    this.$toast({
                        message: '已加载全部员工',
                        duration: 2000
                    });
                }else{
                    this.getStaff();
                    this.$refs.loadmore.onBottomLoaded();
                }
            },
            outputData() {
                //返回员工
                let arr = [];
                this.staffList.forEach(item=>{
                    if(item.pick){
                        arr.push(item)
                    }
                })
                this.$emit('getData',arr);
                this.staffList.forEach(item=>item.pick=false)
                this.showStaff = !this.showStaff;
            },
            choosePeople(item,index){
                item.pick = !item.pick;
                this.$set(this.staffList,index,item)
            },
            cancel(){
                this.staffList.forEach(item=>item.pick=false);
                this.showStaff = !this.showStaff;
            },
            reset(){
                this.staffList=[];
                this.departmentId='';
                this.jobId='';
                this.pageNumber=1;
            },
            chooseApartment(item){
                this.showOption=false;
                this.reset();
                if(this.showApartment){
                    this.departmentId=item.id;

                }else{
                    this.jobId=item.id;
                }
                this.getStaff();
            },
            getJobList(){
                let that = this;
                this.$http.post('/job/listJob', {
                    pageNumber: this.apartmentNum,
                    pageSize: this.apartmentSize,
                })
                    .then(function (response) {
                        that.jobList = that.jobList.concat(response.data.data.content)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getStaff() {
                let that = this;
                this.$http.post('/user/userList', {
                    departmentId: this.departmentId,
                    jobId: this.jobId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    sortOrder: "asc",
                    sortType: "id",
                    userName: this.keyWord
                })
                    .then(function (response) {
                        that.allLoaded = false;
                        that.staffList = that.staffList.concat(response.data.data.content) ;
                        that.staffList.forEach(item=>item.pick=false);// click or not
                        if (response.data.data.last) {  //no more data
                            that.lastPage = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getStaff();
            this.getApartment();
            this.getJobList();
        }
    }
</script>