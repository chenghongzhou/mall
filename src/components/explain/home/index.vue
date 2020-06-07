<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                    微吧商城
                </div>
            <div class="header">
                <div class="my_img"><img :src="userInfo.headimgurl" alt=""></div>
                <div class="my_info">
                    <div class="my_name">{{userInfo.nickname}}</div>
                    <div class="my_money">1212<i class="money_icon"></i></div>
                </div>
                <div class="my_info_right">
                        <div class="get_integral" @click="taskWall()"><i></i></div>
                        <div class="change_in_record" @click="exchangeRecord()"></div>
                </div>
            </div>
        </div>
       <div class="content">
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
            <div style="width:0.48rem" ref="activityjz"></div>
            <div class="activity_box">
                <!-- <div class="activity_center"> -->
                    <div class="activity_scoll">
                        <div class="activity_box_main" ref="activityBoxMain">
                            <div class="activity_list" v-for="(item, index) in activityList" :key="index" @click="goTo(item)" ref="activityChild">
                                <img :src="item.icon" alt="">
                                <div class="activity_name">{{item.text}}</div>
                                <i class="activity_hot" v-if="item.ishot == 1"></i>
                            </div>
                            <!-- <div class="activity_list" ref="activityChild" @click="goSign()">
                                <img src="../../../../static/images/home/activity1.png" alt="">
                                <div class="activity_name">每日签到</div>
                            </div>
                            <div class="activity_list">
                                <img src="../../../../static/images/home/activity2.png" alt="">
                                <div class="activity_name">推广链接</div>
                            </div>
                            <div class="activity_list" @click="read()">
                                <img src="../../../../static/images/home/activity3.png" alt="">
                                <div class="activity_name">阅读有赏</div>
                            </div>
                            <div class="activity_list" @click="goLuckDwraw()">
                                <img src="../../../../static/images/home/activity4.png" alt="">
                                <div class="activity_name">幸运转盘</div>
                            </div>
                            <div class="activity_list">
                                <img src="../../../../static/images/home/activity5.png" alt="">
                                <div class="activity_name">关注有礼</div>
                            </div> -->
                        </div>
                    <!-- </div> -->
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
                        <div class="contain_tab_scroll">
                            <div class="contain_tab">
                                <div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 1}" @click="handleGoodsTypeTab(1)">全部商品</div><!--
                                --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 2}" @click="handleGoodsTypeTab(2)">热门兑换</div><!--
                                --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 3}" @click="handleGoodsTypeTab(3)">纯积分</div><!--
                                --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 4}" @click="handleGoodsTypeTab(4)">全国包邮</div><!--
                                --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == 5}" @click="handleGoodsTypeTab(5)">爆款商品</div><!--
                                --><div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab ==6}" @click="handleGoodsTypeTab(6)">热门兑换</div>
                            </div>
                        </div>
                    </div>
                    <div class="goods_box">
                        <div class="goods_list" @click="goodDetail()">
                            <div class="goods_free_shipping"></div>
                            <div class="change_people">123人已兑</div>
                            <div class="goods">
                                <img src="../../../../static/images/home/good4.png" alt="">
                            </div>
                            <div class="goods_name">SWITCH任天堂游戏机</div>
                            <div class="goods_old_price">原价10元</div>
                            <div class="goods_now_price"><span>99</span>积分+<span>99</span>元</div>
                            <div class="buy_btn">立即兑</div>
                        </div>
                        <div class="goods_list" @click="goodDetail()">
                            <div class="goods_free_shipping"></div>
                            <div class="change_people">123人已兑</div>
                            <div class="goods">
                                <img src="../../../../static/images/home/good2.png" alt="">
                            </div>
                            <div class="goods_name">PHILIPS发烧级游戏耳机</div>
                            <div class="goods_old_price">原价10元</div>
                            <div class="goods_now_price"><span>80</span>积分+<span>12</span>元</div>
                            <div class="buy_btn">立即兑</div>
                        </div>
                        <div class="goods_list" @click="goodDetail()">
                            <div class="goods_free_shipping"></div>
                            <div class="change_people">123人已兑</div>
                            <div class="goods">
                                <img src="../../../../static/images/home/good3.png" alt="">
                            </div>
                            <div class="goods_name">APPLE WATCH SH</div>
                            <div class="goods_old_price">原价10元</div>
                            <div class="goods_now_price"><span>50</span>积分+<span>100</span>元</div>
                            <div class="buy_btn">立即兑</div>
                            
                        </div>
                        <div class="goods_list" @click="goodDetail()">
                            <div class="goods_free_shipping"></div>
                            <div class="change_people">123人已兑</div>
                            <div class="goods">
                                <img src="../../../../static/images/home/good4.png" alt="">
                            </div>
                            <div class="goods_name">SWITCH任天堂游戏机</div>
                            <div class="goods_old_price">原价10元</div>
                            <div class="goods_now_price"><span>288</span>积分+<span>140</span>元</div>
                            <div class="buy_btn">立即兑</div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <footer-view></footer-view>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
export default {
    data(){
        return {
            times: 0,
            goodsTypeTab: 1, //商品类型切换
            activityList:[
                {icon:'./static/images/home/activity1.png',text:'签到有礼',ishot:'1',toUrl:'/signIn'},
                {icon:'./static/images/home/activity5.png',text:'关注有礼',ishot:'0',toUrl:'/signIn'},
                {icon:'./static/images/home/activity3.png',text:'阅读有赏',ishot:'0',toUrl:'/read'},
                {icon:'./static/images/home/activity4.png',text:'幸运转盘',ishot:'0',toUrl:'/luckDraw'},
                {icon:'./static/images/home/activity2.png',text:'推广链接',ishot:'0',toUrl:'/extension'},
            ],
            appid:'',
            open_id:'',
            userInfo:{},
        }
    },
    methods:{
        handleGoodsTypeTab(index){
            var _this = this;
            _this.goodsTypeTab = index;
        },
        //授权登陆
        login(){
            var appid = this.appid;
            var url = 'http%3a%2f%2fv8homepage.youwoxing.net';
           // window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=123123&component_appid=wx00f2bf419bcd81c9")
        },
        //获取openid
        getOpenId(){
            var _this = this;
            var formData = {
                "appid":_this.appid,
                "code":"061iP0J82iGnWL06pEK82cdZI82iP0J8"
            };
            // let formData = new FormData();
            // formData.append('appid', _this.appid);
            // formData.append('code', 'oaWxEv6SZ42oA2TBLY-ykhTNWDqE');
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/GetOpenID/",formData,headerConfig).then((res) => {
                _this.open_id = res.open_id;
                // if(res.data.data.code == 1){
                
                // }else{
                //     config.layerMsg(res.data.data.message, 2);
                // };
            }).catch(() => {
                console.log('error');
            });
            _this.getUserInfo()
        },
        //获取用户信息
        getUserInfo(){
            var _this = this;
            var formData = {
                "openid":'oaWxEv6SZ42oA2TBLY-ykhTNWDqE',//_this.open_id,
                "appid":_this.appid
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/GetUserInfo/",formData,headerConfig).then((res) => {
                _this.userInfo = res.data;
                console.log(_this.userInfo.nickname)
                // if(res.data.data.code == 1){
                
                // }else{
                //     config.layerMsg(res.data.data.message, 2);
                // };
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
        goTo(item){
            var toPath = item.toUrl;
            this.$router.replace({path:toPath});
        },
        //活动入口的设计
        setActivity(){
            var _this = this;
            var {activityBoxMain, activityChild, activityjz} = _this.$refs;
            var len = _this.activityList.length;
            if(len <= 0){
                return false;
            };
            activityBoxMain.style.width = (activityChild[0].getBoundingClientRect().width*(len) + activityjz.getBoundingClientRect().width*(len-1)) +2+'px';
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord'});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        goodDetail(){
            this.$router.replace({path:'/goodDetail'});
        },
        forbidBack(){
            // if(config.getHashVReq('recordPage') && config.thirdParty().isWechat == true){
            //     WeixinJSBridge.call('closeWindow');
            // }
            if(config.thirdParty().isWechat == true){
                WeixinJSBridge.call('closeWindow');
            }else{
                this.$router.replace({path:'/'});
                return false;
            }
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
            _this.appid = config.getHashVReq('appid');
            _this.login();
            _this.getOpenId();

            _this.setActivity();
            _this.banner1();
            _this.banner2();
        });
        config.isGoBack(_this.forbidBack);
    }
}
</script>


<style scoped>
@import './index.css';
</style>