<template>
    <div style="height: 100vh;" class="bgWhite">


        <div class="bgWhite">
            <subTitle :content="'选择您的图片作为头像'" :subWord="''"></subTitle>

            <div class="imgwrap tac">
                <img v-if="imgUrl" :src='imgUrl' alt="">
            </div>
            <div class="paddingAll setFrame" >
                <i class="icon iconfont icon-upload"></i>
                <input type="file" @change="imagechanged">
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .imgwrap{
        .tac;
        .marginTop;
        img{
            width: 4rem;
            height: 4rem;
        }
    }
    .icon{
        font-size: 2rem;
    }
    .setFrame{
        width: 2rem;
        height: 2rem;
       margin:0 auto;
        position: relative;
        input{
            position: absolute;
            width: 100%;
            height: 100%;
            left:0;
            top:0;
            opacity: 0;
            z-index: 10;
        }
    }
    .imgItem{
        position: relative;
        width: 2rem;
        height: 2rem;
        .marginRight;
        .marginTop;
        .marginLeft;
        display: inline-block;
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
        img{
            width: 2rem;
            height: 2rem;
        }
    }
    .icon-upload{
        vertical-align: bottom;
        /*margin-bottom: 0.2rem;*/
        display: inline-block;
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
            },
            imagechanged(event){

                let that = this;

                let ImageObj = event.target.files[0]
                if (!(/^image/.test(ImageObj.type))) {
                    this.$toast('请选取图片文件');
                    return
                }

                /*if(ImageObj.size>5242880){
                    this.$toast('图片尺寸超过5M，请重新选择图片');
                    return
                }*/
                let reader = new FileReader();
                reader.readAsDataURL(ImageObj);
                let Base64 = null;
                reader.onload=function(){
                    Base64 = this.result;
                    let param = new FormData(); //创建form对象
                    param.append('content',Base64);
                    let config = {
                        headers:{'Content-Type':'application/json; charset=utf-8'}
                    };
                    that.$http.post('/imageUpload/imgBase64',{
                        content:Base64
                    })
                        .then(function (response) {
                            if(response.data.code=='200000'){
                                that.$toast({
                                    message:'成功',
                                    duration:1000
                                });

                                that.imgUrl=response.data.data.url;
                                that.uploadImg();
                            }else{
                                that.$toast('上传图片失败')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
        },
        mounted(){
//            this.url = this.$config.path;
        },
        components: {
            VueCoreImageUpload,
            subTitle
        }
    }
</script>