<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                每日签到
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
        <div class="content" style="margin-bottom:0.2rem">
            <div class="sign_box">
                <div class="integral_record_intru" @click="handleSinginDesc()"></div>
                <div class="my_sign">
                    <img :src="userInfoData.avatar_url" alt="" class="my_icon" v-if="rank<=3">
                    <img src="../../../../static/images/sign/top_no1.png" alt="" class="my_rank" v-if="rank == 1">
                    
                    <img src="../../../../static/images/sign/top_no2.png" alt="" class="my_rank" v-else-if="rank == 2">
                    <img src="../../../../static/images/sign/top_no3.png" alt="" class="my_rank" v-else-if="rank == 3">
                    <div v-if="rank>3">{{rank}}</div>
                </div>
                <div class="rank_msg">
                    <span v-if="tabIndex == 1">今日排名</span>
                    <span v-if="tabIndex == 2">本月排行</span>
                    <span v-if="tabIndex == 3">总排行</span>
                </div>
                <div class="my_sign_info">
                    <div>
                        <p>连续签到</p>
                        <p>{{continue_sign_count}}天</p>
                    </div>
                    <div>
                        <p>累计签到</p>
                        <p>{{total_sign_count}}天</p>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div :class="{'tab_active':tabIndex == 1}" @click="handTab(1)" ><span>今日排行<i v-if="tabIndex == 1"></i></span></div>
                <div :class="{'tab_active':tabIndex == 2}" @click="handTab(2)" ><span>本月排行<i v-if="tabIndex == 2"></i></span></div>
                <div :class="{'tab_active':tabIndex == 3}" @click="handTab(3)" ><span>总排行<i v-if="tabIndex == 3"></i></span></div>
            </div>
            <div style="width:100%;height:0.2rem"></div>
            <div class="nodata" v-if="!siginList || siginList.length == 0">暂无数据</div>
            <div class="list_box">
                <div class="list_main">
                    <ul>
                        <li v-for="(item,index) in siginList" :key="index">
                            <div class="list_rank" v-if="index == 0"><img src="../../../../static/images/sign/rank1.png" alt=""></div>
                            <div class="list_rank" v-else-if="index == 1"><img src="../../../../static/images/sign/rank2.png" alt=""></div>
                            <div class="list_rank" v-else-if="index == 2"><img src="../../../../static/images/sign/rank3.png" alt=""></div>
                            <div class="list_rank" v-else>{{index+1}}</div>
                            <img :src="item.headImgUrl" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">{{item.nickName}}</p>
                                <div class="list_info_signs">累计签到{{item.totalSignCount}}天<span v-if="tabIndex == 1">{{item.lastSignTmStr}}</span></div>
                            </div>
                            <!-- <div class="love"></div> -->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mask" v-if="signMask">
                <div class="mask_main">
                    <div class="box tanchuscale">
                        <div class="mask_title">签到成功</div>
                        <div class="mask_you_get">恭喜你获得{{getData.score}}积分</div>
                        <div class="mask_btn" @click="signMask = false">确认</div>
                    </div>
                </div>
            </div>

            <div class="mask" v-if="siginDescMask">
                <div class="mask_main">
                    <div class="sigin_info tanchuscale"  style="height:6rem">
                        <h6>签到说明</h6>
                        <div class="sigin_desc" v-html="siginDesc"></div>
                        <div class="file_close" @click="siginDescMask = false"></div>
                    </div>
                    
                </div>
            </div>
        </div>  
        <footer-view style="position:static"></footer-view>  
    </div>
</template>

<script>
import { allget,allgetLogin } from '../../../api/api.js';
import wx from 'weixin-js-sdk';
export default {
    data(){
        return {
            tabIndex: 1, //切换
            signMask: false,
            userInfoData: {},  //用户信息包含积分
            getData: {},
            siginList:[],
            continue_sign_count:'',  //连续签到
            total_sign_count: '', //累计签到
            rank:1,  //今日，本月，总排行 
            storeId:'',
            openid:'',
            siginDescMask:false,
            siginDesc:''
        }
    },
    methods: {
        handTab(num){
            var _this = this;
            _this.tabIndex = num;
            _this.siginList = _this.getData.day_list;
            if(num == 1){
                _this.siginList = _this.getData.dayList;
                _this.rank = _this.getData.dayRank;
            }else if(num == 2){
                _this.siginList = _this.getData.monthList;
                _this.rank = _this.getData.monthRank;
            }else{
                _this.siginList = _this.getData.totalList;
                _this.rank = _this.getData.totalRank;
            };
        },
        exchangeRecord(){
             var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=signIn&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=signIn&ishome='+ishome});
        },
        //签到
        signIn(){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            _this.$axios.post("http://v8message.youwoxing.net/sign/sign_once",formData,headerConfig).then((res) => {
                _this.getData = res.data;
                _this.continue_sign_count = res.data.continueSignCount;
                _this.total_sign_count = res.data.totalSignCount;
                _this.siginList = res.data.dayList;
                _this.rank = res.data.dayRank;
                if(res.data.errorCode == 200){
                    _this.signMask = true;
                     _this.getUserInfoMy();
                }else if(res.data.errorCode == 202){

                }else{
                     config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
         //签到
        signInDesc(){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/sign/get_sign_dec",formData,headerConfig).then((res) => {
                _this.siginDesc = res.data.dec;
            }).catch(() => {
                console.log('error');
            });
        },
        handleSinginDesc(){
            this.siginDescMask = true;
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
            _this.$axios.post(allget+"http://v8message.youwoxing.net/sign/sign_once",formData,headerConfig).then((res) => {
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
         //获取公众号信息
        getAuthInfo(){
            var _this = this;
            var params = {
                'storeId': _this.storeId,
            };
            _this.$axios.get("http://v8.python.youwoxing.net:9001/GetAuthorizerInfoByStoreId/",{params:params}).then((res) => {
                
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
         isLg(){
            var _this = this;
            var t_p = config.getHashVReq('appid');
            var t_data = config.getCookie('userInfoData');
            var url_store_id = config.getHashVReq('storeId');
            var t_store = config.getCookie('userInfo');
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
                } catch (error) {
                   // window.location.replace('http://v8homepage.youwoxing.net/?position=signIn&appid='+_this.appid)
                }
               
            }
             if(url_store_id){
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                    if(_this.storeId != url_store_id){
                        //如果当前链接的url，storeid和cookie不一样需要重新授权
                        window.location.replace('http://v8homepage.youwoxing.net/?position=signIn&appid='+_this.appid)
                    }else{
                        _this.getAuthInfo();
                    }
                }else{
                    //去授权
                    window.location.replace('http://v8homepage.youwoxing.net/?position=signIn&appid='+_this.appid)
                };    
            }else{
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
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
        _this.isLg()
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            _this.signIn();
            _this.signInDesc();
        })
    }   
}
</script>

<style scoped>
@import './index.css';
</style>