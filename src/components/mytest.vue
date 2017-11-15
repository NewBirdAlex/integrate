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
                alert('change'+1)
                alert(this.visible);
                this.visible = val;
                alert(this.visible);

            },
            visible(val) {
                alert("click"+2)
                alert(this.visible);

                this.$emit('input', val);
                alert(this.visible);

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