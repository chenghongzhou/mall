<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            订单详情
        </div>
        <div class="header_bg"></div>
        <div class="content_box">
            <div class="header">
                <div class="order_status_img no_send_good_img"></div>
                <div class="order_status_msg_part">
                    <div class="order_status_msg_title">待发货</div>
                    <div class="order_status_msg">已付款等待商家发货</div>
                </div>
            </div>
            <div class="order_info_this_box">
                <div class="order_main_box">
                    <div class="express">
                        <div class="express_icon"></div>
                        <div class="address_info">
                            <div class="express_info">陈先生  您的包裹已经离开武汉，正发往上海</div>
                            <div class="address_info_address">2020-04-17 15:57:25</div>
                        </div>
                    </div>
                </div>
                <div class="order_info_header">
                    <div class="address_icon"></div>
                    <div class="address_info">
                        <div class="address_info_name">陈先生  1806400664</div>
                        <div class="address_info_address">广东省 深圳市 南山区 深圳湾1号8栋101</div>
                    </div>
                    <div class="order_status">待发货</div>
                </div>
                <div class="line"></div>
                <div class="order_main_box">
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

            <div class="time_box">
                <div>订单编号：565656565656565</div>
                <div>创建时间：2020-04-17 15:57:25</div>
                <div>兑换时间：2020-04-17 15:57:25</div>
            </div>

            <div class="btn"></div>
        </div>


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
            window.history.back()
        }
    },
    mounted(){

    }
}
</script>

<style scoped>
@import './index.css';
</style>