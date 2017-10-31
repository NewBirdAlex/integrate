<template>
    <div>
        <div class="search paddingAll">
            <div class="left" @click="showOption=!showOption">
                筛选排名
                <span class="triangle-down"></span>
            </div>
            <div class="right bgWhite">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" placeholder="搜索">
            </div>
            <div style="clear: both"></div>
            <div class="option " v-if="showOption">
                <div v-for="i in 4">
                    <p class="subt">时间段</p>
                    <div class="overflow">
                        <span class="btn">今日</span>
                        <span class="btn active">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                        <span class="btn">今日</span>
                    </div>
                </div>
                <div class="tac cbtn overflow">
                    <span class="fl">重置</span>
                    <span class="fr">确认</span>
                </div>
            </div>
        </div>

        <table>
            <tr class="gray">
                <th>排名</th>
                <th></th>
                <th>姓名</th>
                <th>加分</th>
                <th>扣分</th>
                <th>总分</th>
            </tr>

            <tr>
                <td>6</td>
                <td><img src="../assets/img/head.png" alt=""></td>
                <td>欧阳诗</td>
                <td>2000</td>
                <td>2000</td>
                <td class="blue">2000</td>
            </tr>
            <div style="height: 0.2rem"></div>
            <tr v-for="(i,index) in 12" @click="go">
                <td>
                    <i v-if="index>=3">{{index}}</i>
                    <i class="icon iconfont " :class="{'icon-jin':index==0,'icon-tong':index==1,'icon-yin':index==2}"
                       v-if="index<3"></i>
                </td>
                <td><img src="../assets/img/head.png" alt=""></td>
                <td>欧阳诗</td>
                <td>2000</td>
                <td>2000</td>
                <td class="blue">2000</td>
            </tr>
        </table>

        <!--loadmore-->
        <div style="height: 10rem;overflow: scroll;">
            <mt-loadmore
                    :bottom-all-loaded="allLoaded "
                         :bottom-method="loadBottom"
                         ref="loadmore"
            >
                <ul>
                    <li v-for="item in list">{{ item }}</li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">Loading...</span>
                </div>
            </mt-loadmore>
        </div>

        <!--loadmore-->

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    /*loadmore*/
    ul {
        li {
            .tac;
            font-size: 0.4rem;
            line-height: 0.4rem;
            .paddingAll;
            .borderBottom;
        }
    }

    /*loadmore*/

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
        top: 0.8rem;
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

    .icon-jin {
        color: #ffe157
    }

    .icon-tong {
        color: #d5e3eb
    }

    .icon-yin {
        color: #f0c789
    }

    table {
        width: 100%;
        font-size: @fs30;
        .tac;
        tr {
            &:nth-child(2) {
                margin-bottom: 0.2rem;
            }
            .icon {
                font-size: 0.6rem;
            }
            td, th {
                padding: 0.2rem 0;

            }
            td {
                background: white;
                border-bottom: @border;
                img {
                    width: 0.9rem;
                    height: 0.9rem;
                    border-radius: 50%;
                }
            }
        }

    }
</style>
<script>
    export default {
        data() {
            return {
                showOption: false,
                topStatus: '',
                allLoaded:false,
                list: [1, 2, 4, 5, 3, 3, 3, 33, 3, 3, 2, 3, 3, 2, 3, 23,3,21,23,2,3,23]
            }
        },
        methods: {
            loadBottom(){
                 // 加载更多数据
                this.allLoaded = true;// 若数据已全部获取完毕
                //                this.$refs.loadmore.onBottomLoaded();
                console.log(3)
            },
            go() {
                //路由跳转
                this.$router.push('/infor')
            }
        }
    }
</script>