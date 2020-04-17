import Vue from 'vue';
import Router from 'vue-router';
//设置
const home = () => import('../components/explain/home/index.vue');  //首页
const signIn = () => import('../components/explain/signIn/index.vue');  //签到
const exchangeRecord = () => import('../components/explain/exchangeRecord/index.vue');  //兑换记录
const taskWall = () => import('../components/explain/taskWall/index.vue');  //赚积分
const integralRecord = () => import('../components/explain/integralRecord/index.vue');  //积分记录
const orderDetail = () => import('../components/explain/orderDetail/index.vue');  //订单详情
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
  ]
})
