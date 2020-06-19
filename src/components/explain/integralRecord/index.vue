<template>
    <div class="main">
        <div>
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                积分记录
            </div>
            <div class="header">
                <div class="my_intergal_box">
                    <img src="../../../../static/images/intergral/intergral_icon.png" alt="" class="intergral_icon">
                    <div class="intergal_my_box">
                        <div class="intergal_nums">6564</div>
                        <div class="intergal_msg">累计领取</div>
                    </div>
                </div>
                <div class="gift_box" @click="goHome()">
                    <img src="../../../../static/images/intergral/gift.png" alt="" class="gift_icon">
                    <div class="intergal_my_box">
                        <div class="gift_exchange">福利兑换</div>
                        <div class="intergal_msg" style="margin-top:0.05rem">累计领取</div>
                        <div class="go_in"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nodata" v-if="list.length == 0">暂无数据</div>
        <div class="list_box">
                <div class="list" v-for="(item,index) in list" :key="index">
                    <div class="list_left">
                        <div class="list_msg">{{item.info}}</div>
                        <div class="time">{{item.info}}</div>
                        <div class="nums">{{item.get_time}}</div>
                        <div class="list_intergral_icon"></div>
                    </div>
                </div>
            
            <!-- <div class="list">
                <div class="list_left">
                    <div class="list_msg">每日签到</div>
                    <div class="time">2020-05-20 15:20:56</div>
                    <div class="nums">500</div>
                    <div class="list_intergral_icon"></div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            userInfoData:{},
            list:[],
        }
    },
    methods:{
        goHome(){
            this.$router.replace({path:'/'});
        },
        getData(){
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
            _this.$axios.post(allget+"/c_account/get_score_records",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.list = res.data.data;
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        forbidBack(){
            var prveUrl = localStorage.getItem('backName');
            var pervePage = this.$route.query.recordPage;
            // if(prveUrl == '/'){
            //     if(config.thirdParty().isWechat == true){
            //          WeixinJSBridge.call('closeWindow');
            //     }else{
            //         window.opener=null;
            //         window.open('','_self');
            //         window.location.href="about:blank";
            //         window.close(); 
            //     };
            //     return false
            // };
            this.$router.replace({path:'/taskWall',query: {recordPage:pervePage}});
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
           _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
           _this.getData();
        });
        config.isGoBack(_this.forbidBack);
        
    }
}
</script>

<style scoped>
@import './index.css';
</style>