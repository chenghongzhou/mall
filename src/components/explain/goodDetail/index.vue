<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            商品详情
        </div>
        <div class="content">
            <div class="header">
                <!-- <div class="go_back" @click="forbidBack()"></div> -->
                <img :src="params.pic" alt="">
            </div>
            <div class="good_info_box">
                <div class="good_price_part">
                    <div class="price" v-if="params.source == 0">原价：{{params.normal_price}}元</div>
                    <div class="price_result" :class="{'good_source':params.source == 1}" v-if="params.source == 0"><i></i><span>{{params.is_give_integral}}</span>积分 <span v-if="params.source == 0">+{{params.current_price}}元</span></div>
                    <div class="price_result" :class="{'good_source':params.source == 1}" v-if="params.source == 1"><i style="background: url('../../../../static/images/goodDetail/q_icon.png') center no-repeat;background-size:contain"></i><span>{{(params.coupon_discount/100).toFixed(2)}}抵用券</span></div>
                </div>
                <div class="ex_people_nums" :class="{'no_bg':params.source == 1}">
                    <div>{{params.is_give_integral}}积分</div>
                </div>
            </div>
            <div class="good_name">{{params.name}}</div>
            <div class="good_good">{{params.name_dec}}</div>
            <div class="p_q" v-if="params.source == 1"><span>￥</span>{{(params.coupon_discount/100).toFixed(2)}}<span>券后价</span><font>￥{{(params.normal_price/100).toFixed(2)}}</font></div>
            <div class="get_q" v-if="params.source == 1">兑换后立得{{params.coupon_discount/100}}元抵用券</div>
            <div class="good_detail_tl">商品详情</div>
            <div class="good_detail" v-html="params.dec"></div>
            <div class="btn" @click="buyGood()">立即兑换</div>
        </div>
         <div class="mask" v-if="successMask">
			<div class="mask_main success">
				<div class="box tanchuscale">
                    <div class="success_title">兑换成功</div>
                    <div class="success_msg">继续赚取积分，兑换更多好礼</div>
                    <div class="success_btn" @click="successMask = false">确定</div>
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
        }
    },
    methods: {
        buyGood(){
            var _this = this;
            if(_this.params.source == 1){
                _this.getGood();
                
            }else{
                this.$router.replace({path:'/buyGood'}); 
            }
           
        },
        getGood(){
            var _this = this;
           // _this.successMask = true
            var openid = _this.userInfoData.open_id;
            _this.$axios.get("http://v8tob.youwoxing.net/store/product_library/pdd_detail?ids="+_this.params.goods_id).then((res) => {
                if(res.data){
                    var q_num = res.data.mall_coupon_remain_quantity;
                    if(q_num && q_num>0 && res.data.mall_coupon_remain_quantity>=_this.num){
                        _this.handleEx();
                    }else{
                        _this.handleEx();
                        config.layerMsg('库存不足~', 2);
                    }
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
          //兑换扣积分
        handleEx(){
            var _this = this;
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data":{
                    "score": _this.params.is_give_integral,
                    "useType": _this.params.goods_id,
                    "count":1
                }
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/c_account/use_score",formData,headerConfig).then((res) => {
                if(res.data){
                   
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
         getf(){
            var _this = this;
            var t_data = config.getCookie('userInfoData');
            if(t_data){
                _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
            };
            var t_store = config.getCookie('userInfo');
            if(t_store){
                 _this.storeId = Number(JSON.parse(config.getCookie('userInfo')).storeId);
            }
        },
        forbidBack(){
            this.$router.replace({path:'/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    activated(){
         this.params = this.$store.state.goodInfo;
         window.scrollTo(0,0);
         this.getf();
    },
    mounted(){
        var _this = this;
        _this.params = _this.$store.state.goodInfo;
        _this.getf();
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
            console.log(_this.params)
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