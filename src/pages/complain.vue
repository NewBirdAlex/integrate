<template>
    <div>

        <div class=" wrap">
            <InputComp v-for="(item,index) in inputData" :key="index"
                       :conttitle="item.title"
                       :need="item.need"
                       :note="item.ph"
                       :num='index'
                       :content="item.content"
                       :inpType="item.type"
                       :selRange="item.selRange"
                       @getData="getData(item)"
                       v-if="index <3"
            ></InputComp>
            <div class="marginTop"></div>

            <subTitle :content="'附加图片'" :subWord="'（6/9）'"></subTitle>
            <div class="paddingAll bgWhite">
                <!--<vue-core-image-upload-->
                <!--class="btn btn-primary"-->
                <!--:crop="false"-->
                <!--@imageuploaded="imageuploaded"-->
                <!--@imagechanged="imagechanged"-->
                <!--:data="{}"-->
                <!--:max-file-size="5242880"-->
                <!--url="http://101.198.151.190/api/upload.php" >-->
                <!--</vue-core-image-upload>-->

                <!--element ui-->
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="marginTop"></div>

            <subTitle :content="''" :subWord="'(如对该审批项目积分有异议，请修改提交进行二次审批)'" :need="false"></subTitle>

            <choosePeople v-for="(item,index) in peopleList" :name="item.name"
                          :key="index" :point="item.point" :range="item.range"
                          :ind="index"
                          @changePoint="changePoint">
            </choosePeople>
            <InputComp v-for="(item,index) in inputData" :key="index"
                       :conttitle="item.title"
                       :need="item.need"
                       :note="item.ph"
                       :num='index'
                       :content="item.content"
                       :inpType="item.type"
                       :selRange="item.selRange"
                       @getData="getData(item)"
                       v-if="index >=3"
            ></InputComp>
            <!--审批人-->
            <div class="marginTop">
                <subTitle :content="'审批人'" :subWord="''" :need="true"></subTitle>
                <!--<div>-->
                    <!--<div>-->
                        <!--<div class="left">-->
                            <!--<i class="icon iconfont icon-gouxuan blue"></i>-->
                        <!--</div>-->
                        <!--<div class="right">-->
                            <!--<img src="../assets/img/head.png" class="headPicture fl" alt="">-->
                            <!--<div>-->
                                <!--<p>李拉拉 <span>提交申请</span></p>-->
                                <!--<p><span>都烂工厂</span> <span>07-02 12:06</span></p>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
            <!--抄送-->
            <div class="marginTop">
                <subTitle :content="'抄送'" :subWord="''" :need="false"></subTitle>
                <div class="paddingAll overflow bgWhite tac fs28">
                    <div class="spr overflow fl marginBottom" v-for="i in 1">
                        <div class="ps fl">
                            <img src="../assets/img/head.png" class="headPicture" alt="">
                            <p class="marginTop">欧阳莉</p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="add fl" @click="markPerson('chaosong')">
                        <i class="icon iconfont icon-jia gray"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="confBtn">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";
    .add{
        .border;
        border-radius: 50%;
        padding: 0.2rem;
        i{
            font-size: 0.5rem;
        }
    }
    .fs36{font-size: 0.36rem!important;}
    h3 {
        .tac;
        padding: 0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
    .wrap{
        background:@grayBg;
    }
    .icon{
        /*<!--font-size: @fs30!important;-->*/
    }
</style>
<script>
    import InputComp from '../components/inputComp.vue'
    import subTitle from '../components/subTitle.vue'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import choosePeople from '../components/choosePeople.vue'

    export default {
        data() {
            return {
                showStaff:false,
                dialogImageUrl: '',
                dialogVisible: false,
                inputData: [
                    {
                        title: "申诉积分",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'inputSelect',
                        selRange:[80,90,100]
                    },
                    {
                        title: "审批内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea',
                        selRange:[]
                    },
                    {
                        title: "审批备注",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea',
                        selRange:[]
                    },
                    {
                        title: "申诉理由",
                        need: false,
                        ph: "请输入内容",
                        content: "我认为我应该加上积分",
                        type: 'textarea',
                        selRange:[]
                    },
                    {
                        title: "积分类型",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'select',
                        selRange:[80,90,100]
                    }
                ],
                peopleList:[
                    {
                        name:"alex2",
                        point:"+80",
                        range:['+80','+160','-80','-160']
                    }
                ],
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
            }
        },
        methods: {
            getData(event) {
                console.log(event)
                this.inputData[data.index].content = data.content;
            },
            markPerson(msg){
                console.log(msg )
            },
            accept(data){
                this.showStaff=!this.showStaff;
            },
            //            上传图片recall
            imageuploaded(res) {
                if (res.errcode == 0) {
                    this.src = res.data.src;
                }
            },
            imagechanged(data){
                console.log(data)
            },
            changePoint(msg){
                console.log(msg)
                this.peopleList[msg.index].point=msg.value;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        components: {
            InputComp,
            subTitle,
            VueCoreImageUpload,
            choosePeople

        }
    }
</script>