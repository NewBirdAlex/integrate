<template>
    <div>
        <div class="top  fs30 tac">
            <span :class="{'active':chooseNum==0}" @click="chooseNum=0">内勤</span>
            <span :class="{'active':chooseNum==1}" @click="chooseNum=1">外勤</span>
        </div>
        <div class="bgWhite paddingAll overflow borderBottom">
            <img src="../assets/img/head.png" class="headPicture fl marginRight" alt="">
            <div class="fl lh">
                <p class="fs30"><strong>李晓露</strong></p>
                <p class="fs28 gray">设计部</p>
            </div>
            <div class="fr tm" @click="openDate">
                2012 10 38
                <span class=" fr">
                    <i class="icon iconfont icon-xiala1 "></i>
                </span>
            </div>
        </div>
        <!--date-->
        <mt-datetime-picker
                v-model="pickerVisible"
                type="date"
                ref="picker"
                @confirm="handleConfirm"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>

        <div class="paddingAll bgWhite">
            <div class="inf  bgWhite ">
                <p>上班时间  09:00</p>
                <p><span class="btn">已打卡</span>  <span class="btn">正常上班</span></p>
                <p class="gray">打卡时间  08:56</p>
                <span class="type">上</span>
            </div>
        </div>
        <div class="marginTop mpwrap">
            <div id="allmap"></div>
            <div class="bwp">
                <div class="ckbtn">
                    <p>下班打卡
                    </p>
                    <p>{{time}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .tm{
        padding: 0.2rem;
        background-color: rgba(221, 241, 255, 1);
        border-radius: 6px 6px 6px 6px;
        color: #338ecc;
    }
    .bwp{
        padding: 0.2rem;
        border-radius: 50%;
        background-color: rgba(162, 242, 235, 1);
        border:1px solid #a2f2eb;
        margin: 0.2rem auto;
        .tac;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
    }
    .ckbtn{
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
            transform: translate(-50%,-50%);
            background: @gray;
            color:white;
            border-radius: 50%;
            padding: 0.1rem;
            width: 0.3rem;
            height: 0.3rem;
            .tac;
            line-height: 0.3rem;
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
    import {MP} from '../lib/mp.js'

    let timer = null;
    export default {
        data() {
            return {
                chooseNum:0,
                ak:'jzbCq3Pg2pZ0wb2A5c6weIO62n2fdlh3',
                pickerVisible:'',
                time:''
            }
        },
        methods:{
            handleConfirm(msg){
                console.log(msg)
            },
            openDate(){
                this.$refs.picker.open();
            },
            countTime(){
                //打卡时间
                let that = this;

                timer = setInterval(function () {
                    let now = new Date();
                    var time = now.getHours()+':'+now.getMinutes()+":"+now.getSeconds();
                    that.time = time;
                },1000)
            }
        },
        mounted(){

            this.countTime();

            var _this = this;
            MP(_this.ak).then(BMap => {
                //在此调用api
                // 百度地图API功能
                var map = new BMap.Map("allmap");

                var point = null;
                //定位
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    point = new BMap.Point(r.point.lng,r.point.lat);
                    map.centerAndZoom(point,16);
                },{enableHighAccuracy: true})

            });
        },
        beforeDestroy(){
            clearInterval(timer);
        }
    }
</script>