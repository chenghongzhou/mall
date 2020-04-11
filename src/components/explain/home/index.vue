<template>
    <div class="main">
        <div class="top">
            <i class="top_close"></i>
            微吧商城
            <div class="top_more"></div>
        </div>
       <div class="header">
           <img src="../../../../static/images/home/my_img.png" alt="" class="my_img">
           <div class="my_info">
               <div class="my_name">青松少女</div>
               <div class="my_money">1212<i class="money_icon"></i></div>
           </div>
           <div class="my_info_right">
                <div class="get_integral"><i></i></div>
                <div class="change_in_record"></div>
            </div>
       </div>
       <div class="banner_box">
           <div class="banner">
               <img src="../../../../static/images/home/banner.png" alt="">
           </div>
       </div>
        <div class="activity_box">
            <div class="activity_box_main">
                <div class="activity_list">
                    <img src="../../../../static/images/home/activity1.png" alt="">
                    <div class="activity_name">每日签到</div>
                </div>
                <div class="activity_list">
                    <img src="../../../../static/images/home/activity2.png" alt="">
                    <div class="activity_name">积分商城</div>
                </div>
                <div class="activity_list">
                    <img src="../../../../static/images/home/activity3.png" alt="">
                    <div class="activity_name">阅读有赏</div>
                </div>
                <div class="activity_list">
                    <img src="../../../../static/images/home/activity4.png" alt="">
                    <div class="activity_name">幸运转盘</div>
                </div>
            </div>
        </div>
        <div class="activity_entra_box">
            <div class="activity_entra">
                <img src="../../../../static/images/home/activity_entra.png" alt="">
            </div>
        </div>

        <div class="contain">
            <div class="contain_top"><i></i>兑好物</div>
            <div class="contain_tab_box">
                <div class="contain_tab">
                    <div class="contain_tab_list contain_tab_list_active">全部商品</div><!--
                    --><div class="contain_tab_list">热门兑换</div><!--
                    --><div class="contain_tab_list">纯积分</div><!--
                    --><div class="contain_tab_list">全国包邮</div><!--
                    --><div class="contain_tab_list">爆款商品</div>
                </div>
            </div>
            <div class="goods_box">
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <img src="../../../../static/images/home/goods.png" alt="" class="goods">
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元</div>
                    <div class="buy_btn">立即兑</div>
                </div>
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <img src="../../../../static/images/home/goods.png" alt="" class="goods">
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元</div>
                    <div class="buy_btn">立即兑</div>
                </div>
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <img src="../../../../static/images/home/goods.png" alt="" class="goods">
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元</div>
                    <div class="buy_btn">立即兑</div>
                </div>
            </div>
        </div>

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
            
        },
        // goNext(){
        //     this.$router.replace({path:'/signIn'})
        // }
    },
    mounted(){
        
    }
}
</script>


<style scoped>
@import './index.css';
</style>