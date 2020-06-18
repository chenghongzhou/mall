<template>
    <div class="main" ref="main">
        
        
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            appid:'',
        }
    },
    methods: {
         login(){
             var _this = this;
            var appid = _this.appid;//'wx91c0cbe98956a703';
            var url = 'http%3a%2f%2fv8homepage.youwoxing.net';
            if(config.thirdParty().isWechat == true){
                 window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+url+"&response_type=code&scope=snsapi_base,snsapi_userinfo&state=123123&component_appid=wx00f2bf419bcd81c9")
                 //window.location.replace('http://192.168.37.29:8082/#/')
            }
        },
        forbidBack(){
            var _this = this;
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
        var t_p = config.getHashVReq('appid');
        if(t_p){
            if(t_p.indexOf('#/') == '-1'){
                _this.appid = t_p;
            }else{
                _this.appid = t_p.substring(0,t_p.length-2);
            };
        };
        _this.login();
        config.isGoBack(_this.forbidBack);
    }
}
</script>

<style scoped>
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #f0f0f0;
    }
</style>