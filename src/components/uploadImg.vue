<template>
    <div>
        <subTitle :content="'附加图片'" :subWord="'（6/9）'"></subTitle>
        <div class="imgwrap">
            <img v-for="item in imgList" :src='item' alt="">
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
                    url="http://192.168.0.121:8888/imageUpload/imgUploadFile" >
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
        img{
            width: 2rem;
            height: 2rem;
            .marginRight;
            .marginTop;
            .marginLeft;

        }
    }
</style>
<script>
    import VueCoreImageUpload from 'vue-core-image-upload'
    import subTitle from '../components/subTitle.vue'

    export default {
        data() {
            return {
                imgList:[]
            }
        },
        methods:{
            //            上传图片recall
            imageuploaded(res) {
                console.log(res)
                if (res.code == "200000") {
                    this.imgList .push(res.data.url)
                    this.$emit('getData',this.imgList)
                }else{
                    this.$toast({
                        message: res.data.message,
                        duration: 2000
                    });
                }
            },
            imagechanged(data){

            },
        },
        components: {
            VueCoreImageUpload,
            subTitle
        }
    }
</script>