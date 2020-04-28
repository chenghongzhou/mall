<template>
    <div class="main">
        <div class="top">
            <i class="top_close" @click="forbidBack()"></i>
            确认兑换
        </div>
        <div class="header">
            <div class="go_back" @click="forbidBack()"></div>
        </div>
        <div class="address_box">
            <div class="address_icon"></div>
            <div class="address_info">
                <div class="address_info_name">陈先生  1806400664</div>
                <div class="address_info_address">广东省 深圳市 南山区 深圳湾1号8栋101</div>
            </div>
            <div class="go_edit_address" @click="goAddress()"></div>
        </div>

        <div class="buy_good_box">
            <div class="order_info_box">
                <img src="../../../../static/images/exchangeRecord/good.png" alt="" class="order_good_img">
                <div class="order_info">
                    <div class="order_name">游戏耳机</div>
                    <div class="good_intr">纯正原声，真实体验</div>
                    <div class="good_price"><i class="money_icon"></i>800+￥900</div>
                </div>
            </div>
            <div class="order_money_box">
                <div class="order_money">
                    <div class="order_money_in">兑换数量<div class="nums"><div class="reduce" @click="goodNum(1)"></div><div class="buy_nums">{{num}}</div><div class="add" @click="goodNum(2)"></div></div></div>
                    
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="money_box">
                <div class="intergral">合计(积分)：<i></i><span>1245</span></div>
                <div class="money">合计(现金)：<i></i><font>￥</font><span>90</span></div>
            </div>
            <div class="btn" @click="successMask = true">立即兑换</div>
        </div>

        <div class="mask" v-if="successMask">
			<div class="mask_main success">
				<div class="box tanchuscale">
                    <div class="success_title">兑换成功</div>
                    <div class="success_msg">继续赚取积分，兑换更多好礼</div>
                    <div class="success_btn" @click="successMask = false">确定</div>
				</div>
			</div>
		</div>
        <div class="mask" v-if="fileMask">
			<div class="mask_main file">
				<div class="box tanchuscale">
                    <div class="file_title">兑换成功</div>
                    <div class="file_need">本次兑换共需999积分</div>
                    <div class="file_you">当前积分99</div>
                    <div class="file_btn" @click="goTaskWall()">立即赚积分</div>
                    <div class="file_close" @click="fileMask = false"></div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            num: 1,
            successMask: false,
            fileMask: false,
        }
    },
    methods: {
        goodNum(index){
            //1减 2加
            if(index == 1){
                this.num>1?this.num = this.num-1:this.num=1;
            }else{
                this.num++;
            };
        },
        goAddress(){
            this.$router.replace({path:'/addressManagement/index'});
        },
        goTaskWall(){
            this.$router.replace({path:'/taskWall'});
        },
        forbidBack(){
            this.$router.replace({path:'/goodDetail'});
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