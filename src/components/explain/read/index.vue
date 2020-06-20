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
           <div class="intru">阅读一篇文章获得<span>1</span>积分，每日做多获得<span>5</span>积分。</div>
           <ul>
               <li>
                   <img src="../../../../static/images/home/read.png" alt="" class="read_img">
                   <div class="reading">
                       <div class="reading_content">标题</div>
                       <div class="reading_content" style="margin-top:0.08rem">简介</div>
                   </div>
                   <div class="reading_time">+1000积分</div>
                   <div class="go_read">去阅读</div>
               </li>
           </ul>
       </div>

       <footer-view></footer-view>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            userInfoData:{}
        }
    },
    methods: {
        //签到
        getData(){
            var _this = this;
            var openid = 'oaWxEv2NUHC4q04-i3IRgFLZTBoU'//_this.userInfoData.open_id;
            var formData = {
                'store_id': 1001,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/get_read_sets",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){

                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'read'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'read'}});
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = this.$route.query.recordPage;
            if(pervePage == 'taskWall'){
                _this.$router.replace({path:'/taskWall'});
            }else if(pervePage == 'index'){
                 _this.$router.replace({path:'/'});
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
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
             var t_data = config.getCookie('userInfoData');
            if(t_data){
                _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
            };
            _this.getData();
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>