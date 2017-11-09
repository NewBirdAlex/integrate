<template>
    <div>
        <div class="marginTop paddingAll bgWhite fs30 borderBottom" @click="showStaff=!showStaff">
            <strong>选择其他员工</strong>
            <span class="fr rightArrow"><i class="icon iconfont icon-xiala1 gray"></i></span>
        </div>
        <transition
                name="custom-classes-transition"
                enter-active-class="animated bounceInLeft"
                leave-active-class="animated bounceOutLeft"
        >
            <div class="wrap" v-if="showStaff">
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
                    <transition
                            name="custom-classes-transition"
                            enter-active-class="animated lightSpeedIn"
                            leave-active-class="animated lightSpeedOut"
                    >
                        <div class="option" v-show="showOption">
                            <div class="ol">
                                <div class=""><i class="icon iconfont icon-renwu"></i>部门</div>
                                <div class=""><i class="icon iconfont icon-zhiwei"></i>职位</div>
                            </div>
                            <div class="or tac">
                                <div v-for="i in 8">行政部门</div>
                            </div>
                        </div>
                    </transition>
                </div>

                <div class="bgWhite listWrap" :style="{height:listWrap}">


                    <!--load more-->
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                        <ul>
                            <li v-for="(item,index) in staffList" :key="index">
                                <div class="list overflow paddingAll borderBottom">
                                    <img src="../assets/img/head.png" class="marginRight headPicture fl" alt="">
                                    <div class="fl">
                                        <p class="fs36 ">{{item.userName}}</p>
                                        <p class="gray marginTop">{{item.departmentName}}</p>
                                    </div>
                                    <span class="cl" :class="{'border':!item.sel}" @click="item.sel=!item.sel">
                                        <i class="icon iconfont icon-gouxuan blue" v-if="item.sel"></i>
                                    </span>
                                </div>

                            </li>
                        </ul>
                    </mt-loadmore>

                </div>

                <div class="obtn bgWhite">
                    <div class="">取消</div>
                    <div class="active" @click="outputData">确认</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .listWrap {
        height: calc(~"100% - 2rem");
        overflow: scroll;
    }

    .obtn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        .tac;
        div {
            margin-top: 0.3rem;
            width: 40%;
            margin: 0.1rem 0.3rem;
            line-height: 0.6rem;
            display: inline-block;
            .border;
            .borderRadius;
            &.active {
                background: @blue;
                color: white;
            }
        }
    }

    .option {
        position: absolute;
        left: 0;
        top: 1rem;
        width: 100%;
        z-index: 10;
        .bgWhite;
        overflow: hidden;
        .ol {
            width: 40%;
            .fl;
            text-indent: 2em;
            i {
                .fs36;
                .marginRight;
            }
            div {
                padding: 0.3rem 0;
                .borderBottom;
                .fs30;

            }
        }
        .or {
            width: 59%;
            padding-top: 0.08rem;
            .border;
            border-right: none;
            .fl;
            div {
                padding: 0.3rem 0;
                .borderBottom;
                .fs30;
                &:last-child {
                    border: none;
                }
            }
        }
    }

    .cl {
        .fr;
        width: 0.4rem;
        height: 0.4rem;
        .tac;
        line-height: 0.4rem;
        margin-top: 0.2rem;
        border-radius: 50%;
        .icon {
            font-size: 0.4rem;

        }
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 1;
        .grayBg;
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
                allLoaded: false,
                showOption: false,
                listWrap: '',
                showStaff: false,
                pageNumber: 1,
                pageSize: 5,
                lastPage: false,
                keyWord: '',
                departmentId: '',
                jobId: '',
                staffList: []
            }
        },
        computed: {
            wrapStyle() {
                if (this.showStaff) {
                    return {
                        "z-index": '10',
                        'opacity': '1',
                        'top': '0'
                    }
                } else {
                    return {
                        "z-index": '-10',
                        'opacity': '0',
                        'top': '100rem'
                    }
                }
            }
        },
        props: {},
        methods: {
            loadBottom() {
                // 加载更多数据
                //this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            outputData() {
                this.showStaff = !this.showStaff;
                this.$emit('getData');
            },
            getStaff() {
                let that = this;
                this.$http.post('/user/userList', {
                    departmentId: this.departmentId,
                    jobId: this.jobId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    sortOrder: "asc",
                    sortType: "id",
                    userName: this.keyWord
                })
                    .then(function (response) {
                        that.staffList = that.staffList.concat(response.data.data.content) ;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getStaff();
//            console.log(document.querySelector('.search').getClientRects()[0].height)
//
//            this.listWrap = (document.documentElement.clientHeight-document.querySelector('.search').getClientRects()[0].height)-80 + "px";
//            console.log(document.documentElement.clientHeight)
        }
    }
</script>