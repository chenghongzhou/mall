// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'babel-polyfill';
import store from './vuex/store';
import Loading from "./components/loading";
import VueClipboard from 'vue-clipboard2';
Vue.use(Loading);
Vue.use(VueClipboard);
Vue.config.productionTip = false;


router.afterEach((to, from) => {
    if(to.meta.title){
        document.title = to.meta.title;
    };
})

/* eslint-disable no-new */
new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app');
