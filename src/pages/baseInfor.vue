<template>
    <div>
        <div class="head  tac bgWhite paddingAll borderBottom">
            <div><img src="../assets/img/head.png" alt=""></div>
            <p>我的基础信息</p>
            <p><span class="blue">基础积分：1000</span></p>
        </div>
        <div class="paddingAll bgWhite fs30 borderBottom lh40">
            <i class="icon iconfont icon-job fs36"></i>
            <span>职位：总裁</span>
            <span class="fr">
                +200
            </span>
        </div>
        <div class="paddingAll bgWhite fs30 borderBottom">
            <i class="icon iconfont icon-wujiaoxing fs36"></i>
            <span>职位星级</span>
            <span class="fs36">
                <i class="icon iconfont icon-mg-star fs36" style="font-size: 0.5rem"></i>
                <i class="icon iconfont icon-wujiaoxing fs36"></i>
                <i class="icon iconfont icon-wujiaoxing fs36"></i>
                <i class="icon iconfont icon-wujiaoxing fs36"></i>
                <i class="icon iconfont icon-wujiaoxing fs36"></i>

            </span>
            <span class="fr">
                +200
            </span>
        </div>
        <div class="paddingAll bgWhite marginTop fs30 borderBottom">
            <i class="icon iconfont icon-yuangongnianling fs36"></i>
            <span>工龄奖励</span>
            <span class="gray fs26">（入职时间：2014-06-08至今3年零3个月）</span>
        </div>
        <ul class="praise">
            <li><i></i>满1年奖励100分</li>
            <li><i></i>满2年奖励100分</li>
            <li><i></i>满3年奖励100分</li>
            <li><i></i>满4年奖励100分</li>
            <li><i></i>满5年奖励100分</li>
        </ul>
        <div class="paddingAll bgWhite fs30 borderBottom marginTop">
            <i class="icon iconfont icon-education fs36"></i>
            <span>学历：本科</span>
            <span class="fr">
                +200
            </span>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-zhicheng fs36"></i>
                <span>职称：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll">
                    中级美导dddsdf
                    <span class="fr">+200分</span>
                </div>
                <div class="  paddingAll">
                    中级美导dd
                    <span class="fr">+200分</span>
                </div>
            </div>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-renwu1 fs36"></i>
                <span>荣誉：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll">
                    优秀员工
                    <span class="fr">+200分</span>
                </div>
                <div class="  paddingAll">
                    出色党员
                    <span class="fr">+200分</span>
                </div>
            </div>
        </div>
        <div class="paddingLeft  borderBottom bgWhite overflow mulItem fs30">
            <div class="left paddingTop paddingBottom">
                <i class="icon iconfont icon-techang fs36"></i>
                <span>特长：</span>
            </div>
            <div class="right">
                <div class=" borderBottom paddingAll">
                    唱歌d
                    <span class="fr">+200分</span>
                </div>
                <div class="  paddingAll">
                    中级美导dd
                    <span class="fr">+200分</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .mulItem{
        .left{
            .fl;
            width: 1.4rem;
        }
        .right{
            .fr;
            width: 5.7rem;
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
            return {}
        }
    }
</script>