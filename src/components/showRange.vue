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
                <ul class="bgWhite ">
                    <li v-for="(item,index) in list" :key="index">
                        {{item.name}}
                        <span class="fr" @click="selApartment(item,index)" v-if="!item.ticket"></span>

                        <i @click="selApartment(item,index)" class="icon iconfont icon-gouxuan blue fr fs36" v-if="item.ticket"></i>

                    </li>
                    <li>
                        <span class="" @click="chooseAll" v-if="!selectAll">

                        </span>
                        <i @click="chooseAll" class="icon iconfont icon-gouxuan blue fs36"
                           v-if="selectAll"></i>
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
        height: 90vh;
        z-index: 10;
        left: 0;
        top: 0;
        overflow-y: scroll;
        padding-bottom: 10vh;
        h3 {
            line-height: 0.88rem;
            .tac;
            font-size: @fs34;
            .borderBottom;
        }
        .confBtn {
            margin-top: 2rem;
            position: absolute;
            bottom: 0;
            left:0;
            width: 100%;
            margin: 0;
            padding:0;
            z-index: 10000;
        }
        ul {
            height: 85vh;
            overflow-y: scroll;
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
    import { mapGetters } from 'vuex';
    import 'scrolling-element'
    var ModalHelper = (function(bodyCls) {
        var scrollTop;
        return {
            afterOpen: function() {
                scrollTop = document.scrollingElement.scrollTop;
                document.body.classList.add(bodyCls);
                document.body.style.top = -scrollTop + 'px';
            },
            beforeClose: function() {
                document.body.classList.remove(bodyCls);
                // scrollTop lost after set position:fixed, restore it back.
                document.scrollingElement.scrollTop = scrollTop;
            }
        };
    })('modal-open');
    export default {
        data() {
            return {
                selectAll: false,
                showDepartment: false,
                msg: '',
                selContent: '',
                pageNumber:1,
                pageSize:100,
                list: []
            }
        },
        computed: {
            ...mapGetters([
                'userMessage',
            ])
        },
        watch:{
            showDepartment(val){
                if(val){
                    ModalHelper.afterOpen('modal-open');
                }else{
                    ModalHelper.beforeClose('modal-open');
                }
            }
        },
        mounted(){
            this.getList();
        },
        methods: {
            chooseAll() {
                let that = this;
                this.selectAll = !this.selectAll;
                this.list.forEach(item => item.ticket = that.selectAll);
            },
            confirmSel() {

                let str = '';
                let arr = [];
                this.list.forEach(function (item) {
                    if (item.ticket) {
                        str += '<p>' + item.name + '</p>'
                        arr.push(item)
                    }
                });
                this.selContent = str;
                this.showDepartment = !this.showDepartment;
                this.$emit('getData', arr)
            },
            selApartment(item,index){
                this.selectAll = false;
                item.ticket = !item.ticket;
                this.$set(this.list,index,item)
            },
            getList(){
                let that = this;
                this.$http.post('/companyUser/departmentList',{
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    sortOrder: "asc",
                    token:this.userMessage.token,
                    userId:this.userMessage.userId
                })
                    .then(function (response) {
                        console.log(response)
                        that.list=response.data.data.content ;
                        that.list.forEach(item=>item.ticket=false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>