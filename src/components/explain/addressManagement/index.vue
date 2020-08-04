<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            收货地址
        </div>
        <div>
        <!-- <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
        </div> -->
        <div class="address_box">
            <div class="address_list" v-for="(item,index) in list" :key="index" @click="handldCheckAddress(item,index)" :class="{'check_address':index == itemIndex}">
                <div class="address_xl">
                    <div class="name">{{item.name}}</div>
                    <div class="tel">{{item.tel}}</div>
                </div>
                <div class="address" style="margin-top:0.2rem">{{item.address}}</div>
                <div class="address">{{item.address_detail}}</div>
                <div class="btns">
                    <div class="set_default" @click="handleDefault(item,index)"><i :class="{'default':item.if_default == true}"></i>默认地址</div>
                    <div class="operation">
                        <div class="edit" @click="handleEdit(item,index)"></div><div class="delet" @click="handleDel(item,index)"></div>
                    </div>
                </div>
            </div>
            <!-- <div class="address_list">
                <div class="address_xl">
                    <div class="name">微分先生</div>
                    <div class="tel">18064026245</div>
                </div>
                <div class="address">广东省 深圳市 南山区 深圳湾1号8栋101室</div>
                <div class="btns">
                    <div class="set_default set_default_default"><i class="default"></i>默认地址</div>
                    <div class="operation">
                        <div class="edit" @click="handleEdit()"></div><div class="delet"></div>
                    </div>
                </div>
            </div> -->
            <div class="btn" @click="handleAdd()">添加地址</div>
        </div>
        </div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            userInfoData: {},
            list:[],
            storeId:'',
            openid:'',
            itemIndex:'-1'
        }
    },
    methods: {
      handleAdd(){
          this.$router.replace({path:'/addressManagement/add'});
      },
      handldCheckAddress(item,index){
          this.itemIndex = index;
          var params = '?name='+item.name+'&tel='+item.tel+'&address='+item.address+'&address_detail='+item.address;
          this.$router.replace({path:'/buyGood'+params});
      },
      handleEdit(rows){
          config.setCookie(
                'editAddress', 
                JSON.stringify(rows), 
                7
            );
          this.$router.replace({path:'/addressManagement/add',query: {edit:'1'}});
      },
      //获取收获地址
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
            }else{
                config.layerMsg('出错了~', 2);
            };
        }).catch(() => {
            console.log('error');
        });
      },
      //添加收获地址
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
        _this.$axios.post(allget+"/c_account/add_user_contact",formData,headerConfig).then((res) => {
            if(res.data){

            }else{
                config.layerMsg('出错了~', 2);
            };
        }).catch(() => {
            console.log('error');
        });
    },
    //删除地址
    handleDel(rows,index){
        var _this = this;
        var formData = {
            'store_id': _this.storeId,
            "open_id":_this.openid,
            "data":{
                "id":rows.id
            }
        };
        
        var headerConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        _this.$axios.post(allget+"/c_account/del_user_contact",formData,headerConfig).then((res) => {
            if(res.data.error_code == 0){
                _this.getAddress();
                config.layerMsg('已删除', 1);
            }else{
                config.layerMsg(res.data.msg, 2);
            };
        }).catch(() => {
            console.log('error');
        });
    },
    //设置默认地址
    handleDefault(rows,index){
        var _this = this;
        var formData = {
            'store_id': _this.storeId,
            "open_id":_this.openid,
            "data":{
                "id":rows.id
            }
        };
        
        var headerConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        _this.$axios.post(allget+"/c_account/alter_default_address",formData,headerConfig).then((res) => {
            if(res.data.error_code == 0){
                _this.getAddress();
            }else{
                config.layerMsg(res.data.msg, 2);
            };
        }).catch(() => {
            console.log('error');
        });
    },
      forbidBack(){
          this.$router.replace({path:'/buyGood'});
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
            _this.getAddress();
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>