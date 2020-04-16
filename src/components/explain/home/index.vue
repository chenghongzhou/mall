<template>
    <div class="main">
        <div class="top">
            微吧商城
        </div>
       <div class="header">
           <img src="../../../../static/images/home/my_img.png" alt="" class="my_img">
           <div class="my_info">
               <div class="my_name">青松少女</div>
               <div class="my_money">1212<i class="money_icon"></i></div>
           </div>
           <div class="my_info_right">
                <div class="get_integral" @click="taskWall()"><i></i></div>
                <div class="change_in_record" @click="exchangeRecord()"></div>
            </div>
       </div>
       <div class="banner_box swiper-container swiper-container1">
           <div class="swiper-wrapper" style="width:100%;">
               <div class="banner swiper-slide">
                    <img src="../../../../static/images/home/banner.png" alt="">
                </div>
                <div class="banner swiper-slide">
                    <img src="../../../../static/images/home/banner.png" alt="">
                </div>
                <div class="banner swiper-slide">
                    <img src="../../../../static/images/home/banner.png" alt="">
                </div>
           </div>
           <div class="swiper-pagination swiper-p1" slot="pagination"></div>
       </div>
        <div class="activity_box">
            <div class="activity_box_main" ref="activityBoxMain">
                <div class="activity_list" ref="activityChild" @click="goSign()">
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
                <div class="activity_list">
                    <img src="../../../../static/images/home/activity4.png" alt="">
                    <div class="activity_name">幸运转盘</div>
                </div>
            </div>
        </div>

        <div class="activity_entra_box swiper-container swiper-container2">
            <div class="swiper-wrapper" style="width:100%;">
                <div class="activity_entra swiper-slide">
                    <img src="../../../../static/images/home/activity_entra.png" alt="">
                </div>
                <div class="activity_entra swiper-slide">
                    <img src="../../../../static/images/home/activity_entra.png" alt="">
                </div>
            </div>
            <div class="swiper-pagination swiper-p2" slot="pagination"></div>
        </div>

        <div class="contain">
            <div class="contain_top"><i></i>兑好物</div>
            <div class="contain_tab_box">
                <div class="contain_tab">
                    <div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 1}" @click="handleGoodsTypeTab(1)">全部商品</div><!--
                    --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 2}" @click="handleGoodsTypeTab(2)">热门兑换</div><!--
                    --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 3}" @click="handleGoodsTypeTab(3)">纯积分</div><!--
                    --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 4}" @click="handleGoodsTypeTab(4)">全国包邮</div><!--
                    --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 5}" @click="handleGoodsTypeTab(5)">爆款商品</div><!--
                    --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab ==6}" @click="handleGoodsTypeTab(6)">热门兑换</div>
                </div>
            </div>
            <div class="goods_box">
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <div class="goods">
                        <img src="../../../../static/images/home/good.png" alt="">
                    </div>
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元<div class="buy_btn">立即兑</div></div>
                </div>
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <div class="goods">
                        <img src="../../../../static/images/home/good.png" alt="">
                    </div>
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元<div class="buy_btn">立即兑</div></div>
                </div>
                <div class="goods_list">
                    <div class="goods_free_shipping"></div>
                    <div class="change_people">123人已兑</div>
                    <div class="goods">
                        <img src="../../../../static/images/home/good.png" alt="">
                    </div>
                    <div class="goods_name">蓝月亮</div>
                    <div class="goods_old_price">原价10元</div>
                    <div class="goods_now_price">99积分+1元<div class="buy_btn">立即兑</div></div>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { allget } from '../../../api/api.js';
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
export default {
    data(){
        return {
            times: 0,
            goodsTypeTab: 1, //商品类型切换
        }
    },
    methods:{
        handleGoodsTypeTab(index){
            var _this = this;
            _this.goodsTypeTab = index;
        },
        //login
        login(){
            var _this = this;
            var formData = {
                'open_id': '19231654',
                'store_id': '1001'
            };
            // let formData = new FormData();
            // formData.append('open_id', '19231654');
            // formData.append('store_id', '1001');
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(allget+"/c_account/sign_login/",formData,config).then((res) => {
                if(res.data.data.code == 1){
                    
                }else{
                    config.layerMsg(res.data.data.message, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //上传用户信息
        updateInfo(){
            var _this = this;
            var formData = {
                'avatar_url': 'http://img.dianliaoapp.com/DEBUG/12381/head/1545212384514.png',
                'nick_name': '青葱少女'
            };
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(allget+"/c_account/update_user_data/",formData,config).then((res) => {
                if(res.data.data.code == 1){

                }else{
                    config.layerMsg(res.data.data.message, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //左右滑动宽度设置
        setWidth(){
            var {activityBoxMain, activityChild} = this.$refs;
            activityBoxMain.style.width = activityChild.clientWidth*5+'px';
        },
        //轮播
       banner1(){
           let _this = this;
           let mySwiper1 = new Swiper('.swiper-container1', {
                loop: true, // 循环模式选项
                autoplay : 2000,
                pagination: ".swiper-p1",
                autoplayDisableOnInteraction : false,
                onSlideChangeEnd(swiper){
                    //console.log(swiper.activeIndex)
                }
            });
       },
        //轮播
       banner2(){
           let _this = this;
           let mySwiper2 = new Swiper('.swiper-container2', {
                loop: true, // 循环模式选项
                autoplay : 2500,
                pagination: ".swiper-p2",
                autoplayDisableOnInteraction : false,
                onSlideChangeEnd(swiper){

                }
            });
       },
        goSign(){
            this.$router.replace({path:'/signIn'});
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord'});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        forbidBack(){
            // if(config.getHashVReq('recordPage') && config.thirdParty().isWechat == true){
            //     WeixinJSBridge.call('closeWindow');
            // }
             if(config.thirdParty().isWechat == true){
                WeixinJSBridge.call('closeWindow');
            }
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
            _this.login();
            _this.updateInfo();
            _this.banner1();
            _this.banner2();
        });
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