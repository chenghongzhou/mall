<template>
    <div class="main">
        <div class="header_part" style="position:fixed;top:0;left:0;z-index:10">
            <div class="top">
                    微吧商城
                </div>
            <div class="header">
                <div class="my_img"><img :src="userInfo.headimgurl" alt=""></div>
                <div class="my_info">
                    <div class="my_name">{{userInfo.nickname}}</div>
                    <div class="my_money">{{userInfoData.score || 0}}<i class="money_icon"></i></div>
                </div>
                <div class="my_info_right">
                        <div class="get_integral" @click="taskWall()"><i></i></div>
                        <div class="change_in_record" @click="exchangeRecord()"></div>
                </div>
            </div>
        </div>
        
       <div class="content">
           <div style="height:2.12rem;width:100%"></div>
            <div class="banner_box swiper-container swiper-container1">
                <div class="swiper-wrapper" style="width:100%;">
                        <div class="banner swiper-slide" v-for="(item,index) in banner_list" :key="index">
                            <img :src="item.icon" alt="">
                        </div>
                </div>
                <div class="swiper-pagination swiper-p1" slot="pagination"></div>
            </div>
            <div style="width:0.48rem" ref="activityjz"></div>
            <div class="activity_box">
                <!-- <div class="activity_center"> -->
                    <div class="activity_scoll">
                        <div class="activity_box_main" ref="activityBoxMain">
                            <div class="activity_list" v-for="(item, index) in activity_list" :key="index" @click="goTo(item)" ref="activityChild">
                                <img :src="item.icon" alt="">
                                <div class="activity_name">{{item.name}}</div>
                                <i class="activity_hot" v-if="item.ishot && item.ishot == 1"></i>
                            </div>
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
                <div style="width:0.2rem" ref="storeGroupsjz"></div>
                <div class="contain">
                    <div class="contain_top"><i></i>兑好物</div>
                    <div class="contain_tab_box">
                        <div class="contain_tab_scroll">
                            <div class="contain_tab" ref="storeGroupsBox">
                                <div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == -1}" @click="handleGoodsTypeTab(0,-1)" ref="storeGroupsChild">
                                全部</div>
                                <div class="contain_tab_list" :class="{'contain_tab_list_active':goodsTypeTab == index}" @click="handleGoodsTypeTab(item,index)"
                                v-for="(item,index) in getStoreGroupList" :key="index">
                                {{item.name}}</div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="goods_box">
                        <div class="nodata_good" v-if="goodList.length == 0">暂无数据</div>
                        <div class="goods_list" @click="goodDetail(item)" v-for="(item,index) in goodList" :key="index">
                            <div class="goods_free_shipping"></div>
                            <div class="change_people">{{item.is_buy_nums}}人已兑</div>
                            <div class="goods">
                                <img :src="item.pic" alt="">
                            </div>
                            <div class="goods_name">{{item.name}}</div>
                            <div class="goods_old_price">原价{{item.normal_price}}元</div>
                            <div class="goods_now_price"><span>{{item.is_give_integral}}</span>积分+<span>{{item.current_price}}</span>元</div>
                            <div class="buy_btn">立即兑</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer-view></footer-view>
    </div>
</template>

<script>
import { allget,allgetLogin } from '../../../api/api.js';
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
export default {
    data(){
        return {
            times: 0,
            goodsTypeTab: -1, //商品类型切换
            activityList:[
                {icon:'./static/images/home/activity1.png',text:'签到有礼',ishot:'1',toUrl:'/signIn'},
                {icon:'./static/images/home/activity5.png',text:'关注有礼',ishot:'0',toUrl:'/signIn'},
                {icon:'./static/images/home/activity3.png',text:'阅读有赏',ishot:'0',toUrl:'/read'},
                {icon:'./static/images/home/activity4.png',text:'幸运转盘',ishot:'0',toUrl:'/luckDraw'},
                {icon:'./static/images/home/activity2.png',text:'推广链接',ishot:'0',toUrl:'/extension'},
            ],
            appid:'',
            open_id:'',
            userInfo:{}, //用户信息
            userInfoData: {},  //用户信息包含积分
            activity_list:[],  //活动列表
            getStoreGroupList:[],  //获取店铺列表
            goodList: [],  //商品列表
            banner_list: [],  //banner
        }
    },
    methods:{
        handleGoodsTypeTab(rows,index){
            var _this = this;
            var id = '';
            index == -1?id = -1:id = rows.group_id;
            _this.goodsTypeTab = index;
            _this.getStoreItems(id);
        },
        //授权登陆
        login(){
            var appid = this.appid;
            var url = 'http%3a%2f%2fv8homepage.youwoxing.net';
            if(config.thirdParty().isWechat == true){
                // window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=123123&component_appid=wx00f2bf419bcd81c9")
            }
        },
        //获取openid
        getOpenId(){
            var _this = this;
            var formData = {
                "appid":_this.appid,
                "code":"021kWBtC069Hdk2OfSwC08DDtC0kWBtr"
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allgetLogin+"/GetOpenID/",formData,headerConfig).then((res) => {
                if(res.data.open_id != ""){
                     _this.open_id = res.data.open_id;
                     config.setCookie(
                        'openid', 
                        JSON.stringify(res.data), 
                        7
                    );
                }else{
                    _this.open_id = JSON.parse(config.getCookie('openid')).open_id;
                };
                _this.getUserInfo();
            }).catch(() => {
                console.log('error');
            });
        },
        //获取用户信息
        getUserInfo(){
            var _this = this;
            var formData = {
                "openid":_this.open_id,
                "appid":_this.appid
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allgetLogin+"/GetUserInfo/",formData,headerConfig).then((res) => {
                if(res.data && res.data.nickname && res.data.nickname != ''){
                    _this.userInfo = res.data;
                    config.setCookie(
                        'userInfo', 
                        JSON.stringify(_this.userInfo), 
                        7
                    );
                }else if(res.data.code == 1){
                    _this.userInfo = JSON.parse(config.getCookie('userInfo'));
                };
                _this.getUserInfoMy();
                _this.updateUserInfo();
                _this.getActivityList();
                _this.getStoreGroups();
                _this.getStoreItems(-1);
                _this.getBanner();
                
            }).catch(() => {
                console.log('error');
            });
        },
        //上传用户信息
        updateUserInfo(){
            var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1001,
                "data":{
                    "avatar_url":_this.userInfo.headimgurl,
                    "nick_name":_this.userInfo.nickname,
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/c_account/update_user_data",formData,headerConfig).then((res) => {
                
            }).catch(() => {
                console.log('error');
            });
        },
        //获取用户信息和金币
        getUserInfoMy(){
            var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1001,
                "data":{
                    "avatar_url":_this.userInfo.headimgurl,
                    "nick_name":_this.userInfo.nickname,
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/c_account/get_user_info",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.userInfoData = res.data.user_data;
                    config.setCookie(
                        'userInfoData', 
                        JSON.stringify(_this.userInfoData), 
                        7
                    );
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取活动列表
        getActivityList(){
             var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/activity/get_activities",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                   _this.activity_list = res.data.activity_list;
                   setTimeout(() => {_this.setActivity();},0)
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取banner
        getBanner(){
             var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/get_banners",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                   _this.banner_list = res.data.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取店铺类型
        getStoreGroups(){
            var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1002,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/get_store_groups",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                   _this.getStoreGroupList = res.data.group_list;
                   setTimeout(() => {_this.setStoreGroups();}, 0)
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取店铺商品
        getStoreItems(group){
            var _this = this;
            var formData = {
                "open_id":_this.open_id,
                "store_id":1002,
                "data": {
                    "group":group
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/get_items",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    var params = res.data.product_list;
                    params.forEach((element,index) => {
                        var nameNums = parseInt(Math.random()*(20)+1,10);
                        element.is_buy_nums = 50*nameNums+'+';
                    });
                   _this.goodList = params;
                   setTimeout(() => {_this.banner1()},500);
                }else{
                    config.layerMsg(res.data.msg, 2);
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
        goTo(item){
            var sys_activity_id = item.sys_activity_id;
            var toPath = '';
            sys_activity_id == 1?toPath = '/signIn':sys_activity_id == 2?toPath = '/read':sys_activity_id == 3?toPath = '/extension':sys_activity_id == 4?toPath = '/luckDraw':toPath='';
            this.$router.replace({path:toPath});
        },
        //活动入口的设计
        setActivity(){
            var _this = this;
            var {activityBoxMain, activityChild, activityjz} = _this.$refs;
            var len = _this.activity_list.length;
            if(len <= 0){
                return false;
            };
            activityBoxMain.style.width = (activityChild[0].getBoundingClientRect().width*(len) + activityjz.getBoundingClientRect().width*(len-1)) +2+'px';
        },
        //店铺类型
        setStoreGroups(){
            var _this = this;
            var {storeGroupsBox, storeGroupsChild, storeGroupsjz} = _this.$refs;
            var len = _this.getStoreGroupList.length+1;
            if(len <= 0){
                return false;
            };
            storeGroupsBox.style.width = (storeGroupsChild.getBoundingClientRect().width*(len) + storeGroupsjz.getBoundingClientRect().width*(len-1)) +15+'px';
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord'});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        goodDetail(rows){
            this.$store.state.goodInfo = rows;
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