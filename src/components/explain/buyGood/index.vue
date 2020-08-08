<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            确认兑换
        </div>
        <!-- <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
        </div> -->
        <div class="address_box" v-if="goodInfo.source == 0 && goodInfo.show_type == 2" @click="goAddress()">
            <div class="address_icon" v-if="defaultDate.name"></div>
            <div class="address_info" v-if="defaultDate.name">
                <div class="address_info_name">{{defaultDate.name}}  {{defaultDate.tel}}</div>
                <div class="address_info_address">{{defaultDate.address}} {{defaultDate.address_detail}}</div>
            </div>
            <div class="address_info" v-if="!defaultDate.name">
               
                <div class="address_info_name" style="margin-top:0.4rem;color:#cccccc"> 请选择收货地址</div>
            </div>
            <div class="address_list"></div>
            <div class="go_edit_address"></div>
        </div>

        <div class="buy_good_box">
            <div class="order_info_box">
                <img :src="goodInfo.pic" alt="" class="order_good_img">
                <div class="order_info">
                    <div class="order_name">{{goodInfo.name}}</div>
                    <div class="good_intr">{{goodInfo.name_dec}}</div>
                    <div class="good_price">
                        <div v-if="goodInfo.buy_type == 0">
                            <span>￥{{goodInfo.current_price}}</span>
                        </div>
                        <div v-if="goodInfo.buy_type == 1">
                            <i class="money_icon"></i>{{goodInfo.cost}}
                        </div>
                        <div v-if="goodInfo.buy_type == 2">
                            <i class="money_icon"></i>{{goodInfo.cost}}<span v-if="goodInfo.source == 0">+￥{{goodInfo.current_price}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="order_money_box" style="border-top: 1px solid #f1f1f1">
                <div class="order_money">
                    <div class="order_money_in">兑换数量<div class="nums"><div class="reduce" @click="goodNum(1)"></div><div class="buy_nums">{{num}}</div><div class="add" @click="goodNum(2)"></div></div></div>
                    
                </div>
            </div> -->
        </div>

        <div class="footer">
            <div class="money_box">
                <div class="intergral" :class="{'is_jf':goodInfo.buy_type == 1}" v-if="goodInfo.buy_type == 1 || goodInfo.buy_type == 2">合计(积分)：<i></i><span>{{total_integral}}</span></div>
                <div class="money" v-if="goodInfo.buy_type == 0 || goodInfo.buy_type == 2">合计(现金)：<i></i><font>￥</font><span>{{total_price}}</span></div>
            </div>
            <div class="btn" @click="getGood()">立即兑换</div>
        </div>

        <div class="mask" v-if="successMask">
			<div class="mask_main success">
				<div class="box tanchuscale">
                    <div class="success_title">兑换成功</div>
                    <div class="success_msg">继续赚取积分，兑换更多好礼</div>
                    <div class="success_btn" @click="handleSuccessMask()">立即查看</div>
                    <div class="file_close" @click="successMask = false"></div>
				</div>
			</div>
		</div>
        <div class="mask" v-if="fileMask">
			<div class="mask_main file">
				<div class="box tanchuscale">
                    <div class="file_title">积分不足</div>
                    <div class="file_need">本次兑换共需{{goodInfo.cost || 0}}积分</div>
                    <div class="file_you">当前积分{{userInfoData.score}}</div>
                    <div class="file_btn" @click="goTaskWall()">立即赚积分</div>
                    <div class="file_close" @click="fileMask = false"></div>
				</div>
			</div>
		</div>
        <div class="mask" v-if="wx_code">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="goodImg" alt="" class="mask_wx_code">
                    <div class="exchange_show_text">{{goodText}}</div>
                    <div class="success_btn" style="margin-top:0.1rem" @click="handleServer()">确定</div>
                    <div class="file_close" @click="wx_code = false"></div>
				</div>
			</div>
		</div>
        <div class="mask" v-if="kserver">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="kserverCode" alt="" class="mask_wx_code">
                    
                    <div class="success_btn" style="margin-top:0.4rem" @click="goGoodRecord()">我已添加客服</div>
				</div>
			</div>
		</div>
        <!--实物-->
        <div class="mask" v-if="sh_server">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="shServerCode" alt="" class="mask_wx_code">
                    
                    <div class="success_btn" style="margin-top:0.4rem" @click="goGoodRecord()">我已添加客服</div>
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
            defaultDate:{
                name:'',
                tel:'',
                address_detail:'',
                address:''
            },
            storeId:'',
            openid:'',
            wx_code:false,
            goodImg:'',
            goodText:'',
            id:'',
            kserver:false,
            kserverCode:'',
            sh_server:false,
            shServerCode:''
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
            this.total_integral = this.goodInfo.cost*this.num;
            this.total_price = this.goodInfo.current_price*this.num;
        },
        goGoodRecord(){
            this.sh_server = false;
            this.kserver = false;
            this.$router.replace({path:'/exchangeRecord'});
        },
        handleSuccessMask(){
            var _this = this;
            if(_this.goodInfo.show_type == 0){
                if(_this.goodInfo.exchange_jump_url != ""){
                    _this.successMask = false;
                    window.location.href = _this.goodInfo.exchange_jump_url;
                }else{
                    config.layerMsg('未配置链接！', 2);
                }
            }else if(_this.goodInfo.show_type == 1){
                _this.goodImg = _this.goodInfo.exchange_show_pic;
                _this.goodText = _this.goodInfo.exchange_show_text;
                _this.successMask = false;
                _this.wx_code = true;
            }else if(_this.goodInfo.show_type == 2){
                _this.successMask = false;
                if(_this.goodInfo.is_need_qrcode == 1){
                    _this.shServerCode = _this.goodInfo.qrcode;
                    _this.sh_server = true;
                }else{
                    this.$router.replace({path:'/exchangeRecord'});
                }
            }else{
                config.layerMsg('类型错误', 2);
            };
        },
        handleServer(){
            var _this = this;
             _this.wx_code = false;
            if(_this.goodInfo.is_need_qrcode == 1){
                _this.kserverCode = _this.goodInfo.qrcode;
                _this.kserver = true;
            }else{
                this.$router.replace({path:'/exchangeRecord'});
            }
        },
        getGood(){
            var _this = this;
            if(_this.goodInfo.show_type == 2){
                if(!_this.defaultDate.name){
                    config.layerMsg('请添加收获地址~', 2);
                    return false;
                };
            };
           
            
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid,
                "data":{
                    "score": _this.goodInfo.cost || 0,
                    "useType": _this.goodInfo.goods_id,
                    "num":1,
                     "pay_money": _this.goodInfo.current_price,
                    "address":'',
                     "name":'',
                    "tel":"",
                    "product_id":_this.goodInfo.id,
                    "pay_type":1
                }
            };
            if(_this.goodInfo.show_type == 2){
                formData.data.address = _this.defaultDate.address+_this.defaultDate.address_detail;
                formData.data.name = _this.defaultDate.name;
                formData.data.tel = _this.defaultDate.tel;
            }
            if(_this.goodInfo.buy_type == 0){
                formData.data.pay_type = 2;
            }
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/items/give_item",formData,headerConfig).then((res) => {
                if(res.data.code == 200){
                   _this.successMask = true;
                }else if(res.data.code == 201){
                    _this.fileMask = true;
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
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
                    _this.goodInfo = res.data;
                    _this.total_integral = _this.goodInfo.cost;
                    _this.total_price = _this.goodInfo.current_price;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
                _this.$loading.close();
            }).catch(() => {
                _this.$loading.close();
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
        getAddress(){
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
            _this.$axios.post(allget+"/c_account/get_user_contacts",formData,headerConfig).then((res) => {
                if(res.data){
                    _this.list = res.data;
                     if(_this.list.length > 0){
                          _this.list.forEach((item,index) => {
                             if(item.if_default){
                                 //_this.defaultDate = item;
                                 _this.defaultDate.name = item.name;
                                _this.defaultDate.tel = item.tel;
                                _this.defaultDate.address = item.address;
                                _this.defaultDate.address_detail = item.address_detail;
                             }
                          });
                        }
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
      },
        //获取地址
        // getAddress(){
        //     var _this = this;
        //     var addressInfo = {
        //         'store_id': _this.storeId,
        //         "open_id":_this.openid
        //     };
        //     store.dispatch('GetAddress', addressInfo)
        //         .then((res) => {
        //             if(res) {
        //                 _this.list = res.data;
        //                 // if(_this.list.length > 0){
        //                 //   _this.list.forEach((item,index) => {
        //                 //      if(item.if_default){
        //                 //          _this.defaultDate = item;
        //                 //      }
        //                 //   });
        //                 //   if(!_this.defaultDate.if_default){
        //                 //     _this.defaultDate=_this.list[0];
        //                 //   };
        //                 // }
        //             } else {
                        
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // },
        goAddress(){
            this.$router.replace({path:'/addressManagement/index'});
        },
        goTaskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        forbidBack(){
            this.$router.replace({path:'/goodDetail?id='+this.id});
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
            }
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id).open_id;
            };
            var address_name = config.getHashVReq('name');
            if(address_name){
                _this.defaultDate.name = config.getHashVReq('name');
                _this.defaultDate.tel = config.getHashVReq('tel');
                _this.defaultDate.address = config.getHashVReq('address');
                _this.defaultDate.address_detail = config.getHashVReq('address_detail');
            }else{
                 _this.getAddress();
            }
            
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    activated(){
        var _this = this;
         _this.getf();
         if(_this.$store.state.goodInfo.id){
             _this.goodInfo = _this.$store.state.goodInfo;
             _this.total_integral = _this.goodInfo.cost;
             _this.total_price = _this.goodInfo.current_price;
        }else{
            _this.getData();
        };
       // _this.getAddress();
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
         _this.getf();
         if(_this.$store.state.goodInfo.id){
             _this.goodInfo = _this.$store.state.goodInfo;
             _this.total_integral = _this.goodInfo.cost;
             _this.total_price = _this.goodInfo.current_price;
        }else{
            _this.getData();
        };
        _this.$nextTick(() =>{
            
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>