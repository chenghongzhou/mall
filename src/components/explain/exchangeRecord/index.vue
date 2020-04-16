<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            兑换记录
        </div>
        <div class="tab_box">
            <div class="tab_all" :class="{'tab_active':tabIndex == 1}" @click="handleTabChange(1)"><span>全部<i v-if="tabIndex == 1"></i></span></div>
            <div class="tab_ing" :class="{'tab_active':tabIndex == 2}" @click="handleTabChange(2)"><span>待发货<i v-if="tabIndex == 2"></i></span></div>
            <div class="tab_resive" :class="{'tab_active':tabIndex == 3}" @click="handleTabChange(3)"><span>待收货<i v-if="tabIndex == 3"></i></span></div>
            <div class="tab_sc" :class="{'tab_active':tabIndex == 4}" @click="handleTabChange(4)"><span>已完成<i v-if="tabIndex == 4"></i></span></div>
        </div>
        <div class="list_box">
            <div class="content">
                <div class="list">
                    <div class="order_number">兑换单号：6022545554444455</div>
                    <div class="order_status">待发货</div>
                    <div class="order_info_box">
                        <img src="../../../../static/images/exchangeRecord/good.png" alt="" class="order_good_img">
                        <div class="order_info">
                            <div class="order_name">游戏耳机</div>
                            <div class="good_intr">纯正原声，真实体验</div>
                            <div class="good_price"><i class="money_icon"></i>800+￥900</div>
                            <div class="good_nums">X1</div>
                        </div>
                    </div>
                    <div class="order_money_box">
                        <div class="order_money">
                            <div class="order_money_in">共1件，合计(积分):<span>8540</span></div>
                            <div class="order_money_in" style="margin-top:0.03rem">合计(现金):<span class="money">￥900.00</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabIndex: 1,
        }
    },
    methods: {
        handleTabChange(index){
            var _this = this;
            _this.tabIndex = index;
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            if(prveUrl == '/'){
                window.history.back()
            }else{
                _this.$router.replace({path:'/signIn'});
            };
        },
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
@import './index.css';
</style>