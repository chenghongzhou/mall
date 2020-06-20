<template>
    <div>
        <div class="bottom">
           <div class="go_link" @click="goLink()"></div>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goLink(){
                window.location.href = 'http://v8tob.youwoxing.net/user/login.html';
            }
        }
    }
}
</script>

<style scoped>
.bottom{
    width: 100%;
    height: 1rem;
    background: url("../../../../static/images/luckDraw/footer.png") center no-repeat;
    background-size: contain;
    position: relative;
}
.go_link{
    position: absolute;
    bottom: 0.17rem;
    left: 2rem;
    width: 4rem;
    height: 0.3rem;
}
</style>