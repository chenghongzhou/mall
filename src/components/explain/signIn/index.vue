<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                每日签到
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
        <div class="content">
            <div class="sign_box">
                <div class="my_sign">
                    <img :src="userInfoData.avatar_url" alt="" class="my_icon" v-if="rank<3">
                    <img src="../../../../static/images/sign/top_no1.png" alt="" class="my_rank" v-if="rank == 1">
                    
                    <img src="../../../../static/images/sign/top_no2.png" alt="" class="my_rank" v-else-if="rank == 2">
                    <img src="../../../../static/images/sign/top_no3.png" alt="" class="my_rank" v-else-if="rank == 3">
                    <div v-if="rank>3">{{rank}}</div>
                </div>
                <div class="rank_msg">
                    <span v-if="tabIndex == 1">今日排名</span>
                    <span v-if="tabIndex == 2">本月排行</span>
                    <span v-if="tabIndex == 3">总排行</span>
                </div>
                <div class="my_sign_info">
                    <div>
                        <p>连续签到</p>
                        <p>{{continue_sign_count}}天</p>
                    </div>
                    <div>
                        <p>累计签到</p>
                        <p>{{total_sign_count}}天</p>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div :class="{'tab_active':tabIndex == 1}" @click="handTab(1)" ><span>今日排行<i v-if="tabIndex == 1"></i></span></div>
                <div :class="{'tab_active':tabIndex == 2}" @click="handTab(2)" ><span>本月排行<i v-if="tabIndex == 2"></i></span></div>
                <div :class="{'tab_active':tabIndex == 3}" @click="handTab(3)" ><span>总排行<i v-if="tabIndex == 3"></i></span></div>
            </div>
            <div style="width:100%;height:0.2rem"></div>
            <div class="list_box">
                <div class="list_main">
                    <ul>
                        <div class="nodata" v-if="siginList.length == 0">暂无数据</div>
                        <li v-for="(item,index) in siginList" :key="index">
                            <div class="list_rank" v-if="index == 0"><img src="../../../../static/images/sign/rank1.png" alt=""></div>
                            <div class="list_rank" v-else-if="index == 1"><img src="../../../../static/images/sign/rank2.png" alt=""></div>
                            <div class="list_rank" v-else-if="index == 2"><img src="../../../../static/images/sign/rank3.png" alt=""></div>
                            <div class="list_rank" v-else>{{index+1}}</div>
                            <img :src="item.avatar_url" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">{{item.nick_name}}</p>
                                <div class="list_info_signs">累计签到{{item.sign_count}}天<span v-if="tabIndex == 1">{{item.sign_time}}</span></div>
                            </div>
                            <!-- <div class="love"></div> -->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mask" v-if="signMask">
                <div class="mask_main">
                    <div class="box tanchuscale">
                        <div class="mask_title">签到成功</div>
                        <div class="mask_you_get">恭喜你获得{{getData.get_score}}积分</div>
                        <div class="mask_btn" @click="signMask = false">确认</div>
                    </div>
                </div>
            </div>
        </div>  
        <footer-view></footer-view>  
    </div>
</template>

<script>
import { allget } from '../../../api/api.js';
export default {
    data(){
        return {
            tabIndex: 1, //切换
            signMask: false,
            userInfoData: {},  //用户信息包含积分
            getData: {},
            siginList:[],
            continue_sign_count:'',  //连续签到
            total_sign_count: '', //累计签到
            rank:1,  //今日，本月，总排行 
        }
    },
    methods: {
        handTab(num){
            var _this = this;
            _this.tabIndex = num;
            _this.siginList = _this.getData.list.day_list;
            if(num == 1){
                _this.siginList = _this.getData.list.day_list;
                _this.rank = _this.getData.user_position.in_day_list;
            }else if(num == 2){
                _this.siginList = _this.getData.list.month_list;
                _this.rank = _this.getData.user_position.in_month_list;
            }else{
                _this.siginList = _this.getData.list.total_list;
                _this.rank = _this.getData.user_position.in_total_list;
            };
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'signIn'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'signIn'}});
        },
        //签到
        signIn(){
            var _this = this;
            var openid = _this.userInfoData.open_id;
            var formData = {
                'store_id': 1001,
                "open_id":openid
            };
            
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            _this.$axios.post(allget+"/sign/sign_once",formData,headerConfig).then((res) => {
                _this.getData = res.data.data;
                _this.continue_sign_count = res.data.data.user_position.continue_sign_count;
                _this.total_sign_count = res.data.data.user_position.total_sign_count;

                if(res.data.error_code == 0){
                    _this.signMask = true;
                    _this.siginList = res.data.data.list.day_list;
                     _this.rank = res.data.data.user_position.in_day_list;
                }else if(res.data.error_code == 1){
                    _this.siginList = res.data.data.list.day_list;
                     _this.rank = res.data.data.user_position.in_day_list;
                    config.layerMsg(res.data.msg, 2);
                }else{
                    config.layerMsg(res.data.msg, 2);
                };
            }).catch(() => {
                console.log('error');
            });
        },
        forbidBack(){
            var _this = this;
            var pervePage = this.$route.query.recordPage;
            if(pervePage == 'taskWall'){
                _this.$router.replace({path:'/taskWall'});
            }else{
                 _this.$router.replace({path:'/'});
            };
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() =>{
            _this.userInfoData = JSON.parse(config.getCookie('userInfoData'));
            _this.signIn();
        })
    }   
}
</script>

<style scoped>
@import './index.css';
</style>