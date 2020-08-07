<template>
    <div class="main">
        <div class="header_part" ref="header">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                {{title}}
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
       <div class="content" ref="content" style="margin-bottom:0.2rem;position:relative">
           <div class="integral_record_intru" @click="handlePrizeList()"></div>
           <div class="content_title">{{getData.title}}</div>
           <div class="content_vice_title">大奖抽不停</div>
           <div class="notice_box">
               <div class="notice">
                   <ul>
                       <li v-for="(item, index) in noticeList" :key="index" :class="{ 'anim' : animate && index == 0 }">恭喜<span>{{item.name}}</span>抽中<span>{{item.prize}}</span></li>
                   </ul>
               </div>
           </div>
           <div class="luck_draw_box">
               <ul v-if="awards.length>=8">
                   <img src="../../../../static/images/luckDraw/active.png" alt="" class="play_active" :class="['play_active_' + current]">
                   <li v-for="(item, index) in awards.slice(0,3)" :key="index">
                        <img :src="item.icon_url" alt="" class="prize" v-if="item.icon_url">
                        <div class="prize_name">{{item.reward_name}}</div>
                   </li>
                   <li>
                        <img :src="awards[7].icon_url" alt="" class="prize" v-if="awards[7].icon_url" :class="{'no_remal_name':!awards[7].reward_name}">
                        <div class="prize_name">{{awards[7].reward_name}}</div>
                   </li>
                   <li @click="handleStart()">
                       <img src="../../../../static/images/luckDraw/begain.png" alt="" class="begain">
                        <div class="play_times">{{getData.cost}}积分/次</div>
                   </li>
                   <li>
                        <img :src="awards[3].icon_url" alt="" class="prize" v-if="awards[3].icon_url">
                        <div class="prize_name">{{awards[3].reward_name}}</div>
                   </li>
                   <li>
                        <img :src="awards[6].icon_url" alt="" class="prize" v-if="awards[6].icon_url">
                        <div class="prize_name">{{awards[6].reward_name}}</div>
                   </li>
                   <li>
                        <img :src="awards[5].icon_url" alt="" class="prize" v-if="awards[5].icon_url">
                        <div class="prize_name">{{awards[5].reward_name}}</div>
                   </li>
                   <li>
                        <img :src="awards[4].icon_url" alt="" class="prize" v-if="awards[4].icon_url">
                        <div class="prize_name">{{awards[4].reward_name}}</div>
                   </li>
               </ul>
               <div class="play_remmid" v-if="getData.limit_count-myChange && getData.limit_count-myChange>0">我的抽奖机会：<span>{{getData.limit_count-myChange}}</span>次</div>
           </div>
           <div class="get_play_change" @click="taskWall()"></div>
           <!-- <div class="play_intru">每人每天{{getData.limit_count}}次，前{{getData.free_chance_per_day}}次抽奖免费，再次抽奖{{getData.cost}}积分/次</div> -->
       </div>
       <footer-view style="position:static"></footer-view>  
       <!--中奖是物品积分-->
        <div class="mask" v-if="maskCoupon">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您获得拼多多无门槛现金券</div>
                    <div class="prize_things_box">
                        <div class="prize_coupon_bg">
                            <div class="prize_coupon_num">￥<span>{{getPrizeInfo.num}}</span></div>
                            <div class="prize_coupon_info">
                                <p class="prize_coupon_use">无门槛代金券</p>
                                <p class="prize_coupon_use_time">领取后30天内有效</p>
                            </div>
                        </div>
                    </div>
                    <div class="mask_btn" @click="handleUse()">立即使用</div>
                    <div class="mask_close" @click="maskCoupon = false"></div>
                </div>
            </div>
        </div>
       <!--中奖是物品-->
        <!--中奖是神秘礼物-->
        <div class="mask" v-if="maskNoknowPrize">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您抽中神秘礼包</div>
                    <div class="prize_things_box">
                        <img :src="maskNoknowPrizeSrc" alt="" class="mask_integral">
                    </div>
                    <div class="mask_btn" @click="handleMaskIntegral()">立即打开</div>
                    <div class="mask_close" @click="maskNoknowPrize = false"></div>
                </div>
            </div>
        </div>
       <!--中奖是神秘礼物-->
       <!--中奖是,,跳链接-->
        <div class="mask" v-if="maskLink">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您抽中{{getPrizeInfo.name}}</div>
                    <div class="prize_things_box">
                        <img :src="maskNoknowPrizeSrc" alt="" class="mask_integral">
                    </div>
                    <div class="mask_btn" @click="handleMaskIntegral()">立即查看</div>
                    <div class="mask_close" @click="maskLink = false"></div>
                </div>
            </div>
        </div>
       <!--跳链接-->
       <!--中奖是积分-->
        <div class="mask" v-if="maskIntegral">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您获得{{getPrizeInfo.integral}}积分</div>
                    <div class="prize_things_box">
                        <img src="../../../../static/images/luckDraw/integral.png" alt="" class="mask_integral">
                        <div class="prize_integral_num">X1</div>
                    </div>
                    <div class="mask_btn" @click="handleUse()">立即使用</div>
                    <div class="mask_close" @click="maskIntegral = false"></div>
                </div>
            </div>
        </div>
       <!--中奖是积分-->
       <!--中奖是红包-->
        <div class="mask" v-if="maskRedpackets">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_redpackets">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您获得拼多多现金红包</div>
                    <div class="prize_redpackets_num">￥<span>{{getPrizeInfo.integral}}</span></div>
                    <div class="mask_btn" @click="handleUse()">立即使用</div>
                    <div class="mask_close" @click="maskRedpackets = false"></div>
                </div>
            </div>
        </div>
       <!--中奖是红包-->
       <!--没中奖-->
        <div class="mask" v-if="maskNoPrize">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">很遗憾</div>
                    <div class="mask_prize_name">离大奖就差一点点了</div>
                    <div class="prize_things_box">
                        <img src="../../../../static/images/luckDraw/no_prize.png" alt="" class="no_prize">
                    </div>
                    <div class="mask_btn" @click="maskNoPrize = false">再抽一次</div>
                    <div class="mask_close" @click="maskNoPrize = false"></div>
                </div>
            </div>
        </div>
       <!--没中奖-->
       <!--没中奖-->
        <div class="mask" v-if="maskNoTime" @click="maskNoTime = false">
            <div class="mask_main tanchuscale">
                <div class="box" style="background:#fff;border-radius:0.3rem;padding-top:2rem;box-sizing:border-box">
                   <p style="font-size:0.26rem;text-align:center;">次数用光了</p>
                   <div style="width:3rem;padding:0.2rem 0rem;font-size:0.26rem;border:1px solid #333;border-radius:0.5rem;text-align:center;margin:1rem auto;" @click="handldGetTimes()">更多抽奖</div>
                </div>
            </div>
        </div>
       <!--没中奖-->
       <div class="mask" v-if="kserver">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="kserverCode" alt="" class="mask_wx_code">
                    
                    <div class="success_btn" style="margin-top:0.4rem" @click="kserver = false">我已添加客服</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
import { userName } from './name.js';
export default {
    data(){
        return {
            maskNoTime:false,  //积分不足
            maskCoupon: false,  //中奖的是现金券
            maskIntegral: false,  //中奖的是积分
            maskRedpackets: false,  //中奖的是红包
            maskNoPrize: false,  //没中奖
            maskNoknowPrize:false,  //神秘礼物
            maskLink:false,
            animate: false,
			initSpeed: 200,  // 初始速度
			speed: null,  // 变化速度
			diff: 20,  // 速度变化的值，值越大，变化地越快
			award: {},  // 抽中的奖品
            time: 0,  // 记录开始抽奖的时间
			current: 0,  // 当前转动的位置
			isRuningLucky: false,  // 是否正在抽奖
            awards: [  //奖品
                {id: 1,name:'任天堂游戏机',icon_url:'../../../../static/images/luckDraw/prize.png'},
            ],
            noticeList: [  //中奖信息
                {name:'中国移动', prize:'现金券1'},
            ],
            userInfoData:{},
            getData: {},
            reallAwards:[],  //正真的奖品信息
            myChange:'0', //我的抽奖次数
            getPrizeInfo:{},  //获取中奖后的结果
            storeId:'',
            openid:'',
            maskNoknowPrizeSrc:'',
            title:'',
            kserver:false,
            kserverCode:''
        }
    },
     methods: {
        exchangeRecord(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/exchangeRecord?recordPage=luckDraw&ishome='+ishome});
        },
        taskWall(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/taskWall?recordPage=luckDraw&ishome='+ishome});
        },
        handldGetTimes(){
            this.maskNoTime = false;
            window.location.href= 'https://engine.huacuiu.cn/index/activity?appKey=2bth4yjGAyC3THKSxa2y3cFEohhV&adslotId=353822';
        },
        handlePrizeList(){
            var ishome = config.getHashVReq('ishome');
            this.$router.replace({path:'/prizeList?recordPage=luckDraw&ishome='+ishome});
        },
        //跑马灯
        getAds(){
            var name = userName;
            var len = this.reallAwards.length;
            var arrList = [];
             var awardsNums = parseInt(Math.random()*(len),10);
            for(var i = 0;i<30;i++){
                var nameNums = parseInt(Math.random()*(500),10);
                var awardsNums = parseInt(Math.random()*(len),10);
                var item = {'name':name[nameNums],'prize':this.reallAwards[awardsNums].name};
                arrList.push(item);
            };
            this.noticeList = arrList;
        },
        handleUse(){
            this.maskIntegral=false;
            this.$router.replace({path:'/'});
        },
        //获取抽奖奖品
        getLotteryPrize(){
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
            _this.$axios.post(allget+"/lottery/get_sets",formData,headerConfig).then((res) => {
                if(res.data){
                    _this.reallAwards = res.data.bonus_sets;
                    var list = res.data.bonus_sets;
                    var awardsList = [];
                    var len = list.length;
                    list.forEach((item,index) =>{
                        if(item.type == 2){
                            item.reward_name = item.integral+'积分';
                        }
                    })
                    _this.title = res.data.title
                    document.title = _this.title;
                    _this.getData = res.data;
                    for(var i = len;i<9-len;i++){
                        var ele = {'icon_url':'','name':''}
                        awardsList.push(ele);
                    }
                    _this.awards = list.concat(awardsList);
                    _this.getAds();
                    
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取我的剩余抽奖次数
        getMyChange(){
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
            _this.$axios.post(allget+"/lottery/get_today_lottery",formData,headerConfig).then((res) => {
                if(res.data){
                    _this.myChange = res.data.today_count;
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        // 抽奖
		handleStart() {
			if (this.isRuningLucky) {
                config.layerMsg("正在抽奖中...", 2)
				return false;
			}
			if (isNaN(Number(this.initSpeed))) {
				return false;
			}
			this.speed = this.initSpeed;
			// 开始抽奖
			this.isRuningLucky = true;
			this.time = Date.now();
			this.drawAward();
			//config.layerMsg("开始抽奖",1);
		},
		drawAward() {
            var _this = this;
            if(_this.getData.limit_count-_this.myChange <= 0){
                _this.maskNoTime = true;
                _this.isRuningLucky = false;
                return false;
            };
            var formData = {
                'store_id': _this.storeId,
                "open_id":_this.openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/lottery/get_lottery",formData,headerConfig).then((res) => {
               
                if(res.data.code == 200){
                     if(res.data.bonus_result.lottery_id){
                         _this.move();
                         _this.getUserInfoMy();
                     }else if(res.data.msg.indexOf('积分不足') == 0){
                         config.layerMsg('积分不足', 2);
                     }else{
                         config.layerMsg(res.data.msg, 2);
                     };
                     
                    this.award = {
                        id: res.data.bonus_result.lottery_id
                    };
                    _this.getPrizeInfo = res.data.bonus_result;
                    _this.getMyChange();
                }else{
                    _this.isRuningLucky = false;
                    config.layerMsg(res.data.msg, 2);
                };
                
            }).catch(() => {
                console.log('error');
                _this.isRuningLucky = false;
            });
            _this.handleRecord('lottery_click');
			// 请求接口，模拟一个抽奖数据(假设请求时间为2s)
			// setTimeout(() => {
			// 	this.award = {
			// 		id: "1"
			// 	};
			// 	//console.log("返回的抽奖结果是", this.award);
			// }, 2000);
		},
        handleMaskIntegral(){
            var _this = this;
            _this.kserver = true;
            _this.kserverCode = _this.getPrizeInfo.qrcode;
        },
		move() {
            var _this = this;
			var timer = setTimeout(() => {
				this.current++;
				if (this.current > 7) {
					this.current = 0;
				}
				// 若抽中的奖品id存在，则开始减速转动
				if (this.award.id && (Date.now() - this.time) / 1000 > 2) {
                    this.speed += this.diff; // 转动减速
          
					// 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来
					if (
						(Date.now() - this.time) / 1000 > 4 &&
						this.award.id == this.awards[this.current].id
					) {
                        console.log(this.current,this.award.id)
						clearTimeout(timer);

				        setTimeout(() => {
                            this.isRuningLucky = false;
                                // 这里写停下来要执行的操作（弹出奖品框）  //1神秘礼包 2积分 3链接 4未中奖 ...
                                if(_this.getPrizeInfo.type == 1){
                                    _this.maskNoknowPrize = true;
                                    _this.maskNoknowPrizeSrc = _this.getPrizeInfo.icon_url;
                                }else if(_this.getPrizeInfo.type == 2){
                                    _this.maskIntegral = true;
                                }else if(_this.getPrizeInfo.type == 3){
                                    _this.maskLink = true;
                                    _this.maskNoknowPrizeSrc = _this.getPrizeInfo.icon_url;
                                }else{
                                    _this.maskNoPrize = true;
                                };
                            }, 400);
						return;
					}

				// 若抽中的奖品不存在，则加速转动
				} else {
					if (this.speed >= 50) {
						this.speed -= this.diff; // 转动加速
					}
				}

				this.move();
			}, this.speed);
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
        // 中奖名单滚动
		scroll() {
			this.animate = true;
			let timer = setTimeout(() => {
				this.noticeList.push(this.noticeList[0]);
				this.noticeList.shift();
				this.animate = false;
			}, 500);
		},
        //加埋点
        handleRecord(type){
            var _this = this;
            var formData = {
                "openId":_this.openid,
                "storeId":_this.storeId,
                "webPage":type
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            _this.$axios.post("http://v8track.youwoxing.net/track/pv",formData,headerConfig).then((res) => {
                
            }).catch(() => {
                console.log('error');
            });
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
            var url_store_id = config.getHashVReq('storeId');
            var t_store = config.getCookie('userInfo');
            if(t_data){
                _this.userInfoData = JSON.parse(t_data);
            }
            if(t_p){
                if(t_p.indexOf('#/') == '-1'){
                    _this.appid = t_p;
                }else{
                    _this.appid = t_p.substring(0,t_p.length-2);
                };
            };
             if(url_store_id){
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                    if(_this.storeId != url_store_id){
                        //如果当前链接的url，storeid和cookie不一样需要重新授权
                        window.location.replace('http://v8homepage.youwoxing.net/?position=luckDraw&appid='+_this.appid);
                    }
                }else{
                    //去授权
                    window.location.replace('http://v8homepage.youwoxing.net/?position=luckDraw&appid='+_this.appid);
                };    
            }else{
                if(t_store){
                    _this.storeId = Number(JSON.parse(t_store).storeId);
                }
            };
            
            
            var t_open_id = config.getCookie('openid');
            if(t_open_id){
                _this.openid = JSON.parse(t_open_id).open_id;
            };
           
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.isLg();
        _this.$nextTick(() =>{
            let scrollTimer = setInterval(this.scroll, 2000);
            _this.getLotteryPrize();
            _this.getMyChange();
            _this.handleRecord('lottery_index');
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>