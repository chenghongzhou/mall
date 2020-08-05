<template>
    <div class="main" style="height:100vh">
        <div class="header_part" ref="header">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                中奖记录
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
       <div class="content" style="background:red">
           <div class="c_t"></div>
           <div class="list_box">
                <ul>
                    <li v-for="(item,index) in list" :key="index">
                        <img :src="item.icon_url" alt="">
                        <div class="info">
                            <div class="name">{{item.bonus_name}}</div>
                            <div class="time">{{item.create_time}}</div>
                        </div>
                        <div class="tal" @click="handleTal(item,index)">联系客服</div>
                    </li>
                    <div class="nodata" v-if="list.length == 0">暂无数据</div>
                </ul>
           </div>
       </div>


        <div class="mask" v-if="wx_code">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="codeImg" alt="" class="mask_wx_code">
                    <div class="exchange_show_text">客服微信</div>
                    <div class="file_close" @click="wx_code = false"></div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            userInfoData:{},
            storeId:'',
            openid:'',
            codeImg:'',
            wx_code:false,
            list:[
                {avatarUrl:'',nickName:'41',dateTmStr:'454'}
            ]
        }
    },
     methods: {
        exchangeRecord(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=luckDraw&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=luckDraw&ishome='+ishome});
        },
        handleTal(item,index){
            this.wx_code = true;
            this.codeImg = item.qrcode;
        },
        getData(){
            var _this = this;
            var id = _this.id;
            _this.$loading.show();
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            _this.$axios.post(allget+"/lottery/get_lottery_reward_record",formData,headerConfig).then((res) => {
                if(res.data){
                   _this.list = res.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
                _this.$loading.close();
            }).catch(() => {
                _this.$loading.close();
                console.log('error');
            });
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = config.getHashVReq('recordPage');
            var ishome = config.getHashVReq('ishome');
            _this.$router.replace({path:'/luckDraw?ishome='+ishome+'&pervePage='+pervePage});
        },
         isLg(){
            var _this = this;
            var t_data = config.getCookie('userInfoData');
           
            if(t_data){
                _this.userInfoData = JSON.parse(t_data);
            }
            var t_store = config.getCookie('userInfo');
            if(t_store){
                 _this.storeId = Number(JSON.parse(t_store).storeId);
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
        config.isGoBack(_this.forbidBack);
        _this.isLg();
        _this.$nextTick(() =>{
            _this.getData()
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>