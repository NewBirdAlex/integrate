<template>
    <div 
    	v-infinite-scroll="loadMore"
    	infinite-scroll-disabled="loading"
    	infinite-scroll-distance="10">
        <div class="paddingAll borderBottom bgWhite lh40" v-for="(t,i) in record">
            <p class="fs30">
            	{{ t.luckName }}
                <span class="yellow fr" v-if="t.status == 1">兑换中</span>
                <span class="green fr" v-if="t.status == 2">已兑换</span>
                <span class="red fr" v-if="t.status == 0">兑换失败</span>
            </p>
            <p class="fs26 gray">
                <span>{{ t.groupTitle }}</span>	
                <span class="fr fs24">{{ t.createDate }}</span>
            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
</style>
<script>
    export default {
        data() {
            return {
            	record:[],
            	send:{
            		"pageNumber": 1,
					"pageSize": 10,
            	},
            	loading:false,
            	requrl:'',
            }
        },
        methods:{
        	loadMore(){
        		this.loading = true;
        		this.$http.post(this.requrl,this.send).then(r=>{
        			this.send.pageNumber++;
	        		this.record = this.record.concat(r.data.data.content);
	        		this.loading = r.data.data.last;
	        	})
        	},
        },
        created(){
        	this.requrl = this.$route.query.type?'/luckyRecord/luckRecordByUser':'/luckyRecord/luckRecordByAll';
        }
    }
</script>