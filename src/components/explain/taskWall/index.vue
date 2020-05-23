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
                <div class="integral_record_intru" @click="integralRecord()"></div>
            </div>
            
            <div class="task_list_box">
                <div class="activity_box">
                    <div class="activity_scoll">
                        <div class="activity_box_main" ref="activityBoxMain">
                            <div class="activity_list" ref="activityChild" @click="goSign()">
                                <img src="../../../../static/images/home/activity1.png" alt="">
                                <div class="activity_name">每日签到</div>
                                <i class="activity_hot"></i>
                            </div>
                            <div class="activity_list">
                                <img src="../../../../static/images/home/activity5.png" alt="">
                                <div class="activity_name">关注有礼</div>
                            </div>
                            <div class="activity_list">
                                <img src="../../../../static/images/home/activity3.png" alt="">
                                <div class="activity_name">阅读有赏</div>
                            </div>
                            <div class="activity_list" @click="goLuckDwraw()">
                                <img src="../../../../static/images/home/activity4.png" alt="">
                                <div class="activity_name">幸运转盘</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="task_tab_box">
                    <div class="active"><i class="task_icon_active"></i>做任务</div>
                    <div><i class="task_store_icon"></i>任务集市</div>
                </div>

                <div class="task_content">
                    <div class="box">
                        <div class="every_task_box">
                            <div class="task_list_top">
                                <img src="../../../../static/images/taskWall/task_store.png" alt="" class="every_task_icon">    
                                <div class="refresh"></div>
                            </div>
                            <div class="task_content_list">
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/task_store_ads.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">签到领积分</div>
                                        <div class="task_type_intr">签到一次，最少可得10积分</div>
                                        <div class="task_money"><i></i>+100</div>
                                    </div>
                                    <div class="task_btn task_btn_goon">已完成</div>
                                    <div class="task_finish_status">1/1</div>
                                </div>
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/task_store_ads.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">签到领积分</div>
                                        <div class="task_type_intr">签到一次，最少可得10积分</div>
                                        <div class="task_money"><i></i>+100</div>
                                    </div>
                                    <div class="task_btn task_btn_finish">领取奖励</div>
                                    <div class="task_finish_status">1/1</div>
                                </div>
                            </div>
                        </div>
                        <img src="../../../../static/images/home/banner.png" alt="" class="every_banner_img">

                    </div>
                    <div class="box" style="display:none">
                        <div class="every_task_box">
                            <div class="task_list_top">
                                <img src="../../../../static/images/taskWall/every_task_icon.png" alt="" class="every_task_icon">    
                                <div class="refresh"></div>
                            </div>
                            <div class="task_content_list">
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sigin.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">签到领积分</div>
                                        <div class="task_type_intr">签到一次，最少可得10积分</div>
                                    </div>
                                    <div class="task_btn task_btn_goon">去签到</div>
                                </div>
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sigin.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">阅读有赏</div>
                                        <div class="task_type_intr">每阅读一篇文章，最少得10积分</div>
                                    </div>
                                    <div class="task_btn task_btn_goon">去阅读</div>
                                </div>
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sigin.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">兑换商品返积分</div>
                                        <div class="task_type_intr">每兑换1.00元可获得10积分</div>
                                    </div>
                                    <div class="task_btn task_btn_finish">领取奖励</div>
                                </div>
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sigin.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">喊好友签到</div>
                                        <div class="task_type_intr">每邀请一位好友签到得100积分</div>
                                    </div>
                                    <div class="task_btn task_btn_resive">已完成</div>
                                </div>
                            </div>
                        </div>
                        <img src="../../../../static/images/home/banner.png" alt="" class="every_banner_img">

                        <div class="every_task_box">
                            <div class="task_list_top">
                                <div class="new_people_icon">
                                    <img src="../../../../static/images/taskWall/new_people_icon.png" alt="">
                                    <span>已完成0/1</span>
                                </div>
                                  
                                <div class="refresh"></div>
                            </div>
                            <div class="task_content_list">
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sxm.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">签到领积分</div>
                                        <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                                        <div class="task_money"><i></i>+100</div>
                                    </div>
                                    <div class="task_btn task_btn_goon">去完成</div>
                                </div>
                                <div class="list">
                                    <div class="task_img_bg"><img src="../../../../static/images/taskWall/sxm.png" alt=""></div>
                                    <div class="task_info">
                                        <div class="task_type_title">签到领积分</div>
                                        <div class="task_type_intr">喜欢公众号？去菜单栏签到吧~</div>
                                        <div class="task_money"><i></i>+100</div>
                                    </div>
                                    <div class="task_btn task_btn_goon">去完成</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="task_list">
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
                </div> -->

                <!-- <div class="task_list">
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
                </div> -->
                 <!-- <div class="task_list">
                    <div class="task_list_top">任务集市<span>已完成5/10</span><div class="refresh"></div></div> -->
                    
                    <!-- <div class="task_tab_box">
                        <div :class="{'active':tabIndex == 1}" @click="handleTab(1)">全部</div>
                        <div :class="{'active':tabIndex == 2}" @click="handleTab(2)">看广告</div>
                        <div :class="{'active':tabIndex == 3}" @click="handleTab(3)">办理财</div>
                        <div :class="{'active':tabIndex == 4}" @click="handleTab(4)">玩游戏</div>
                    </div> -->
                    <!-- <div>
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
                    </div> -->
                <!-- </div> -->

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
                _this.$router.replace({path:'/signIn'});
            }else if(pervePage == 3){
                _this.$router.replace({path:'/orderDetail',query: {recordPage:pervePage}});
            }
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
           
        });
        config.isGoBack(_this.forbidBack);
    }
}
</script>

<style scoped>
@import './index.css';
</style>