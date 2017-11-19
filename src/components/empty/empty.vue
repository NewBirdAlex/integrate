<template>
    <div class="wrap2">
        <i class="icon iconfont icon-nodata"></i>
        <h3 class="gray paddingTop">{{value}}</h3>
    </div>
</template>
<script>
    export default {
        props:{
            value:{
                type:String,
                default:'这里还没有任何数据哦'
            }
        }
    }
</script>
<style scoped>
    h3{
        padding-top: 0.3rem;
    }
.wrap2{
    text-align: center;
    padding:0.3rem 0;
    color:#ccc;
    padding-top: 2rem;
}
    i{
        font-size: 2rem;
    }
</style>