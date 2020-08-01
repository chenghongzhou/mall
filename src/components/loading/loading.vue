<template>
    <div class="main" v-if="show">
        <div class="main_box">
            <div class="container">
                <div class="loading"></div>
            </div>
        </div>
    </div>
   
</template>
<script>
export default {
    name: 'loading',
    data(){
        return {
            show: false
        }
    }
}
</script>
<style scoped>
.main{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
}
.main_box{
    width: 100%;
    height: 100%;
    position: relative;
}
.container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
 
.loading {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 5px #ffffff solid;
    border-right-color: #87CEEB;
    animation: loading 1s linear infinite;
}
 
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>