<template>
    <div class="modal"  >
        <div class="close">{{visible}}</div>
        <button  @click="cancel"> click me</button>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number
            }
        },

        data () {
            return {
                visible:0
            }
        },
        watch:{
            value(val) {
                this.visible = val;
            },
            visible(val) {
                this.$emit('input', val);
            }
        },
        methods:{
            cancel(){
                this.visible +=1;
            }
        },
        mounted() {
            if(this.value) this.visible = this.value;
        }
    }
</script>