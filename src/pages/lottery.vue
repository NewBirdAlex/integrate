<style scoped lang="less">
    @import "../assets/css/common.less";

    .result{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        .inner{
            position: absolute;
            left:50%;
            top:50%;
            .borderRadius;
            .paddingAll;
            transform: translate(-50%,-50%);
            width: 5rem;
            background: url("../assets/img/colorBg.jpg") ;
            background-size: 100% auto;
            color: white;
            .fs36;
            .icon-close48{
                font-size: 0.4rem   ;
            }
            .icon-sad1,.icon-Smile{
                font-size: 1rem;
                color: @yellow;
                margin:0.5rem 0;
                display: inline-block;
            }
            .goon{
                width: 2.80rem;
                height: 0.68rem;
                line-height: 0.68rem;
                display: inline-block;
                .marginTop;
                border-radius: 0.34rem;
                border: solid 2px rgba(255, 166, 156, 1);
            }
        }
    }
    .wp1 {
        background: #fe4237;
    }

    .wp2 {
        background: #e72920;
    }

    @lighYellow: #ffd66b;
    @wdYellow: #ffd66b;
    .wdYellow {
        color: @wdYellow;
        border-bottom: 1px solid #f9625a
    }

    .cjTable {
        width: 6.2rem;
        color: @wdYellow;
        .marginTop;
        margin-left: 0.4rem;
        .lh40;
        td, th {
            padding: 0.1rem 0;
        }
    }

    .title {
        width: 5.80rem;
        height: 0.88rem;
        margin: 0 auto;
        color: #bd1008;
        font-size: 0.36rem;
        .tac;
        line-height: 0.88rem;
        background-color: rgba(255, 214, 107, 1);
        border-radius: 0px 0px 6px 6px;
    }

    .myLottery {
        padding: 0 0.1rem;
    }

    .wrap {
        background: #bd1008;
        padding-bottom: 1rem;
    }

    .spc {
        position: relative;
        padding-bottom: 0.78rem;

        .sanjiao {
            position: absolute;
            bottom: 0rem;
            left: 0;
            transform: translate(-100%);
            width: 0.3rem;
            &:nth-child(2) {
                right: 0;
                left: auto;
                transform: translate(100%);
            }
            &:nth-child(3) {
                bottom: 0;
                left: 0;
                width: 100%;
                transform: translateY(100%);
            }
        }
    }

    .rec {
        margin: 1rem 0.12rem;
        padding: 0.1rem;
        .wp1;
        > div {
            .wp2;
            padding: 0.1rem;
        }
    }

    .roll {
        /*padding: 0.3rem 0.1rem;*/
        padding: 0.3rem 0;
        .tac;
        .overflow;
        .item {
            margin-top: 0.2rem;
            width: 2.1rem;
            border-radius: 0.1rem;
            overflow: hidden;
            height: 2.7rem;
            display: inline-block;
            position: relative;
            img {
                width: 2.1rem;
                height: 2.1rem;
            }
            .paddingAll {
                padding: 0.15rem 0
            }
            .cover {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #f4d48e;
                opacity: 0.6;
            }
        }
        .midSpace {
            margin: 0.2rem 0.18rem 0;

        }
        .img-co{
        	height: 2.1rem;
        	overflow: hidden;
        	background: #fefefe;
        	color: #666;
        	font-size: 1rem;
        	img{
        		min-height: 100%;
        	}
        }
    }

    .midItem{
        position: relative;
        vertical-align: top;
        >div{
            width: 1.8rem;
            height: 1.8rem;
            color: #bd1008;
            margin:0 auto;
            margin-top: 0.45rem;
            .fs30;
            border-radius: 50%;
            background-color: rgba(245, 206, 108, 1);
            position: relative;
            >div{
                width: 1.44rem;
                height: 1.44rem;
                position: absolute;
                left:0.18rem;
                top:0.18rem;
                border-radius: 50%;
                background-color: rgba(255, 214, 107, 1);
                box-shadow: 0px 2px 2px 0px rgba(4, 0, 0, 0.16);
                p:first-child{
                    padding-top: 0.4rem;
                    font-weight: bold;
                    padding-bottom: 0.1rem;
                    padding-bottom: 0.1rem;
                }
            }
        }
    }
    .recode-a-l{
    	tr{
    		display: flex;
    	}
		td{
			flex: 1;
		}
    }
</style>
<template>
    <div class="wrap">
        <div class="top overflow">
            <img src="../assets/img/coujiang.jpg" class="fl w100" alt="">
        </div>
        <div class="paddingTop"></div>
        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius">
            <div class="wp2 spc borderRadius">
                <img src="../assets/img/sanjiao.png" class="sanjiao" alt="">
                <img src="../assets/img/sanjiao2.png" class="sanjiao" alt="">
                <img src="../assets/img/sanjiao3.png" class="sanjiao" alt="">
                <div class="title">我的抽奖</div>
                <table class="cjTable">
                    <tr class="fs30">
                        <td>抽奖主题</td>
                        <td class="tac">排名</td>
                        <td class="tac">抽奖次数</td>
                    </tr>
                    <tr v-for="(t,i) in luckList" class="fs28">
                        <td>{{i+1}}. {{ t.listTitle }}</td>
                        <td class="tac">{{ t.sort }}</td>
                        <td class="tac">{{ t.count }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="rec borderRadius">
            <div class="borderRadius">
                <div class="">
                    <router-link tag="div" to="/lotteryRec" class="paddingTop paddingRight paddingBottom borderBottom fs30 wdYellow">
                        	我的抽奖记录
                        <span class="rightArrow fr"><i class="icon iconfont icon-xiala1 fs30"></i></span>
                    </router-link>
                    <div class="roll">
                        <div class="item  tac fs28 bgWhite" v-for="(item,index) in prizeList" :key="index"
                             :class="{'midSpace':index==1||index==4||index==7}" v-if="index!=4">
                            <div class="img-co iconfont">
                            	<img :src="item.luckyShopPic" v-if="item.luckyShopPic" alt="">
                            	<img src="../assets/img/qiuqiu.jpg" v-if="!item.luckyShopPic" alt="">
                            </div>
                            <p class="paddingAll overflow" style="text-overflow:ellipsis ;white-space: nowrap;width: 100%;">{{ item.luckyShopName }}</p>
                            <div class='fuck' :class="{'cover':item.light}"></div>
                        </div>
                        <div v-else class="item tac midSpace midItem">
                            <div @click="start">
                                <div>
                                    <p>START</p>
                                    <p>开始抽奖</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius" v-if="recordAL&&recordAL.length">
            <div class="wp2 spc borderRadius">
                <router-link tag='div' to='/lotteryRec?type=me' class="title">中奖记录</router-link>
                <table class="cjTable recode-a-l">
                    <tr class="fs30" v-for="(t,i) in recordAL">
                        <td>{{ t.userName?t.userName:'***' }}</td>
                        <td class="tac">{{ t.luckName }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="wp1 marginAll myLottery marginTop marginBottom borderRadius rec">
            <div class="wp2 spc borderRadius">
                <div class="title">抽奖规则</div>
                <table class="cjTable">
                    <tr class="fs30">
                        <td>
                            1. 当抽奖主题活动存在并且可抽奖次数不为0，抽奖活动开始即可抽奖。
                        </td>
                    </tr>
                    <tr class="fs30">
                        <td>
                            2. 如果存在多个抽奖主题，则会一个主题抽完再进入下一个抽奖主题，直至用光所有抽奖次数。
                        </td>
                    </tr>
                    <tr class="fs30">
                        <td>
                            3. 每个抽奖主题的抽奖商品可能不一样，并且已经被抽完的奖品不会再次被抽中。
                        </td>
                    </tr>
                    <tr class="fs30">
                        <td>
                            4. 当你没有抽奖主题活动时，无抽奖商品显示仅显示默认图片。
                        </td>
                    </tr>
                </table>
            </div>
        </div>


        <div class="result" v-if="showResult">
            <div class="inner tac">
                <p>{{ prize.groupTitle }}</p>
                <div><i class="icon iconfont icon-Smile"></i></div>
                <p>{{ prize.luckyShopName }}</p>
                <div class="goon" @click="continuer">继续抽奖</div>
            </div>
        </div>
    </div>
</template>
<script>
    let timer = null;
    export default {
        data() {
            return {
                showResult:false,
                rollArr: [0, 1, 2, 5, 8, 7, 6, 3],
                canClick: true,
                timer: null,//计时器id
                times: 0,
                speed: 500,
                circle: 48,
                maskIndex: 0,
                prizeList:[],
                luckList:[],
                prize:null,//抽到的奖品
                recordAL:null,
            }
        },
        computed:{


        },
        methods: {
            activeMask(num) {
                this.prizeList.forEach(item => item.light = false);
            	let act = this.rollArr[num];
            	this.$set(this.prizeList[act],'light',true);
            },
            init() {
                this.speed = 500;
                this.times = 0;
                this.maskIndex = 0;
            },
            start() {
                if (this.canClick) {
                    this.getLuckDrawRes();
                }
            },
            getLuckDrawRes(){
                if(!(this.luckList[0] && this.luckList[0].count)){
                    this.$toast('抽奖次数已用完');
                    return;
                }
            	this.$http.post('/luckyRecord/userStartLuckyDraw',{
            		"pageNumber": 1,
					"pageSize": 1000
            	}).then(r=>{
            		if(r.data.code == "200000"){
                        this.init();
                        this.canClick = false;
                        this.roll();
                        this.prize = r.data.data.luckShop;
            		}else{
                    }
            	})
            },
            roll() {
                let that = this;
                clearTimeout(that.timer);
                that.times++;
				that.speed = that.speed < 60 ?60:(that.speed - (130/that.times));
                if (that.times >= 50) {
                	this.prizeList.forEach((v,i)=>{
	                	if(v.id == this.prize.id){
	                		this.prize.index = i;
	                		this.brake();
	                		return;
	                	}
	                });
                }
                if(that.times >= 500){
                	this.$router.push('/');
                }
				that.maskIndex = that.maskIndex+2 > that.rollArr.length?0:that.maskIndex + 1;
                that.activeMask(that.maskIndex);
                that.timer = setTimeout(that.roll,that.speed)
            },
            brake(){
            	this.speed = this.speed > 300?300:(this.speed + 50);
            	this.maskIndex = this.maskIndex+2 > this.rollArr.length?0:this.maskIndex + 1;
            	this.activeMask(this.maskIndex);
            	let nowId = this.prizeList[this.rollArr[this.maskIndex]].id;
            	if(this.speed >= 300 && this.prize.id == nowId){
					this.showResult = true;
            		return;
            	}else{
            		clearTimeout(this.timer);
            		this.timer = setTimeout(this.brake,this.speed);
            	}
            },
            getLuckListByUser(){
            	this.$http.post('/luckUser/luckListByUser',{
	            	pageNumber: 1,
	            	pageSize: 8
	            }).then(r=>{
	                console.log(r);
	            	this.luckList = r.data.data.luckList;
                    r.data.data.drawShop.forEach((v,i)=>{
                        v['light'] = false;
                    })
	            	r.data.data.drawShop.splice(4,0,[]);
	            	this.prizeList = r.data.data.drawShop;
	            	console.log(this.prizeList);
	            }).catch(e=>{
	            	if(e) console.log(e)
	            });
            },
            continuer(){
            	Object.assign(this.$data, this.$options.data());
            	this.recordByAll();
            	this.getLuckListByUser();
            },
            recordByAll(){
            	this.$http.post('/luckyRecord/luckRecordByAll',{
				  "pageNumber": 1,
				  "pageSize": 10,
				}).then(r=>{
					this.recordAL = r.data.data.content;
				})
            }
        },
        created(){
            this.getLuckListByUser();
            this.recordByAll();
        },
    }
</script>