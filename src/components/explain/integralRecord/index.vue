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
                        <div class="intergal_nums">{{total}}</div>
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
                        <div class="time">{{item.get_time}}</div>
                        <div class="nums">{{item.num}}</div>
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
            storeId:'',
            openid:'',
            total:''
        }
    },
    methods:{
        goHome(){
            window.location.href = 'http://v8homepage.youwoxing.net/?position=';
           // this.$router.replace({path:'/?isback=no&position='});
        },
        getData(){
            var _this = this;
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid
            };
            _this.$loading.show();
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/c_account/get_score_records",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.list = res.data.data;
                    _this.total = res.data.sum_count;
                }else{
                    config.layerMsg('出错了~', 2);
                };
                _this.$loading.close();
            }).catch(() => {
                _this.$loading.close();
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
           var t_data = config.getCookie('userInfoData');
            if(t_data){
                _this.userInfoData = JSON.parse(t_data);
            };
            var t_store = config.getCookie('userInfo');
            if(t_store){
                 _this.storeId = Number(JSON.parse(t_store).storeId);
            };
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id).open_id;
            };
           _this.getData();
        });
        config.isGoBack(_this.forbidBack);
        
    }
}
</script>

<style scoped>
@import './index.css';
</style>