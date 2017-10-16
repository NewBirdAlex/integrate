<template>
    <div>
        <h3>发布公告</h3>
        <InputComp v-for="(item,index) in inputData" :key="index"
                   :conttitle="item.title"
                   :need="item.need"
                   :note="item.ph"
                   :num='index'
                   :content="item.content"
                   :inpType="item.type"
                   :selRange="item.selRange"
                   @getData="getData"
        ></InputComp>
        <showRange></showRange>
        <div class="confBtn">发布公告</div>

    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    .confBtn {
        margin-top: 2rem;
    }

    h3 {
        .tac;
        padding: 0.26rem;
        font-size: 0.34rem;
        color: #323232;
        background: #fafafa;
    }
</style>
<script>
    import showRange from '../components/showRange.vue'
    import InputComp from '../components/inputComp.vue'

    export default {
        data() {
            return {
                inputData: [
                    {
                        title: "公告内容",
                        need: true,
                        ph: "请输入公告内容",
                        content: "",
                        type: 'textarea',
                        selRange:[]
                    }
                ]
            }
        },
        computed:{
        },
        methods: {
            getData(data) {
                console.log(data);
                this.inputData[data.index].content = data.content;
            }
        },
        components: {
            showRange,
            InputComp
        }
    }
</script>