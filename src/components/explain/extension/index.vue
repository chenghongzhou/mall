<template>
    <div class="main">
        <div class="header_part" ref="header" style="height:1.08rem">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                推荐有礼
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
        <div class="content">
            <img src="../../../../static/images/home/extension_sc.png" alt="" class="extension_sc">
            <div class="c_part">亲爱哒，<br />
                感谢你的支持和陪伴，欢迎推荐新朋友加入我们。每成功推荐一位小伙伴可获得<span>100</span>积分。<br />
                每天最多推荐<span>20</span>位。
            </div>
            <div class="btn" @click="mask = true">马上推荐</div>
        </div>
        <footer-view></footer-view>
        <div class="mask" v-if="mask" @click="mask = false">点击右上角按钮分享~</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userInfoData: {},
            mask:false,
        }
    },
    methods:{
        exchangeRecord(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=extension&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=extension&ishome='+ishome});
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = config.getHashVReq('recordPage');
            var ishome = config.getHashVReq('ishome');
            if(ishome && ishome == 1){
                if(pervePage == 'index' || !pervePage || ishome == 1){
                    _this.$router.replace({path:'/'});
                }else{
                    _this.$router.replace({path:'/'+pervePage});
                };
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
        isLg(){
            var _this = this;
            var t_p = config.getHashVReq('appid');
            var t_data = config.getCookie('userInfoData');
            if(t_p){
                if(t_p.indexOf('#/') == '-1'){
                    _this.appid = t_p;
                }else{
                    _this.appid = t_p.substring(0,t_p.length-2);
                };
            };
            if(t_data){
                _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
            }else{ //去授权
                if(config.thirdParty().isWechat == true){
                    window.location.replace('http://v8homepage.youwoxing.net/?position=extension&appid='+t_p)
                }
            };
           
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.isLg();
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
        })
    }
}
</script>

<style scoped>
.main{
    width: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
}
.header_part{
    width: 100%;
    height: 2.12rem;
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
.top_close{
    width: 0.26rem;
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
    padding: 0 0.3rem;
    border-top: 1px solid #f1f1f1;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.my_img{
    width: 0.66rem;
    height: 0.66rem;
    border-radius: 50%;
    float: left;
    margin-top: 0.18rem;
    margin-bottom: 0.18rem;
    background: url("../../../../static/images/home/my_img_bg.png") center no-repeat;
    background-size: contain;
    position: relative;
}
.my_img img{
    border-radius: 50%;
    overflow: hidden;
    width: 0.62rem;
    height: 0.62rem;
    margin:0.02rem auto;
    display: block;
}
.my_info{
    margin-left: 0.15rem;
    float: left;
    position: relative;
}
.my_name{
    margin-top: 0.14rem;
    font-size: 0.26rem;
    color: #2b2b2b;
    font-weight: bold;
    height: 0.26rem;
}
.my_money{
    font-size: 0.4rem;
    color: #ffac1c;
    font-weight: bold;
    height: 0.4rem;
    margin-top: 0.06rem;
}
.money_icon{
    width: 0.30rem;
    height: 0.32rem;
    background: url("../../../../static/images/home/integral.png") center no-repeat;
    background-size: contain;
    margin-left: 0.1rem;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.1rem;
   
}
.my_info_right{
    position: absolute;
    top: 0.26rem;
    right: 0.3rem;
}
.get_integral{
    width: 1.64rem;
    height: 0.5rem;
    background: url("../../../../static/images/home/get_integral.png") center no-repeat;
    background-size: contain;
    float: left;
    margin-right: 0.1rem;
    position: relative;
}
.get_integral i{
    width: 0.16rem;
    height: 0.16rem;
    background: url("../../../../static/images/home/red_ts.png") center no-repeat;
    background-size: contain;
    position: absolute;
    top: -0.05rem;
    right: 0.05rem;
    z-index: 2;
}
.change_in_record{
    width: 1.64rem;
    height: 0.5rem;
    background: url("../../../../static/images/home/integral_record.png") center no-repeat;
    background-size: contain;
    float: left;
}
.extension_sc{
    width:100%;
    height: 5.5rem;
}
.c_part{
    width: 100%;
    height: auto;
    padding: 0rem 0.98rem;
    box-sizing: border-box;
    margin-top: 0.3rem;
    font-size: 0.26rem;
    color: #2b2b2b;
    line-height: 0.3rem;
}
.c_part span{
    color: #ff4532;
}
.btn{
    width: 5.8rem;
    margin: 0.6rem auto;
    background: #ff4532;
    font-size: 0.32rem;
    text-align: center;
    color: #ffffff;
    border-radius: 0.6rem;
    padding: 0.34rem 0;
}
.mask{
    width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
    z-index: 1010;
    font-size: 0.24rem;
    text-align: center;
    padding-top: 0.4rem;
    box-sizing: border-box;
    color: #ffffff;
}
</style>