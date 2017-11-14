<template>
    <div class="wrap bgWhite" :style="{height:height}">
        <div class="top">
            <img src="../assets/img/hx.png" alt="">
            <p>华象积分宝</p>
        </div>

        <div class="middle bgWhite">
            <div>
                <i class="icon iconfont icon-phone blue"></i>
                <input type="tel" class="myInput" placeholder="请输入您的手机号" v-model="phone">
            </div>
            <div>
                <i class="icon iconfont icon-lock blue"></i>
                <input type="password" class="myInput" placeholder="请输入登录密码"  v-model="psw">
            </div>
            <!--<div class="blue marginTop change">修改密码</div>-->
        </div>
        <div class="btn" @click="subLogin">
            登录
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../assets/css/common.less';
    .wrap{
        min-height: 100%;
    }
    .change{
        margin-left: 180px;
    }
    .btn{
        width: 5.20rem;
        height: 0.88rem;
        margin: 0 auto;
        margin-top: 1rem;
        .tac;
        color: white;
        line-height: 0.88rem;
        .fs36;
        background-image: linear-gradient(0deg,
        #56bfe6 0%,
        #8fdffc 100%),
        linear-gradient(
                #fffdf0,
                #fffdf0);
        background-blend-mode: normal,
        normal;
        border-radius: 0.44rem;
    }
    .top{
        height:4.83rem;
        background: url("../assets/img/hxbg.png") no-repeat ;
        background-size: 100% 100%;
        .tac;
        .fs34;
        color:white;
        img{
            width: 1.8rem;
            margin-top: 1rem;
            .marginBottom;
        }
    }
    .blue{
        color:#57c0e6;
    }
    .middle{
        .tac;
        margin:1rem 0;
        .lh50;
        >div{
            .marginBottom;
        }
        .icon{
            font-size: 0.4rem;
            .marginRight;
            margin-bottom: 0.2rem;
        }
        input{
            border-bottom: 1px solid #57c0e6;
            padding:0.2rem;
            .fs28;
            /*margin-top: 0.2rem;*/
            position: relative;
            /*top: 0.05rem;*/
            border-radius: 0;

        }
    }
</style>
<script>
    export default {
        data() {
            return {
                height:'5rem',
                phone:'',
                psw:''
            }
        },
        methods:{
            subLogin(){
                let that = this;
                this.$http.post('/login',{
                    "password": this.psw,
                    "userName": this.phone
                }).then(response =>{
                    console.log(response)
                    if(response.data.code==200000){
                        console.log(JSON.stringify(response.data.data))

                        localStorage.setItem('HXuserMessage',JSON.stringify(response.data.data));
                        this.$store.commit('getLocalUserMessage');
                        this.$toast({
                            message: '登录成功',
                            duration: 2000
                        });
                        this.$router.push('/home');
                    }else{
                        this.$toast({
                            message: response.data.message,
                            duration: 2000
                        });
                    }
                })
                .catch()
            }
        },
        mounted(){
            this.height=document.documentElement.clientHeight+'px';
        }
    }
</script>