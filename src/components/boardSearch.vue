<template>
    <div>
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                筛选
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="输入搜索人名字"  @input="$emit('input', $event.target.value)" :value="value">
            </div>
            <div style="clear: both"></div>
            <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated bounceOutLeft"
            >
                <div class="option " v-if="showOption">
                    <div class="paddingAll calcHeight">
                        <div v-if="type!=2">
                            <p class="subt">时间段</p>
                            <div class="overflow">
                                <span class="btn" @click="pickTime(true)">{{startTime}}</span>
                                <span class="btn " @click="pickTime(false)">{{endTime}}</span>
                            </div>
                        </div>
                        <div >
                            <p class="subt">部门</p>
                            <div class="overflow">
                                <span class="btn"  :class="{'active':item.active}" v-for="(item,index) in apartMentList" :key="index" @click="selectApartment(item,index)">{{item.name}}</span>
                            </div>
                        </div>
                        <div>
                            <p class="subt">职位</p>
                            <div class="overflow">

                                <span class="btn"  :class="{'active':item.active}" v-for="(item,index) in jobList" :key="index" @click="selectJob(item,index)">{{item.jobTitle}}</span>
                            </div>
                        </div>
                        <div v-if="type!=2">
                            <p class="subt">积分</p>
                            <div class="overflow">
                                <span class="btn" :class="{'active':item.active}" v-for="(item,index) in jfType" @click="selectType(item)">{{item.name}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="tac cbtn overflow"  style="margin-top: 1rem">
                        <span class="fl" @click="reset">重置</span>
                        <span class="fr blueBg" @click="subData">确认</span>
                    </div>
                </div>
            </transition>

        </div>
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
    .cbtn {
        position: fixed;
        background: white;
        bottom: 0;
        left:0;
        width: 100%;
        span {
            display: inline-block;
            width: 40%;
            line-height: 0.7rem;
            .border;
            .borderRadius;
            margin: 0.3rem;
        }
    }
    .option {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        z-index: 10;
        .bgWhite;
        .calcHeight{
            padding-bottom: 1.5rem;
        }
        .subt {
            line-height: 0.5rem;
            font-size: @fs30;
        }
        .btn {
            .fl;
            padding: 0.2rem 0.4rem;
            .border;
            margin: 0.1rem 0.2rem;
            &.active {
                background: @blue;
                color: white;
            }
        }
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
                inputVal:'',
                showOption: false,
                startTime:'选择开始时间',
                pickerVisible:'',
                apartmentNum:1,
                apartmentSize:1000,
                apartMentList:[],
                jobList:[],
                timePosition:true,
                endTime:'选择结束时间',
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
                ]
            }
        },
        computed:{

        },

        methods:{
            reset(){
              this.startTime='选择开始时间';
              this.endTime='选择结束时间';
              this.apartMentList.forEach(item=>item.active=false)
              this.jobList.forEach(item=>item.active=false)
              this.jfType.forEach(item=>item.active=false)
            },
            pickTime(data){
                this.timePosition=data;
                this.$refs.picker.open();
            },
            handleConfirm(data){
                console.log(data)
                if(this.timePosition){
                    this.startTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
                }else{
                    this.endTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();

                }
            },
            subData(){
                //submit the search data
                let obj = {}
                if(this.startTime!='选择开始时间') obj.startTime = this.startTime;
                if(this.endTime!='选择结束时间') obj.endTime = this.endTime;
                this.apartMentList.forEach(item=>{
                    if(item.active){
                        obj.apartment = item;
                    }
                })
                this.jobList.forEach(item=>{
                    if(item.active){
                        obj.job = item;
                    }
                })
                this.jfType.forEach(item=>{
                    if(item.active){
                        obj.type = item;
                    }
                })


                this.$emit('getData',obj)
                this.showOption=false;
            },
            getApartment(){
                let that = this;
                this.$http.post('/companyUser/departmentList', {
                    pageNumber: this.apartmentNum,
                    pageSize: this.apartmentSize,
                })
                    .then(function (response) {
                        console.log(response)
                        that.apartMentList =response.data.data.content ;
                        that.apartMentList.forEach(item=>item.active=false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getJob(){
                let that = this;
                this.$http.post('/job/listJob', {
                    pageNumber: this.apartmentNum,
                    pageSize: this.apartmentSize,
                })
                    .then(function (response) {
                        console.log(response)
                        that.jobList =response.data.data.content ;
                        that.jobList.forEach(item=>item.active=false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
            selectType(item){
                this.jfType.forEach(item=>item.active=false)
                item.active=true;
            }
        },
        props:{
            value:{
                type:String
            },
            type:{
                type:Number,
                default:1
            }
        },
        mounted(){
            console.log(document.documentElement.clientHeight)
            this.getApartment();
            this.getJob();
        }
    }
</script>