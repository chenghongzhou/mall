<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            确认兑换
        </div>
        <!-- <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
        </div> -->
        <div class="address_box" v-if="goodInfo.source == 0">
            <div class="address_icon" v-if="list.length >0"></div>
            <div class="address_info" v-if="list.length >0">
                <div class="address_info_name">{{defaultDate.name}}  {{defaultDate.tel}}</div>
                <div class="address_info_address">{{defaultDate.address}} {{defaultDate.address_detail}}</div>
            </div>
            <div class="address_info" v-if="list.length == 0">
               
                <div class="address_info_name" style="margin-top:0.4rem;color:#cccccc"> 您还没有收获地址，去添加</div>
            </div>
            <div class="address_list" @click="goAddress()"></div>
            <div class="go_edit_address"></div>
        </div>

        <div class="buy_good_box">
            <div class="order_info_box">
                <img :src="goodInfo.pic" alt="" class="order_good_img">
                <div class="order_info">
                    <div class="order_name">{{goodInfo.name}}</div>
                    <div class="good_intr">{{goodInfo.name_dec}}</div>
                    <div class="good_price"><i class="money_icon"></i>{{goodInfo.is_give_integral}}<span v-if="goodInfo.source == 0">+￥{{goodInfo.current_price}}</span></div>
                </div>
            </div>
            <div class="order_money_box">
                <div class="order_money">
                    <div class="order_money_in">兑换数量<div class="nums"><div class="reduce" @click="goodNum(1)"></div><div class="buy_nums">{{num}}</div><div class="add" @click="goodNum(2)"></div></div></div>
                    
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="money_box">
                <div class="intergral" :class="{'is_jf':goodInfo.source != 0}">合计(积分)：<i></i><span>{{total_integral}}</span></div>
                <div class="money" v-if="goodInfo.source == 0">合计(现金)：<i></i><font>￥</font><span>{{total_price}}</span></div>
            </div>
            <div class="btn" @click="getGood()">立即兑换</div>
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
        <div class="mask" v-if="fileMask">
			<div class="mask_main file">
				<div class="box tanchuscale">
                    <div class="file_title">兑换成功</div>
                    <div class="file_need">本次兑换共需999积分</div>
                    <div class="file_you">当前积分99</div>
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
            num: 1,
            successMask: false,
            fileMask: false,
            goodInfo:{},
            total_integral:'',  //总共的积分
            total_price:'',    //总共的价格
            userInfoData:{},
            list:[],
            defaultDate:{},
            storeId:'',
            openid:''
        }
    },
    methods: {
        goodNum(index){
            //1减 2加
            if(index == 1){
                this.num>1?this.num = this.num-1:this.num=1;
            }else{
                this.num++; 
            };
            this.total_integral = this.goodInfo.is_give_integral*this.num;
            this.total_price = this.goodInfo.current_price*this.num;
        },
        getGood(){
            var _this = this;
//@click="successMask = true"
            if(_this.list.length == 0 && _this.goodInfo.sourc == 0){
                config.layerMsg('请添加收获地址~', 2);
                return false;
            };
            var openid =_this.openid;
            var formData = {
                "ids":_this.goodInfo.goods_id
            };
            _this.$axios.get("http://v8tob.youwoxing.net/store/product_library/pdd_detail?ids="+_this.goodInfo.goods_id).then((res) => {
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
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid,
                "data":{
                    "score": _this.goodInfo.is_give_integral,
                    "useType": _this.goodInfo.goods_id,
                    "count":_this.num
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
        //获取地址
        getAddress(){
            var _this = this;
            var addressInfo = {
                'store_id': _this.storeId,
                "open_id":_this.openid
            };
            store.dispatch('GetAddress', addressInfo)
                .then((res) => {
                    if(res) {
                        _this.list = res.data;
                        if(_this.list.length > 0){
                          _this.list.forEach((item,index) => {
                             if(item.if_default){
                                 _this.defaultDate = item;
                             }
                          });
                          if(!_this.defaultDate.if_default){
                            _this.defaultDate=_this.list[0];
                          };
                        }
                    } else {
                        
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goAddress(){
            this.$router.replace({path:'/addressManagement/index'});
        },
        goTaskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        forbidBack(){
            this.$router.replace({path:'/goodDetail'});
        },
        getf(){
            var _this = this;
            var t_data = config.getCookie('userInfoData');
            if(t_data){
                _this.userInfoData = JSON.parse(t_data);
            };
            var t_store = config.getCookie('userInfo');
            if(t_store){
                 _this.storeId = Number(JSON.parse(t_store).storeId);
            }
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id).open_id;
            };
             _this.goodInfo = _this.$store.state.goodInfo;
             _this.total_integral = _this.goodInfo.is_give_integral;
             _this.total_price = _this.goodInfo.current_price;
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    activated(){
         this.getf();
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
            _this.getf();
            _this.getAddress();
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>