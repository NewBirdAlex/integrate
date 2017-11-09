<template>
    <div>

        <div class=" wrap">
            <myInput v-for="(item,index) in inputData" :key="index"
                     :conttitle="item.title"
                     :need="item.need"
                     :note="item.ph"
                     v-model="item.content"
                     :inpType="item.type"
                     :inputType="item.inputType?item.inputType:'text'"
            ></myInput>
            <mySelect :content="selectType" :selProp="'selectType'" @getData="getSelect"></mySelect>
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

            <subTitle :content="'表扬员工'" :subWord="'(默认申请自己的，可帮其他同事申请)'" :need="true"></subTitle>

            <choosePeople v-for="(item,index) in peopleList" :name="item.name"
                          :key="index" :point="item.point" :range="item.range"
                          :ind="index"
                          @changePoint="changePoint">
                <span @click="delPerson(index)" class="marginLeft"><i class="icon iconfont icon-shanchu fs36 gray" ></i></span>
            </choosePeople>
            <subTitle :content="'全选积分'" :subWord="'(选择可批量修改申请的积分)'" :need="false">
                <span class="fr marginRight"><i class="icon iconfont icon-gouxuan blue"></i></span>
            </subTitle>
            <!--选择员工-->
            <chooseStaff  @getData="accept"></chooseStaff>

        </div>
        <div class="confBtn">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    /*@import "../assets/font/font1/iconfont.css";*/
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
    import myInput from '../components/myInput.vue'
    import mySelect from '../components/mySelect.vue'
    import subTitle from '../components/subTitle.vue'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import choosePeople from '../components/choosePeople.vue'
    import chooseStaff from '../components/chooseStaff.vue'

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                selectType:{
                    name: '积分类型',
                    need: true,
                    selValue: '',
                    selectRange: [
                        '品德',
                        '行为',
                        '业绩'
                    ]
                },
                inputData: [
                    {
                        title: "表扬标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "表扬内容",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input',
                        selRange:[]
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
            getSelect(data) {
                this[data.name].selValue = data.val;
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
            subTitle,
            VueCoreImageUpload,
            choosePeople,
            mySelect,
            myInput,
            chooseStaff
        }
    }
</script>