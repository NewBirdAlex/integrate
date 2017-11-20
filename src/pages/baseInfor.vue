<template>
    <div>
        <div class="head  tac bgWhite paddingAll borderBottom">
            <div>
                <img :src="userInf.userAvatar" v-if="userInf.userAvatar" alt="">
                <img src="../assets/img/defaultHead.png" v-else  alt="">
            </div>
            <p>{{userInf.userName}}的基础信息</p>
            <p><span class="blue">基础积分：{{userInf.baseScore}}</span></p>
        </div>
        <div class="paddingAll bgWhite fs30 borderBottom lh40">
            <i class="icon iconfont icon-job fs36"></i>
            <span>职位：{{userInf.jobMap.jobTitle}}</span>
            <span class="fr">
                +{{userInf.jobMap.jobScore}}
            </span>
        </div>
        <div class="paddingAll bgWhite fs30 borderBottom">
            <i class="icon iconfont icon-wujiaoxing fs36"></i>
            <span>职位星级</span>
            <span class="fs36">
                <i class="icon iconfont icon-mg-star fs36" style="font-size: 0.5rem" v-for="i in userInf.jobLevelMap.jobLevel"></i>
                <i class="icon iconfont icon-wujiaoxing fs36" v-for="i in 5-userInf.jobLevelMap.jobLevel"></i>

            </span>
            <span class="fr">
                +{{userInf.jobLevelMap.jobLevelScore}}
            </span>
        </div>
        <div class="paddingAll bgWhite marginTop fs30 borderBottom">
            <i class="icon iconfont icon-yuangongnianling fs36"></i>
            <span>工龄奖励</span>
            <span class="gray fs26">（{{userInf.entryTime}}）</span>
        </div>
        <ul class="praise">
            <li v-for="(item,index) in userInf.jobYearList" :key="index"><i></i>{{item.jobYearTitle}}</li>
        </ul>
        <div class="paddingAll bgWhite fs30 borderBottom marginTop">
            <i class="icon iconfont icon-education fs36"></i>
            <span>学历：{{userInf.eduMap.eduTitle}}</span>
            <span class="fr">
                +{{userInf.eduMap.eduScore}}
            </span>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-zhicheng fs36"></i>
                <span>职称：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll" v-for="(item,index) in userInf.techList" :key="index">
                    {{item.techTitle}}
                    <span class="fr">+{{item.techScore}}分</span>
                </div>
            </div>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-renwu1 fs36"></i>
                <span>荣誉：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll" v-for="(item,index) in userInf.honorList" :key="index">
                    {{item.honorTitle}}
                    <span class="fr">+{{item.honorScore}}分</span>
                </div>
            </div>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-techang fs36"></i>
                <span>特长：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll" v-for="(item,index) in userInf.skillList" :key="index">
                    {{item.skillTitle}}
                    <span class="fr">+{{item.skillScore}}分</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .icon{
        position: relative;
        top:-2px;
    }
    .mulItem{
        .left{
            .fl;
            width: 1.4rem;
        }
        .right{
            .fr;
            width: 5.7rem;
            .paddingAll{
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }

    .praise {
        .bgWhite;
        .paddingAll;
        li {
            .fs26;
            line-height: 0.5rem;
            text-indent: 0.5rem;
            i {
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: @blue;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
        }
    }

    i {
        vertical-align: middle
    }

    .head {
        font-size: @fs30;
        img {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            margin-bottom: 0.2rem;
            .marginTop;
        }
        .blue {
            font-size: @fs26;
            padding: 0.1rem 0.2rem;
            color: #338ecc;
            .marginTop;
            display: inline-block;
            background-color: rgba(221, 241, 255, 1);
            border-radius: 6px 6px 6px 6px;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                userInf:{}
            }
        },
        methods:{
            getDetail(){
                let that = this;
                this.$http.post('/user/getUserBaseInfo', {
                    getInfoUserId:this.$route.params.id
                })
                    .then(function (response) {
                        if(response.data.data.code=200000){
                            that.userInf = response.data.data
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.getDetail();
        }
    }
</script>