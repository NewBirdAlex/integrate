<template>
    <div>
        <subTitle :content="'附加图片'" :subWord="'（'+imgNum+'/9）'"></subTitle>
        <div class="imgwrap overflow" v-if="imgList.length">
            <div class="imgItem" v-for="(item ,index) in imgList">
                <img  :src='item' alt="">
                <i class="icon iconfont icon-shanchu" @click="delImg(index)"></i>
            </div>
        </div>
        <div class="paddingAll bgWhite">
            <vue-core-image-upload
                    class="btn btn-primary"
                    :crop="false"
                    @imageuploaded="imageuploaded"
                    @imagechanged="imagechanged"
                    compress="60"
                    inputOfFile="file"
                    :max-file-size="5242880"
                    :url="url+'/imageUpload/imgUploadFile'" >
                <i class="icon iconfont icon-upload"></i>
            </vue-core-image-upload>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .icon{
        font-size: 1.2rem;
    }
    .imgwrap{
        .overflow;
        .bgWhite;
        .imgItem{
            position: relative;
            width: 2rem;
            height: 2rem;
            .marginRight;
            .marginTop;
            .marginLeft;
            .fl;
            .icon{
                position: absolute;
                display: block;
                right: 0;
                top:0;
                max-width: 0.4rem;
                .gray;
                font-size: 0.5rem;
                transform: translate(50%,-30%);
            }
        }
        img{
            width: 2rem;
            height: 2rem;
            .fl;

        }
    }
</style>
<script>
    import VueCoreImageUpload from 'vue-core-image-upload'
    import subTitle from '../components/subTitle.vue'

    export default {
        data() {
            return {
                imgNum:0,
                url:'',
                imgList:[]
            }
        },
        methods:{
            delImg(index){
                if(this.imgList.length==1){
                    this.$nextTick(()=>{
                        this.imgList=[];
                    })
                }else{
                    this.imgList.splice(index,1)
                }
            },
            //            上传图片recall
            imageuploaded(res) {
                let that  = this;

                if (res.code == "200000") {
                    that.imgNum+=1;
                    console.log(that.imgNum)
                    that.imgList .push(res.data.url)
                    that.$emit('getData',this.imgList)
                }else{
                    that.$toast({
                        message: res.data.message,
                        duration: 2000
                    });
                }
            },
            imagechanged(data){

            },
        },
        mounted(){
            if(this.value){
                this.imgList = this.value.split(',')
            }
            this.url = this.$config.path;
        },
        watch:{
            value(val){
                if(val){
                    this.imgList = val.split(',')
                }
            },
            imgList(val){
                this.$emit('input',val.join(','))
            }
        },
        props:{
            value:String
        },
        components: {
            VueCoreImageUpload,
            subTitle
        }
    }
</script>