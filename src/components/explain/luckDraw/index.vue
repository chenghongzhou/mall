<template>
    <div class="main">
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
       <div class="content">
           <div class="content_title">积分抽大奖</div>
           <div class="content_vice_title">10000份大奖抽不停</div>
           <div class="notice_box">
               <div class="notice">
                   <ul>
                       <li>恭喜<span>青松少女，</span>抽中<span>IPhone x</span></li>
                   </ul>
               </div>
           </div>
           <div class="luck_draw_box">
               <ul>
                   <li>
                       <img src="../../../../static/images/luckDraw/active.png" alt="" class="play_active">
                       <img src="../../../../static/images/luckDraw/prize.png" alt="" class="prize">
                       <div class="prize_name">任天堂游戏机</div>
                   </li>
                   <li>
                       <img src="../../../../static/images/luckDraw/prize.png" alt="" class="prize">
                       <div class="prize_name">任天堂游戏机</div>
                   </li>
                   <li>
                       <img src="../../../../static/images/luckDraw/prize.png" alt="" class="prize">
                       <div class="prize_name">任天堂游戏机</div>
                   </li>
                   <li></li>
                   <li>
                       <img src="../../../../static/images/luckDraw/begain.png" alt="" class="begain">
                       <div class="play_times">20积分/次</div>
                   </li>
                   <li></li>
                   <li></li>
                   <li></li>
                   <li></li>
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
                        <div class="prize_coupon_num">X100</div>
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
        }
    },
     methods: {
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'5'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'5'}});
        },
        forbidBack(){
            this.$router.replace({path:'/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            
        })
    }
}
</script>

<style scoped>
@import './index.css';
</style>