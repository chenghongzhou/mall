<template>
    <div class="main" ref="main">
        <div class="header" v-if="isPay">外卖自提柜</div>
        <div class="login_title">
            <p>为保障您的寄存物品安全，</p>
            <p>请验证手机</p>
        </div>
        <div class="login_main">
            <div class="login_label">手机号</div>
            <div class="tel_box flex">
                <i class="tel_icon"></i>
                <input type="number" placeholder="请输入手机号" v-model="phone" ref="input1" @blur="handBlur()" @keyup="changecodeBtn()">
                <div class="send_btn" :class="{'send_btn_no':isCode}" @click="getCode()" ref="handleCode">{{text}}</div>
            </div>
            <div class="login_label" style="margin-bottom:0;">验证码</div>
            <!-- <div class="tel_box tel_code">
                <input type="number" placeholder="请输入手机验证码" v-model="code" ref="input2">
            </div> -->

            <div class="write-input">
                <input ref="input" type="number" maxlength="4"
                        class="realInput" v-model="photoNum"
                        @keyup="getNum()" @keydown="delNum()" @blur="handBlur()">
                <li v-for="(disInput, index) of disInputs" :key="index"
                    :class="{'input-active': photoNum.length > index}">
                    <input maxlength="1" disabled v-model="disInput.value">
                </li>
            </div>


        </div>
        <div class="btn" @click="handleLogin()" v-if="isshow" :class="{'btn_no':isBtnCheck}">登录</div>
        <div v-if="isshow">
            <div class="ubk_login" v-if='isybk'>友吧客直接登录</div>
            <!-- <div class="aggreen">输入验证码即同意<span>《用户协议》</span></div> -->
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            isshow:true,
            phone: '',
            code: '',
            text: '获取验证码',
            timer: null,
            isCode: true,
            codeFlag: false,
            isybk: false,
            iscodeF:true,
            photoNum:'',
            disInputs: [{'value':''},{'value':''},{'value':''},{'value':''}],
            showTip: false,
            isBtnCheck:true,
            isPay: true,
        }
    },
    methods: {
        checkPay(){
            var ua = navigator.userAgent.toLowerCase();
            var _this = this;
            if (config.thirdParty().isWechat == true&&config.appVersion.ios==true) {
                _this.isPay = false;
            };
        　　if(ua.match(/AlipayClient/i) == 'alipayclient'){
                _this.isPay = false;
        　　};
        },
        handBlur(){
            window.scroll(0,0);
        },
        dtime(){
            var _this = this; 
            var n = 60;
            _this.isCode = true;
            _this.codeFlag = true;
            _this.text = '再次获取59s';
            _this.timer = setInterval(() => {
                if(n == 0){
                    clearInterval(_this.timer);
                    _this.isCode = false;
                    _this.codeFlag = false;
                    _this.text = '获取验证码';
                    return false;
                };
                n--;
                _this.text = '再次获取'+n+'s';
            },1000);
        },
        changecodeBtn(){
            var _this = this;
            this.phone = this.phone.substring(0,11);
            if(this.phone.length == 11&&this.photoNum.length>=4){
                this.isBtnCheck = false;
            }else{
                this.isBtnCheck = true;
            };
            if(_this.codeFlag){
                return false;
            };
            if(_this.phone.length == 11){
                _this.isCode = false;
            }else{
                _this.isCode = true;
            };
        },
        getCode(){
            var _this = this;
            
            if(_this.codeFlag){
                return false;
            };
            if(!(/0?(13|14|15|16|17|18|19)[0-9]{9}/.test(_this.phone))){ 
                config.layerMsg('手机号码有误，请重填', 2);
                return false; 
            };
            
            var data={
                'phoneNumber': _this.phone
            };
            axios.post(allget+"/account/send_verification_code/",data).then((res) => {
                 if(res.data.error_code == 0){
                     config.layerMsg('验证码发送成功', 2);
                     _this.dtime();
                }else{
                    config.layerMsg(res.data.message, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        handleLogin(){
            var _this = this;
            if(_this.isBtnCheck){
                return false;
            };
            _this.code = _this.photoNum;
            if(_this.phone == '' || _this.phone.length !== 11){
                config.layerMsg('请输入正确的手机号！', 2);
                return false;
            };
            if(_this.code == '' || _this.code.length < 4){
                config.layerMsg('请输入手机验证码！', 2);
                return false;
            };
            var data={
                'phoneNumber': _this.phone,
                'code': _this.code
            }
            _this.$loading.show();
            axios.post(allget+"/account/mobile_auth/",data).then((res) => {
                 if(res.data.error_code == 0){
                     var loginPhone = res.data.data.phone;
                     var loginName = res.data.data.user_name;
                     var loginSessionId = res.data.data.sessionid;
                     var loginPlatform = res.data.data.platform || '';
                     _this.$store.state.name = loginName;
                     _this.$store.state.phone = loginPhone;
                     _this.$store.state.platform = loginPlatform || '';
                     _this.$store.state.sessionId = loginSessionId;

                     config.setCookie(
                        'loginParams', 
                        JSON.stringify(
                            { 
                                username: loginName, 
                                phone: loginPhone,
                                sessionId: loginSessionId,
                                platform: loginPlatform,
                            }
                        ), 
                        2
                    );

                     setTimeout(() => {
                         _this.$loading.close();
                         _this.$router.push('/?recordPage=1');
                     },1000);
                }else{
                    _this.$loading.close();
                    config.layerMsg(res.data.message, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        setInput(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
            if (isIOS) {
                this.$refs.input1.style.marginTop = '-3px';
               // this.$refs.input2.style.marginTop = '-3px';
            }else{
                this.$refs.handleCode.style.lineHeight = '0.6rem';
            }
        },
        izneed(){
            // 获取视图原始高度
            var _this = this;
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
            if (isAndroid) {
                var screenHeight = _this.$refs.main.offsetHeight;
            // 为window绑定resize事件
                window.onresize = function () {
                    var nowHeight = _this.$refs.main.offsetHeight;
                    if (nowHeight < screenHeight) {
                        // 将底部弹起的按钮隐藏（可使用给按钮添加相应消失类）
                        _this.isshow = false;
                    } else {
                            // 将按钮正常显示（可使用给按钮移除相应消失类）
                        _this.isshow = true;
                    }
                }
            }
            
        },
        delNum () {    // 删除
            let oEvent = window.event
            if (oEvent.keyCode === 8) {
                if (this.photoNum.length > 0) {
                    this.disInputs[this.photoNum.length - 1].value = ''
                }
            }
        },
        getNum () {   // 输入
            this.photoNum = this.photoNum.substring(0,4);
            if(this.phone.length == 11&&this.photoNum.length>=4){
                this.isBtnCheck = false;
            }else{
                this.isBtnCheck = true;
            };
            if(this.photoNum.length > 4){
                return false;
            };
            for (var i = 0; i < this.photoNum.length; i++) {
                this.disInputs[i].value = this.photoNum.charAt(i)
            }
            
        },
        forbidBack(){
            var _this = this;
            _this.$router.replace({path: '/?recordPage=1'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() =>{
            _this.checkPay();
            _this.setInput();
            _this.izneed();
        });
        if(this.$store.state.uid || this.$store.state.uid != ''){
            this.isybk = false;
        }else{
           // this.isybk = true;
        };
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', _this.forbidBack,false);
        };
    }
}
</script>

<style scoped>
    .main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #f0f0f0;
        /* overflow-y: scroll; */
        /* padding-bottom: 0.2rem; */
        box-sizing: border-box;
    }
    .header{
        width: 100%;
        height: 1rem;
        background: #ffffff;
        font-size: 0.36rem;
        text-align: center;
        color: #000000;
        line-height: 1rem;
        position: relative;
    }
    .login_title{
        margin-top: 0.92rem;
        margin-bottom: 1.36rem;
    }
    .login_title p {
        font-size: 0.4rem;
        color: #2b2b2b;
        font-weight: bold;
        text-align: center;
    }
    .login_main{
        width: 100%;
        height: auto;
        padding: 0 0.6rem;
        box-sizing: border-box;
    }
    .login_label{
        font-size: 0.32rem;
        color: #2b2b2b;
        font-weight: bold;
        margin-bottom: 0.3rem;
    }
    .tel_box{
        width: 100%;
        height: 0.52rem;
        position: relative;
        border-bottom: 0.01rem solid #585858;
        margin-bottom: 0.4rem;
        
    }
    
    .tel_icon{
        width: 0.3rem;
        height: 0.48rem;
        display: inline-block;
        background: url("../../../../static/images/i_tel.png") center no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
        left: 0;
    }
    .tel_box input{
        width: 100%;
        height: 0.48rem;
        border:0;
        background: none;
        outline: none;
        font-size: 0.4rem;
        color: #2b2b2b;
        position: absolute;
        top: 0rem;
        left: 0.5rem;
        padding: 0.03rem 0;
    }
    .send_btn{
        width: 1.58rem;
        height: 0.54rem;
        position: absolute;
        top: -0.1rem;
        right: 0;
        z-index: 2;
        font-size: 0.24rem;
        color: #ffffff;
        text-align: center;
        background: url('../../../../static/images/send_code_active.png') center no-repeat;
        background-size: contain;
        line-height: 0.54rem;
    }
    .send_btn_no{
        background: url('../../../../static/images/send_code.png') center no-repeat;
        background-size: contain;
    }
    .tel_code input{
        width: 100%;
        height: 0.48rem;
        border:0;
        margin-left: 0.4rem;
        background: none;
        outline: none;
        font-size: 0.4rem;
        color: #2b2b2b;
        position: absolute;
        top: 0rem;
        left: 0;
        padding: 0.03rem 0;
    }
    .btn{
        width: 5.21rem;
        height: 0.9rem;
        margin: 0.94rem auto 0.2rem;
        background: url('../../../../static/images/login_btn.png') center no-repeat;
        background-size: contain;
        font-size: 0.4rem;
        text-align: center;
        color: #ffffff;
        line-height: 0.9rem;
    }
    .btn_no{
        background: url('../../../../static/images/login_btn_no.png') center no-repeat;
        background-size: contain;
    }
    .ubk_login{
        text-align: center;
        font-size: 0.3rem;
        color: #585858;
        text-decoration: underline;
    }
    .aggreen{
        width: 100%;
        font-size: 0.24rem;
        color: #6b6e70;
        text-align: center;
        position: absolute;
        bottom: 0.42rem;
        left: 0;
    }
    .aggreen span{
        color: #ff8735;
    }

.vux-no-group-title {
        /* padding-bottom: 1rem; */
      }
.write-input li{
    display: inline-block;
    width: 1.11rem;
    height: 0.5rem;
    border-bottom: .01rem solid #afadad;
    
    list-style-type: none;
    margin-right: 0.56rem;
    /* padding: 0.3rem 0 0.2rem; */
    padding-top: 0.2rem;
    position: relative;
    text-align: center;
}
.write-input li:nth-of-type(4n){
    margin-right: 0;
}
.write-input li input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 0.4rem;
    background: none !important;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    color: #2b2b2b;
}
input:disabled{  
    color:#2b2b2b;
    opacity: 1;
    -webkit-text-fill-color: #2b2b2b;
}
.write-input {
      position: relative;
}
.realInput {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border: 0;
    z-index: 50;
    position: absolute;
    padding: 0.2rem 0;
    background: none;
    display: block;
    /* margin-left: -30%; */
    top: 34px;
    opacity: 0;
    caret-color: #fff;
    color: #000000;
    text-indent: -5rem;
    font-size: 0.4rem;
    width: 100%;
    top: 1px;
}
.write-input li.input-active{
    border-bottom: 0.01rem solid #2b2b2b;
}
</style>