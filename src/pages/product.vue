<style scoped lang="less">
    @import "../assets/css/common.less";
    .exchange{
        .tac;
        .paddingAll;
        background: @blue;
        color:white;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        height: 1rem;
    }
    body{
        padding-bottom: 0;
    }
    .show{
        img{
            width: 100%;
        }
    }
    .slide{
        height:4.8rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .mask{
    	position: fixed;
    	width: 100%;
    	height:100%;
    	background: rgba(50,50,50,0.3);
    	left: 0;
    	top: 0;
    }
    .sele{
    	position: fixed;
    	left: 0;
    	width: 100%;
    	bottom: 1rem;
    	background: #fff;
    	transition: all 0.2s;
    	transform-origin: 100% 100%;
    	-webkit-transform: scaleY(0);
    	-moz-transform: scaleY(0);
    	-ms-transform: scaleY(0);
    	-o-transform: scaleY(0);
    	transform: scaleY(0);
    	border-top: 0.007rem solid #ccc;
    	padding: 10px 0;
    	box-sizing: border-box;
    	.part1{
    		padding: 0.06rem;
    		height: 1.5rem;
    		display:flex;
    		border-bottom:0.008rem solid #ccc;
    		.cover{
    			width: 1.5rem;
    			height: 1.5rem;
    			margin-right: 0.25rem;
                img{
                    width: 100%;
                    height: 100%;
                }
    		}
    		.cont{
    			flex: 1;
    			.branch{
    				font-size:0.32rem;
    				color: #ff862d;
    			}
    			.surplus{
    				color: #999;
    				line-height: 0.6rem;
    			}
    			.explain{
    				color: #323232;
    			}
    		}
    		.close{
    			width: 0.5rem;
    			margin-left: 0.1rem;
    			font-size: 0.5rem;
    		}
    	}
    	.part2{
    		padding: 0.06rem;
    		.tit{
    			font-size: 0.28rem;
    			line-height: 0.6rem;
    		}
    		.options{
    			.tit{
    				font-size: 0.32rem;
    				color: #666;
    			}
    			>.btn{
    				margin-left: 0.4rem;
    			}
    		}
    	}
    }
    .sele-option{
    	transform: scaleY(1);
    }
</style>

<template>
    <div>
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for='(t,i) in swiperL' :key="i">
                	<img :src="t" alt="" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="bgWhite paddingAll lh40">
            <div>
                <strong class="fs30">{{ detail.shopName||'商品名称'}}</strong>
                <span class="fr gray fs26">剩余{{ shopMoreInfo.remainCount}}件</span>
            </div>
            <div class="marginTop">
                <span class="yellow marginRight fs36"> {{ shopMoreInfo.score}}分</span>
                <span class="gray fs24" v-if="$store.state.baseInf.userScore - (detail.Money?detail.Money:0) < 0">{{ $store.state.baseInf.userScore - (detail.Money?detail.Money:0) }}</span>
                <span class="fr fs26">已兑换{{ shopMoreInfo.allCount-shopMoreInfo.remainCount }}件</span>
            </div>
        </div>
        <router-link tag="div" :to="'/productExchangeRec/'+shopMoreInfo.shopId" class="marginTop paddingAll bgWhite fs26 borderBottom">
            <span>他们都兑换了 <span class="gray">({{ shopMoreInfo.allCount-shopMoreInfo.remainCount }})</span></span>
            <span class="fr rightArrow">
                <i class="icon iconfont icon-xiala1"></i>
            </span>
        </router-link>
        <div class=" paddingAll bgWhite fs26" @click='openSele = true'>
            <span>选择兑换规格</span>
            <span class="fr rightArrow">
                <i class="icon iconfont icon-xiala1"></i>
            </span>
        </div>
        <div class=" bgWhite">
            <div class="marginTop fs30 paddingAll">
                商品详情
            </div>
            <div class="show paddingAll lh40 fs30" v-html="detail.shopDetail"></div>
        </div>
        <div class="mask" v-show="openSele" @click="openSele=!openSele"></div>
        <div class="sele" :class="{'sele-option':openSele}">
        	<div class="part1">
        		<div class="cover">
        			<img :src="detail.shopCover"/>
        		</div>
        		<div class="cont">
        			<p class="branch">{{ selectProduct.score}} 分</p>
        			<p class="surplus">剩余{{ selectProduct.remainCount}} 件</p>
        			<p class="explain">请选择：按商品规格兑换</p>
        		</div>
        		<div class="close">
        			<i class="iconfont icon-close48" @click="openSele = false"></i>
        		</div>
        	</div>
        	<div class="part2">
        		<p class="tit">规格：</p>
        		<div class="options">
        			<mt-button v-for='(item,i) in shopSpecs' :key="i"  @click='seleSpec(item,i)' class='btn' :type="item.active?'primary':'default'" size="small">{{item.specName}}</mt-button>

        		</div>
        	</div>
        </div>
        <div class="exchange fs36" @click='operation'>确认兑换</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            	swiperL:[],
            	detail:{},
            	historytotal:0,
            	openSele:false,
            	spec:{
            		keys:null,
            		act:-1,
            	},
                shopMoreInfo:{},
                shopSpecs:{},
                selectProduct:{}
            }
        },
        methods:{
        	seleSpec(item,index){
        	    if(!item.active){
                    this.selectProduct=item;
                    this.shopSpecs.forEach(item=>item.active=false);
                    let obj = this.shopSpecs[index];
                    obj.active=true;
                   this.$set(this.shopSpecs,index,obj);
                }
        	},
        	operation(){
        	    if(!this.openSele){this.openSele=true;return}
        	    let ableSubmit = false;
        	    this.shopSpecs.forEach(item=>item.active?ableSubmit=true:'');
        	    if(ableSubmit){
                    this.exchange();
                }else{
        	        this.openSele=true;
                }
        	},
        	exchange(){
        		this.$http.post('/shopbuylist/toGetShopByUser',{
        			specsId:this.selectProduct.id,
        		}).then(response=>{
        			if(response.data.code==200000) {
        			    this.$toast('兑换成功')
                        this.$router.go(-1)
                    }
        		}).catch(e=>{
        			
        		});
        	},
            getDetail(){
                this.$store.dispatch('getuserBaseInf');
                this.$http.post('/shop/getShopDetailById',{
                    id:this.$route.params.id,
                }).then(r=>{
                    console.log(r.data,'商品详情');
                    this.swiperL = r.data.data.shopInfo.shopPics.split(',');//swipe
                    this.detail = r.data.data.shopInfo;
                    this.shopMoreInfo = r.data.data.shopMoreInfo;
                    this.shopSpecs = r.data.data.shopSpecs;//choose size
                    this.shopSpecs.forEach(item=>item.active=false);
                    this.selectProduct = r.data.data.shopSpecs[0];//default select product
                }).catch(e=>{

                });
            },
            getRecord(){

                this.$http.post('/shopbuylist/shopBuyRecordByAll',{
                    "id": this.$route.params.id,
                    "pageNumber": 1,
                    "pageSize": 10,
                }).then(r=>{
                    console.log(r,'记录');
                    this.historytotal = r.data.data.content.length;
                })
            },
            getSize(){
                this.$http.post('/shopSpecs/toGetSpecsByShopId',{
                    "id": this.$route.params.id,
                }).then(r=>{
                    console.log('规格列表',r);
                    this.spec.keys = r.data.data;
                })
            }
        },
        created(){
            this.getDetail();
//            this.getRecord();
//            this.getSize();
        },
    }
</script>