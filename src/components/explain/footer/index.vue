<template>
    <div>
        <div class="bottom">
           <div class="go_link"></div>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

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
    left: 2.9rem;
    width: 3.4rem;
    height: 0.3rem;
}
</style>