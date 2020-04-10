<template>
    <div class="main">
        签到
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {

        forbidBack(){
            var _this = this;
            _this.$router.replace({path: '/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;   
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.forbidBack,false);
        };
    }   
}
</script>

<style scoped>
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #f0f0f0;
        padding-bottom: 1.09rem;
        box-sizing: border-box;
    }
</style>