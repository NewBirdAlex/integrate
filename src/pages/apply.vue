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

            <subTitle :content="'申请人'" :subWord="'(默认申请自己的，可帮其他同事申请)'" :need="true"></subTitle>

            <choosePeople v-for="(item,index) in peopleList" :name="item.name"
                          :key="index" :point="item.point" :range="item.range"
                          :ind="index"
                          @changePoint="changePoint">
                <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
            </choosePeople>
            <div class="bgWhite paddingAll lh40 fs28">
                <strong>全选积分</strong>
                <span class="gray">(选择可批量修改申请的积分)</span>
                <span class="fr marginRight cl" :class="{'border':!selAll}" @click="selAll=!selAll"><i class="icon iconfont icon-gouxuan blue fs36" v-if="selAll"></i></span>
            </div>

            <!--选择员工-->
            <chooseStaff  @getData="accept"></chooseStaff>

            <InputComp v-for="(item,index) in inputData" :key="index"
                       :conttitle="item.title"
                       :need="item.need"
                       :note="item.ph"
                       :num='index'
                       :content="item.content"
                       :inpType="item.type"
                       :selRange="item.selRange"
                       @getData="getData(item)"
                       v-if="index ==3"
            ></InputComp>
            <!--审批人-->
            <div class="marginTop">
                <subTitle :content="'审批人'" :subWord="''" :need="true"></subTitle>
                <div class="paddingAll overflow bgWhite tac fs28">
                    <div class="spr overflow fl marginBottom" v-for="i in 4">
                        <div class="ps fl">
                            <img src="../assets/img/head.png" class="headPicture" alt="">
                            <p class="marginTop">欧阳莉</p>
                        </div>
                        <div class="pt fl marginTop gray marginLeft marginRight">
                            .......
                        </div>
                    </div>
                    <div class="add fl" @click="markPerson('shenpi')">
                        <i class="icon iconfont icon-jia gray"></i>
                    </div>
                </div>
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
    .cl{
        .fr;
        width: 0.4rem;
        height: 0.4rem;
        .tac;
        line-height: 0.4rem;
        border-radius: 50%;
    }
</style>
<script>
    import InputComp from '../components/inputComp.vue'
    import subTitle from '../components/subTitle.vue'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import choosePeople from '../components/choosePeople.vue'
    import chooseStaff from '../components/chooseStaff.vue'

    export default {
        data() {
            return {
                showStaff:false,
                dialogImageUrl: '',
                dialogVisible: false,
                selAll:false,
                inputData: [
                    {
                        title: "审批标题",
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
                        type: 'input',
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
                    },
                    {
                        name:"ben",
                        point:"+80",
                        range:['+80','+160','-80','-160']
                    },
                    {
                        name:"ben",
                        point:"+80",
                        range:['+80','+160','-80','-160']
                    },
                    {
                        name:"ben",
                        point:"+80",
                        range:['+80','+160','-80','-160']
                    },
                    {
                        name:"ben",
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
            delPerson(index){
                this.peopleList.splice(index, 1)
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
            choosePeople,
            chooseStaff
        }
    }
</script>