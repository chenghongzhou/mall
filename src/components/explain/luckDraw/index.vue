<template>
    <div class="main">
        <div class="header_part" ref="header">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                转盘抽奖
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
       <div class="content" ref="content" style="margin-bottom:0.2rem">
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
                        <div class="prize_name">{{item.name}}</div>
                   </li>
                   <li>
                        <img :src="awards[7].icon_url" alt="" class="prize" v-if="awards[7].icon_url">
                        <div class="prize_name">{{awards[7].name}}</div>
                   </li>
                   <li @click="handleStart()">
                       <img src="../../../../static/images/luckDraw/begain.png" alt="" class="begain">
                        <div class="play_times">{{getData.cost}}积分/次</div>
                   </li>
                   <li>
                        <img :src="awards[3].icon_url" alt="" class="prize" v-if="awards[3].icon_url">
                        <div class="prize_name">{{awards[3].name}}</div>
                   </li>
                   <li>
                        <img :src="awards[6].icon_url" alt="" class="prize" v-if="awards[6].icon_url">
                        <div class="prize_name">{{awards[6].name}}</div>
                   </li>
                   <li>
                        <img :src="awards[5].icon_url" alt="" class="prize" v-if="awards[5].icon_url">
                        <div class="prize_name">{{awards[5].name}}</div>
                   </li>
                   <li>
                        <img :src="awards[4].icon_url" alt="" class="prize" v-if="awards[4].icon_url">
                        <div class="prize_name">{{awards[4].name}}</div>
                   </li>
               </ul>
               <div class="play_remmid" v-if="getData.limit_count-myChange && getData.limit_count-myChange>0">我的抽奖机会：<span>{{getData.limit_count-myChange}}</span>次</div>
           </div>
           <div class="get_play_change" @click="taskWall()"></div>
           <!-- <div class="play_intru">每人每天{{getData.limit_count}}次，前{{getData.free_chance_per_day}}次抽奖免费，再次抽奖{{getData.cost}}积分/次</div> -->
       </div>
       <footer-view></footer-view>
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
       <!--中奖是积分-->
        <div class="mask" v-if="maskIntegral">
            <div class="mask_main tanchuscale">
                <div class="light"></div>
                <div class="box prize_things">
                    <div class="mask_title">恭喜中奖</div>
                    <div class="mask_prize_name">恭喜您获得{{getPrizeInfo.num}}积分</div>
                    <div class="prize_things_box">
                        <img src="../../../../static/images/luckDraw/integral.png" alt="" class="mask_integral">
                        <div class="prize_integral_num">X1</div>
                    </div>
                    <div class="mask_btn" @click="maskIntegral = false">立即使用</div>
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
                    <div class="prize_redpackets_num">￥<span>{{getPrizeInfo.num}}</span></div>
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
                    <div class="mask_btn">再抽一次</div>
                    <div class="mask_close" @click="maskNoPrize = false"></div>
                </div>
            </div>
        </div>
       <!--没中奖-->
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
import { userName } from './name.js';
export default {
    data(){
        return {
            maskCoupon: false,  //中奖的是现金券
            maskIntegral: false,  //中奖的是积分
            maskRedpackets: false,  //中奖的是红包
            maskNoPrize: false,  //中奖的是红包
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
            storeId:''
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
            window.location.href = this.getPrizeInfo.value;
        },
        //获取抽奖奖品
        getLotteryPrize(){
            var _this = this;
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid
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
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid
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
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/lottery/get_lottery",formData,headerConfig).then((res) => {
               
                if(res.data){
                     if(res.data.lottery_id){
                         _this.move();
                     }else{
                         _this.isRuningLucky = false;
                         config.layerMsg(res.data.msg, 2);
                     }
                    this.award = {
                        id: res.data.lottery_id
                    };
                    _this.getPrizeInfo = res.data;
                    _this.getMyChange();
                }else{
                    config.layerMsg('出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
			// 请求接口，模拟一个抽奖数据(假设请求时间为2s)
			// setTimeout(() => {
			// 	this.award = {
			// 		id: "1"
			// 	};
			// 	//console.log("返回的抽奖结果是", this.award);
			// }, 2000);
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
                                // 这里写停下来要执行的操作（弹出奖品框）
                                if(_this.getPrizeInfo.type == 1){
                                    _this.maskCoupon = true;
                                }else if(_this.getPrizeInfo.type == 2){
                                    _this.maskRedpackets = true;
                                }else{
                                    _this.maskIntegral = true;
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
        // 中奖名单滚动
		scroll() {
			this.animate = true;
			let timer = setTimeout(() => {
				this.noticeList.push(this.noticeList[0]);
				this.noticeList.shift();
				this.animate = false;
			}, 500);
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
                    window.location.replace('http://v8homepage.youwoxing.net/?position=luckDraw&appid='+t_p)
                }
            };
            var t_store = config.getCookie('userInfo');
            if(t_store){
                 _this.storeId = Number(JSON.parse(config.getCookie('userInfo')).storeId);
            }
           
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
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>