<template>
    <div>
        <subTitle :content="'选择您的图片作为头像'" :subWord="''"></subTitle>
        <div class="imgwrap tac">
            <img v-if="imgUrl" :src='imgUrl' alt="">
        </div>
        <div class="paddingAll bgWhite" >
            <vue-core-image-upload
                    class="btn btn-primary"
                    :crop="false"
                    @imageuploaded="imageuploaded"
                    @imagechanged="imagechanged"
                    compress="60"
                    inputOfFile="file"
                    :max-file-size="5242880"
                    :url="url+'/imageUpload/imgUploadFile'" >
                <div class="tac">
                    <i class="icon iconfont icon-upload"></i>

                </div>
            </vue-core-image-upload>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .icon{
        font-size: 2rem;
    }
    .imgwrap{
        .overflow;
        .bgWhite;
        img{
            width: 5rem;
            height: 5rem;
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
                url:'',
                imgUrl:''
            }
        },
        methods:{

            //            上传图片recall
            imageuploaded(res) {
                let that  = this;

                if (res.code == "200000") {
                    that.imgUrl=res.data.url;
                    that.uploadImg();
                }else{
                    that.$toast({
                        message: res.data.message,
                        duration: 2000
                    });
                }
            },
            imagechanged(data){

            },
            uploadImg(){
                let that  = this;
                this.$http.post('/user/updateUser', {
                    userAvatar :this.imgUrl
                })
                    .then(function (response) {
                        if(response.data.code=200000){
                            that.$toast({
                                message:'上传成功',
                                duration:2000
                            });
                        }else{
                            that.$toast({
                                message:response.data.message,
                                duration:2000
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.url = this.$config.path;
        },
        components: {
            VueCoreImageUpload,
            subTitle
        }
    }
</script>