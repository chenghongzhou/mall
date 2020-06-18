<template>
    <div class="main">
        <div class="header_part">
            <div class="top">
                <i class="top_close" @click="forbidBack()"></i>
                阅读有礼
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
           <div class="intru">阅读一篇文章获得<span>1</span>积分，每日做多获得<span>5</span>积分。</div>
           <ul>
               <li>
                   <img src="../../../../static/images/home/read.png" alt="" class="read_img">
                   <div class="reading">
                       <div class="reading_content">标题</div>
                       <div class="reading_content" style="margin-top:0.08rem">简介</div>
                   </div>
                   <div class="reading_time">+1000积分</div>
                   <div class="go_read">去阅读</div>
               </li>
           </ul>
       </div>

       <footer-view></footer-view>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        exchangeRecord(){
            this.$router.replace({path:'/exchangeRecord',query: {recordPage:'read'}});
        },
        taskWall(){
            this.$router.replace({path:'/taskWall',query: {recordPage:'read'}});
        },
        forbidBack(){
            var _this = this;
            var prveUrl = localStorage.getItem('backName');
            var pervePage = this.$route.query.recordPage;
            if(pervePage == 'taskWall'){
                _this.$router.replace({path:'/taskWall'});
            }else if(pervePage == 'index'){
                 _this.$router.replace({path:'/'});
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