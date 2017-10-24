<template>
    <div>
        <div class="overflow bgWhite" >
            <div class="tac item" v-for=" (item,index) in list" :key="index" @click="go">
                <div class="crl" :style="{background:item.color}">
                    <i class="icon iconfont " :class="item.icon"></i>
                </div>
                <p class="fs26">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .item{
        .fl;
        width:2.5rem;
        height: 2.5rem;
        border-right: @border;
        .borderBottom;
        box-sizing: border-box;
        .crl{
            width: 1.2rem;
            height: 1.2rem;
            background: @blue;
            border-radius: 50%;
            margin: 0.5rem auto 0.2rem auto;
            .tac;
            line-height: 1.2rem;
        }
        .icon{
            /*margin-top: 1rem;*/
            /*display: inline-block;*/
            font-size: 0.7rem;
            color: white;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                list:[
                    {
                        name:'日报',
                        icon:'icon-anquanjianliribao',
                        color:'#5cd5fc'
                    },
                    {
                        name:'周报',
                        icon:'icon-zhoubao',
                        color:'#5ed7a1'
                    },
                    {
                        name:'月报',
                        icon:'icon-yuebao',
                        color:'#52aefc'
                    },
                    {
                        name:'季报',
                        icon:'icon-jizhuanhuan',
                        color:'#ff973d'
                    },
                    {
                        name:'我的日记',
                        icon:'icon-comiisfariji',
                        color:'#63b8ed'
                    },
                    {
                        name:'业绩日报',
                        icon:'icon-baogao',
                        color:'#f96f76'
                    },
                ]
            }
        },
        methods:{
            go(){
                this.$router.push('/workDiary/write')
            }
        }
    }
</script>