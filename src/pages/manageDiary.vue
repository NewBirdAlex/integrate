<template>
    <div>
        <div class="bgWhite">
            <div class="topBtn">
                <span v-for="(item,index) in  sumType" :key="index" :class="{'active':item.active}" @click="reDraw(item)">{{item.name}}</span>
            </div>
            <div class="bgWhite " id="main" >

            </div>
        </div>
        <div>
            <!--积分动态-->

            <jfRecord des="个人积分明细" ></jfRecord>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    #main{
        height: 7rem;
    }
    .topBtn{
        margin:0.2rem;
        .overflow;
        .border;
        .borderRadius;
        span{
            width: 25%;
            .fl;
            .tac;
            padding:0.15rem 0;
            .fs30;
            border-right: @border;

            box-sizing: border-box;
            &:last-child{border:none}
        }
        .active{
            background: @blue;
            color: white;
        }
    }

</style>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import jfRecord from '../components/jfRecord.vue'

    export default {
        data() {
            return {
                sumType:[
                    {
                        type:1,
                        active:false,
                        name:'当天'
                    },{
                        type:2,
                        active:true,
                        name:'本月'
                    },{
                        type:3,
                        active:false,
                        name:'本季度'
                    },{
                        type:4,
                        active:false,
                        name:'本年度'
                    }
                ]
            }
        },
        components:{
            jfRecord
        },
        methods:{
            reDraw(item){
                this.sumType.forEach(item=>{
                    item.active=false;
                })
                item.active=true;
                this.getSumData();
            },
            getSumData(){
                let that = this;
                let type='';
                this.sumType.forEach(item=>{
                    if(item.active) type = item.type;
                })
                this.$http.post('/approveRecord/getLeftPieData',{
                    type:type,
                    getUserId:this.$route.params.id
                })
                    .then(function (response) {
                        that.getDraw(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getDraw(response){
                let bar = {
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['A分', 'B分', 'C分', '基础', '加分', '减分','总分']
                    },
                    yAxis: {

                    },
                    series: [{
                        name: '分数',
                        type: 'bar',
                        data: [0, 0, 0, 0, 0, 0,0]
                    }]
                };
                bar.series[0].data[0]=response.data.data.morally||0;
                bar.series[0].data[1]=response.data.data.achivment||0;
                bar.series[0].data[2]=response.data.data.behavior||0;
                bar.series[0].data[3]=response.data.data.baseScore||0;
                bar.series[0].data[4]=response.data.data.plusScore||0;
                bar.series[0].data[5]=response.data.data.minusScore||0;
                bar.series[0].data[6]=response.data.data.sumScore||0;
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                console.log(bar)
                //myChart.setOption(this.bar);
                myChart.setOption(bar);
            }
        },
        mounted(){
            this.getSumData();
        }
    }
</script>