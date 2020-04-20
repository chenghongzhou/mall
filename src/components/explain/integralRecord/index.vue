<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            积分记录
        </div>
        <div class="header">
            <div class="my_intergal_box">
                <img src="../../../../static/images/intergral/intergral_icon.png" alt="" class="intergral_icon">
                <div class="intergal_my_box">
                    <div class="intergal_nums">6564</div>
                    <div class="intergal_msg">累计领取</div>
                </div>
            </div>
            <div class="gift_box">
                <img src="../../../../static/images/intergral/gift.png" alt="" class="gift_icon">
                <div class="intergal_my_box">
                    <div class="gift_exchange">福利兑换</div>
                    <div class="intergal_msg" style="margin-top:0.05rem">累计领取</div>
                    <div class="go_in"></div>
                </div>
            </div>
        </div>
        <div class="list_box">
            <div class="list">
                <div class="list_left">
                    <div class="list_msg">每日签到</div>
                    <div class="time">2020-05-20 15:20:56</div>
                    <div class="nums">500</div>
                    <div class="list_intergral_icon"></div>
                </div>
            </div>
            <div class="list">
                <div class="list_left">
                    <div class="list_msg">每日签到</div>
                    <div class="time">2020-05-20 15:20:56</div>
                    <div class="nums">500</div>
                    <div class="list_intergral_icon"></div>
                </div>
            </div>
            <div class="list">
                <div class="list_left">
                    <div class="list_msg">每日签到</div>
                    <div class="time">2020-05-20 15:20:56</div>
                    <div class="nums subtract">-500</div>
                    <div class="list_intergral_icon"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        forbidBack(){
            var pervePage = this.$route.query.recordPage;
            this.$router.replace({path:'/orderDetail',query: {recordPage:pervePage}});
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
      
        _this.$nextTick(() => {
           
        });
        config.isGoBack(_this.forbidBack);
        
    }
}
</script>

<style scoped>
@import './index.css';
</style>