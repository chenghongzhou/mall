<template>
    <div class="main">
        <div class="top" style="position: fixed; top: 0px; left: 0px; z-index: 10; height: 1.04rem;">
            <i class="top_close" @click="forbidBack()"></i>
            商品详情
        </div>
        <div class="content">
            <div style="height: 1.04rem; width: 100%;"></div>
            <div class="header">
                <!-- <div class="go_back" @click="forbidBack()"></div> -->
                <img :src="params.pic" alt="">
            </div>
            <div class="good_info_box" :class="{'good_info_box_self':params.source == 0}">
                <div style="overflow:hidden;position:relative">
                    <div class="good_price_part">
                        <div class="price" v-if="params.source == 0" style="margin-top:0.35rem">
                            <!-- 原价：{{params.normal_price}}元 -->
                        </div>
                        <div class="price_result" :class="{'good_source':params.source == 1}" v-if="params.source == 0">
                            <div v-if="params.buy_type == 0">
                                <span>{{params.current_price}}元</span>
                            </div>
                            <div v-if="params.buy_type == 1">
                                <i></i><span>{{params.cost}}</span>积分
                            </div>
                            <div v-if="params.buy_type == 2">
                                <i></i><span>{{params.cost}}</span>积分 <span v-if="params.source == 0">+{{params.current_price}}元</span>
                            </div>  
                        </div>
                        <div class="price_result" :class="{'good_source':params.source ==1 }" v-if="params.source == 1"><i style="background: url('../../../../static/images/goodDetail/q_icon.png') center no-repeat;background-size:contain"></i><span>{{(params.coupon_discount/100).toFixed(2)}}抵用券</span></div>
                        <div class="q_time" v-if="params.source == 1">{{s_time}}-{{e_time}}</div>
                    </div>
                    <div class="ex_people_nums">
                        <div>{{params.cost}}积分</div>
                    </div>
                </div>
                <div class="good_info_tl" :class="{'good_info_tl_self':params.source == 0}">
                    <div class="good_name">{{params.name}}</div>
                    <div class="p_q" v-if="params.source == 1"><span>￥</span>{{(params.coupon_discount/100).toFixed(2)}}<span>券后价</span><font>￥{{(params.normal_price/100).toFixed(2)}}</font></div>
                </div>
            </div>
            
            <!-- <div class="good_good">{{params.name_dec}}</div> -->
            
            <!-- <div class="get_q" v-if="params.source == 1">兑换后立得{{params.coupon_discount/100}}元抵用券</div>
            <div class="good_detail_tl">商品详情</div> -->
            <div class="exchange_info" v-if="params.source == 1">
                <p>兑换说明</p>
                <ul>
                    <li><span></span>兑换成功后，可活动 {{(params.coupon_discount/100).toFixed(2)}} 元抵扣价。</li>
                    <li><span></span>券后仅需 {{(params.coupon_discount/100).toFixed(2)}} 元即可购买，以购买页实时价格为准。</li>
                    <li><span></span>请在适用范围内适用，数量有限，兑完即止。</li>
                </ul>
            </div>
            <div class="good_detail" v-html="params.dec" ref="detailBox"></div>
            <div class="good_detail_footer">
                <div class="btn" @click="buyGood()">立即兑换</div>
            </div>
            
        </div>
         <div class="mask" v-if="successMask">
			<div class="mask_main success">
				<div class="box tanchuscale">
                    <div class="success_title">兑换成功</div>
                    <div class="success_msg">继续赚取积分，兑换更多好礼</div>
                    <div class="success_btn" @click="handleSuccessMask()">立即查看</div>
				</div>
			</div>
		</div>
        <div class="mask" v-if="fileMask">
			<div class="mask_main file">
				<div class="box tanchuscale">
                    <div class="file_title">积分不足</div>
                    <div class="file_need">本次兑换共需{{params.cost || 0}}积分</div>
                    <div class="file_you">当前积分{{userInfoData.score}}</div>
                    <div class="file_btn" @click="goTaskWall()">立即赚积分</div>
                    <div class="file_close" @click="fileMask = false"></div>
				</div>
			</div>
		</div>

        
    </div>
</template>

<script>
import store from '../../../vuex/store';
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            params:{},
            userInfoData:{},
            storeId:'',
            successMask: false,
            openid:'',
            fileMask:false,
            id:'',
            q_num:0,
            s_time:'',
            e_time:''
        }
    },
    methods: {
        buyGood(){
            var _this = this;
            if(_this.params.source == 1){
                _this.getGood();
            }else{
                this.$router.replace({path:'/buyGood?id='+_this.id}); 
            }
           
        },
        goTaskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        getData(){
            var _this = this;
            var id = _this.id;
            _this.$loading.show();
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid,
                "data":{
                     "productId":Number(id)
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            _this.$axios.post(allget+"/items/get_item",formData,headerConfig).then((res) => {
                if(res.data){
                   _this.params = res.data;
                   setTimeout(() => {
                        _this.detailBox();
                    },0)
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
                _this.$loading.close();
            }).catch(() => {
                _this.$loading.close();
                console.log('error');
            });
        },
        formatTime(data){
            var time = new Date(data*1000);
           var year = time.getFullYear();
           var month = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1;
           var day = time.getDate()<10?'0'+time.getDate():time.getDate();
            return year+'.'+month+'.'+day;
        },
        getQInfo(){
            var _this = this;
            _this.$axios.get("http://v8tob.youwoxing.net/store/product_library/pdd_detail?ids=156284673098&klk="+_this.params.goods_id).then((res) => {
                if(res.data){
                    _this.q_num = res.data.coupon_remain_quantity;
                    _this.s_time = _this.formatTime(res.data.coupon_start_time);
                    _this.e_time = _this.formatTime(res.data.coupon_end_time);
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        getGood(){
            var _this = this;
            var openid = _this.openid;
            var good_intergral = _this.params.score;
            if(_this.userInfoData.score<good_intergral){
                _this.fileMask = false;
                return false;
            };
            if(_this.q_num>0){
                _this.handleEx();
            }else{
                config.layerMsg('库存不足~', 2);
            }
        },
        handleSuccessMask(){
            var _this = this;
            window.location.href = _this.params.pdd_url;
        },
          //兑换扣积分
        handleEx(){
            var _this = this;
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid,
                "data":{
                    "score": _this.params.cost || 0,
                    "useType": _this.params.goods_id,
                    "num":1,
                     "pay_money":0,
                    "address":"",
                     "name":"",
                    "tel":"",
                    "product_id":_this.params.id,
                    "pay_type":0
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/give_item",formData,headerConfig).then((res) => {
                if(res.data.code == 200){
                    _this.getUserInfoMy();
                   _this.successMask = true;
                }else if(res.data.code == 201){
                    _this.fileMask = false;
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        detailBox(){
            var _this = this;
            var detailBox = _this.$refs.detailBox;
            var childImg = detailBox.getElementsByTagName('img');
            if(childImg.length > 0){
                for(var i = 0;i<childImg.length;i++){
                    childImg[i].style.width = "100%";
                }
            }
        },
        //获取用户信息和金币
        getUserInfoMy(){
            var _this = this;
            var formData = {
                "open_id":_this.openid,
                "store_id":_this.storeId,
                "data":{
                    "avatar_url":_this.userInfoData.headimgurl,
                    "nick_name":_this.userInfoData.nickname,
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
         getf(){
            var _this = this;
            var t_data = config.getCookie('userInfoData');
            _this.id = config.getHashVReq('id');
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
        },
        forbidBack(){
            this.$router.replace({path:'/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    activated(){
         this.getf();
        window.scrollTo(0,0);
        if(this.$store.state.goodInfo.id){
            this.params = this.$store.state.goodInfo;
            setTimeout(() => {
                this.detailBox();
            },0)
        }else{
            this.getData();
        };
        this.getQInfo();
    },
    mounted(){
        var _this = this;
         this.getf();
        window.scrollTo(0,0);
        if(this.$store.state.goodInfo.id){
            this.params = this.$store.state.goodInfo;
            setTimeout(() => {
                this.detailBox();
            },0)
        }else{
            this.getData();
        };
        this.getQInfo();
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>
<style>
.good_detail img{
    width: 100%;
    margin: 0 auto;
    
}
</style>