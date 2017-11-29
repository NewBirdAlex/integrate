<style scoped lang="less">
    @import "../assets/css/common.less";
    .product{
        .fl;
        .marginAll;
        .bgWhite;
        .borderRadius;
        .overflow;
        .paddingBottom;
        .lh40;
        width:calc(~"50% - 0.4rem");
        .img-box{
        	width:3.45rem;
            height:3.45rem;
            background: #ddd;
            overflow: hidden;
        }
        h4{padding-top: 0.1rem}
        img{
        	width: 100%;
           	min-height: 100%;
        }
        .cj{
            padding: 0.03rem 0.2rem;
            color: white;
            background: red;
            display: inline-block;
            vertical-align: middle;
            border-radius: 0.3rem;
            .fr;
            .marginRight;
        }
        .dh{
            .bgWhite;
            border:1px solid @red;
            color:@red;
        }
    }
    .item{
        .fl;
        width: calc(~"50% - 0.2rem");
        .tac;
        .fs30;
        i{
            font-size: 0.6rem;
        }
    }
    .slide{
        height: 3rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .null-goods{
    	
    	width: 50%;
    	margin:1rem auto;
    	img{
    		width: 100%;
    	}
    }
</style>

<template>
    <div>
        <div class="slide">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item,index) in swipeList" :key="index">
                    <img :src="item.cover" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="paddingAll bgWhite overflow">
            <div class="item">
                <i class="icon iconfont icon-jifen yellow"></i>
                可用积分：<span class="yellow">{{ baseInf.userScore }}</span>
            </div>
            <router-link tag="div" to="/exchangeRec" class="item">
                <i class="icon iconfont icon-duihuanjilu blue"></i>
                兑换记录
            </router-link>
        </div>

        <div class="marginTop bgWhite paddingAll tac">
            <h3 class="fs34">他们都在兑</h3>
            <p class="blue fs30 marginTop">每个部门兑换分数不一样喔</p>
        </div>
        <div 
        	v-infinite-scroll="loadMore"
    		infinite-scroll-disabled="loading"
    		infinite-scroll-distance="10"
        	class="overflow marginTop">
            <div class="product" v-for="(t,i) in list">
                <div class="img-box">
                	<img :src="t.shopCover" v-show="t.shopCover" alt="">
                	<img src="../assets/img/null.png" v-show="!t.shopCover" alt="">
                </div>
                <h4 class="paddingLeft fs30"> <strong>{{ t.shopName?t.shopName:'暂无商品名' }}</strong></h4>
                <div class="paddingLeft fs26 " style="padding-top: 0.1rem">
                    <span class="yellow fs30">{{ t.saleMoney }}</span>
                    <span class="gray marginRight">积分</span>
                    <router-link tag='span' :to="'/product/' + t.id" class="cj" :class="{'dh':i==2}" v-if="t.status == 1">兑换</router-link>
                    <router-link tag='span' to="/lottery" class="cj" v-if='t.status == 2'>抽奖</router-link>
                </div>
            </div>
            <div class="null-goods">
            	<img v-show="this.list && !this.list.length" src="../assets/img/nullGoods.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
            	send:{
            		"pageNumber": 1,
					"pageSize": 11,
            	},
            	list:null,
                swipeList:[],
            	loading:false,
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
                'baseInf'
            ])
        },
        methods:{
            getSwipe(){
                //swiper
                this.$http.post('/advert/listByCom',{
                    companyId:this.userMessage.companyId,
                    locationType:3
                })
                    .then(response=>{
                        this.swipeList = response.data.data.content;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            loadMore(){
            	this.loading = true;
            	this.$http.post('/shop/getShopListByUser',this.send).then(r=>{
            		if(!this.list){ this.list = [] };
            		this.send.pageNumber++;
            		this.list = this.list.concat(r.data.data.content);
            		console.log(this.list);
            		this.loading = r.data.data.last;
            	}).catch(e=>{
            		if(e) console.log(e);
            	})
            },
        },
        created(){
        	this.$store.dispatch('getuserBaseInf');
        	this.getSwipe();
        }
    }
</script>