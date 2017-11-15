<template>
    <div>
        <mySelect :content="selectType" :selProp="'selectType'" @getData="getSelect"></mySelect>
        <div :value=""></div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import mySelect from '../components/mySelect.vue'
    export default {
        data() {
            return {
                selValue:'',
                selectType:{
                    name: '积分类型',
                    need: true,
                    selectValue:null,
                    selValue: '品德',
                    selectRange: [
                        '品德',
                        '行为',
                        '业绩'
                    ]
                }
            }
        },
        props:{
            type:Number
        },
        watch:{
            value(val) {
                console.log(val);
                this.visible = val;
            },
            selValue(val) {
                this.$emit('input', val);
            }
        },
        methods:{
            getSelect(data) {
                this[data.name].selValue = data.val;
                if(this.selValue=='品德分') var type = 1;
                if(this.selValue=='行为分') var type = 2;
                if(this.selValue=='业绩分') var type = 3;
                if(this.selValue=='基础分') var type = 4;
                this.$emit('receiveJifenType',type)
            },
        },
        mounted() {
            if (this.value) {
                if(this.value==1) this.selectType.selValue=='品德分';
                if(this.value==2) this.selectType.selValue=='行为分';
                if(this.value==3) this.selectType.selValue=='业绩分';
                if(this.value==4) this.selectType.selValue=='基础分';
                this.selectValue = this.value;
            }
        },
        components: {
            mySelect
        }
    }
</script>