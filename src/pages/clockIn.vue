<template>
    <div>
        <!--<div class="top  fs30 tac">-->
            <!--<span :class="{'active':chooseNum==0}" @click="chooseNum=0">内勤</span>-->
            <!--<span :class="{'active':chooseNum==1}" @click="chooseNum=1">外勤</span>-->
        <!--</div>-->
        <div class="bgWhite paddingAll overflow borderBottom">
            <img src="../assets/img/head.png" class="headPicture fl marginRight" alt="">
            <div class="fl lh" style="padding-top: 0.1rem">
                <p class="fs30"><strong>{{userMessage.userName}}</strong></p>
                <p class="fs28 gray">{{userMessage.departmentName||'暂无考勤组'}}</p>
            </div>
            <div class="fr tm" @click="openDate">
                <span v-if="rightTime">{{rightTime}}</span>
                <span v-else>{{now}}</span>
                <i class="icon iconfont icon-xiala fs26"></i>
                <!--<input type="date" v-model="time" class="timepicker">-->
            </div>
        </div>

        <!--date-->
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

        <div class="paddingAll bgWhite">
            <div class="inf  bgWhite " >
                <p class="fs30 lh50">上班时间  {{startTime}}</p>
                <p v-if="checkList[0]"><span class="btn">{{checkList[0].checkDesc}}</span>  <span class="btn">{{checkList[0].tip}}</span></p>
                <p class="gray" v-if="checkList[0]">打卡时间  {{checkList[0].checkTime}}</p>
                <p v-else class="gray">无打卡信息</p>
                <span class="type " :class="{'active':checkList[0]}">上</span>
            </div>
            <div class="inf  bgWhite marginTop" >
                <p class="fs30 lh50">下班时间  {{endTime}}</p>
                <p v-if="checkList[1]"><span class="btn" >{{checkList[1].checkDesc}}</span>  <span class="btn">{{checkList[1].tip}}</span></p>
                <p class="gray" v-if="checkList[1]">打卡时间  {{checkList[1].checkTime}}</p>
                <p v-else class="gray">无打卡信息</p>
                <span class="type " :class="{'active':checkList[1]}">下</span>
            </div>
            <!--<myEmpty value="没有考勤数据" v-if="!checkList.length"></myEmpty>-->
        </div>
        <div class=" mpwrap">
            <!--baidu map-->
            <!--<div id="allmap"></div>-->
            <baidu-map class="map" :ak="ak" :center="center" :zoom="zoom" @ready="handler">
                <bm-geolocation
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :autoLocation="true"
                        ref="myLocation"
                        id="myLocation"
                        @locationSuccess="getLocation"
                        @locationError="getLocationFail"
                >
                </bm-geolocation>
            </baidu-map>
            <div style="padding:1rem 0" >
                <div class="bwp" :class="{'blackBg':!couldClick}" @click="checkIn" >
                    <div class="ckbtn" :class="{'grayBg':!couldClick}">
                        <p>打卡</p>
                        <p>{{time.h|addZero}}:{{time.m|addZero}}:{{time.s|addZero}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .blackBg{
        background: #ccc!important;
    }
    .grayBg{
        background: #ccc!important;
    }

    .map{
        width: 100%;
        height: 4rem;
    }
    .tm{
        padding: 0.2rem;
        background-color: rgba(221, 241, 255, 1);
        border-radius: 6px 6px 6px 6px;
        color: #338ecc;
        position: relative;
    }
    .bwp{
        position: relative;
        border-radius: 50%;
        background-color: rgba(162, 242, 235, 1);
        /*border:1px solid #a2f2eb;*/
        margin: 0.2rem auto;
        .tac;
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2rem;
    }
    .ckbtn{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: rgba(51, 214, 208, 1);
        .tac;
        color:white;
        .fs30;
        display: inline-block;
        vertical-align: middle;
        line-height: 0.3rem;
        p{
            &:first-child{margin-top: 0.7rem}
        }
    }
    .mpwrap{
        background-color: rgba(239, 250, 250, 1);
    }
    #allmap{
        height: 4rem;
    }
    .inf{
        position: relative;
        border-left:@border;
        line-height: 0.4rem;
        padding:0 0.4rem;
        .marginLeft;
        .btn{
            padding: 0.1rem 0.2rem;
            background-color: rgba(211, 252, 251, 1);
            color:#22b2ad;
            .borderRadius;
            margin: 0.2rem;
            display: inline-block;

        }
        .type{
            position: absolute;
            left: 0;
            top:0;
            transform: translate(-50%);
            background: @gray;
            color:white;
            border-radius: 50%;
            padding: 0.1rem;
            width: 0.3rem;
            height: 0.3rem;
            .tac;
            line-height: 0.3rem;

        }
        .active{
            background: @blue;
            color:white;
        }
    }
    .lh{
        line-height: 0.4rem;
    }
    .top{
        .active{
            .blue;
            border-bottom: 1px solid @blue;
        }
        .borderBottom;
        span{
            display: inline-block;
            width: 40%;
            .paddingAll;
        }
    }
</style>
<script>
//    import {MP} from '../lib/mp.js'
    import {BaiduMap,BmGeolocation} from 'vue-baidu-map'

    let timer = null;
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                time:'',
                chooseNum:0,
                rightTime:'',
                ak:'jzbCq3Pg2pZ0wb2A5c6weIO62n2fdlh3&s=1',
                center: {lng: 0, lat: 0},
                zoom: 15,
                pickerVisible:'',
                //submit params
                checkAddress:'',
                checkPics:'',
                checkRemark:'',
                latitude:'',
                longitude:'',
                checkList:[],
                startTime:'',
                endTime:'',
                couldClick:false,
                //submit params
                time:{
                    h:'',
                    m:'',
                    s:''
                }
            }
        },
        computed:{
            now(){
                let data = new Date();
                return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
            },
            ...mapGetters([
                'userMessage',
            ])
        },
        methods:{
            getLocation(location){
                this.couldClick = true;
                this.latitude = location.point.lat;
                this.longitude = location.point.lng;
                let address = location.addressComponent;
                this.checkAddress =address.city+address.district+address.province+address.street+address.streetNumber;
            },
            getLocationFail(status){
                console.log(status)
            },
            checkIn(){
                if(!this.couldClick) return;
                this.couldClick = false;
                let that = this;
                this.$http.post('/dailyCheck/userCheck', {
                    checkAddress: this.checkAddress,
                    checkPics: this.checkPics,
                    checkRemark: this.checkRemark,
                    latitude: String(this.latitude),
                    longitude: String(this.longitude),
                })
                    .then(function (response) {
                        if(response.data.code!='200000') return
                        that.$toast('成功打卡，元气满满');
                        that.getClockIn();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handler({BMap, map}){
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15

            },
            handleConfirm(data){
                this.checkList=[];
                this.selectTime=true;
                this.rightTime = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
                this.getClockIn();
            },
            openDate(){
                this.$refs.picker.open();
            },
            countTime(){
                //打卡时间
                let that = this;

                timer = setInterval(function () {
                    let nowDate = new Date();
                    that.time.h=nowDate.getHours();
                    that.time.m=nowDate.getMinutes();
                    that.time.s=nowDate.getSeconds();
                },1000)
            },
            getClockIn(){
                //check clock in information
                let that = this;
                this.$http.post('/dailyCheck/getCheckDetail', {
                    selectTime:this.rightTime
                })
                    .then(function (response) {
                        that.checkList = response.data.data.checkList;
                        that.startTime = response.data.data.startTime;
                        that.endTime = response.data.data.endTime;
                        console.log(that.rightTime)
                        console.log(that.now)
                        if(that.rightTime!=that.now&&that.rightTime){
                            //today or not
                            setTimeout(function(){that.couldClick=false;},500)
                        }else{
                            that.checkList.length==2?that.couldClick=false:that.couldClick=true;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components: {
            BaiduMap,
            BmGeolocation
        },
        mounted(){
            let that = this;
            this.countTime();
            this.getClockIn();
            setTimeout(function(){
                document.getElementsByClassName('BMap_geolocationIcon')[0].click();
            },1000)
        },
        beforeDestroy(){
            clearInterval(timer);
        }
    }
</script>