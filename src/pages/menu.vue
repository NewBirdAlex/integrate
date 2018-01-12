<template>
    <div>
        <div class="overflow bgWhite" >
            <div class="tac item" v-for=" (item,index) in list" :key="index" @click="go(item)">
                <img :src="item.modelCover" alt="">
                <p class="">{{item.modelTitle}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .item{
        .fl;
        width:2.5rem;
        height: 2.5rem;
        border-right: @border;
        .borderBottom;
        .fs30;
        box-sizing: border-box;
        img{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            margin-top: 0.4rem;
            margin-bottom: 0.2rem;

        }
        .crl{
            width: 1.2rem;
            height: 1.2rem;

            margin: 0.5rem auto 0.2rem auto;
            .tac;
            line-height: 1.2rem;
        }
        .icon{
            /*margin-top: 1rem;*/
            /*display: inline-block;*/
            font-size: 0.7rem;
            color: white;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                list:[]
            }
        },
        methods:{
            go(item){
                localStorage.setItem('diaryInf',JSON.stringify(item))
//                console.log(localStorage.getItem('diaryInf'))
                this.$router.push('/workDiary/write');

            },
            getList() {
                let that = this;
                this.$http.post('/dailyModel/dailyModelList', {
                })
                    .then(function (response) {
                        that.list = response.data.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
        },
        mounted(){
            this.getList();
        }
    }
</script>