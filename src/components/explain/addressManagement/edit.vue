<template>
    <div class="main" ref="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            编辑收货地址
        </div>
        <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
            <div class="delet_btn">删除</div>
        </div>
        <div class="content">
            <div class="list">
                <div class="label_left">收货人</div>
                <div class="label_right"><input type="text" name="" id="" class="address_detail" @focus="handBlur()" placeholder="收货人姓名"></div>
            </div>
            <div class="list">
                <div class="label_left">手机号</div>
                <div class="label_right"><input type="number" name="" id="" class="address_detail" @focus="handBlur()" placeholder="收货人手机号"></div>
            </div>
            <div class="list" id="demo">
                <div class="label_left">所在地区</div>
                <div class="label_right" :class="{'addressColor':isAddressCheck==false}">{{address1}}<i></i></div>
            </div>
            <div class="list">
                <div class="label_left">详细地址</div>
                <div class="label_right">
                    <input type="text" name="" id="" class="address_detail" @focus="handBlur()" placeholder="详细地址">
                </div>
            </div>
        </div>
        <input id="value" type="hidden" value="20,234,504">
        <div class="content">
            <div class="list">设为默认地址<i :class="{'open':isOpen}" @click="handleSet()"></i></div>
        </div>
        <div class="btn" v-if="btnShow">保存</div>
    </div>
</template>

<script>
import '../../../../static/js/LAreaData.js';
import '../../../../static/css/LArea.css';
import '../../../../static/js/LArea.js';

export default {
    data(){
        return {
            isOpen: false,
            btnShow: true,
            address1:'请选择地址',
            isAddressCheck: false
        }
    },
    methods: {
        handleSet(){
            this.isOpen?this.isOpen=false:this.isOpen=true;
        },
        onSelected(){
            var _this = this;
            var area = new LArea();
            area.init({
                'trigger': '#demo', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                'valueTo': '#value', //选择完毕后id属性输出到该位置
                'keys': {
                    id: 'id',
                    name: 'name'
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                'type': 1, //数据源类型
                'data': LAreaData,
                'onResult':function(result){
                    _this.address1 = result;
                    _this.isAddressCheck = true;
                }
            });
            area.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value
        },
        handBlur(){
            window.scroll(0,0);
        },
        setPosition(){
            var _this = this;
            if(config.appVersion.android==true){
                var screenHeight = _this.$refs.main.offsetHeight;
                window.onresize = function(){
                    var nowHeight = _this.$refs.main.offsetHeight;
                    nowHeight<screenHeight?_this.btnShow = false:_this.btnShow = true;
                };
            }
        },
        forbidBack(){
          this.$router.replace({path:'/addressManagement/index'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            _this.setPosition();
            _this.onSelected();
        })
    }
}
</script>
<style >

</style>
<style scoped>
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .top{
        width: 100%;
        height: auto;
        padding: 0.3rem;
        font-size: 0.36rem;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        background: #ffffff;
        border-bottom: 1px solid #f1f1f1;
    }
    .top_close{
        width: 0.16rem;
        height: 0.28rem;
        background: url("../../../../static/images/home/top_close.png") center no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.4rem;
        left: 0.3rem;
        display: block;
    }
    .header{
        width: 100%;
        height: auto;
        background: #ffffff;
        padding: 0.25rem 0;
        box-sizing: border-box;
        position: relative;
    }
    .header .go_back{
        width: 1.27rem;
        height: 0.49rem;
        background: url("../../../../static/images/goodDetail/go_back.png") center no-repeat;
        background-size: contain;
        margin-left: 0.3rem;
    }
    .delet_btn{
        font-size: 0.3rem;
        color: #ff4532;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
    }
    .content{
        width: 6.9rem;
        height: auto;
        padding-left: 0.3rem;
        box-sizing: border-box;
        margin: 0.2rem auto 0;
        background: #ffffff;
        border-radius: 0.2rem;
    }
    .list{
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.3rem 0;
        font-size: 0.28rem;
        color: #2b2b2b;
        overflow: hidden;
        position: relative;
    }
    .label_left{
        width: 1.5rem;
        float: left;
    }
    .label_right{
        font-weight: bold;
        float: left;
        width: 4.8rem;
    }
    .list .label_right i{
        width: 0.11rem;
        height: 0.18rem;
        background: url("../../../../static/images/buyGood/goin.png") center no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.4rem;
        right: 0.3rem;
    }
    .list i{
        width: 0.82rem;
        height: 0.46rem;
        background: url("../../../../static/images/address/close.png") center no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.27rem;
        right: 0.3rem;
    }
    .list i.open{
        background: url("../../../../static/images/address/open.png") center no-repeat;
        background-size: contain;
    }
    .btn{
        width: 5.8rem;
        background: #ff4532;
        font-size: 0.32rem;
        text-align: center;
        color: #ffffff;
        border-radius: 0.6rem;
        padding: 0.34rem 0; 
        position: absolute;
        bottom: 0.8rem;
        left: 50%;
        margin-left: -2.9rem;
    }
    .address_detail{
        width: 100%;
        height: 100%;
        margin-top: -0.05rem;
        font-size: 0.28rem;
        color: #2b2b2b;
        font-weight: bold;
    }
    input::placeholder{
        color: #cccccc;
    }
    .addressColor{
        color: #cccccc;
    }
</style>