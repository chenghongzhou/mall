<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            赚积分
        </div>
        <div class="header_bg"></div>
        <div class="content">
            <div class="header">
                <div class="my_integral">我的积分</div>
                <div class="my_integral_number">123465<i class="money_icon"></i><div class="exchage_integral"></div></div>
                <div class="integral_record" @click="integralRecord()"></div>
            </div>
             <div class="banner_box swiper-container swiper-container1">
                <div class="swiper-wrapper" style="width:100%;">
                    <div class="banner swiper-slide">
                            <img src="../../../../static/images/taskWall/banner.png" alt="">
                        </div>
                        <div class="banner swiper-slide">
                            <img src="../../../../static/images/taskWall/banner.png" alt="">
                        </div>
                        <div class="banner swiper-slide">
                            <img src="../../../../static/images/taskWall/banner.png" alt="">
                        </div>
                </div>
                <div class="swiper-pagination swiper-p1" slot="pagination"></div>
            </div>
            <div class="task_list_box">
                <div class="task_list">
                    <div class="task_list_top">每日任务<span>已完成5/10</span><div class="refresh"></div></div>
                    <div class="list">
                        <div class="task_img_bg"><img src="" alt=""></div>
                        <div class="task_info">
                            <div class="task_type_title">签到领积分</div>
                            <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                            <div class="task_money"><i></i>+100</div>
                        </div>
                        <div class="task_btn task_btn_goon">去完成</div>
                        <div class="task_finish_status">已完成1/1</div>
                    </div>
                    <div class="list">
                        <div class="task_img_bg"><img src="" alt=""></div>
                        <div class="task_info">
                            <div class="task_type_title">签到领积分</div>
                            <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                            <div class="task_money"><i></i>+100</div>
                        </div>
                        <div class="task_btn task_btn_finish">领取奖励</div>
                        <div class="task_finish_status">已完成<span>1/1</span></div>
                    </div>
                </div>

                <div class="task_list">
                    <div class="task_list_top">新人任务<span>已完成5/10</span><div class="refresh"></div></div>
                    <div class="list">
                        <div class="task_img_bg"><img src="" alt=""></div>
                        <div class="task_info">
                            <div class="task_type_title">签到领积分</div>
                            <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                            <div class="task_money"><i></i>+100</div>
                        </div>
                        <div class="task_btn task_btn_resive">继续完成</div>
                        <div class="task_finish_status">已完成0/1</div>
                    </div>
                    <div class="list">
                        <div class="task_img_bg"><img src="" alt=""></div>
                        <div class="task_info">
                            <div class="task_type_title">签到领积分</div>
                            <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                            <div class="task_money"><i></i>+100</div>
                        </div>
                        <div class="task_btn">去完成</div>
                        <div class="task_finish_status">已完成1/1</div>
                    </div>
                </div>
                 <div class="task_list">
                    <div class="task_list_top">任务集市<span>已完成5/10</span><div class="refresh"></div></div>
                    <div class="task_tab_box">
                        <div :class="{'active':tabIndex == 1}" @click="handleTab(1)">全部</div>
                        <div :class="{'active':tabIndex == 2}" @click="handleTab(2)">看广告</div>
                        <div :class="{'active':tabIndex == 3}" @click="handleTab(3)">办理财</div>
                        <div :class="{'active':tabIndex == 4}" @click="handleTab(4)">玩游戏</div>
                    </div>
                    <div>
                        <div class="list">
                            <div class="task_img_bg"><img src="" alt=""></div>
                            <div class="task_info">
                                <div class="task_type_title">签到领积分</div>
                                <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                                <div class="task_money"><i></i>+100</div>
                            </div>
                            <div class="task_btn task_btn_resive">继续完成</div>
                            <div class="task_finish_status">已完成0/1</div>
                        </div>
                        <div class="list">
                            <div class="task_img_bg"><img src="" alt=""></div>
                            <div class="task_info">
                                <div class="task_type_title">签到领积分</div>
                                <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                                <div class="task_money"><i></i>+100</div>
                            </div>
                            <div class="task_btn task_btn_goon">去完成</div>
                            <div class="task_finish_status">已完成1/1</div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="footer">
                <img src="../../../../static/images/taskWall/intr.png" alt="">
            </div>

        </div>

         <div class="mask" v-if="signMask">
			<div class="mask_main">
				<div class="box tanchuscale">
                    <div class="mask_title">新人奖励已到账</div>
                    <div class="mask_you_get">恭喜你获得<i></i><span>+200</span></div>
                    <div class="news">
                        <img src="../../../../static/images/taskWall/mask_news.png" alt="">
                    </div>
                    <div class="mask_btn" @click="signMask = false">立即领取</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
export default {
    data(){
        return {
            tabIndex: 1,
            signMask:false
        }
    },
    methods: {
        handleTab(index){
            var _this = this;
            _this.tabIndex = index;
        },
        //轮播
       banner(){
           let _this = this;
           let mySwiper1 = new Swiper('.swiper-container1', {
                loop: true, // 循环模式选项
                autoplay : 2000,
                pagination: ".swiper-p1",
                autoplayDisableOnInteraction : false,
                onSlideChangeEnd(swiper){
                    
                }
            });
       },
       integralRecord(){
           var pervePage = this.$route.query.recordPage;
           this.$router.replace({path: '/integralRecord',query: {recordPage:pervePage}});
       },
       forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = this.$route.query.recordPage;
            if(prveUrl == '/' || pervePage == 1 || !pervePage){
                _this.$router.replace({path:'/'});
            }else if(pervePage == 2){
                _this.$router.replace({path:'/signIn'});  //从签到进去
            }else if(pervePage == 3){
                _this.$router.replace({path:'/orderDetail',query: {recordPage:pervePage}});
            }else if(pervePage == 4){  //从阅读有礼进去
                _this.$router.replace({path:'/read'});
            }else if(pervePage == 5){  //从转盘进去
                _this.$router.replace({path:'/luckDraw'});
            }
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
            _this.banner();
        });
        config.isGoBack(_this.forbidBack);
    }
}
</script>

<style scoped>
@import './index.css';
</style>