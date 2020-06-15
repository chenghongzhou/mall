import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import permission from './modules/address.js';
 
Vue.use(Vuex);
const store = new Vuex.Store({
    goodInfo:{},  //点击的物品信息
    modules: {
        permission,
        goodInfo:{},//点击的物品信息
    },
    getters
})

 
// export default new Vuex.Store({
//   state,
//   mutations
// });

export default store;
