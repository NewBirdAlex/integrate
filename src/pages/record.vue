<template>
    <div>
        <h3>审批日记</h3>
        <ul>
            <li v-for="item in list" class="bgWhite">
                <div class="left"><img src="../assets/img/head.png" alt=""></div>
                <div class="right">
                    <p>审批我的最佳人气奖 <span class="blue fr">+80分</span></p>
                    <p class="yellow">审批中 <span class="gray fr">07-02 12:06</span></p>
                </div>
            </li>
        </ul>
        <itemList></itemList>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    body{
        background: #fff;
    }
    h3{
        .tac;
        padding:0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
        .borderBottom;
    }
    ul{
        li{
            .paddingAll;
            .borderBottom;
            .left{
                display: inline-block;
                img{
                    width: 0.9rem;
                    width: 0.9rem;
                    border-radius: 50%;
                }
            }
            .right{
                display: inline-block;
                width: 6.1rem;
                vertical-align: top;
                text-indent: 0.2rem;
                line-height: 0.4rem;
                font-size: @fs30;
                p{
                    padding-top: 0.05rem;
                    &:nth-child(2){
                        font-size: @fs28;
                        span{font-size: @fs24;}
                    }
                }
            }
        }
    }
</style>
<script>
    import itemList from '../components/itemList.vue'
    export default {
        data() {
            return {
                list:5
            }
        },
        components:{
            itemList
        }
    }
</script>