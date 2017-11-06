<template>
    <div>

        <div class="wrap">
            <div class="loader">
                <div class="loader-inner ball-triangle-path">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import "../assets/css/common.less";
    .wrap{
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        /*background: rgba(0,0,0,0.7);*/
        z-index: 1000;
        .tac;
    }
    .loader {
        box-sizing: border-box;
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 25%;
        max-width: 25%;
        height: 200px;
        align-items: center;
        justify-content: center;
        margin:0 auto;
        margin-top: 45%;
    }

    @keyframes ball-triangle-path-1 {
        33% {
            -webkit-transform: translate(25px, -50px);
            transform: translate(25px, -50px);
        }

        66% {
            -webkit-transform: translate(50px, 0px);
            transform: translate(50px, 0px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    .ball-triangle-path {
        position: relative;
        -webkit-transform: translate(-25px, -25px);
        -ms-transform: translate(-25px, -25px);
        transform: translate(-25px, -25px);
    }
    .ball-triangle-path > div{
        background: @blue;
    }
    .ball-triangle-path > div:nth-child(1) {
        -webkit-animation-name: ball-triangle-path-1;
        animation-name: ball-triangle-path-1;
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div:nth-child(2) {
        -webkit-animation-name: ball-triangle-path-2;
        animation-name: ball-triangle-path-2;
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div:nth-child(3) {
        -webkit-animation-name: ball-triangle-path-3;
        animation-name: ball-triangle-path-3;
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid #fff;
    }

    .ball-triangle-path > div:nth-of-type(1) {
        top: 50px;
    }

    .ball-triangle-path > div:nth-of-type(2) {
        left: 25px;
    }

    .ball-triangle-path > div:nth-of-type(3) {
        top: 50px;
        left: 50px;
    }

    @-webkit-keyframes ball-triangle-path-1 {
        33% {
            -webkit-transform: translate(25px, -50px);
            transform: translate(25px, -50px);
        }

        66% {
            -webkit-transform: translate(50px, 0px);
            transform: translate(50px, 0px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-1 {
        33% {
            -webkit-transform: translate(25px, -50px);
            transform: translate(25px, -50px);
        }

        66% {
            -webkit-transform: translate(50px, 0px);
            transform: translate(50px, 0px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @-webkit-keyframes ball-triangle-path-2 {
        33% {
            -webkit-transform: translate(25px, 50px);
            transform: translate(25px, 50px);
        }

        66% {
            -webkit-transform: translate(-25px, 50px);
            transform: translate(-25px, 50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-2 {
        33% {
            -webkit-transform: translate(25px, 50px);
            transform: translate(25px, 50px);
        }

        66% {
            -webkit-transform: translate(-25px, 50px);
            transform: translate(-25px, 50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @-webkit-keyframes ball-triangle-path-3 {
        33% {
            -webkit-transform: translate(-50px, 0px);
            transform: translate(-50px, 0px);
        }

        66% {
            -webkit-transform: translate(-25px, -50px);
            transform: translate(-25px, -50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-3 {
        33% {
            -webkit-transform: translate(-50px, 0px);
            transform: translate(-50px, 0px);
        }

        66% {
            -webkit-transform: translate(-25px, -50px);
            transform: translate(-25px, -50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>