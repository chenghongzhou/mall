<template>
    <div class="footer_box">
        <div class="bottom">
           <!-- <div class="go_link" @click="goLink()"></div> -->
           <div class="gzh_title">©#{{gzNickname}}# 版权所有</div>
           <div class="gzh_title">微吧科技提供技术支持</div>
           <a href="http://v8keji.cn/" class="gzh_title">立即创建＞</a>
       </div>
    </div>
</template>

<script>
import { allget,allgetLogin } from '../../../api/api.js';
export default {
    props: ['userInfo'],
    data(){
        return {
            userInfoData:{},
            appid:'',
            authInfo: {},
            storeId:'',
            openid:'',
            gzNickname:''
        }
    },
    methods: {
         goLink(){
            window.location.href = 'http://v8keji.cn/';
        },
        //获取公众号信息
        getAuthInfo(){
            var _this = this;
            var params = {
                'storeId': _this.storeId,
            };
            _this.$axios.get("http://v8.python.youwoxing.net:9001/GetAuthorizerInfoByStoreId/",{params:params}).then((res) => {
                if(res.data){
                    _this.gzNickname = res.data.authorizer_info.nick_name;
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
            var gImg = _this.authInfo.authorizer_info.head_img;
            var gName = _this.authInfo.authorizer_info.nick_name;
            var shareIcon = _this.authInfo.logoUrl;
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
                                link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+_this.appid+rech+'&openid='+openid,  //分享之后的页面链接
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
        getParams(){
            var _this = this;
            var t_store = config.getCookie('userInfo');
            if(t_store){
                _this.storeId = Number(JSON.parse(t_store).storeId);
            };
        }
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
            _this.getParams();
            _this.getAuthInfo()
        })
        
    }
}
</script>

<style scoped>
.footer_box{
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: -0.5rem;
    left: 0;
}
.bottom{
    width: 100%;
    height: 1rem;
    /* background: url("../../../../static/images/luckDraw/footer.png") center no-repeat;
    background-size: contain; */
    position: relative;
}
.go_link{
    position: absolute;
    bottom: 0.17rem;
    left: 2rem;
    width: 4rem;
    height: 0.3rem;
}
.gzh_title{
    text-align: center;
    font-size: 0.2rem;
    color: #cccccc;
    display: block;
    text-decoration: none;
}
</style>