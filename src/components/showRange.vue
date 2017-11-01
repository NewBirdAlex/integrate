<template>
    <div class="">
        <div class="selRange bgWhite paddingAll" @click="showDepartment=!showDepartment">
            <strong>可见范围</strong>
            <!--<input type="text" placeholder="不选择则默认为全部可见" disabled>-->
            <div class="gray middle" v-html="selContent==''?'不选择则默认为全部可见':selContent"></div>
            <i class="icon iconfont icon-xiala1 fr"></i>
        </div>
        <transition
                name="custom-classes-transition"
                enter-active-class="animated bounceInLeft"
                leave-active-class="animated bounceOutRight"
        >

            <div class="department" v-if="showDepartment">
                <h3>选择部门</h3>
                <ul class="bgWhite ">
                    <li v-for="(item,index) in list" :key="index">
                        {{item.name}}
                        <span class="fr" @click="item.ticket=!item.ticket"><i class="icon iconfont icon-gouxuan blue"
                                                                              v-if="item.ticket"></i></span>
                    </li>
                    <li>
                        <span class="" @click="chooseAll"><i class="icon iconfont icon-gouxuan blue"
                                                             v-if="selectAll"></i></span>
                        全选
                        <small class="gray">
                            （不选择默认为单选）
                        </small>
                    </li>
                </ul>
                <div class="confBtn" @click="confirmSel">确认选择</div>
            </div>
        </transition>

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .middle {
        display: inline-block;
        width: 4rem;
        vertical-align: top;
        font-size: @fs30;
        line-height: 0.4rem;
    }

    .selRange {
        .paddingAll;
        input {
            background: white;
            border: 0;
        }
        strong {
            width: 1.6rem;
            display: inline-block;
            vertical-align: middle;
        }
        i {
            font-size: @fs36;
            transform: rotate(-90deg);
        }
    }

    .department {
        position: fixed;
        background: @grayBg;
        width: 100%;
        height: 100%;
        z-index: 10;
        left: 0;
        top: 0;
        h3 {
            line-height: 0.88rem;
            .tac;
            font-size: @fs34;
            .borderBottom;
        }
        .confBtn {
            margin-top: 2rem;
        }
        ul {
            li {
                .paddingAll;
                .borderBottom;
                font-size: @fs30;
                height: 0.5rem;
                line-height: 0.5rem;
                span {
                    width: 0.4rem;
                    height: 0.4rem;
                    border: @border;
                    border-radius: 50%;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 0.4rem;
                    display: inline-block;
                    i {
                        font-size: 0.4rem;
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                selectAll: false,
                showDepartment: false,
                msg: '',
                selContent: '',
                list: [
                    {
                        name: '行政',
                        ticket: false
                    },
                    {
                        name: 'IT',
                        ticket: false
                    },
                    {
                        name: '财务',
                        ticket: false
                    },
                    {
                        name: '行政',
                        ticket: false
                    }
                ]
            }
        },
        methods: {
            chooseAll() {
                let that = this;
                this.selectAll = !this.selectAll;
                this.list.forEach(item => item.ticket = that.selectAll);
            },
            confirmSel() {

                let str = '';
                this.list.forEach(function (item) {
                    if (item.ticket) {
                        str += '<p>' + item.name + '</p>'
                    }
                });
                this.selContent = str;
                this.showDepartment = !this.showDepartment;
                this.$emit('getData','this is data')
            }
        }
    }
</script>