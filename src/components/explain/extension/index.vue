<template>
    <div class="main" style="max-height:100%;min-height:100%;display:block;height:100%">
        <div class="header_part" ref="header" style="position:fixed;top:0;left:0;z-index:10;">
            <div class="top" >
                <i class="top_close" @click="forbidBack()"></i>
                邀请有礼
            </div>
            <!-- <div style="height:1.04rem"></div> -->
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
        <div class="content" ref="main" style="height:100%">
            <div style="height:2.1rem"></div>
            <img src="../../../../static/images/home/extension_sc.png" alt="" class="extension_sc">
            <div class="c_part" v-if="isError">亲爱哒，<br />
                感谢你的支持和陪伴，欢迎推荐新朋友加入我们。每成功推荐一位小伙伴可获得<span>{{give_score}}</span>积分。<br />
                每天最多推荐<span>{{day_max_invite}}</span>位。
            </div>
            <div class="btn" @click="mask = true">马上推荐</div>
            <div class="record_box" v-if="isError">
                <img src="../../../../static/images/home/extension_tl.png" alt="" class="extension_tl">
                <div class="record_total_box">
                    <div class="record_total_left">
                        <div class="record_total"><i></i>成功邀请(人)</div>
                        <div class="record_total_peoples">{{people}}</div>
                    </div>
                    <div class="record_total_right">
                        <div class="record_total"><i></i>奖励积分</div>
                        <div class="record_total_i">{{i_num || 0}}</div>
                    </div>
                </div>
                 <ul>
                    <li v-for="(item,index) in list" :key="index">
                        <img :src="item.avatarUrl" alt="">
                        <div class="info">
                            <div class="name">{{item.nickName}}</div>
                            <div class="time">{{item.dateTmStr}}</div>
                        </div>
                        <div class="num">+{{item.score}}</div>
                    </li>
                    <div class="nodata" v-if="list.length == 0">你还未邀请到用户，快点击右上角按钮分享哦~</div>
                </ul>
            </div>
            <footer-view style="position:relative"></footer-view>
        </div>
        
        <div class="mask" v-if="mask" @click="mask = false">点击右上角按钮分享~</div>
    </div>
</template>

<script>
import { allget,allgetLogin,baseZH,homeUrl } from '../../../api/api.js';
import wx from 'weixin-js-sdk';
export default {
    data(){
        return {
            userInfoData: {},
            mask:false,
            storeId:'',
            day_max_invite:'',
            give_score:'',
            openid:'',
            list:[],
            people:'0',
            i_num:'0',
            page:999999,
            isError:false,
        }
    },
    methods:{
        exchangeRecord(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=extension&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=extension&ishome='+ishome});
        },
        //获取店铺商品
        getData(){
            var _this = this;
            var formData = {
                "store_id":_this.storeId,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/cus_config/share_config",formData,headerConfig).then((res) => {
                if(res.data){
                   _this.day_max_invite = res.data.day_max_invite;
                   _this.give_score = res.data.give_score;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //加埋点
        handleRecord(){
            var _this = this;
            var formData = {
                "openId":_this.openid,
                "storeId":_this.storeId,
                "webPage":'invite_index'
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
        getRecord(){
            var _this = this;
            var formData = {
                "openId":_this.openid,
                "startId":_this.page
            };
            _this.$axios.get(allgetLogin+"/shareLog/queryShareLog",{params:formData}).then((res) => {
                if(res.data){
                   _this.list = _this.list.concat(res.data);
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        getTotal(){
            var _this = this;
            var formData = {
                "openId":_this.openid,
            };
            _this.$axios.get(allgetLogin+"/shareLog/queryShareTotal",{params:formData}).then((res) => {
                if(res.data){
                  _this.people = res.data.userCount;
                  _this.i_num = res.data.scoreSum;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
          //获取公众号信息
        getAuthInfo(){
            var _this = this;
            var params = {
                'storeId': _this.storeId,
            };
            _this.$axios.get(baseZH+"/GetAuthorizerInfoByStoreId/",{params:params}).then((res) => {
                
                if(res.data){
                    if(res.data.code == 503){
                        _this.isError = true;
                    }else{
                        var authInfo = res.data;
                        _this.share(authInfo);
                    }
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
            var gStoreId = _this.storeId;
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
        //翻页
        handlePages(){
            var _this = this;
            _this.$refs.main.addEventListener('scroll',function handler(){
                console.log(5)
                var scrollTop = this.scrollTop;  //已经卷进去的高度
                var srcollHeight = this.clientHeight;  //当前总高度
                var totleHeight = this.scrollHeight;  //滚动的总高度
                if(scrollTop + srcollHeight - totleHeight >= 0){
                    if(_this.list.length>0){
                        _this.page = _this.list[_this.list.length - 1].id;
                         _this.getRecord();
                    }
                   
                };
            },false);
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
                          window.location.replace(homeUrl+'/?position=extension&appid='+ _this.appid)
                     }
                } catch (error) {
                    // if(config.thirdParty().isWechat == true){
                    //     window.location.replace('http://v8homepage.youwoxing.net/?position=extension&appid='+ _this.appid)
                    // };
                }
            }
             if(url_store_id){
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                    if(_this.storeId != url_store_id){
                        //如果当前链接的url，storeid和cookie不一样需要重新授权
                        window.location.replace(homeUrl+'/?position=extension&appid='+ _this.appid)
                    }else{
                        _this.getAuthInfo();
                    }
                }else{
                    //去授权
                    window.location.replace(homeUrl+'/?position=extension&appid='+ _this.appid)
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
            _this.getRecord();
            _this.getTotal();
            _this.handlePages();
            _this.handleRecord();
        })
    }
}
</script>

<style scoped>
.extension_tl{
    width: 2.96rem;
    height: 0.29rem;
    display: block;
    margin: 0 auto;
}
.record_total_box{
    overflow: hidden;
    margin-top: 0.3rem;
}
.record_total_left{
    float: left;
    width: 49.9%;
}
.record_total{
    text-align: center;
    font-size: 0.24rem;
    color: #8e8e8e;
}
.record_total_left .record_total i{
    width: 0.2rem;
    height: 0.24rem;
    background: url("../../../../static/images/home/extension_people.png") center no-repeat;
    background-size: contain;
    
    display: inline-block;
    vertical-align: top;
    margin-right: 0.1rem;
    margin-top: 0.05rem;
}
.record_total_peoples{
    font-size: 0.4rem;
    color: #2b2b2b;
    font-weight: bold;
    text-align: center;
    margin-top: 0.1rem;
}
.record_total_right{
    float: left;
    width: 49.9%;
}
.record_total_right .record_total i{
    width: 0.24rem;
    height: 0.24rem;
    background: url("../../../../static/images/home/extension_i.png") center no-repeat;
    background-size: contain;
    
    display: inline-block;
    vertical-align: top;
    margin-right: 0.1rem;
    margin-top: 0.05rem;
}
.record_total_i{
    font-size: 0.4rem;
    color: #ffac1c;
    font-weight: bold;
    text-align: center;
    margin-top: 0.1rem;
}
ul{
    margin-top: 0.35rem;
    width: 100%;
}
ul li{
    
    height: 0.8rem;
    padding: 0.3rem;
    border-top: 1px solid #f1f1f1;
    overflow: hidden;
    position: relative;
}
li img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.2rem;
    display: block;
    float: left;
}
li .info{
    float: left;
}
li .info .name{
    font-size: 0.28rem;
    font-weight: bold;
    color: #2b2b2b;
}
li .info .time{
    font-size: 0.28rem;
    font-weight: bold;
    color: #8e8e8e;
    margin-top: 0.1rem;
}
li .num{
    font-size: 0.28rem;
    font-weight: bold;
    color: #2b2b2b;
    float: right;
    margin-top: 0.2rem;
}
.nodata{
    font-size: 0.26rem;
    color: #cccccc;
    text-align: center;
    margin-top: 1rem;
}

.main{
    width: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
}
.header_part{
    width: 100%;
    height: 2.12rem;
}
.top{
    width: 100%;
    height: auto;
    padding: 0.3rem;
    font-size: 0.36rem;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    background: #ffffff;
}
.top_close{
    width: 0.16rem;
    height: 0.28rem;
    background: url("../../../../static/images/home/top_close.png") center no-repeat;
    background-size: contain;
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    display: block;
}
.top_close{
    width: 0.26rem;
    height: 0.28rem;
    background: url("../../../../static/images/home/top_close.png") center no-repeat;
    background-size: contain;
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    display: block;
}
.header{
    width: 100%;
    height: auto;
    padding: 0 0.3rem;
    border-top: 1px solid #f1f1f1;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.my_img{
    width: 0.66rem;
    height: 0.66rem;
    border-radius: 50%;
    float: left;
    margin-top: 0.18rem;
    margin-bottom: 0.18rem;
    background: url("../../../../static/images/home/my_img_bg.png") center no-repeat;
    background-size: contain;
    position: relative;
}
.my_img img{
    border-radius: 50%;
    overflow: hidden;
    width: 0.62rem;
    height: 0.62rem;
    margin:0.02rem auto;
    display: block;
}
.my_info{
    margin-left: 0.15rem;
    float: left;
    position: relative;
}
.my_name{
    margin-top: 0.14rem;
    font-size: 0.26rem;
    color: #2b2b2b;
    font-weight: bold;
    height: 0.26rem;
}
.my_money{
    font-size: 0.4rem;
    color: #ffac1c;
    font-weight: bold;
    height: 0.4rem;
    margin-top: 0.06rem;
}
.money_icon{
    width: 0.30rem;
    height: 0.32rem;
    background: url("../../../../static/images/home/integral.png") center no-repeat;
    background-size: contain;
    margin-left: 0.1rem;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.1rem;
   
}
.my_info_right{
    position: absolute;
    top: 0.26rem;
    right: 0.3rem;
}
.get_integral{
    width: 1.64rem;
    height: 0.5rem;
    background: url("../../../../static/images/home/get_integral.png") center no-repeat;
    background-size: contain;
    float: left;
    margin-right: 0.1rem;
    position: relative;
}
.get_integral i{
    width: 0.16rem;
    height: 0.16rem;
    background: url("../../../../static/images/home/red_ts.png") center no-repeat;
    background-size: contain;
    position: absolute;
    top: -0.05rem;
    right: 0.05rem;
    z-index: 2;
}
.change_in_record{
    width: 1.64rem;
    height: 0.5rem;
    background: url("../../../../static/images/home/integral_record.png") center no-repeat;
    background-size: contain;
    float: left;
}
.extension_sc{
    width:100%;
    height: 5.5rem;
}
.c_part{
    width: 100%;
    height: auto;
    padding: 0rem 0.98rem;
    box-sizing: border-box;
    margin-top: 0.3rem;
    font-size: 0.26rem;
    color: #2b2b2b;
    line-height: 0.3rem;
}
.c_part span{
    color: #ff4532;
}
.btn{
    width: 5.8rem;
    margin: 0.6rem auto;
    background: #ff4532;
    font-size: 0.32rem;
    text-align: center;
    color: #ffffff;
    border-radius: 0.6rem;
    padding: 0.34rem 0;
}
.mask{
    width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.8);
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
    z-index: 1010;
    font-size: 0.3rem;
    text-align: center;
    padding-top: 0.4rem;
    box-sizing: border-box;
    color: #ffffff;
}
.record_box{
    width: 6.9rem;
    height: auto;
    background: #ffffff;
    border-radius: 0.2rem;
    padding: 0.4rem 0;
    margin: 0.2rem auto;
}
</style>