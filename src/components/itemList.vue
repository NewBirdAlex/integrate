<template>
    <div>
        <ul>
            <li v-for="item in itemArray">
                <span class="gray">{{item.name}}</span>
                <span class="fr" :class="{blue:item.addClass}">{{item.content}}</span>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";

    ul{
        padding-top: 0.2rem;
        li{
            font-size: @fs28;
            padding: 0.1rem 0;
        }
    }
</style>
<script>


    export default {
        data() {
            return {

            }
        },
        props:{
            itemArray:{
                type:Array
            }
        },
        mounted(){
        },
        created(){
        }
    }
</script>