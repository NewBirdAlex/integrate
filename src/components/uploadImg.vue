<template>
    <div class="bgWhite">
        <subTitle :content="'附加图片'" :subWord="'（'+imgNum+'/9）'"></subTitle>

        <div class="imgItem" v-for="(item ,index) in imgList">
            <img  :src='item' alt="">
            <i class="icon iconfont icon-shanchu" @click="delImg(index)"></i>
        </div>
        <div class="paddingAll setFrame" v-if="imgNum<9">
            <i class="icon iconfont icon-upload"></i>
            <input type="file" @change="imagechanged">
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .icon{
        font-size: 2rem;
    }
    form{
        /*height: 100%!important;*/
    }
    .setFrame{
        width: 2rem;
        height: 2rem;
        display: inline-block;
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
                    that.$http.post(that.url+'/imageUpload/imgBase64',{
                        content:Base64
                    })
                        .then(function (response) {
                            if(response.data.code=='200000'){
                                that.$toast({
                                    message:'成功',
                                    duration:1000
                                });
                                if(that.imgNum>=9) return
                                that.imgNum+=1;
                                that.imgList.push(response.data.data.url)
                                that.$emit('getData',that.imgList)
                            }else{
                                that.$toast('上传图片失败')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
//                let param = new FormData(); //创建form对象
//                param.append('file',ImageObj,ImageObj.name);
//                let config = {
//                    headers:{'Content-Type':'multipart/form-data'}
//                };
//                this.$http.post(this.url+'/imageUpload/imgUploadFile',param,config)

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

            subTitle
        }
    }
</script>