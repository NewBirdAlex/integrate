<template>
    <div>
        <!--//pick time-->
        <mt-datetime-picker
                v-model="pickerVisible"
                type="date"
                ref="picker"
                @confirm="handleConfirm"
                :startDate="new Date(new Date().getFullYear() - 3, 0, 1)"
                :endDate="new Date()"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>

        <div class="marginAll marginTop border borderRadius bgWhite">
            <div class="subt">
                <i class="icon iconfont icon-jifen1 blue"></i>
                <span class="gray">{{des}}</span>
                <span class="fr gray" @click="openPicker"> {{selTime||'选择时间'}}
                </span>

            </div>
            <div class=" rbtn marginTop">
                <span class="fr">
                    扣分
                    <mt-switch v-model="koufen" class="fr"></mt-switch>
                </span>
                <span class="fr marginRight">
                    奖分
                    <mt-switch v-model="jiangli" class="fr"></mt-switch>
                </span>


            </div>
            <myEmpty v-if="!list.length" value="搜索不到积分动态"></myEmpty>
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
                                    <!--<img :src="item.approvePics.split(',')"  alt="">-->
                                    <scaleImg :imgList="item.approvePics.split(',')"></scaleImg>
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

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .rbtn{
        line-height: 0.6rem;
        /*position: absolute;*/
        right: 0.2rem;
        top:0.2rem;
        overflow: hidden;
    }
    .loadmore{
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
    .subt{
        font-size: @fs28;
        padding:0.3rem 0;
        margin: 0 0.2rem;
        position: relative;
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
    import scaleImg from '../components/scaleImg.vue'
    export default {
        data() {
            return {
                selTime:'',
                pickerVisible:'',
                jiangli:false,
                koufen:false,
                pickerVisible:'',
                list:[],
                num:3,
                pageNumber:1,
                lastPage:false,
                loading:false
            }
        },
        watch:{
            selTime(){
                this.reset();
                let that = this;
                setTimeout(()=>{that.getList()},100)
            },
            jiangli(val){
                val?this.koufen=false:'';
                this.reset();
                this.getList();
            },
            koufen(val){
                val?this.jiangli=false:'';
                this.reset();
                this.getList();
            }
        },
        computed: {
            title(){
                return this.des;
            },
            ...mapGetters([
                'userMessage',
            ])
        },
        props:{
            des:{
                type:String,
                default:'积分动态'
            }
        },
        components:{
            scaleImg
        },
        mounted(){
            this.getList();
        },
        methods:{
            reset(){
                this.pageNumber=1;
                this.lastPage=false;
                this.list=[];
            },
            handleConfirm(data){
                this.selTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();

            },
            loadMore() {
                if(!this.lastPage){
                    this.loading = true;
                    this.getList();
                }else{
                    this.$toast({
                        message: '已加载全部数据',
                        duration: 2000
                    });
                }
            },
            getList(){
                let that = this;
                let type ='';
                if(this.jiangli) type=1;
                if(this.koufen) type=2;
                if( !this.jiangli&&!this.koufen) type=0;
                this.$http.post('/approveRecord/userRecordList',{
                    pageNumber: this.pageNumber,
                    pageSize: 10,
                    type:type,
                    selectDate:this.selTime,
                    userId:this.$route.params.id
                })
                    .then(function (response) {
                        if(that.lastPage) return
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