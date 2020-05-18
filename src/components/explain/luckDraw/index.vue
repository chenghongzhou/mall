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
       <div class="bottom"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style scoped>
@import './index.css';
</style>