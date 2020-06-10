<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            商品详情
        </div>
        <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
            <img :src="params.pic" alt="">
        </div>
        <div class="good_info_box">
            <div class="good_price_part">
                <div class="price">原价：19.9元</div>
                <div class="price_result"><i></i><span>99</span>积分 + <span>9</span>元</div>
            </div>
            <div class="ex_people_nums">
                <div>{{params.is_buy_nums}}人已兑</div>
            </div>
        </div>
        <div class="good_name">{{params.name}}</div>
        <div class="good_good">{{params.name_dec}}</div>
        <div class="good_detail_tl">商品详情</div>
        <div class="good_detail">{{params.dec}}</div>
        <div class="btn" @click="buyGood()">立即兑换</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            params:{},
        }
    },
    methods: {
        buyGood(){
           this.$router.replace({path:'/buyGood'}); 
        },
        forbidBack(){
            this.$router.replace({path:'/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            console.log(_this.$route.query)
            _this.params = _this.$route.query.item;
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>