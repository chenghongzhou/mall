webpackJsonp([11],{EOEk:function(e,t){},KzBG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("mvHQ"),i=a.n(o),n=a("P9l9"),s={data:function(){return{userInfoData:{},list:[],perv:"",storeId:"",openid:""}},methods:{goRead:function(e){console.log(this.userInfoData),this.getPrize(e)},goReaded:function(e){window.location.href=e.read_set.article_url},getPrize:function(e){var t=this.openid,a={store_id:this.storeId,open_id:t,data:{id:e.read_set.id}};this.$axios.post(n.a+"/mission/finish_read",a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){0==t.data.error_code?window.location.href=e.read_set.article_url:config.layerMsg(t.data.msg,2)}).catch(function(){console.log("error")})},getUserInfoMy:function(){var e=this,t={open_id:e.openid,store_id:e.storeId,data:{avatar_url:e.userInfoData.avatar_url,nick_name:e.userInfoData.nick_name}};e.$axios.post(n.a+"/c_account/get_user_info",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){0==t.data.error_code?(e.userInfoData=t.data.user_data,config.setCookie("userInfoData",i()(e.userInfoData),7)):config.layerMsg(t.data.msg,2)}).catch(function(){console.log("error")})},getData:function(){var e=this;e.$loading.show();var t={store_id:e.storeId,open_id:e.openid};e.$axios.post(n.a+"/mission/get_read_sets",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){0==t.data.error_code?e.list=t.data.data:config.layerMsg(t.data.msg,2),e.$loading.close()}).catch(function(){e.$loading.close(),console.log("error")})},handleRecord:function(){var e={storeId:this.storeId,openId:this.openid,webPage:"read_index"};this.$axios.post("http://v8track.youwoxing.net/track/pv",e,{headers:{"Content-Type":"application/json"}}).then(function(e){}).catch(function(){console.log("error")})},exchangeRecord:function(){var e=config.getHashVReq("ishome");this.$router.replace({path:"/exchangeRecord?recordPage=read&ishome="+e})},taskWall:function(){var e=config.getHashVReq("ishome");this.$router.replace({path:"/taskWall?recordPage=read&ishome="+e})},forbidBack:function(){localStorage.getItem("backName");var e=config.getHashVReq("recordPage"),t=config.getHashVReq("ishome");t&&1==t?"index"!=e&&e&&1!=t?this.$router.replace({path:"/"+e}):this.$router.replace({path:"/"}):1==config.thirdParty().isWechat?WeixinJSBridge.call("closeWindow"):(window.opener=null,window.open("","_self"),window.location.href="about:blank",window.close())},isLg:function(){var e=config.getHashVReq("appid"),t=config.getCookie("userInfoData"),a=config.getHashVReq("storeId"),o=config.getCookie("userInfo");e&&("-1"==e.indexOf("#/")?this.appid=e:this.appid=e.substring(0,e.length-2)),t&&(this.userInfoData=JSON.parse(t)),a?o?(this.storeId=Number(JSON.parse(o).storeId),this.storeId!=a&&window.location.replace("http://v8homepage.youwoxing.net/?position=read&appid="+this.appid)):window.location.replace("http://v8homepage.youwoxing.net/?position=read&appid="+this.appid):o&&(this.storeId=Number(JSON.parse(o).storeId));var i=config.getCookie("openid");i&&(this.openid=JSON.parse(i).open_id)}},destroyed:function(){window.removeEventListener("popstate",this.forbidBack,!1)},mounted:function(){var e=this;e.isLg(),config.isGoBack(e.forbidBack),e.$nextTick(function(){e.getData(),e.getUserInfoMy(),e.handleRecord()})}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[a("div",{staticClass:"header_part"},[a("div",{staticClass:"top"},[a("i",{staticClass:"top_close",on:{click:function(t){return e.forbidBack()}}}),e._v("\n            阅读有礼\n        ")]),e._v(" "),a("div",{staticClass:"header"},[a("div",{staticClass:"my_img"},[a("img",{attrs:{src:e.userInfoData.avatar_url,alt:""}})]),e._v(" "),a("div",{staticClass:"my_info"},[a("div",{staticClass:"my_name"},[e._v(e._s(e.userInfoData.nick_name))]),e._v(" "),a("div",{staticClass:"my_money"},[e._v(e._s(e.userInfoData.score)),a("i",{staticClass:"money_icon"})])]),e._v(" "),a("div",{staticClass:"my_info_right"},[a("div",{staticClass:"get_integral",on:{click:function(t){return e.taskWall()}}},[a("i")]),e._v(" "),a("div",{staticClass:"change_in_record",on:{click:function(t){return e.exchangeRecord()}}})])])]),e._v(" "),a("div",{staticClass:"content"},[a("ul",e._l(e.list,function(t,o){return a("li",{key:o},[a("img",{staticClass:"read_img",attrs:{src:t.read_set.icon,alt:""}}),e._v(" "),a("div",{staticClass:"reading"},[a("div",{staticClass:"reading_content"},[e._v(e._s(t.read_set.title))])]),e._v(" "),a("div",{staticClass:"reading_time"},[e._v("+"+e._s(t.read_set.score_num)+"积分")]),e._v(" "),0==t.progress?a("div",{staticClass:"go_read",on:{click:function(a){return e.goRead(t)}}},[e._v("去阅读")]):e._e(),e._v(" "),1==t.progress?a("div",{staticClass:"go_readed",on:{click:function(a){return e.goReaded(t)}}},[e._v("已阅读")]):e._e()])}),0)]),e._v(" "),a("span",{ref:"perv"},[e._v(e._s(e.perv))]),e._v(" "),a("footer-view")],1)},staticRenderFns:[]};var c=a("VU/8")(s,r,!1,function(e){a("EOEk")},"data-v-503940bd",null);t.default=c.exports}});