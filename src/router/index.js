import Vue from 'vue';
import Router from 'vue-router';
//设置
const home = () => import('../components/explain/home/index.vue');  //首页
const signIn = () => import('../components/explain/signIn/index.vue');  //签到
Vue.use(Router);
export default new Router({
  routes: [
    //登录
    {path: '/',component: home,name: home,meta:{title: '首页'},},
    {path: '/signIn',component: signIn,name: signIn,meta:{title: '签到'},},
  ]
})
