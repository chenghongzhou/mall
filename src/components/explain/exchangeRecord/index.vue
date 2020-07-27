<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            兑换记录
        </div>
        <div class="tab_box">
            <div class="tab_all" :class="{'tab_active':tabIndex == 1}" @click="handleTabChange(1)"><span>全部<i v-if="tabIndex == 1"></i></span></div>
            <div class="tab_ing" :class="{'tab_active':tabIndex == 2}" @click="handleTabChange(2)"><span>待发货<i v-if="tabIndex == 2"></i></span></div>
            <div class="tab_resive" :class="{'tab_active':tabIndex == 3}" @click="handleTabChange(3)"><span>待收货<i v-if="tabIndex == 3"></i></span></div>
            <div class="tab_sc" :class="{'tab_active':tabIndex == 4}" @click="handleTabChange(4)"><span>已完成<i v-if="tabIndex == 4"></i></span></div>
        </div>
        <div class="list_box">
            <div class="content">
                <div class="nodata" v-if="!dataList || dataList.length == 0">暂无数据</div>
                <div class="list" @click="orderDetail()" v-for="(item,index) in dataList" :key="index">
                    <div class="order_number">兑换单号：{{item.out_trade_no}}</div>
                    <div class="order_status">
                        <span v-if="item.status == 0">待发货</span>
                        <span v-if="item.status == 1">待收货</span>
                        <span v-if="item.status == 2">已完成</span>
                    </div>
                    <div class="order_info_box">
                        <img :src="item.product_thumbnail" alt="" class="order_good_img">
                        <div class="order_info">
                            <div class="order_name">{{item.product_name}}</div>
                            <div class="good_intr">{{item.dec}}</div>
                            <div class="good_price"><i class="money_icon"></i>{{item.cost_integral}}+￥{{item.pay_num}}</div>
                            <div class="good_nums">X{{item.num}}</div>
                        </div>
                    </div>
                    <div class="order_money_box">
                        <div class="order_money">
                            <div class="order_money_in">共{{item.num}}件，合计(积分):<span>{{item.cost_integral}}</span></div>
                            <div class="order_money_in" style="margin-top:0.03rem">合计(现金):<span class="money">￥{{item.pay_num}}</span></div>
                        </div>
                    </div>
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
            tabIndex: 1,
            dataList:[],
            storeId:'',
            openid:''
        }
    },
    methods: {
        handleTabChange(index){
            var _this = this;
            _this.tabIndex = index;
        },
        orderDetail(){
             var ishome = config.getHashVReq('ishome');
             var pervePage = config.getHashVReq('pervePage');
            this.$router.replace({path:'/orderDetail?recordPage='+pervePage+'&ishome='+ishome});
        },
        //获取数据
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
            _this.$axios.post(allget+"/items/get_items_record",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.dataList = res.data.result_list;
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = config.getHashVReq('recordPage');
            var ishome = config.getHashVReq('ishome');
            if(pervePage == 'index'){
                 _this.$router.replace({path:'/'});
            }else if(pervePage != '/' && pervePage){
               _this.$router.replace({path:'/'+pervePage+'?ishome='+ishome});
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
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        var t_store = config.getCookie('userInfo');
        if(t_store){
            _this.storeId = Number(JSON.parse(t_store).storeId);
        };
        var t_open_id = config.getCookie('openid');
        if(t_open_id){
            _this.openid = JSON.parse(t_open_id).open_id;
        };
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() => {
            _this.getData();
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>