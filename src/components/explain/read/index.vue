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
           <div class="intru" v-if="list.length > 0">阅读一篇文章获得<span>{{list[0].read_set.score_num}}</span>积分，每日做多获得<span>5</span>积分。</div>
           <ul>
               <li v-for="(item, index) in list" :key="index">
                   <img :src="item.read_set.icon" alt="" class="read_img">
                   <div class="reading">
                       <div class="reading_content">{{item.read_set.title}}</div>
                       <div class="reading_content" style="margin-top:0.08rem">{{item.read_set.dec}}</div>
                   </div>
                   <div class="reading_time">+{{item.read_set.score_num}}积分</div>
                   <div class="go_read" @click="goRead(item)" v-if="item.progress == 0">去阅读</div>
                   <div class="go_readed" v-if="item.progress == 1">已阅读</div>
               </li>
           </ul>
       </div>
        <span style="" ref="perv">{{perv}}</span>
       <footer-view></footer-view>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
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
         isLg(){
            var _this = this;
            var t_p = config.getHashVReq('appid');
            var t_data = config.getCookie('userInfoData');
            if(t_p){
                if(t_p.indexOf('#/') == '-1'){
                    _this.appid = t_p;
                }else{
                    _this.appid = t_p.substring(0,t_p.length-2);
                };
            };
            if(t_data){
                _this.userInfoData = JSON.parse(t_data);
            }else{ //去授权
                if(config.thirdParty().isWechat == true){
                    window.location.replace('http://v8homepage.youwoxing.net/?position=read&appid='+t_p)
                };
            };
           var t_store = config.getCookie('userInfo');
            if(t_store){
                _this.storeId = Number(JSON.parse(t_store).storeId);
            };
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id);
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
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>