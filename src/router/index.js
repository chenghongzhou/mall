import Vue from 'vue';
import Router from 'vue-router';
//设置
const home = () => import('../components/explain/home/index.vue');  //首页
const signIn = () => import('../components/explain/signIn/index.vue');  //签到
const exchangeRecord = () => import('../components/explain/exchangeRecord/index.vue');  //兑换记录
const taskWall = () => import('../components/explain/taskWall/index.vue');  //赚积分
const integralRecord = () => import('../components/explain/integralRecord/index.vue');  //积分记录
const orderDetail = () => import('../components/explain/orderDetail/index.vue');  //订单详情
const goodDetail = () => import('../components/explain/goodDetail/index.vue');  //商品详情
const buyGood = () => import('../components/explain/buyGood/index.vue');  //确认兑换

const addressManagement = () => import('../components/explain/addressManagement/main.vue');  //收货地址
const addressIndex = () => import('../components/explain/addressManagement/index.vue');  //收货地址
const addressAdd = () => import('../components/explain/addressManagement/add.vue');  //添加收货地址
const luckDraw = () => import('../components/explain/luckDraw/index.vue');  //抽奖
const read = () => import('../components/explain/read/index.vue');  //阅读有赏
const poster = () => import('../components/explain/poster/index.vue');  //海报
const extension = () => import('../components/explain/extension/index.vue');  //邀请有礼
const friendRecommend = () => import('../components/explain/friendRecommend/index.vue');  //关注有礼
const integralExplain = () => import('../components/explain/taskWall/integralExplain.vue');  //积分说明
const login = () => import('../components/explain/login/index.vue');  //登陆
const prizeList = () => import('../components/explain/prizeList/index.vue');  //登陆
Vue.use(Router);
export default new Router({
  routes: [
    //登录
    {path: '/index',component: login,name: login,meta:{title: '积分商城'},},
    {path: '/',component: home,name: home,meta:{title: '积分商城'},},
    {path: '/signIn',component: signIn,name: signIn,meta:{title: '每日签到'},},
    {path: '/exchangeRecord',component: exchangeRecord,name: exchangeRecord,meta:{title: '兑换记录'},},
    {path: '/taskWall',component: taskWall,name: taskWall,meta:{title: '赚积分'},},
    {path: '/integralRecord',component: integralRecord,name: integralRecord,meta:{title: '积分记录'},},
    {path: '/orderDetail',component: orderDetail,name: orderDetail,meta:{title: '订单详情'},},
    {path: '/goodDetail',component: goodDetail,name: goodDetail,meta:{title: '商品详情'},},
    {path: '/buyGood',component: buyGood,name: buyGood,meta:{title: '确认兑换'},},
    {path: '/addressManagement',component: addressManagement,name: addressManagement,meta:{title: '收货地址'},},
    {path: '/luckDraw',component: luckDraw,name: luckDraw,meta:{title: '转盘抽奖'},},
    {path: '/read',component: read,name: read,meta:{title: '阅读有礼'},},
    {path: '/poster',component: poster,name: poster,meta:{title: '分享海报'},},
    {path: '/extension',component: extension,name: extension,meta:{title: '邀请有礼'},},
    {path: '/friendRecommend',component: friendRecommend,name: friendRecommend,meta:{title: '关注有礼'},},
    {path: '/integralExplain',component: integralExplain,name: integralExplain,meta:{title: '积分说明'},},
    {path: '/prizeList',component: prizeList,name: prizeList,meta:{title: '中奖记录'},},
    {
        path: '/addressManagement',component: addressManagement,name: addressManagement,
        children: [
           {path: '/addressManagement/index',component: addressIndex,name: addressIndex,meta:{title: '收货地址'}}, 
           {path: '/addressManagement/add',component: addressAdd,name: addressAdd,meta:{title: '添加收货地址'}}, 
        ]
    }
  ]
})
