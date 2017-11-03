<template>
    <div>
        <div class="nav fs30" >
            <span v-for="(item,index) in idList" :key="index" @click="selId(item)" :class="{'active':item.sel}">
                {{item.name}}
                <i class="iconfont icon icon-arrLeft-fill"></i>
            </span>
        </div>
        <div class="marginAll bgWhite search">
            <i class="icon iconfont icon-sousuo"></i>
            <input type="text" class="myInput fs26 marginLeft" placeholder="请输入你要找的积分类型">
        </div>
        <div @click="go" class="marginTop paddingAll bgWhite lh50" v-for="i in 3" :key="i">
            <h4 class="fs30 ">帮助公司的宣传部发传单</h4>
            <p class="fs26 lh30">积极帮助公司宣传公司的产品可以获得积分,获得额外的积分申
                请积分获得积分资格</p>
            <p class="fs28">
                积分奖励：<span class="blue">20-600分</span>
                <span class="fr gray fs26">每天一次</span>
            </p>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .search{
        line-height: 0.6rem;
        height: 0.6rem;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0.08rem;
        i{
            .fs36;
            .marginLeft;
        }
    }
    .nav {
        .borderBottom;
        .overflow;
        span {
            .fl;
            width: 33%;
            .tac;
            padding: 0.3rem 0;
            &.active {
                color: #338ecc;
                border-bottom: 2px solid @blue;
            }

        }
    }
</style>
<script>
    export default {
        data() {
            return {
                idList: [
                    {
                        name: '日常任务',
                        sel: true
                    },
                    {
                        name: '抢单任务',
                        sel: false
                    },
                    {
                        name: '挑战任务',
                        sel: false
                    }
                ]
            }
        },
        methods: {
            selId(item) {
                this.idList.forEach(function (a) {
                    a.sel = false;
                })
                item.sel = true;
            },
            go(){

            }
        }
    }
</script>