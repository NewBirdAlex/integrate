<template>
    <div>
        <h3>审批</h3>
        <div class=" wrap">
            <choosePeople v-for="(item,index) in mainPerson" :name="item.name"
                          :key="index" :point="item.point" :range="item.range"
                          :ind="index"
                          @changePoint="changePoint">
            </choosePeople>

            <subTitle :content="'表扬员工'" :subWord="'(默认申请自己的，可帮其他同事申请)'" :need="true"></subTitle>
            <choosePeople v-for="(item,index) in peopleList" :name="item.name"
                          :key="index" :point="item.point" :range="item.range"
                          :ind="index"
                          @changePoint="changePoint">
                <i class="icon iconfont icon-gouxuan " @click="delPerson(index)"></i>
            </choosePeople>

            <subTitle :content="'审批备注'"></subTitle>
            <div class="bgWhite paddingAll overflow">
                <textarea class="spbz" name="" maxlength="100" v-model="noteContent" @input="getLeftWord"  placeholder="添加备注信息" id="" cols="30" rows="10"></textarea>
                <p>
                    <span class="fr gray"> {{leftWord}}/100</span>
                </p>
            </div>

            <subTitle :content="'附加图片'" :subWord="'（6/9）'"></subTitle>
            <div class="paddingAll bgWhite">
                <vue-core-image-upload
                        class="btn btn-primary"
                        :crop="false"
                        @imageuploaded="imageuploaded"
                        :data="{}"
                        :max-file-size="5242880"
                        url="http://101.198.151.190/api/upload.php" >
                </vue-core-image-upload>
            </div>
        </div>
        <div class="confBtn" @click="confirmHandle">确定</div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    @import "../assets/font/font1/iconfont.css";

    h3 {
        .tac;
        padding: 0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
    .wrap{
        background:@grayBg;
        .icon-gouxuan {
            color:@blue!important;
        }
    }
    .icon{
        font-size: @fs30!important;
    }
    .spbz{
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        height: 2rem;
        line-height: 0.4rem;
        font-size: @fs30;
    }
</style>
<script>

    import subTitle from '../components/subTitle.vue'
    import VueCoreImageUpload from 'vue-core-image-upload'
    import choosePeople from '../components/choosePeople.vue'
    export default {
        computed:{
            leftWord(){
                let num =this.noteContent.length>=100?100:this.noteContent.length;
                return num;
            }
        },
        data() {
            return {
                noteContent:"",
                mainPerson:[{
                    name:"alex2",
                    point:"+80",
                    range:['+80','+160','-80','-160']
                }],
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
            getLeftWord(event){

            },
            getData(data) {
                console.log(data);
                this.inputData[data.index].content = data.content;
            },
            confirmHandle(){

                this.$router.push({path:'/spList'})
            },
//            上传图片recall
            imageuploaded(res) {
                if (res.errcode == 0) {
                    this.src = res.data.src;
                }
            },
            delPerson(index){
                this.peopleList.splice(index, 1)
            },
            changePoint(msg){
                console.log(msg)
                this.peopleList[msg.index].point=msg.value;
            }
        },
        components: {
            subTitle,
            VueCoreImageUpload,
            choosePeople
        }
    }
</script>