<template>
    <div>
        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-jifen1 blue"></i>
                <span class="gray">积分动态</span>
                <!--<span class="fr" @click="openPicker"> 9月</span>-->
                <span class="rightArrow fr gray">
                    <i class="icon iconfont icon-xiala"></i>
                </span>
            </div>
            <ul
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10">
                <li v-for="(item,index) in list" :key="index">
                    <div class="paddingAll borderBottom">
                        <div class="showdt">
                            <div class="left">
                                <img :src="item.userAvatar" v-if="item.userAvatar" alt="">
                                <img src="../assets/img/defaultHead.png" alt="" v-else >
                            </div>
                            <div class="right">
                                <h4 class="lh40">
                                    <strong>{{item.userName}}</strong>
                                    <span class="fr blue">
                                        <span class="marginAll"><span v-if="item.addScore>0">+</span>{{item.addScore}}</span>
                                        <span v-if="item.scoreType==1">A分</span>
                                        <span v-if="item.scoreType==2">B分</span>
                                        <span v-if="item.scoreType==3">C分</span>
                                        <span v-if="item.scoreType==4">基础分</span>
                                    </span>
                                </h4>
                                <p class="gray lh50">{{item.jobTitle}}</p>
                                <p class="lh50"> <span class="fs30">{{item.approveTitle}}</span></p>
                                <p v-if="item.approveContext">
                                    {{item.approveContext}}
                                </p>
                                <div class="cp" v-if="item.approvePics">
                                    <img :src="item.approvePics.split(',')"  alt="">
                                </div>
                                <p class="gray">
                                    <i class="icon iconfont icon-shijian"></i>
                                    {{item.createDate}}
                                    <!--<span class=" fr ">-->
                                         <!--<i class="icon iconfont icon-aixin-copy"></i>-->
                                        <!--100-->
                                    <!--</span>-->
                                </p>
                            </div>
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

        <!--<mt-datetime-picker-->
                <!--v-model="pickerVisible"-->
                <!--type="date"-->
                <!--ref="picker"-->
                <!--year-format="{value} 年"-->
                <!--month-format="{value} 月"-->
                <!--date-format="{value} 日">-->
        <!--</mt-datetime-picker>-->
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .loadmore{
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
    .subt{
        font-size: @fs28;
        padding:0.3rem 0;
        margin: 0 0.2rem;
        .borderBottom;
        &:nth-child(1){
            margin: 0;
            padding:0.3rem 0.2rem;
        }
    }

    .showdt{
        .borderBottom;
        padding:0.2rem 0;
        .overflow;
        &:last-child{
            border-bottom: none;
        }
        .left{
            width: 1.1rem;
            margin-top: 0.1rem;
            .fl;
            img{
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 50%;
            }
        }
        .right{
            width: 5.5rem;
            .fl;
            line-height: 0.4rem;
            font-size: @fs26;
            h4{font-size: @fs30;}
            .cp{
                .overflow;
                img{
                    float: left;
                    width: 1.6rem;
                    height: 1.6rem;
                    margin: 0.1rem 1.5%;
                }
            }
        }
    }
</style>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                pickerVisible:'',
                list:[],
                num:3,
                pageNumber:1,
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
        methods:{
            loadMore() {
                if(!this.lastPage){
                    this.loading = true;
                    this.getList();
                }else{
                    this.$toast({
                        message: '没有更多数据了',
                        duration: 2000
                    });
                }
            },
            getList(){
                let that = this;
                this.$http.post('/approveRecord/scoreChange',{
                    pageNumber: this.pageNumber,
                    pageSize: 5,
                    sortOrder: "desc",
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

            },
            openPicker() {
                this.$refs.picker.open();
            }
        }
    }
</script>