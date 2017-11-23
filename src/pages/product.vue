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
    	height: 4rem;
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
            <mt-swipe :auto="4000" style='background: red;'>
                <mt-swipe-item v-for='t in swiperL' :key="t">
                	<img :src="t" alt="" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="bgWhite paddingAll lh40">
            <div>
                <strong class="fs30">{{ detail.luckName }}</strong>
                <span class="fr gray fs26">剩余{{ detail.shopNum?detail.shopNum:'0' }}件</span>
            </div>
            <div class="marginTop">
                <span class="yellow marginRight fs36"> {{ detail.Money?detail.Money:0 }}分</span>
                <span class="gray fs24" v-if="$store.state.baseInf.userScore - (detail.Money?detail.Money:0) < 0">{{ $store.state.baseInf.userScore - (detail.Money?detail.Money:0) }}</span>
                <span class="fr fs26">已兑换{{ detail.score?detail.score:'0' }}件</span>
            </div>
        </div>
        <div class="marginTop paddingAll bgWhite fs26 borderBottom">
            <span>他们都兑换了 <span class="gray">({{ historytotal }})</span></span>
            <span class="fr rightArrow">
                <i class="icon iconfont icon-xiala1"></i>
            </span>
        </div>
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
            <div class="show" v-html="detail.shopDetail"></div>
        </div>
        <div class="mask" v-show="openSele"></div>
        <div class="sele" :class="{'sele-option':openSele}">
        	<div class="part1">
        		<div class="cover">
        			<img :src="detail.shopDetail"/>
        		</div>
        		<div class="cont">
        			<p class="branch">{{ detail.Money?detail.Money:0 }} 分</p>
        			<p class="surplus">剩余{{ detail.shopNum?detail.shopNum:'0' }} 件</p>
        			<p class="explain">请选择：按商品规格兑换</p>
        		</div>
        		<div class="close">
        			<i class="iconfont icon-close48" @click="openSele = false"></i>
        		</div>
        	</div>
        	<div class="part2">
        		<p class="tit">规格：</p>
        		<div class="options">
        			<mt-button v-for='(t,i) in spec.keys' :key="t"  @click='seleSpec(t,i)' class='btn' :type="i==spec.act?'primary':'default'" size="small">default</mt-button>
        			<mt-button type='default' v-if='!spec.keys || !spec.keys.length' class='btn' size="small">无需选择</mt-button>
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
            	openSele:true,
            	spec:{
            		keys:null,
            		act:-1,
            	},
            }
        },
        methods:{
        	seleSpec(t,i){
        		this.spec.act = i;
        	},
        	operation(){
        		if(this.spec.keys == null){return;}
        		if(this.spec.keys.length){
        			if(this.spec.keys.act == -1){
        				this.openSele = true;
        			}else{
        				this.exchange();
        			}
        		}else{
    				this.exchange();
    			}
        	},
        	exchange(){
        		this.$http.post('/shopbuylist/toGetShopByUser',{
        			specsId:this.spec.keys[this.spec.act].id,
        		}).then(r=>{
        			console.log(r,'兑换结果');
        		}).catch(e=>{
        			
        		});
        	}
        },
        created(){
        	this.$store.dispatch('getuserBaseInf');
        	this.$http.post('/shop/getShopDetailById',{
        		id:this.$route.params.id,
        	}).then(r=>{
        		console.log(r.data,'商品详情');
        		this.swiperL = r.data.data.shopDetail[0].shopPics.split(';');
        		this.detail = r.data.data.shopDetail[0];
        	}).catch(e=>{
        		
        	});
        	this.$http.post('/shopbuylist/shopBuyRecordByAll',{
			  "id": this.$route.params.id,
			  "pageNumber": 1,
			  "pageSize": 10,
			}).then(r=>{
				console.log(r,'记录');
				this.historytotal = r.data.data.content.length;
			})
			this.$http.post('/shopSpecs/toGetSpecsByShopId',{
				"id": this.$route.params.id,
			}).then(r=>{
				console.log('规格列表',r);
				this.spec.keys = r.data.data;
			})
        },
    }
</script>