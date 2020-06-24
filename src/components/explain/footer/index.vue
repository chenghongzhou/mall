<template>
    <div>
        <div class="bottom">
           <div class="go_link" @click="goLink()"></div>
       </div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
import '../../../../static/js/jweixin.js';
export default {
    props: ['userInfo'],
    data(){
        return {
            userInfoData:{},
            appid:'',
            authInfo: {},
        }
    },
    methods: {
         goLink(){
            window.location.href = 'http://v8tob.youwoxing.net/user/login.html';
        },
        //获取公众号信息
        getAuthInfo(){
            var _this = this;
            // if(_this.authInfo){
            //     return false;
            // };
            var params = {
                'storeId': 4,
            };
            _this.$axios.get("http://v8.python.youwoxing.net:9001/GetAuthorizerInfoByStoreId/",{params:params}).then((res) => {
                if(res.data){
                    _this.authInfo = res.data;
                   config.setCookie(
                        'authorizerInfo', 
                        JSON.stringify(res.data), 
                        7
                    );
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //分享
        share(){
            var _this = this;
            var goUrl = window.location.href;  //当前页面的链接
            var shareUrlLink = encodeURIComponent(goUrl.split('#')[0]);
            var params = {
                'appId': _this.authInfo.authorization_info.authorizer_appid,
                "url":shareUrlLink
            };
            var myImg = _this.userInfoData.avatar_url || 0;
            var myName = _this.userInfoData.nick_name || 0;
            var gImg = _this.authInfo.authorizer_info.head_img;
            var gName = _this.authInfo.authorizer_info.nick_name;
            var rech = '&myImg='+myImg+'&myName='+myName+'&gImg='+gImg+'&gName='+gName;
            _this.$axios.get("http://v8.python.youwoxing.net:9001/GetShareSignature/",{params:params}).then((res) => {
                if(res.data){
                    config.layerMsg(454, 2);
                     wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx91c0cbe98956a703',
                        // timestamp: res.data.timestamp,
                        // nonceStr: res.data.noncestr,
                        signature: res.data.signature,
                        jsApiList: ["updateAppMessageShareData","onMenuShareTimeline"], // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function(){
                        var wxconfig = {
                            title: _this.authInfo.authorizer_info.nick_name+'0元兑好礼',  //标题
                            link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+_this.appid+rech,  //分享之后的页面链接
                            desc: _this.userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                            imgUrl: 'http://v8homepage.youwoxing.net/static/images/home/logo.png'  //图片
                        };
                        //微信朋友圈的分享定义
                        var wxconfigcircles = {
                            title: _this.userInfoData.authorizer_info.nick_name+'0元兑好礼',  //标题
                            link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+_this.appid+rech,  //分享之后的页面链接
                            desc: _this.userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                            imgUrl: 'http://v8homepage.youwoxing.net/static/images/home/logo.png'  //图片
                        };
                        //分享朋友圈
                        wx.onMenuShareTimeline(wxconfigcircles);
                        //分享给朋友
                        wx.updateAppMessageShareData(wxconfig);
                        
                    });
                    wx.error(function(err){
                        console.log(err);
                       
                    });
                    
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
    },
    mounted(){
        var _this = this;
        var authInfo = config.getCookie('authorizerInfo');
        if(authInfo){
            _this.authInfo = JSON.parse(authInfo);
        }
        setTimeout(() => {
            var userInfoData = config.getCookie('userInfoData');
            if(userInfoData){
                _this.userInfoData = JSON.parse(userInfoData);
                _this.appid = config.getCookie('appid');
            };
            this.share();
        },1000);
        _this.getAuthInfo();
        
    }
}
</script>

<style scoped>
.bottom{
    width: 100%;
    height: 1rem;
    background: url("../../../../static/images/luckDraw/footer.png") center no-repeat;
    background-size: contain;
    position: relative;
}
.go_link{
    position: absolute;
    bottom: 0.17rem;
    left: 2rem;
    width: 4rem;
    height: 0.3rem;
}
</style>