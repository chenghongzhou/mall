webpackJsonp([16],{FFs4:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("P9l9"),i={data:function(){return{userInfoData:{},storeId:"",openid:"",codeImg:"",wx_code:!1,list:[{avatarUrl:"",nickName:"41",dateTmStr:"454"}]}},methods:{exchangeRecord:function(){var t=config.getHashVReq("ishome");this.$router.replace({path:"/exchangeRecord?recordPage=luckDraw&ishome="+t})},taskWall:function(){var t=config.getHashVReq("ishome");this.$router.replace({path:"/taskWall?recordPage=luckDraw&ishome="+t})},handleTal:function(t,a){this.wx_code=!0,this.codeImg=t.qrcode},getData:function(){var t=this;t.id;t.$loading.show();var a={store_id:t.storeId,open_id:t.openid};t.$axios.post(s.a+"/lottery/get_lottery_reward_record",a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(a){a.data?t.list=a.data:config.layerMsg(a.data.msg,2),t.$loading.close()}).catch(function(){t.$loading.close(),console.log("error")})},forbidBack:function(){localStorage.getItem("backName");var t=config.getHashVReq("recordPage"),a=config.getHashVReq("ishome");this.$router.replace({path:"/luckDraw?ishome="+a+"&pervePage="+t})},isLg:function(){var t=config.getCookie("userInfoData");t&&(this.userInfoData=JSON.parse(t));var a=config.getCookie("userInfo");a&&(this.storeId=Number(JSON.parse(a).storeId));var e=config.getCookie("openid");e&&(this.openid=JSON.parse(e).open_id)}},destroyed:function(){window.removeEventListener("popstate",this.forbidBack,!1)},mounted:function(){var t=this;config.isGoBack(t.forbidBack),t.isLg(),t.$nextTick(function(){t.getData()})}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main",staticStyle:{height:"100vh"}},[e("div",{ref:"header",staticClass:"header_part"},[e("div",{staticClass:"top"},[e("i",{staticClass:"top_close",on:{click:function(a){return t.forbidBack()}}}),t._v("\n                中奖记录\n            ")]),t._v(" "),e("div",{staticClass:"header"},[e("div",{staticClass:"my_img"},[e("img",{attrs:{src:t.userInfoData.avatar_url,alt:""}})]),t._v(" "),e("div",{staticClass:"my_info"},[e("div",{staticClass:"my_name"},[t._v(t._s(t.userInfoData.nick_name))]),t._v(" "),e("div",{staticClass:"my_money"},[t._v(t._s(t.userInfoData.score)),e("i",{staticClass:"money_icon"})])]),t._v(" "),e("div",{staticClass:"my_info_right"},[e("div",{staticClass:"get_integral",on:{click:function(a){return t.taskWall()}}},[e("i")]),t._v(" "),e("div",{staticClass:"change_in_record",on:{click:function(a){return t.exchangeRecord()}}})])])]),t._v(" "),e("div",{staticClass:"content",staticStyle:{background:"red"}},[e("div",{staticClass:"c_t"}),t._v(" "),e("div",{staticClass:"list_box"},[e("ul",[t._l(t.list,function(a,s){return e("li",{key:s},[e("img",{attrs:{src:a.icon_url,alt:""}}),t._v(" "),e("div",{staticClass:"info"},[e("div",{staticClass:"name"},[t._v(t._s(a.bonus_name))]),t._v(" "),e("div",{staticClass:"time"},[t._v(t._s(a.create_time))])]),t._v(" "),a.qrcode?e("div",{staticClass:"tal",on:{click:function(e){return t.handleTal(a,s)}}},[t._v("联系客服")]):t._e()])}),t._v(" "),0==t.list.length?e("div",{staticClass:"nodata"},[t._v("暂无数据")]):t._e()],2)])]),t._v(" "),t.wx_code?e("div",{staticClass:"mask"},[e("div",{staticClass:"mask_main_good"},[e("div",{staticClass:"box tanchuscale"},[e("img",{staticClass:"mask_wx_code",attrs:{src:t.codeImg,alt:""}}),t._v(" "),e("div",{staticClass:"exchange_show_text"},[t._v("客服微信")]),t._v(" "),e("div",{staticClass:"file_close",on:{click:function(a){t.wx_code=!1}}})])])]):t._e()])},staticRenderFns:[]};var c=e("VU/8")(i,o,!1,function(t){e("LsT3")},"data-v-28258702",null);a.default=c.exports},LsT3:function(t,a){}});