<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            赚积分
        </div>
        
        <div class="content">
            <div class="header_bg"></div>
            <div class="content_info">
                <div class="header">
                    <div class="my_integral">我的积分</div>
                    <div class="my_integral_number">{{userInfoData.score}}<i class="money_icon"></i><div class="exchage_integral"></div></div>
                    <div class="integral_record" @click="integralRecord()"></div>
                    <div class="integral_record_intru" @click="integralRecord()"></div>
                </div>
                <div style="width:0.48rem" ref="activityjz"></div>
                <div class="task_list_box">
                    <div class="activity_box">
                        <div class="activity_scoll">
                            <div class="activity_box_main" ref="activityBoxMain">
                                 <div class="activity_list" v-for="(item, index) in activity_list" :key="index" @click="goTo(item)" ref="activityChild">
                                    <img :src="item.icon" alt="">
                                    <div class="activity_name">{{item.name}}</div>
                                    <i class="activity_hot" v-if="item.ishot && item.ishot == 1"></i>
                                </div>
                                <!-- <div class="activity_list" ref="activityChild" @click="goSign()">
                                    <img src="../../../../static/images/home/activity1.png" alt="">
                                    <div class="activity_name">每日签到</div>
                                    <i class="activity_hot"></i>
                                </div>
                                <div class="activity_list">
                                    <img src="../../../../static/images/home/activity5.png" alt="">
                                    <div class="activity_name">关注有礼</div>
                                </div>
                                <div class="activity_list" @click="read()">
                                    <img src="../../../../static/images/home/activity3.png" alt="">
                                    <div class="activity_name">阅读有赏</div>
                                </div>
                                <div class="activity_list" @click="goLuckDwraw()">
                                    <img src="../../../../static/images/home/activity4.png" alt="">
                                    <div class="activity_name">幸运转盘</div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="task_tab_box">
                        <div :class="{'active':tabIndex==1}" @click="handleTab(1)"><i class="task_icon" :class="{'task_icon_active':tabIndex==1}"></i>做任务</div>
                        <div :class="{'active':tabIndex==2}" @click="handleTab(2)"><i class="task_store_icon" :class="{'task_store_icon_active':tabIndex==2}"></i>任务集市</div>
                    </div>

                    <div class="task_content">
                        <div class="box" v-if="tabIndex == 2">
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
                        <div class="box" v-if="tabIndex == 1">
                            <div class="every_task_box">
                                <div class="task_list_top">
                                    <img src="../../../../static/images/taskWall/every_task_icon.png" alt="" class="every_task_icon">    
                                    <div class="refresh"></div>
                                </div>
                                <div class="task_content_list every_sigin">
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
                </div>
            </div> 
        </div>
        <footer-view></footer-view>  
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

        <div class="mask" v-if="doMask">
			<div class="mask_main">
				<div class="godo tanchuscale">
                    <div class="godo_title">添加客服微信</div>
                    <img src="../../../../static/images/home/wx_code.jpg" alt="" class="mask_wx_code">
                    <div class="godo_wx_numb">客服微信号码：SADADAS</div>
                    <div class="godo_get_info">长按识别二维码，完成任务可获得100积分</div>
                    <div class="godo_close" @click="doMask = false"></div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import '../../../../static/js/swiper.js';
import '../../../../static/css/swiper-3.4.2.min.css';
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            tabIndex: 1,
            signMask:false,
            doMask: false,   //去完成
            activityList:[
                {icon:'./static/images/home/activity1.png',text:'签到有礼',ishot:'1',toUrl:'/signIn'},
                {icon:'./static/images/home/activity5.png',text:'关注有礼',ishot:'0',toUrl:'/signIn'},
                {icon:'./static/images/home/activity3.png',text:'阅读有赏',ishot:'0',toUrl:'/read'},
                {icon:'./static/images/home/activity4.png',text:'幸运转盘',ishot:'0',toUrl:'/luckDraw'},

            ],
            open_id:'',
            userInfoData:{},
            activity_list:[],
        }
    },
    methods: {
        handleTab(index){
            var _this = this;
            _this.tabIndex = index;
        },
         goTo(item){
            var sys_activity_id = item.sys_activity_id;
            var toPath = '';
            sys_activity_id == 1?toPath = '/signIn':sys_activity_id == 2?toPath = '/read':sys_activity_id == 3?toPath = '/extension':sys_activity_id == 4?toPath = '/luckDraw':toPath='';
            this.$router.replace({path:toPath});
        },
        //获取活动列表
        getActivityList(){
            var _this = this;
            var openid = _this.userInfoData.open_id;
            var formData = {
                "open_id":openid,
                "store_id":1,
            };
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$axios.post(allget+"/activity/get_activities",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                   _this.activity_list = res.data.activity_list;
                   setTimeout(() => {_this.setActivity();},0)
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //活动入口的设计
        setActivity(){
            var _this = this;
            var {activityBoxMain, activityChild, activityjz} = _this.$refs;
            var len = _this.activity_list.length;
            if(len <= 0){
                return false;
            };
            activityBoxMain.style.width = (activityChild[0].getBoundingClientRect().width*(len) + activityjz.getBoundingClientRect().width*(len-1)) +2+'px';
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
            }
            else{
                _this.$router.replace({path:'/'+pervePage});
            }
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        _this.$nextTick(() => {
            _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
           _this.getActivityList();
        });
        config.isGoBack(_this.forbidBack);
    }
}
</script>

<style scoped>
@import './index.css';
</style>