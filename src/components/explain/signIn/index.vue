<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                每日签到
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
        <div class="content">
            <div class="sign_box">
                <div class="my_sign">
                    <img src="../../../../static/images/home/my_img.png" alt="" class="my_icon">
                    <img src="../../../../static/images/sign/top_no1.png" alt="" class="my_rank">
                    <!-- <div>4</div> -->
                    <!-- <img src="../../../../static/images/sign/top_no2.png" alt="" class="my_rank"> -->
                    <!-- <img src="../../../../static/images/sign/top_no3.png" alt="" class="my_rank"> -->
                </div>
                <div class="rank_msg">今日排名</div>
                <div class="my_sign_info">
                    <div>
                        <p>连续签到</p>
                        <p>1天</p>
                    </div>
                    <div>
                        <p>累计签到</p>
                        <p>1天</p>
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
                        <li>
                            <div class="list_rank"><img src="../../../../static/images/sign/rank1.png" alt=""></div>
                            <img src="../../../../static/images/home/my_img.png" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">秦松少女/</p>
                                <div class="list_info_signs">累计签到1天<span>01:23:18</span></div>
                            </div>
                            <!-- <div class="love"></div> -->
                        </li>
                        <li>
                            <div class="list_rank"><img src="../../../../static/images/sign/rank2.png" alt=""></div>
                            <img src="../../../../static/images/home/my_img.png" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">秦松少女/</p>
                                <div class="list_info_signs">累计签到1天<span>01:23:18</span></div>
                            </div>
                            <div class="love"></div>
                        </li>
                        <li>
                            <div class="list_rank"><img src="../../../../static/images/sign/rank3.png" alt=""></div>
                            <img src="../../../../static/images/home/my_img.png" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">秦松少女/</p>
                                <div class="list_info_signs">累计签到1天<span>01:23:18</span></div>
                            </div>
                            <!-- <div class="love"></div> -->
                        </li>
                        <li>
                            <div class="list_rank">4</div>
                            <img src="../../../../static/images/home/my_img.png" alt="" class="list_img">
                            <div class="list_info">
                                <p class="list_info_name">秦松少女/</p>
                                <div class="list_info_signs">累计签到1天<span>01:23:18</span></div>
                            </div>
                            <div class="love"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mask" v-if="signMask">
                <div class="mask_main">
                    <div class="box tanchuscale">
                        <div class="mask_title">签到成功</div>
                        <div class="mask_you_get">恭喜你获得20积分</div>
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
        }
    },
    methods: {
        handTab(num){
            var _this = this;
            _this.tabIndex = num;
        },
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'2'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'2'}});
        },
        //签到
        signIn(){
            var _this = this;
            var formData = {
                'store_id': '1001'
            };
            var sessionid = config.getCookie('sessionid') || '';
            var headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'open_id': sessionid
                }
            };
            _this.$axios.post(allget+"/sign/sign_once/",formData,headerConfig).then((res) => {
                if(res.data.code == 1){
                   // _this.signMask = true;
                }else{
                   // config.layerMsg(res.data.data.message, 2);
                };
            }).catch(() => {
                console.log('error');
            });
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
            _this.signIn();
        })
    }   
}
</script>

<style scoped>
@import './index.css';
</style>