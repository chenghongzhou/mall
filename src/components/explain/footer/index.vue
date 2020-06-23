<template>
    <div>
        <div class="bottom">
           <div class="go_link" @click="goLink()"></div>
       </div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    props: ['userInfo'],
    data(){
        return {
            userInfoData:{},
            appid:''
        }
    },
    methods: {
         goLink(){
            window.location.href = 'http://v8tob.youwoxing.net/user/login.html';
        },
        //分享
        share(){
            var _this = this;
            
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': 1001,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/lottery/get_sets",formData,headerConfig).then((res) => {
                if(res.data){
                     wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wxfb697b67bb13bf58',
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.noncestr,
                        signature: res.data.signature,
                        jsApiList: ["updateAppMessageShareData","onMenuShareTimeline"], // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function(){
                        var wxconfig = {
                            title: '0元兑好礼',  //标题
                            link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+_this.appid,  //分享之后的页面链接
                            desc: _this.userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                            imgUrl: ''  //图片
                        };
                        //微信朋友圈的分享定义
                        var wxconfigcircles = {
                            title: '0元兑好礼',  //标题
                            link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+_this.appid,  //分享之后的页面链接
                            desc: _this.userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                            imgUrl: ''  //图片
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
        setTimeout(() => {
            var userInfoData = config.getCookie('userInfoData');
            if(userInfoData){
                _this.userInfoData = JSON.parse(userInfoData);
                _this.appid = config.getCookie('appid');
            };
            //this.share();
        },1000);
        
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