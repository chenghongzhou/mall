<template>
    <div class="main">
        <!-- <div class="top">
            <i class="top_close"></i>
            好友推荐
        </div> -->

        <div class="content">
            <div class="info_box">
                <div class="my_img"><img :src="myImg" alt=""></div> 
                <p class="name">{{myName}}</p>  
                <p class="info_mg">给你推荐了一个有趣的公众号</p>
                <img :src="gImg" alt="" class="info_logo">
                <p class="info_logo_name">{{gName}}</p>
            </div>
            <div class="btn" @click="wx_code = true">关注</div>
        </div> 
        <footer-view></footer-view>

        <div class="mask" v-if="wx_code">
			<div class="mask_main">
				<div class="box tanchuscale">
                    <img src="../../../../static/images/home/wx_code.jpg" alt="" class="mask_wx_code">
                    <div class="godo_get_info">长按识别二维码，进入公众号</div>
				</div>
			</div>
		</div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            wx_code: false,
            myImg:'',
            myName:'',
            gImg:'',
            gName:'',
        }
    },
    methods:{
        getParams(){
            var _this = this;
            var myImg = config.getHashVReq('myImg');
            var myName = config.getHashVReq('myName');
            var gImg = config.getHashVReq('gImg');
            var gName = config.getHashVReq('gName');
            if(gName){
                if(gName.indexOf('#/') == '-1'){
                    _this.gName = gName;
                }else{
                    _this.gName = gName.substring(0,gName.length-2);
                };
            }
        }
    },
    mounted(){

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
.info_box{
    width: 6.2rem;
    height: auto;
    background: #ffffff;
    padding-top: 0.3rem;
    padding-bottom: 0.8rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    margin: 0.4rem auto;
}
.my_img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
}
.my_img img{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
}
.name{
    font-size: 0.24rem;
    text-align: center;
    color: #2b2b2b;
    font-weight: bold;
    margin-top: 0.03rem;
}
.info_mg{
    font-size: 0.24rem;
    text-align: center;
    color: #2b2b2b;
    margin-top: 0.1rem;
}
.info_logo{
    width: 1.4rem;
    height: 1.4rem;
    display: block;
    margin: 0.7rem auto 0rem;
}
.info_logo_name{
    font-size: 0.24rem;
    text-align: center;
    color: #2b2b2b;
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
.mask .mask_main{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.8);
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 1010;
}
.mask .mask_main .box{
	width: 5.2rem;
	height: 5.4rem;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -2.6rem;
	margin-top: -2.7rem;
    background: #ffffff;
    border-radius: 0.2rem;
    padding-top:0.8rem;
    box-sizing: border-box;
}
.mask_wx_code{
    width: 2.9rem;
    height: 2.9rem;
    display: block;
    margin: 0rem auto 0;
}
.godo_get_info{
    font-size: 0.24rem;
    color: #2b2b2b;
    text-align: center;
    margin-top: 0.5rem;
}
</style>