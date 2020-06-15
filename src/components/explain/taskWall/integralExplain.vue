<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            积分说明
        </div>
        <div class="content">
            <h1>积分该怎么花？</h1>
            <div class="s_title"><i></i>使用积分兑换商品</div>
            <div class="i_explain">1，兑换优惠券/码  <span>兑换成功后，可以在个人中心查看</span></div>
            <div class="i_explain">2，兑换权益卡  <span>兑换成功后，可以在个人中心查看</span></div>
            <div class="i_explain">3，兑换商品  <span>兑换成功后，可以在我的订单查看发货进度</span></div>

            <h1>该怎么赚积分？</h1>
            <div class="s_title"><i></i>消费</div>
            <div class="i_explain" style="text-indent:0">以下可获得积分的规则可叠加： </div>
            <div class="i_explain">1，所有商品消费1.00元可获得1积分</div>
            <div class="s_title"><i></i>签到</div>
            <div class="i_explain">2，每日签到可得2积分</div>
            <div class="i_explain">3，每连续签到15天可获得188积分</div>
            <div class="i_explain">4，每连续签到6天可获得99积分</div>
            <div class="i_explain">5，每连续签到3天可获得66积分</div>
            <div class="s_title"><i></i>关注公众号可获得100积分</div>

            <h1>常见问题</h1>
            <div class="s_title">1，积分状态</div>
            <div class="i_explain" >积分分收入，支出，冻结3个状态 </div>
            <div class="i_explain" >收入：指的是通过所有渠道获得的积分 </div>
            <div class="i_explain" >支出：指的是消耗的积分 </div>
            <div class="i_explain">冻结：指的是出于保护期内的积分<span>(通过线上下单送的积分，以及通过线上营销满减送的积分将会有15天的保护期)</span></div>
            <div class="s_title">2，积分有效期</div>
            <div class="i_explain" >当前获得的积分为永久有效 </div>
            <div class="s_title">3，优先使用即将过期的积分</div>
            <div class="s_title">4，积分减扣规则</div>
            <div class="i_explain" >通过下单获得的积分，在订单退款时，会相应扣减积分。 </div>
            <div class="s_title">5，积分退回规则</div>
            <div class="i_explain" >下单时使用积分抵现，在整笔订单退款时，则会退回所有失效的积分 </div>
            <div class="i_explain" >在积分商城使用积分兑换，订单退款时，不会退回积分 </div>
            <div class="i_explain" ><span>详情可咨询客服</span></div>
        </div>
        <footer-view></footer-view>  
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
            _this.$router.replace({path:'/taskWall'});
        },
    },
    destroyed(){
       window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        config.isGoBack(_this.forbidBack);
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
    background: #ffffff;
    overflow-y: scroll;
}
.top{
    width: 100%;
    height: 0.96rem;
    padding: 0.3rem;
    font-size: 0.36rem;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
}
.top_close{
    width: 0.16rem;
    height: 0.28rem;
    background: url("../../../../static/images/home/top_close.png") center no-repeat;
    background-size: contain;
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    display: block;
}
.content{
    padding:0 0.3rem 0.3rem;
}
h1{
    font-size: 0.3rem;
    color: #333333;
    margin-top: 0.4rem;
}
.s_title{
    font-size: 0.24rem;
    color: #666666;
    margin-top: 0.1rem;
}
.s_title i{
    display: inline-block;
    width: 3px;
    height: 0.24rem;
    background: #666666;
    vertical-align: middle;
    margin-top: -0.05rem;
    margin-right: 0.08rem;
}
.i_explain{
    font-size:0.24rem;
    color: #666666;
    margin-top: 0.1rem;
    text-indent: 0.3rem;
}
.i_explain span{
    color: #cccccc;
    font-size: 0.2rem;
}
</style>