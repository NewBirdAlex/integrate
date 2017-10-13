<template>
    <div>
        <div class="normalTille">您本月的可用积分：600分</div>
        <InputComp v-for="(item,index) in inputData" :key="index"
                   :conttitle="item.title"
                   :need="item.need"
                   :note="item.ph"
                   :num='index'
                   :content="item.content"
                   :inpType="item.type"
                   @getData="getData"
        ></InputComp>
        <showRange></showRange>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wrap:nth-child(odd){
        margin-bottom: 0.2rem;
    }

</style>
<script>
    import InputComp from '../components/inputComp.vue'
    import showRange from '../components/showRange.vue'
    export default {
        data() {
            return {
                inputData: [
                    {
                        title: "任务标题",
                        need: true,
                        ph: "请输入内容",
                        content: "任务类型固定为抢单任务",
                        type: 'input'
                    },
                    {
                        title: "任务描述",
                        need: true,
                        ph: "请输入内容",
                        content: "请描述任务",
                        type: 'textarea'
                    },
                    {
                        title: "积分类型",
                        need: true,
                        ph: "请输入内容",
                        content: "",
                        type: 'inputSelect'
                    },
                    {
                        title: "任务积分",
                        need: true,
                        ph: "请输入内容",
                        content: "每人都会获得，积分为整数，如100",
                        type: 'input'
                    },
                    {
                        title: "限制人数",
                        need: true,
                        ph: "请输入内容",
                        content: "请输入任务限制人数",
                        type: 'input'
                    }
                ]
            }
        },
        methods:{
            getData(data) {
                console.log(data);
                this.inputData[data.index].content = data.content;
            }
        },
        components: {
            InputComp,
            showRange
        }
    }
</script>