<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            订单详情
        </div>
        <div class="header_bg"></div>
        <div class="content_box">
            <div class="header">
                <div class="order_status_img no_send_good_img"></div>
                <div class="order_status_msg_part">
                    <div class="order_status_msg_title">待发货</div>
                    <div class="order_status_msg">已付款等待商家发货</div>
                </div>
            </div>
            <div class="order_info_this_box">
                <div class="order_main_box">
                    <div class="express">
                        <div class="express_icon"></div>
                        <div class="address_info">
                            <div class="express_info">陈先生  您的包裹已经离开武汉，正发往上海</div>
                            <div class="address_info_address">2020-04-17 15:57:25</div>
                        </div>
                    </div>
                </div>
                <div class="order_info_header">
                    <div class="address_icon"></div>
                    <div class="address_info">
                        <div class="address_info_name">陈先生  1806400664</div>
                        <div class="address_info_address">广东省 深圳市 南山区 深圳湾1号8栋101</div>
                    </div>
                    <div class="order_status">待发货</div>
                </div>
                <div class="line"></div>
                <div class="order_main_box">
                    <div class="order_info_box">
                        <img src="../../../../static/images/exchangeRecord/good.png" alt="" class="order_good_img">
                        <div class="order_info">
                            <div class="order_name">游戏耳机</div>
                            <div class="good_intr">纯正原声，真实体验</div>
                            <div class="good_price"><i class="money_icon"></i>800+￥900</div>
                            <div class="good_nums">X1</div>
                        </div>
                    </div>
                    <div class="order_money_box">
                        <div class="order_money">
                            <div class="order_money_in">共1件，合计(积分):<span>8540</span></div>
                            <div class="order_money_in" style="margin-top:0.03rem">合计(现金):<span class="money">￥900.00</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="time_box">
                <div>订单编号：565656565656565</div>
                <div>创建时间：2020-04-17 15:57:25</div>
                <div>兑换时间：2020-04-17 15:57:25</div>
            </div>

            <div class="btn">确认收货</div>
        </div>

        <div class="slideParty" @click="slideMask = true" ref="pic" style="right:0.1rem;top:60%"></div>
        <div class="slidePartyBox" v-if="slideMask">
            <div class="slidePartyBg">
                <div class="slideContent">
                    <div class="slideList" @click="goOtherPage(1)">回首页<img src="../../../../static/images/orderDeatil/go_home.png" alt=""></div>
                    <div class="slideList" @click="goOtherPage(2)">赚积分<img src="../../../../static/images/orderDeatil/get_intergral.png" alt=""></div>
                    <div class="slideList">联系客服<img src="../../../../static/images/orderDeatil/ph_Customer.png" alt=""></div>
                    <div class="slideList" @click="slideMask = false">收起<img src="../../../../static/images/orderDeatil/close_slide.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            slideMask: false,
            position: { x: 0, y: 0 },
            cx: '', cy: '',x:'',y:'',l:'',t:'',r:'',b:'',
            
        }
    },
    methods: {
        goOtherPage(num){
            if(num == 1){  //去首页
                this.$router.replace({path:'/'});
            }else if(num == 2){
                this.$router.replace({path:'/taskWall',query: {recordPage:'3'}});
            }
        },
        forbidBack(){
            var _this = this;
            var pervePage = _this.$route.query.recordPage;
            _this.$router.replace({path:'/exchangeRecord',query: {recordPage:pervePage}});
        }, 
        //基于vue的移动端Icon图标拖拽
        down(event){
            var _this = this;
            var moveDiv = _this.$refs.pic;
            this.position.x = moveDiv.offsetLeft;
            this.position.y = moveDiv.offsetTop;
            var touch;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            //光标起始位置
            this.cx = touch.clientX; 
            this.cy = touch.clientY;
        },
        move(event){
            var moveDiv = this.$refs.pic;
            var touch;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            event.preventDefault(); //阻止body滚动
            //光标偏移量
            this.curx = touch.clientX - this.cx;
            this.cury = touch.clientY - this.cy;
            //DOM 运动边界判断
            if(this.curx>0){//向右
                this.curx = Math.abs(this.curx)>this.r?this.r:this.curx;
            }else{ //向左
                this.curx =  Math.abs(this.curx)>this.l?-this.l:this.curx;
            }
            if(this.cury>0){//向下
                this.cury =  Math.abs(this.cury)>this.b?this.b:this.cury;
            }else{ //向上
                this.cury =  Math.abs(this.cury)>this.t?-this.t:this.cury;
            }
            //DOM 运动		
            moveDiv.style.transform = `translate(${this.curx}px,${this.cury}px)`;
    
        },
        end(event){
            var moveDiv = this.$refs.pic;
            //光标松开,记录盒子的位移。
            var aa = '',bb = '',ax = '',by = '',transformArr = moveDiv.style.transform.match(/(-?\d+\.?\d+)/g);
            if(transformArr.length<2){
                aa = 0;  //获取x偏移量
                bb = parseInt(transformArr[0]);  //获取y偏移量
            }else{
                aa = parseInt(transformArr[0]);
                bb = parseInt(transformArr[1]);
            };
            ax = parseInt(this.position.x) + aa;  //DOMX轴偏移量
            by = parseInt(this.position.y) + bb;  //DOMY轴偏移量
            // 处理吸边
            ax = ax>this.w/2?this.w-this.x:0;
            //end 时，重绘DOM位置，并清空transform的值。
            moveDiv.style.left = ax +'px';
            moveDiv.style.top = by +'px';
            moveDiv.style.transform = '';
            //可移动边界判断
            this.l = ax;
            this.t = by;
            this.r = this.w - this.l - this.x;
            this.b = this.h - this.t - this.y;
        },
        moveInit(){
            var moveDiv = this.$refs.pic;
            this.w = document.documentElement.clientWidth || document.body.clientWidth;
            this.h = document.documentElement.clientHeight || document.body.clientHeight;
            this.x = moveDiv.offsetWidth;
            this.y = moveDiv.offsetHeight;
            //使用二级事件绑定，解决浏览器警告，可自行查询
            moveDiv.addEventListener('touchstart', this.down, { passive: false })
            moveDiv.addEventListener('touchmove', this.move, { passive: false })
            moveDiv.addEventListener('touchend', this.end, { passive: false })
            this.l = moveDiv.offsetLeft;
            this.t = moveDiv.offsetTop;
            this.r = this.w - this.l - this.x;
            this.b = this.h - this.t - this.y;
        },
    },
    destroyed(){
        window.removeEventListener('popstate', this.forbidBack, false);
    },
    mounted(){
        var _this = this;
        config.isGoBack(_this.forbidBack);
        _this.$nextTick(() => {
            _this.moveInit();
        });

        
    }
}
</script>

<style scoped>
@import './index.css';
</style>