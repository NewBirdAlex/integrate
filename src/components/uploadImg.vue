<template>
    <div class="bgWhite">
        <subTitle :content="'附加图片'" :subWord="'（'+imgNum+'/9）'"></subTitle>
        <!--<div class="imgwrap overflow" v-if="imgList.length">-->
            <!--<div class="imgItem" v-for="(item ,index) in imgList">-->
                <!--<img  :src='item' alt="">-->
                <!--<i class="icon iconfont icon-shanchu" @click="delImg(index)"></i>-->
            <!--</div>-->
        <!--</div>-->
        <div class="imgItem" v-for="(item ,index) in imgList">
            <img  :src='item' alt="">
            <i class="icon iconfont icon-shanchu" @click="delImg(index)"></i>
        </div>
        <div class="paddingAll setFrame" v-if="imgNum<9">
            <vue-core-image-upload
                    class="btn btn-primary"
                    :crop="false"
                    @imageuploaded="imageuploaded"
                    @imagechanged="imagechanged"
                    compress="60"
                    :max-file-size="5242880"
                    inputOfFile="file"
                    :max-width='maxW'
                    :max-weight='maxH'
                    :url="url+'/imageUpload/imgUploadFile'" >
                <i class="icon iconfont icon-upload"></i>
            </vue-core-image-upload>
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
                maxW:4000,
                maxH:4000,
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
                    this.$store.commit('hideLoading')
                    if(that.imgNum>=9) return
                    that.imgNum+=1;
                    that.imgList .push(res.data.url)
                    that.$emit('getData',this.imgList)
                }else{
                    that.$toast({
                        message: res.data.message,
                        duration: 2000
                    });
                }
            },
            // 异常处理
            errorHandle(err) {
                console.log(err)
            },
            imagechanged(data){
                console.log(data)
                if(data.size>5242880) this.$toast('图片大小超出限制')
                this.$store.commit('showLoading')
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