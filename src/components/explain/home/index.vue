<template>
    <div class="main">
        点击了按钮{{times}}次
        <div class="btn" @click="openApp()">打开app</div>
        <div class="btn" @click="goNext()">下一页</div>
    </div>
</template>

<script>
import axios from 'axios';
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            times: 0,
        }
    },
    methods:{
        openApp(){
            this.times++;
            window.location.href = 'test://test/test?id=10086';
        },
        goNext(){
            this.$router.replace({path:'/signIn'})
        }
    },
    mounted(){
        
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
        overflow-y: scroll;
        font-size: 0.3rem;
    }
    .btn{
        width:2rem;
        height: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.4rem;
        border-radius: 0.2rem;
        margin:1rem auto;
        border: 0.01rem solid #333;
        text-align: center;
    }

</style>