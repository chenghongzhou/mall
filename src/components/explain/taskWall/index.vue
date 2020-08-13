<template>
    <div class="main">
        <div class="top" style="position: fixed; top: 0px; left: 0px; z-index: 10; height: 1.04rem;">
            <i class="top_close" @click="forbidBack()"></i>
            赚积分
        </div>
        
        <div class="content">
            <div style="height: 1.04rem; width: 100%;"></div>
            <div class="header_bg"></div>
            <div class="content_info">
                <div class="header">
                    <div class="my_integral">我的积分</div>
                    <div class="my_integral_number">{{userInfoData.score}}<i class="money_icon"></i>
                        <!-- <div class="exchage_integral"></div> -->
                    </div>
                    <div class="integral_record" @click="integralRecord()"></div>
                    <div class="integral_record_intru" @click="integralRecordIntru()"></div>
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
                                    <div class="refresh" @click="handleRefresh(1)"></div>
                                </div>
                                <div class="task_content_list">
                                    <div class="nodata" v-if="storeList.length == 0">暂无数据</div>
                                    <div class="list" v-for="(item,index) in storeList" :key="index">
                                        <div class="task_img_bg"><img :src="item.tasks.icon" alt=""></div>
                                        <div class="task_info">
                                            <div class="task_type_title">{{item.tasks.name}}</div>
                                            <div class="task_type_intr">{{item.tasks.dec}}</div>
                                            <div class="task_money"><i></i>+{{item.tasks.award_integral}}</div>
                                        </div>
                                        <div class="task_btn task_btn_finish" v-if="item.tasks.jump_num >0 && item.achieve_num == item.tasks.jump_num && item.tasks.jump_type == 1" @click="handleRw(item)">已完成</div>
                                        <div class="task_btn task_btn_goon" v-if="(item.tasks.jump_num >0 && item.achieve_num < item.tasks.jump_num) || item.tasks.jump_type == 0" @click="storeGourl(item)">去完成</div>
                                        <div class="task_btn task_btn_resive" v-if="item.achieve_num < item.finish_num" @click="getStorePrize(item)">领取奖励</div>
                                        <div class="task_finish_status" v-if="item.tasks.jump_type == 1">{{item.finish_num}}/{{item.tasks.jump_num}}</div>
                                    </div>
                                </div>
                            </div>
                            <img src="../../../../static/images/home/banner.png" alt="" class="every_banner_img">

                        </div>
                        <div class="box" v-if="tabIndex == 1">
                            <div class="every_task_box">
                                <div class="task_list_top">
                                    <img src="../../../../static/images/taskWall/every_task_icon.png" alt="" class="every_task_icon">    
                                    <div class="refresh" @click="handleRefresh(2)"></div>
                                </div>
                                <div class="task_content_list every_sigin">
                                    <div class="list" v-for="(item, index) in dayList" :key="index">
                                        <div class="task_img_bg"><img :src="item.tasks.icon" alt=""></div>
                                        <div class="task_info">
                                            <div class="task_type_title">{{item.tasks.name}}</div>
                                            <div class="task_type_intr">{{item.tasks.dec}}</div>
                                        </div>
                                        <div class="task_btn task_btn_goon" @click="goDayUrl(item)">去完成</div>
                                    </div>
                                </div>
                            </div>
                            <img src="../../../../static/images/home/banner.png" alt="" class="every_banner_img">

                            <div class="every_task_box" v-if="newUserList && newUserList.length > 0">
                                <div class="task_list_top">
                                    <div class="new_people_icon">
                                        <img src="../../../../static/images/taskWall/new_people_icon.png" alt="">
                                        <!-- <span>已完成0/1</span> -->
                                    </div>
                                    
                                    <div class="refresh" @click="handleRefresh(3)"></div>
                                </div>
                                <div class="task_content_list">
                                    <div class="list" v-for="(item,index) in newUserList" :key="index">
                                        <div class="task_img_bg"><img :src="item.tasks.icon" alt=""></div>
                                        <div class="task_info">
                                            <div class="task_type_title">{{item.tasks.name}}</div>
                                            <div class="task_type_intr">{{item.tasks.dec}}</div>
                                            <div class="task_money"><i></i>+{{item.tasks.award_integral}}</div>
                                        </div>
                                        <div class="task_btn task_btn_goon" v-if="item.progress == 0" @click="goNewUser(item)">去完成</div>
                                        <div class="task_btn task_btn_resive" v-if="item.progress == 1" @click="newUserPrize(item)">领取奖励</div>
                                        <div class="task_btn task_btn_finish" v-if="item.progress == 2">已完成</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div> 
            <footer-view style="position:relative"></footer-view>  
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

        <div class="mask" v-if="wx_code">
			<div class="mask_main_good">
				<div class="box tanchuscale">
                    <img :src="resultImg" alt="" class="mask_wx_code">
                    <div class="godo_close" @click="wx_code = false"></div>
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
                // {icon:'./static/images/home/activity1.png',text:'签到有礼',ishot:'1',toUrl:'/signIn'},
                

            ],
            open_id:'',
            userInfoData:{},
            activity_list:[],
            storeList:[], //获取任务集市
            dayList:[], //获取任务集市
            newUserList:[], //新人奖励
            storeId:'',
            openid:'',
            wx_code:false,
            resultImg:''
        }
    },
    methods: {
        handleTab(index){
            var _this = this;
            _this.tabIndex = index;
        },
        //任务集市
        getStoreData(){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid, //oaWxEv2NUHC4q04-i3IRgFLZTBoU
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/get_market_tasks",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.storeList = res.data.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        handleRw(item){
            window.location.href = item.tasks.jump_link;
        },
        //去完成任务集市
        storeGourl(item){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data": {
                    "missionId":item.tasks.id
                }
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/finish_market_task",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    window.location.href = item.tasks.jump_link;
                }else{
                    config.layerMsg('接口出错了~', 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //领取任务集市
        getStorePrize(item){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data": {
                    "missionId":item.tasks.id
                }
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/achieve_market_task",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    config.layerMsg(res.data.msg, 2);
                    _this.getStoreData();
                    _this.getUserInfoMy();
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //每日任务
        getDayData(){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/get_daily_tasks",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.dayList = res.data.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //每日任务得跳转
        goDayUrl(item){
            var type = item.tasks.jump_page;
            if(type == 1){  //签到
                this.$router.replace({path:'signIn',query: {recordPage:'taskWall'}});
            }else if(type == 2){ //阅读
                this.$router.replace({path:'read',query: {recordPage:'taskWall'}});
            }else if(type == 3){  //抽奖
                this.$router.replace({path:'/luckDraw',query: {recordPage:'taskWall'}});
            }else if(type == 4){ //邀请链接
                this.$router.replace({path:'extension',query: {recordPage:'taskWall'}});
            }else{
                config.layerMsg('未配置~', 2);
            }
        },
        //新人任务
        getNewUserData(){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/get_new_user_tasks",formData,headerConfig).then((res) => {
                if(res.data.error_code == 0){
                    _this.newUserList = res.data.data;
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //去完成新人任务
        goNewUser(item){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data": {
                    "missionId":item.tasks.id
                }
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/finish_new_user_task",formData,headerConfig).then((res) => {
                console.log(item)
                if(res.data.error_code == 0){
                    console.log(item)
                    _this.resultImg = item.tasks.qr_code;
                    if(item.tasks.jump_type == 0){
                        _this.wx_code = true;
                    }else if(item.tasks.jump_type == 1){
                        window.location.href = item.tasks.jump_link;
                    }else{
                        config.layerMsg('未配置', 2);
                    };
                    _this.getNewUserData();
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //领取新人
        newUserPrize(item){
            var _this = this;
            var openid = _this.openid;
            var formData = {
                'store_id': _this.storeId,
                "open_id":openid,
                "data": {
                    "missionId":item.tasks.id
                }
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/mission/achieve_new_user_task",formData,headerConfig).then((res) => {
                if(res.data.error_code == 2){
                    config.layerMsg('领取成功~', 2);
                    _this.getNewUserData();
                    _this.getUserInfoMy();
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        //获取用户信息和金币
        getUserInfoMy(){
            var _this = this;
            var formData = {
                "open_id":_this.openid,
                "store_id":_this.storeId,
                "data":{
                    "avatar_url":_this.userInfoData.avatar_url,
                    "nick_name":_this.userInfoData.nick_name,
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
        //积分说明  integralExplain
        integralRecordIntru(){  
            this.$router.replace({path:'/integralExplain'});
        },
         goTo(item){
            var sys_activity_id = item.sys_activity_id;
            var toPath = '';
            sys_activity_id == 1?toPath = '/signIn':sys_activity_id == 2?toPath = '/read':sys_activity_id == 3?toPath = '/extension':sys_activity_id == 4?toPath = '/luckDraw':toPath='';
            this.$router.replace({path:toPath,query: {recordPage:'taskWall'}});
        },
        //获取活动列表
        getActivityList(){
            var _this = this;
            var formData = {
                "open_id":_this.openid,
                "store_id":_this.storeId,
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
            var pervePage = config.getHashVReq('recordPage');
            var ishome = config.getHashVReq('ishome');
            if(pervePage == 'index'){
                 _this.$router.replace({path:'/'});
            }else if(pervePage != '/' && pervePage){
               _this.$router.replace({path:'/'+pervePage+'?ishome='+ishome});
            }else{
                _this.$router.replace({path:'/'});
                // if(config.thirdParty().isWechat == true){
                //      WeixinJSBridge.call('closeWindow');
                // }else{
                //     window.opener=null;
                //     window.open('','_self');
                //     window.location.href="about:blank";
                //     window.close(); 
                // };
            }
        },
        //刷新
        handleRefresh(index){
            if(index == 1){
                this.getStoreData();
            }else if(index == 2){
                this.getDayData();
            }else if(index == 3){
                this.getNewUserData();
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
                try {
                      _this.userInfoData = JSON.parse(t_data);
                } catch (error) {
                     if(config.thirdParty().isWechat == true){
                        window.location.replace('http://v8homepage.youwoxing.net/?position=taskWall&appid='+t_p)
                    };
                }
              
            }else{ //去授权
                if(config.thirdParty().isWechat == true){
                    window.location.replace('http://v8homepage.youwoxing.net/?position=taskWall&appid='+t_p)
                };
            };
           var t_store = config.getCookie('userInfo');
            if(t_store){
                _this.storeId = Number(JSON.parse(t_store).storeId);
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
        _this.isLg();
        _this.$nextTick(() => {
           _this.getActivityList();
           
           _this.getDayData();
           _this.getNewUserData();
           _this.getStoreData();
        });
        config.isGoBack(_this.forbidBack);
    }
}
</script>

<style scoped>
@import './index.css';
</style>