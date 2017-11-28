<template>
    <div class="searchWrap bgWhite">
        <!--<span @click="showOptions=!showOptions">筛选 <i class="icon iconfont icon-arrLeft-fill gray"></i></span>-->
        <span>选择条件</span>
        <span v-for="(item,index) in searchType" :key="index" :class="{'blue':item.active}" @click="changeType(item)">{{item.name}}</span>
        <span class="fr lastSpan" @click="showSearch=!showSearch"> <i class="icon iconfont icon-sousuo fs36 gray"></i></span>

        <transition
                name="custom-classes-transition"
                enter-active-class="animated slideInDown"
                leave-active-class="animated  slideOutUp"
        >
            <div class="inside" v-if="showSearch">
                <i class="icon iconfont icon-sousuo fs36 gray"></i>
                <input type="text" class="myInput" placeholder="输入搜索内容" v-model="keyWord">
                <span class="blue" @click="confirm">确定</span>
            </div>
        </transition>
        <transition
                name="custom-classes-transition"
                enter-active-class="animated slideInLeft"
                leave-active-class="animated  slideOutLeft"
        >
            <div class="options" v-if="showOptions">
                <div class="inner">
                    <div class="topBtn">
                        <span v-for="(item,index) in shaixuan" :class="{'blue':item.active}">{{item.name}} <i class="icon iconfont icon-arrLeft-fill gray" :class="{'blue':item.active}"></i></span>
                    </div>

                    <div class="overflow marginBottom fs26" v-if="showShaiXuan==0">
                        <span class=" opBtn" @click="pickTime(true)">{{startTime}}</span> - <span class="opBtn" @click="pickTime(false)">{{endTime}}</span>
                    </div>
                    <div class="overflow marginBottom fs26" v-if="showShaiXuan==1">
                        <span class=" opBtn " :class="{'activeBtn':item.active}" v-for="(item,index) in apartMentList" :key="index" @click="selectApartment(item,index)">{{item.name}}</span>
                    </div>
                    <div class="overflow marginBottom fs26" v-if="showShaiXuan==2">
                        <span class=" opBtn " :class="{'activeBtn':item.active}" v-for="(item,index) in jobList" :key="index" @click="selectJob(item,index)">{{item.jobTitle}}</span>
                    </div>
                    <div class="overflow marginBottom fs26" v-if="showShaiXuan==3">
                        <span class=" opBtn " :class="{'activeBtn':item.active}" v-for="(item,index) in jfType" @click="selectType(item)">{{item.name}}</span>
                    </div>
                    <div class="confirm">
                        <span  @click="reset">重置</span>
                        <span class="activeBtn">确定</span>
                    </div>
                </div>
            </div>
        </transition>
        <mt-datetime-picker
                v-model="pickerVisible"
                type="date"
                ref="picker"
                :startDate="new Date(new Date().getFullYear() - 3, 0, 1)"
                :endDate="new Date()"
                @confirm="handleConfirm"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .topBtn{
        .overflow;
        span{
            .fl;
            width: 25%;
            .tac;
            padding:0.2rem 0;
            .fs28;
            i{vertical-align: middle;}
        }
    }
    .icon{vertical-align: bottom}
    .searchWrap{
        position: relative;
        .paddingAll;
        .lh40;
        >span{
            margin-right: 0.45rem;
            font-weight: bold;
            .fs30;
        }
        .lastSpan{
            .tac;
            display: inline-block;
            width: 1rem;
            border-left: @border;
            margin-right: 0;
        }
        .inside{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            .bgWhite;
            line-height: 100%;
            .overflow;
            line-height: 1rem;
            /*transition: all 1s ease-in-out;*/
            /*transform: translate(100%);*/
            .icon{
                margin-left: 0.2rem;
                .marginRight;
            }
            input{
                width: 5rem;
                vertical-align: middle;
                position: relative;
                top:-0.1rem;
                margin-left: 0.5rem;
                .fs30;
            }
        }
        .move{
            transform: translate(0);
        }
    }
    .options{
        position: fixed;
        left:0;
        top:0;
        z-index: 10;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        .inner{
            height: 60vh;
            overflow: hidden;
            top:1rem;
            .bgWhite;
            .paddingLeft;
            .paddingRight;
            position: relative;
            .opBtn{
                color: #646464;
                .tac;
                .marginTop;
                .marginRight;
                display: inline-block;
                padding:0.2rem 0.4rem;
                background-color: #f0f0f0;
                border-radius: 6px;
            }
            .confirm{
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                span{
                    width: 40%;
                    line-height: 0.8rem;
                    color:@blue;
                    .fl;
                    .tac;
                    .fs36;
                    background-color: #e5f5ff;
                    &:nth-child(2){
                        width: 60%;
                        .activeBtn;
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                showShaiXuan:1,
                shaixuan:[
                    {
                        name:'时间段',
                        active:false,
                    },{
                        name:'部门',
                        active:true,
                    },{
                        name:'职位',
                        active:false,
                    },{
                        name:'积分类型',
                        active:false,
                    },
                ],
                pickerVisible:'',
                showOptions:false ,
                showSearch:false,
                keyWord:'',
                jfType:[
                    {
                        name:'全部',
                        active:false,
                        value:0
                    },
                    {
                        name:'品德A分',
                        active:false,
                        value:1
                    },{
                        name:'业绩B分',
                        active:false,
                        value:2
                    },{
                        name:'行为C分',
                        active:false,
                        value:3
                    },{
                        name:'A/B分',
                        active:false,
                        value:5
                    },{
                        name:'A/C分',
                        active:false,
                        value:6
                    },{
                        name:'B/C分',
                        active:false,
                        value:7
                    },{
                        name:'A-B-C分',
                        active:false,
                        value:8
                    },{
                        name:'基础积分',
                        active:false,
                        value:4
                    }
                ],
                searchType:[
                    {
                        type:1,
                        name:'按日',
                        active:true
                    },{
                        type:2,
                        name:'按月',
                        active:false
                    },{
                        type:3,
                        name:'按季',
                        active:false
                    },{
                        type:4,
                        name:'按年',
                        active:false
                    },
                ],
                jobList:[],
                jobNum:1,
                jobSize:20,
                timePosition:true,
                startTime:'选择开始时间',
                endTime:'选择结束时间',
                apartMentList:[]
            }
        },
        computed:{

        },

        methods:{
            handleConfirm(data){
                if(this.timePosition){
                    this.startTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
                }else{
                    this.endTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();

                }
            },
            pickTime(data){
                this.timePosition=data;
                this.$refs.picker.open();
            },
            reset(){
                this.startTime='选择开始时间';
                this.endTime='选择结束时间';
                this.apartMentList.forEach(item=>item.active=false)
                this.jobList.forEach(item=>item.active=false)
                this.jfType.forEach(item=>item.active=false)
            },
            selectApartment(item,index){

                this.apartMentList.forEach(item=>item.active=false)
                item.active=true;
                this.$set( this.apartMentList,index,item);
            },
            selectJob(item,index){
                this.jobList.forEach(item=>item.active=false)
                item.active=true;
                this.$set( this.jobList,index,item);
            },
            getApartment(){
                let that = this;
                this.$http.post('/companyUser/departmentList', {
                    pageNumber: this.apartmentNum,
                    pageSize: this.apartmentSize,
                })
                    .then(function (response) {
                        console.log(response)
                        response.data.data.content.forEach(item=>item.active=false);
                        that.apartMentList =response.data.data.content ;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getJob(){
                let that = this;
                this.$http.post('/job/listJob', {
                    pageNumber: this.jobNum,
                    pageSize: this.jobSize,
                })
                    .then(function (response) {
                        if(response.data.code==200000){
                            that.jobList =response.data.data.content ;
                            that.jobList.forEach(item=>item.active=false)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            selectType(item){
                this.jfType.forEach(item=>item.active=false)
                item.active=true;
            },
            confirm(){
                this.showSearch=false;
                this.submitData();
                this.keyWord='';
            },
            submitData(){
                let obj = {
                    keyWord:this.keyWord
                };
                this.searchType.forEach(item=>{
                    if(item.active) obj.type=item.type;
                });
                this.$emit('getData',obj)
            },
            changeType(item){
                this.searchType.forEach(item=>{
                    item.active=false;
                });
                item.active=true;
                this.submitData();
            }
        },
        props:{

        },
        mounted(){
            this.getJob();
            this.getApartment();
        }
    }
</script>