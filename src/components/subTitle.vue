<template>
    <div>
        <h3 class="">
            {{content}}<span class="gray">{{subWord}}</span>
            <span class="red" v-if="need">*</span>
            <slot></slot>
        </h3>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    h3{
        .paddingAll;
        background: white;
        border-bottom: @border;
        .red{
            position: relative;
            top:0.05rem;
        }
    }
</style>
<script>
    export default {
        data() {
            return {}
        },
        props:[
            'content',
            'subWord',
            'need'
        ]
    }
</script>