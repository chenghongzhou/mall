<template>
    <div class="main">
        <div class="header_part" style="position:fixed;top:0;left:0;z-index:10;height:1.04rem">
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
       <div class="content" style="margin-bottom:0.2rem">
           <div style="height:1.04rem;width:100%"></div>
            <div class="banner_box swiper-container swiper-container1">
                <div class="swiper-wrapper" style="width:100%;">
                    <div class="banner swiper-slide" v-for="(item,index) in banner_list1" :key="index" @click="goLink(item)">
                        <img :src="item.icon" alt="">
                    </div>
                </div>
                <div class="swiper-pagination swiper-p1" slot="pagination"></div>
            </div>
            <div style="width:0.48rem" ref="activityjz"></div>
            <div class="activity_box">
                    <div class="activity_scoll">
                        <div class="activity_box_main" ref="activityBoxMain">
                            <div class="activity_list" v-for="(item, index) in activity_list" :key="index" @click="goTo(item)" ref="activityChild">
                                <img :src="item.icon" alt="">
                                <div class="activity_name">{{item.name}}</div>
                                <i class="activity_hot" v-if="item.ishot && item.ishot == 1"></i>
                            </div>
                        </div>
                     </div>
            </div>
            <div class="activity_entra_box swiper-container swiper-container2">
                <div class="swiper-wrapper" style="width:100%;">
                    <div class="activity_entra swiper-slide" v-for="(item,index) in banner_list2" :key="index" @click="goLink(item)">
                        <img :src="item.icon" alt="">
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
                        <!-- <div class="change_people">{{item.is_buy_nums}}人已兑</div> -->
                        <div class="goods">
                            <img :src="item.pic" alt="">
                        </div>
                            <!-- <div class="goods_name" :class="{'good_source':item.source == 1}">{{item.name}}</div> -->
                            <div class="goods_name good_source">{{item.name}}</div>
                        <!--<div class="goods_old_price" v-if="item.source == 0">原价{{item.normal_price}}元</div> -->
                        <div class="goods_now_price" v-if="item.source == 1">
                            <div>
                                <span>{{item.cost}}</span>积分
                            </div>
                        </div>
                        <div class="goods_now_price" v-if="item.source == 0">
                            <div v-if="item.buy_type == 1">
                                <span>{{item.cost}}</span>积分
                            </div>
                            <div v-if="item.buy_type == 0">
                                <span>{{(item.current_price/100).toFixed(2)}}元</span>
                            </div>
                            <div v-if="item.buy_type == 2">
                                <span>{{item.cost}}</span>积分<span>+{{(item.current_price/100).toFixed(2)}}元</span>
                            </div>
                        </div>
                        <!-- <div class="buy_btn">立即兑</div> -->
                    </div>
                </div>
            </div>
            
        </div>
        <footer-view style="position:static"></footer-view>  
        

        <div class="login_bg" v-if="login_bg"></div>
    </div>
</template>

<script>
import { allget,allgetLogin,redirectUri,baseZH,homeUrl } from '../../../api/api.js';
import wx from 'weixin-js-sdk';
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
export default {
    data(){
        return {
            times: 0,
            goodsTypeTab: -1, //商品类型切换
            activityList:[
                
            ],
            appid:'',
            open_id:'',//oaWxEv2NUHC4q04-i3IRgFLZTBoU
            userInfo:{}, //用户信息
            userInfoData: {},  //用户信息包含积分
            activity_list:[],  //活动列表
            getStoreGroupList:[],  //获取店铺列表
            goodList: [],  //商品列表
            banner_list1: [],  //banner
            banner_list2: [],  //banner
            tcode:'',
            login_bg:false,
            position: '',  //跳转定位
            gt:'',
            storeId:'',
            pevrAppid:'',
            isback:'',
            getRedirectUri:'',
            serviceType:'',
            urlOpenId:'',
            v8AppId:'',
            dataserviceType:'',
        }
    },
    methods:{
        goLink(item){
            if(item.url_type == 2){
                this.$store.state.goodInfo = {};
                this.$router.replace({path:'/goodDetail?recordPage=index&id='+item.url+'&ishome=1'});
                return false;
            }
            if(item.url != ''){
                if(item.url.indexOf('http') == 0 ||  item.url.indexOf('https') == 0){
                    window.location.href=item.url; 
                }else{
                    window.location.href='http://'+item.url;
                    
                };
            }
        },
        handleGoodsTypeTab(rows,index){
            var _this = this;
            var id = '';
            index == -1?id = -1:id = rows.group_id;
            _this.goodsTypeTab = index;
            _this.getStoreItems(id);
        },
        //获取openid
        getOpenId(){
            var _this = this;
            var _this = this;
            var formData = {
                 "appid":_this.appid,
                  "code":_this.tcode 
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            _this.$axios.get(allgetLogin+"/GetOpenId/",{params:formData}).then((res) => {
                // config.layerMsg(JSON.stringify(res.data), 2);
                // var ty = JSON.stringify(res.data)
                // _this.gt = ty;
                if(res.data.open_id != ""){
                     _this.open_id = res.data.open_id;
                      if(_this.serviceType == 1){
                        _this.getAuthLine(res.data.open_id);
                    }
                     config.setCookie(
                        'openid', 
                        JSON.stringify(res.data), 
                        3
                    );
                }
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
            var url = redirectUri;
            _this.$axios.get(allgetLogin+"/GetUserInfo/",{params:formData}).then((res) => {
                _this.storeId = Number(res.data.storeId);
                config.setCookie(
                    'userInfo', 
                    JSON.stringify(res.data), 
                    3
                );
              //  _this.updateUserInfo();
                _this.getUserInfoMy();
                _this.getAuthInfo();
                if(res.data.errcode == 0){
                    if(res.data.nickname && res.data.nickname != null){
                        _this.userInfo = res.data;
                    }else{
                        if(config.thirdParty().isWechat == true){
                           // window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9");
                        }
                    }
                }else if(res.data.errcode == 40003){
                     var url = encodeURIComponent(_this.getRedirectUri+"?serviceType="+_this.serviceType+"&openId="+_this.urlOpenId+'&appid='+_this.appid+"&state="+_this.position);
                    var sq_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.v8AppId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state="+_this.position+"#wechat_redirect";
                    if(_this.dataserviceType == 2){
                        url = redirectUri;
                        sq_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9";
                    }
                    if(config.thirdParty().isWechat == true){
                        //window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9");
                        window.location.replace(sq_url);
                    }
                }else{
                    if(config.getCookie('userInfo')){
                        _this.userInfo = JSON.parse(config.getCookie('userInfo'));
                    }
                };
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
                "store_id":_this.storeId,
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
                "store_id":_this.storeId,
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
                config.setCookie(
                    'userInfoData', 
                    JSON.stringify(res.data.user_data), 
                    3
                );
                // if(!_this.userInfo.nickname){
                //     config.layerMsg('请先关注公众号~', 2);
                //     return false;
                // };
                _this.login_bg = false;
                if(res.data.error_code == 0){
                    _this.userInfoData = res.data.user_data;
                    if(_this.position !='' && _this.tcode){  //跳推荐
                        //_this.$router.replace({path:'/'+_this.position});
                      //  window.location.replace(homeUrl+'/#/'+_this.position+'?isLink=1&appid='+_this.appid);
                    };
                }else{
                   // config.layerMsg(res.data.msg, 2);
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
                "store_id":_this.storeId,
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
                   // config.layerMsg(res.data.msg, 2);
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
                "store_id":_this.storeId,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/get_banners",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                   var list = res.data.data;
                   if(list.length > 0){
                       list.forEach((item,index) => {
                           if(item.type == 0){
                               _this.banner_list1.push(item);
                           }else if(item.type == 1){
                               _this.banner_list2.push(item); 
                           }
                       })
                   }
                   setTimeout(() => {
                       _this.banner1();
                       if(_this.banner_list2.length > 1){
                           _this.banner2();
                       }
                    },300)
                }else{
                    //config.layerMsg(res.data.msg, 2);
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
                "store_id":_this.storeId,
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
                    //config.layerMsg(res.data.msg, 2);
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
                "store_id":_this.storeId,
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
                }else{
                 //   config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //加埋点
        handleRecord(){
            var _this = this;
            var formData = {
                "openId":_this.open_id,
                "storeId":_this.storeId,
                "webPage":"index"
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            _this.$axios.post("http://v8track.youwoxing.net/track/pv",formData,headerConfig).then((res) => {
                
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
            this.$router.replace({path:toPath+'?recordPage=index&ishome=1'});
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
            this.$router.replace({path:'/exchangeRecord?recordPage=index&ishome=1'});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall?recordPage=index&ishome=1'});
        },
        goodDetail(rows){
            this.$store.state.goodInfo = rows;
            this.$router.replace({path:'/goodDetail?recordPage=index&id='+rows.id+'&ishome=1'});
        },
        login(){
            var _this = this;
            var appid = _this.appid;//'wx91c0cbe98956a703';
            var url = redirectUri;
            var get_url_appid = config.getHashVReq('appid');
            var cookie_appid = _this.pevrAppid;
            var login_appid = '';
            var url = '';
            var sq_url = '';
             url = encodeURIComponent(_this.getRedirectUri+"?serviceType="+_this.serviceType+"&openId="+_this.urlOpenId+'&appid='+appid+"&state="+_this.position);
             sq_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.v8AppId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state="+_this.position+"#wechat_redirect";
            if(_this.dataserviceType == 2){
                url = redirectUri;
                sq_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9";
            }
            
            if(_this.serviceType == 1 && config.thirdParty().isWechat == true && _this.tcode == ''){
                 window.location.replace(sq_url);
            }
            if(get_url_appid){
                if(get_url_appid.indexOf('#/') == '-1'){
                    login_appid = get_url_appid;
                }else{
                    login_appid = get_url_appid.substring(0,get_url_appid.length-2);
                };
                if(cookie_appid){
                    //如果这次进来获取的url中的appid和保存在cookie中的appid不同，说明公众号不同，需要重新授权
                    if(cookie_appid != login_appid && _this.tcode == ''){
                       // url = encodeURIComponent(_this.getRedirectUri+"?serviceType="+_this.serviceType+"&openId="+_this.urlOpenId+'&appid='+login_appid+"&state="+_this.position);
                        //sq_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+_this.v8AppId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state="+_this.position+"#wechat_redirect";
                        //window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9");

                        window.location.replace(sq_url);
                    }else{ 
                    }
                }else{
                    if(config.thirdParty().isWechat == true && _this.tcode == ''){
                        //window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9");
                         window.location.replace(sq_url);
                    }
                }
            }
            //从其他页面直接进去后，没有cookie是到首页授权后在跳到最开始打开的页面
            
            if(_this.position && _this.tcode){
                 _this.getOpenId();
                return false;
            };
            if(_this.open_id){
                 
            }else{
                 if(config.thirdParty().isWechat == true && _this.tcode == ''){
                     window.location.replace(sq_url);
                   // window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9");
                 }
            }
            // if(config.thirdParty().isWechat == true && _this.tcode == ''){
            //     window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state="+_this.position+"&component_appid=wx00f2bf419bcd81c9")
            // }
        },
        forbidBack(){
            if(config.thirdParty().isWechat == true){
                parent.WeixinJSBridge.call("closeWindow");
            }else{
                window.opener=null;
                window.open('','_self');
                window.location.href="about:blank";
                window.close(); 
            };
        },
         //获取公众号信息
        getAuthInfo(){
            var _this = this;
            var params = {
                'storeId': _this.storeId,
            };
            _this.$axios.get(baseZH+"/GetAuthorizerInfoByStoreId/",{params:params}).then((res) => {
                
                if(res.data){
                    var authInfo = res.data;
                    _this.share(authInfo);
                }else{
                    config.layerMsg('出错了~', 2);
                };
                
            }).catch(() => {
                console.log('error');
            });
        },
        //分享
        share(authInfo){
            var _this = this;
            var goUrl = window.location.href;  //当前页面的链接
            var shareUrlLink = encodeURIComponent(goUrl.split('#')[0]);
            var xhr = '';
            var openid = _this.open_id;
            if(typeof XMLHttpRequest != 'underfined'){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject();  //ie5,6
            };
            var shareUrlRequire = allgetLogin+'/GetShareSignature/?url='+shareUrlLink+'&appId='+_this.appid;
             var myImg = _this.userInfoData.avatar_url || 0;
            var myName = _this.userInfoData.nick_name || 0;
            var gImg = authInfo.authorizer_info.head_img;
            var gName = authInfo.authorizer_info.nick_name;
            var gStoreId = _this.storeId;
            var shareIcon = authInfo.logoUrl;
            var rech = '&myImg='+myImg+'&myName='+myName+'&gImg='+gImg+'&gName='+gName+'&storeId='+gStoreId;
            xhr.open('GET', shareUrlRequire, true);
            xhr.send(null);
            xhr.onreadystatechange = function(res){
                if(xhr.readyState==4 && xhr.status==200){
                    var res = JSON.parse(xhr.responseText);
                    if(res){
                        
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: _this.appid,
                            timestamp: res.timestamp,
                            nonceStr: res.nonceStr,
                            signature: res.signature,
                            jsApiList: ["updateAppMessageShareData","onMenuShareAppMessage"], // 必填，需要使用的JS接口列表
                        });
                        wx.ready(function(){
                            var wxconfig = {
                                title: gName+'0元兑好礼',  //标题
                                link: homeUrl+'/#/friendRecommend?appid='+_this.appid+rech+'&openid='+openid,  //分享之后的页面链接
                                desc: _this.userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                                imgUrl: shareIcon  //图片
                            };
                            //分享给朋友
                            wx.onMenuShareAppMessage(wxconfig);
                            wx.updateAppMessageShareData(wxconfig);
                            
                            
                        });
                        wx.error(function(err){
                            console.log(err);
                        
                        });
                    }else{
                        // config.layerMsg('出错了~', 2);
                    }
                    
                }
            }
        },
         //获取公众号类型
         getAppType(){
             var _this = this;
            var params = {
                'appId': _this.appid,
            };
            _this.$axios.get(allgetLogin+"/queryStoreInfo",{params:params}).then((res) => {
                if(res.data){
                    _this.dataserviceType = res.data.serviceType;
                    _this.getAuthType();
                }else{
                    config.layerMsg('出错了~', 2);
                };
                
            }).catch(() => {
                console.log('error');
            });
         },
        getAuthType(){
            var _this = this;
            var params = {
               
            };
            _this.$axios.get(allgetLogin+"/generateV8AuthUrl",{params:params}).then((res) => {
                if(res.data){
                    _this.getRedirectUri = res.data.homepageUrl;
                    _this.v8AppId = res.data.v8AppId;
                    _this.login();
                }else{
                    config.layerMsg('出错了~', 2);
                };
                
            }).catch(() => {
                console.log('error');
            });
        },
         //公众号g关联
        getAuthLine(urlOpenId){
            var _this = this;
            
            var params = {
               'openId': _this.urlOpenId,
               'appId': _this.appid,
               'v8OpenId': urlOpenId,
            };
            _this.$axios.get(allgetLogin+"/unionOpenIdAndV8OpenId",{params:params}).then((res) => {
                
            }).catch(() => {
                console.log('error');
            });
        },
        getCdata(){
            var _this = this;
            var t_p = config.getHashVReq('appid');
            var t_code = config.getHashVReq('code');
            var pevr_appid = config.getCookie('appid');
            var serviceType = config.getHashVReq('serviceType');
            var getUrlOpenId = config.getHashVReq('openId');
            var data = config.getCookie('openid');
            if(pevr_appid){
                try {
                    _this.pevrAppid = JSON.parse(pevr_appid);
                } catch (error) {
                    
                }
            };
            _this.position = config.getHashVReq('position') || '';
            if(t_p){
                if(t_p.indexOf('#/') == '-1'){
                    _this.appid = t_p;
                }else{
                    _this.appid = t_p.substring(0,t_p.length-2);
                };
                config.setCookie(
                    'appid', 
                    JSON.stringify(_this.appid), 
                    7
                );
            }else{
                if(config.getCookie('appid')){
                    try {
                        _this.appid = JSON.parse(config.getCookie('appid'));
                    } catch (error) {
                        
                    }
                }
                
            };
            if(t_code){
                if(t_code.indexOf('#/') == '-1'){
                    _this.tcode = t_code;
                }else{
                    _this.tcode = t_code.substring(0,t_code.length-2);
                };
                _this.position = config.getHashVReq('state');
            };
            if(serviceType && serviceType == 1){
                _this.serviceType = serviceType;
            };
            _this.urlOpenId = getUrlOpenId;
            if(data){
                 _this.open_id = JSON.parse(data).open_id;
            }
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.getCdata();
        _this.getAppType();
        //_this.login();
        _this.$nextTick(() => {
             if(_this.position == '' || _this.tcode == ''){  //如果等于0则不跳
                 _this.getOpenId();
            };
            
            
            _this.handleRecord();
        });
         config.isGoBack(_this.forbidBack);
    }
}
</script>


<style scoped>
@import './index.css';
</style>