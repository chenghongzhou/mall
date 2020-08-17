<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                阅读有礼
            </div>
            <div class="header">
                <div class="my_img"><img :src="userInfoData.avatar_url" alt=""></div>
                <div class="my_info">
                    <div class="my_name">{{userInfoData.nick_name}}</div>
                    <div class="my_money">{{userInfoData.score}}<i class="money_icon"></i></div>
                </div>
                <div class="my_info_right">
                    <div class="get_integral" @click="taskWall()"><i></i></div>
                    <div class="change_in_record" @click="exchangeRecord()"></div>
                </div>
            </div>
       </div>
       <div class="content">
           <!-- <div class="intru" v-if="list.length > 0">阅读一篇文章获得<span>{{list[0].read_set.score_num}}</span>积分，每日做多获得<span>5</span>积分。</div> -->
           <ul>
               <li v-for="(item, index) in list" :key="index">
                   <img :src="item.read_set.icon" alt="" class="read_img">
                   <div class="reading">
                       <div class="reading_content">{{item.read_set.title}}</div>
                       <!-- <div class="reading_content" style="margin-top:0.08rem">{{item.read_set.dec}}</div> -->
                   </div>
                   <div class="reading_time">+{{item.read_set.score_num}}积分</div>
                   <div class="go_read" @click="goRead(item)" v-if="item.progress == 0">去阅读</div>
                   <div class="go_readed" v-if="item.progress == 1" @click="goReaded(item)">已阅读</div>
               </li>
           </ul>
           <footer-view></footer-view>
       </div>
        <span style="" ref="perv">{{perv}}</span>
       
    </div>
</template>

<script>
import { allget,allgetLogin,baseZH,homeUrl } from '../../../api/api.js';
import wx from 'weixin-js-sdk';
export default {
    data(){
        return {
            userInfoData:{},
            list:[],
            perv:'',
            storeId:'',
            openid:''
        }
    },
    methods: {
        goRead(item){
            console.log(this.userInfoData)
            this.getPrize(item)
           
        },
        goReaded(item){
            window.location.href = item.read_set.article_url;
        },
        //领取奖励
        getPrize(item){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data": {
                    "id":item.read_set.id
                }
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/finish_read",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    window.location.href = item.read_set.article_url;
                   
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取用户信息和金币
        getUserInfoMy(){
            var _this = this;
            var formData = {
                "open_id":_this.openid,//oaWxEv2NUHC4q04-i3IRgFLZTBoU
                "store_id":_this.storeId,
                "data":{
                    "avatar_url":_this.userInfoData.avatar_url,
                    "nick_name":_this.userInfoData.nick_name,
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
        //
        getData(){
            var _this = this;
            _this.$loading.show();
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/get_read_sets",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.list = res.data.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
                _this.$loading.close();
            }).catch(() => {
                _this.$loading.close();
                console.log('error');
            });
        },
        //加埋点
        handleRecord(){
            var _this = this;
            var formData = {
                'storeId': _this.storeId,
                "openId":_this.openid,
                "webPage":'read_index'
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
        exchangeRecord(){
             var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=read&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=read&ishome='+ishome});
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = config.getHashVReq('recordPage');
            var ishome = config.getHashVReq('ishome');
            if(ishome && ishome == 1){
                if(pervePage == 'index' || !pervePage || ishome == 1){
                    _this.$router.replace({path:'/'});
                }else{
                    _this.$router.replace({path:'/'+pervePage});
                };
            }else{
                 if(config.thirdParty().isWechat == true){
                     WeixinJSBridge.call('closeWindow');
                }else{
                    window.opener=null;
                    window.open('','_self');
                    window.location.href="about:blank";
                    window.close(); 
                };
            }
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
            var openid = _this.openid;
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
            var shareIcon = authInfo.logoUrl;
            var rech = '&myImg='+myImg+'&myName='+myName+'&gImg='+gImg+'&gName='+gName;
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
         isLg(){
            var _this = this;
            var t_p = config.getHashVReq('appid');
            var t_data = config.getCookie('userInfoData');

            var url_store_id = config.getHashVReq('storeId');
            var t_store = config.getCookie('userInfo');
            var isLink = config.getHashVReq('isLink');
            if(t_p){
                if(t_p.indexOf('#/') == '-1'){
                    _this.appid = t_p;
                }else{
                    _this.appid = t_p.substring(0,t_p.length-2);
                };
            };
            if(t_data){
                try {
                    _this.userInfoData = JSON.parse(t_data);
                    if(!_this.userInfoData.nick_name){
                          window.location.replace(homeUrl+'/?position=read&appid='+_this.appid)
                     }
                } catch (error) {
                    // if(config.thirdParty().isWechat == true){
                    //     window.location.replace('http://v8homepage.youwoxing.net/?position=read&appid='+_this.appid)
                    // };
                }
            }
            if(url_store_id){
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                    if(_this.storeId != url_store_id){
                        //如果当前链接的url，storeid和cookie不一样需要重新授权
                        window.location.replace(homeUrl+'/?position=read&appid='+_this.appid)
                    }else{
                        _this.getAuthInfo();
                    }
                }else{
                    //去授权
                    window.location.replace(homeUrl+'/?position=read&appid='+_this.appid)
                };    
            }else{
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                };
                if(isLink && isLink == 1){
                    _this.getAuthInfo();
                };
            };
            
          
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id).open_id;
            };
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.isLg();
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            _this.getData();
            _this.getUserInfoMy();
            _this.handleRecord();
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>