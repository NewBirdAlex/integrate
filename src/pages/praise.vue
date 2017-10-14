<template>
    <div>
        <h3>领导表扬</h3>
        <div class=" wrap">
            <InputComp v-for="(item,index) in inputData" :key="index"
                       :conttitle="item.title"
                       :need="item.need"
                       :note="item.ph"
                       :num='index'
                       :content="item.content"
                       :inpType="item.type"
                       @getData="getData"
            ></InputComp>
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
        </div>
        <div class="confBtn">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";
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
                dialogImageUrl: '',
                dialogVisible: false,
                inputData: [
                    {
                        title: "表扬标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'inputSelect'
                    },
                    {
                        title: "表扬标题",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'input'
                    },
                    {
                        title: "表扬内容",
                        need: false,
                        ph: "请输入内容",
                        content: "",
                        type: 'textarea'
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
            getData(data) {
                console.log(data);
                this.inputData[data.index].content = data.content;
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
            choosePeople
        }
    }
</script>