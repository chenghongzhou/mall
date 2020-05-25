<template>
    <div class="main">
        <div class="header_part" ref="header">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                转盘抽奖
            </div>
            <div class="header">
            <div class="my_img"><img src="../../../../static/images/home/my_img.png" alt=""></div>
            <div class="my_info">
                <div class="my_name">青松少女</div>
                <div class="my_money">1212<i class="money_icon"></i></div>
            </div>
            <div class="my_info_right">
                    <div class="get_integral" @click="taskWall()"><i></i></div>
                    <div class="change_in_record" @click="exchangeRecord()"></div>
                </div>
            </div>
        </div>    
       <div class="content" ref="content">
           <div class="content_title">积分抽大奖</div>
           <div class="content_vice_title">10000份大奖抽不停</div>
           <div class="notice_box">
               <div class="notice">
                   <ul>
                       <li v-for="(item, index) in noticeList" :key="index" :class="{ 'anim' : animate && index == 0 }">恭喜<span>{{item.name}}</span>抽中<span>{{item.prize}}</span></li>
                   </ul>
               </div>
           </div>
           <div class="luck_draw_box">
               <ul>
                   <img src="../../../../static/images/luckDraw/active.png" alt="" class="play_active" :class="['play_active_' + current]">
                   <li v-for="(item, index) in awards.slice(0,3)" :key="index">
                        <img :src="item.img" alt="" class="prize">
                        <div class="prize_name">{{item.id}}</div>
                   </li>
                   <li>
                        <img :src="awards[7].img" alt="" class="prize">
                        <div class="prize_name">{{awards[7].id}}</div>
                   </li>
                   <li @click="handleStart()">
                       <img src="../../../../static/images/luckDraw/begain.png" alt="" class="begain">
                        <div class="play_times">20积分/次</div>
                   </li>
                   <li>
                        <img :src="awards[3].img" alt="" class="prize">
                        <div class="prize_name">{{awards[3].id}}</div>
                   </li>
                   <li>
                        <img :src="awards[6].img" alt="" class="prize">
                        <div class="prize_name">{{awards[6].id}}</div>
                   </li>
                   <li>
                        <img :src="awards[5].img" alt="" class="prize">
                        <div class="prize_name">{{awards[5].id}}</div>
                   </li>
                   <li>
                        <img :src="awards[4].img" alt="" class="prize">
                        <div class="prize_name">{{awards[4].id}}</div>
                   </li>
               </ul>
               <div class="play_remmid">我的抽奖机会：<span>5</span>次</div>
           </div>
           <div class="get_play_change"></div>
           <div class="play_intru">每人每天5次，首次抽奖免费，再次抽奖20积分/次</div>
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
                            <div class="prize_coupon_num">￥<span>20</span></div>
                            <div class="prize_coupon_info">
                                <p class="prize_coupon_use">无门槛代金券</p>
                                <p class="prize_coupon_use_time">领取后30天内有效</p>
                            </div>
                        </div>
                    </div>
                    <div class="mask_btn">立即使用</div>
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
                    <div class="mask_prize_name">恭喜您获得100积分</div>
                    <div class="prize_things_box">
                        <img src="../../../../static/images/luckDraw/integral.png" alt="" class="mask_integral">
                        <div class="prize_integral_num">X100</div>
                    </div>
                    <div class="mask_btn">立即使用</div>
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
                    <div class="prize_redpackets_num">￥<span>20.00</span></div>
                    <div class="mask_btn">立即使用</div>
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
                {id: 1,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 2,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 3,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 4,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 5,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 6,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 7,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
                {id: 8,name:'任天堂游戏机',img:'../../../../static/images/luckDraw/prize.png'},
            ],
            noticeList: [  //中奖信息
                {name:'中国移动', prize:'现金券1'},
                {name:'中国移动', prize:'现金券2'},
                {name:'中国移动', prize:'现金券3'},
            ],
        }
    },
     methods: {
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'5'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'5'}});
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
			// 请求接口，模拟一个抽奖数据(假设请求时间为2s)
			setTimeout(() => {
				this.award = {
					id: "1"
				};
				//console.log("返回的抽奖结果是", this.award);
			}, 2000);
			this.move();
		},
		move() {
			let timer = setTimeout(() => {
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
                                this.maskCoupon = true;
                                console.log(
                                    "您抽中的奖品是" + this.awards[this.current].name + ",奖品id是" + this.awards[this.current].id
                                );
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
            var pervePage = this.$route.query.recordPage;
            if(pervePage == 'taskWall'){
                _this.$router.replace({path:'/taskWall'});
            }else{
                 _this.$router.replace({path:'/'});
            };
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            let scrollTimer = setInterval(this.scroll, 2000);
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>