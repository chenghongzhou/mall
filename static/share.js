var appid = '';
var storeId = '';
var openid = '';
var userInfoData = {};
window.onload= function(){
    setTimeout(function(){
        getParams();
        infoData();
    },1000)
}

function getParams(){
    var t_p = config.getHashVReq('appid');
    if(t_p){
        if(t_p.indexOf('#/') == '-1'){
            appid = t_p;
        }else{
            appid = t_p.substring(0,t_p.length-2);
        };
    }else{
        t_p = config.getCookie('appid') || '';
    };
    var t_store = config.getCookie('userInfo');
    if(t_store){
        storeId = Number(JSON.parse(t_store).storeId);
    };
    var t_open_id = config.getCookie('openid');
    if(t_open_id){
        openid = JSON.parse(t_open_id).open_id;
    };
    var userInfo_data = config.getCookie('userInfoData');
    if(userInfo_data && userInfo_data != 'undefined'){
        userInfoData = JSON.parse(userInfo_data);
    };
};
function infoData(){
    var xhr = '';
    if(typeof XMLHttpRequest != 'underfined'){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject();  //ie5,6
    };
    var shareUrlRequire = 'http://v8.python.youwoxing.net:9001/GetAuthorizerInfoByStoreId/?storeId='+storeId;
    xhr.open('GET', shareUrlRequire, true);
    xhr.send(null);
    xhr.onreadystatechange = function(res){
        if(xhr.readyState==4 && xhr.status==200){
            var res = JSON.parse(xhr.responseText);
            if(res){
                var authInfo = res;
                console.log(res)
                share(authInfo);
            }else{
                // config.layerMsg('出错了~', 2);
            }
            
        }
    }
}

function share(authInfo){
    var goUrl = window.location.href;  //当前页面的链接
    var shareUrlLink = encodeURIComponent(goUrl.split('#')[0]);
    var xhr = '';
    if(typeof XMLHttpRequest != 'underfined'){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject();  //ie5,6
    };
    var shareUrlRequire = 'http://v8message.youwoxing.net/GetShareSignature/?url='+shareUrlLink+'&appId='+appid;
    var myImg = userInfoData.avatar_url || 0;
    var myName = userInfoData.nick_name || 0;
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
                    appId: appid,
                    timestamp: res.timestamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: ["updateAppMessageShareData","onMenuShareAppMessage"], // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                    var wxconfig = {
                        title: gName+'0元兑好礼',  //标题
                        link: 'http://v8homepage.youwoxing.net/#/friendRecommend?appid='+appid+rech+'&openid='+openid,  //分享之后的页面链接
                        desc: userInfoData.nick_name+'邀请你免费参与活动，兑换0元商品',  
                        imgUrl: shareIcon  //图片
                    };
                    //分享给朋友
                   // wx.onMenuShareAppMessage(wxconfig);
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

}