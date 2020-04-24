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
const addressEdit = () => import('../components/explain/addressManagement/edit.vue');  //编辑收货地址
Vue.use(Router);
export default new Router({
  routes: [
    //登录
    {path: '/',component: home,name: home,meta:{title: '微吧商城'},},
    {path: '/signIn',component: signIn,name: signIn,meta:{title: '每日签到'},},
    {path: '/exchangeRecord',component: exchangeRecord,name: exchangeRecord,meta:{title: '兑换记录'},},
    {path: '/taskWall',component: taskWall,name: taskWall,meta:{title: '赚积分'},},
    {path: '/integralRecord',component: integralRecord,name: integralRecord,meta:{title: '积分记录'},},
    {path: '/orderDetail',component: orderDetail,name: orderDetail,meta:{title: '订单详情'},},
    {path: '/goodDetail',component: goodDetail,name: goodDetail,meta:{title: '商品详情'},},
    {path: '/buyGood',component: buyGood,name: buyGood,meta:{title: '确认兑换'},},
    {path: '/addressManagement',component: addressManagement,name: addressManagement,meta:{title: '收货地址'},},
    {
        path: '/addressManagement',component: addressManagement,name: addressManagement,
        children: [
           {path: '/addressManagement/index',component: addressIndex,name: addressIndex,meta:{title: '收货地址'}}, 
           {path: '/addressManagement/edit',component: addressEdit,name: addressEdit,meta:{title: '编辑收货地址'}}, 
        ]
    }
  ]
})
