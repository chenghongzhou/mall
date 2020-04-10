import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
const state = {
    name: '',
    uid: '',
    phone:'',
    code:'',
    sessionId: '',
    checkType: '',  //选择寄存类型
    cabinetId:'',  //柜子id
    platform: '',  //身份
    orderId: '', //订单号
    gridId: '',  //格子id
    deposit: {},  //寄存的信息
    phoneCode: '',   //验证码号
    pickUpInfo: {},  //取货信息
    pickUpInfoFild: {},  //取货超时骑手手机号
    pickNumber: '',  //取货号
    pickTimer: '', //取货的时间戳
    pickUpCode: '', //取货码
    gridCount: '',//格子总数
    gridType: '',
    isBind:'',

}
const mutations={
    
}
 
export default new Vuex.Store({
  state,
  mutations
});