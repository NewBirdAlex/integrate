<template>
    <div>
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                筛选排名
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="输入搜索内容" v-model="inputVal">
            </div>
            <div style="clear: both"></div>
            <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated bounceOutLeft"
            >
                <div class="option " v-if="showOption">
                    <div>
                        <p class="subt">时间段</p>
                        <div class="overflow">
                            <span class="btn">{{startTime}} <i class="icon iconfont icon-xiala fs24"></i></span>
                            <span class="btn active">{{endTime}}</span>
                        </div>
                    </div>
                    <div>
                        <p class="subt">部门</p>
                        <div class="overflow">
                            <span class="btn">今日</span>
                            <span class="btn active">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                        </div>
                    </div>
                    <div>
                        <p class="subt">职位</p>
                        <div class="overflow">
                            <span class="btn">今日</span>
                            <span class="btn active">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                        </div>
                    </div>
                    <div>
                        <p class="subt">积分</p>
                        <div class="overflow">
                            <span class="btn">今日</span>
                            <span class="btn active">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                            <span class="btn">今日</span>
                        </div>
                    </div>
                    <div class="tac cbtn overflow" @click="subData">
                        <span class="fl">重置</span>
                        <span class="fr" >确认</span>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .cbtn {
        span {
            display: inline-block;
            width: 40%;
            line-height: 0.5rem;
            .border;
            .borderRadius;
            margin: 0.3rem;
        }
    }
    .option {
        position: absolute;
        left: 0;
        top: 1.2rem;
        width: 7.1rem;
        z-index: 10;
        .bgWhite;
        .paddingAll;
        overflow: hidden;
        .subt {
            line-height: 0.5rem;
            font-size: @fs30;
        }
        .btn {
            .fl;
            padding: 0.2rem 0.4rem;
            .border;
            margin: 0.1rem 0.2rem;
            &.active {
                background: @blue;
                color: white;
            }
        }
    }

    .search {
        .borderBottom;

        position: relative;
        .left {
            width: 2rem;
            .fl;
            .tac;
            font-size: @fs30;
            padding-top: 0.1rem;
        }
        .right {
            .fl;
            width: 5rem;
            text-indent: 1em;
            padding: 0.1rem 0;
            .borderRadius;
            input {
                margin-left: 0.2rem;
                border: none;
                outline: none;
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                inputVal:'',
                showOption: false,
                startTime:'开始时间'
            }
        },
        computed:{
            endTime(){
                let time = new Date();
                return time.getFullYear()+'.'+Number(time.getMonth()+1)+'.'+time.getDate()
            }
        },
        methods:{
            subData(){
                //submit the search data
                console.log(11)
                this.$emit('getData',1234)
                this.showOption=false;
            }
        },
        mounted(){
            console.log(document.documentElement.clientHeight)
        }
    }
</script>