<template>
    <div>
        <ul class=""
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            infinite-scroll-distance="10">
            <slot></slot>

            <li class="tac" v-if="loading">
                <div class="loadmore">
                    <mt-spinner color="#26a2ff"></mt-spinner>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .list {
        line-height: 0.4rem;
    }

    .loadmore {
        width: 10%;
        margin: 0 auto;
        .paddingAll;
    }
</style>
<script>
    export default {
        data() {
            return {}
        },
        methods:{
            loadMore(){
                this.$emit('getList')
            }
        },
        props:{
            loading:{
                type:Boolean,
                default:false
            }
        }
    }
</script>