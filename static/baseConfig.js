/**
 * base.js为公共的配置文件
 * 1、自动监听调用的rem布局
 * 2、接口的配置路径
 * 3、公共调用的方法
 */ 
/*!
 弹窗的小插件
 将css的地址改为我们线上的地址'https://manage.dianliaoapp.com/client/dev/h5_activity/common/css/layer.css';
 */
!function(e){"use strict";var t=document,n="querySelectorAll",i="getElementsByClassName",a=function(e){return t[n](e)},s={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},l={extend:function(e){var t=JSON.parse(JSON.stringify(s));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};l.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var r=0,o=["layui-m-layer"],c=function(e){var t=this;t.config=l.extend(e),t.view()};c.prototype.view=function(){var e=this,n=e.config,s=t.createElement("div");e.id=s.id=o[0]+r,s.setAttribute("class",o[0]+" "+o[0]+(n.type||0)),s.setAttribute("index",r);var l=function(){var e="object"==typeof n.title;return n.title?'<h3 style="'+(e?n.title[1]:"")+'">'+(e?n.title[0]:n.title)+"</h3>":""}(),c=function(){"string"==typeof n.btn&&(n.btn=[n.btn]);var e,t=(n.btn||[]).length;return 0!==t&&n.btn?(e='<span yes type="1">'+n.btn[0]+"</span>",2===t&&(e='<span no type="0">'+n.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(n.fixed||(n.top=n.hasOwnProperty("top")?n.top:100,n.style=n.style||"",n.style+=" top:"+(t.body.scrollTop+n.top)+"px"),2===n.type&&(n.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(n.content||"")+"</p>"),n.skin&&(n.anim="up"),"msg"===n.skin&&(n.shade=!1),s.innerHTML=(n.shade?"<div "+("string"==typeof n.shade?'style="'+n.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(n.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(n.skin?"layui-m-layer-"+n.skin+" ":"")+(n.className?n.className:"")+" "+(n.anim?"layui-m-anim-"+n.anim:"")+'" '+(n.style?'style="'+n.style+'"':"")+">"+l+'<div class="layui-m-layercont">'+n.content+"</div>"+c+"</div></div></div>",!n.type||2===n.type){var d=t[i](o[0]+n.type),y=d.length;y>=1&&layer.close(d[0].getAttribute("index"))}document.body.appendChild(s);var u=e.elem=a("#"+e.id)[0];n.success&&n.success(u),e.index=r++,e.action(n,u)},c.prototype.action=function(e,t){var n=this;e.time&&(l.timer[n.index]=setTimeout(function(){layer.close(n.index)},1e3*e.time));var a=function(){var t=this.getAttribute("type");0==t?(e.no&&e.no(),layer.close(n.index)):e.yes?e.yes(n.index):layer.close(n.index)};if(e.btn)for(var s=t[i]("layui-m-layerbtn")[0].children,r=s.length,o=0;o<r;o++)l.touch(s[o],a);if(e.shade&&e.shadeClose){var c=t[i]("layui-m-layershade")[0];l.touch(c,function(){layer.close(n.index,e.end)})}e.end&&(l.end[n.index]=e.end)},e.layer={v:"2.0",index:r,open:function(e){var t=new c(e||{});return t.index},close:function(e){var n=a("#"+o[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(l.timer[e]),delete l.timer[e],"function"==typeof l.end[e]&&l.end[e](),delete l.end[e])},closeAll:function(){for(var e=t[i](o[0]),n=0,a=e.length;n<a;n++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,n=e[e.length-1],i=n.src;i.substring(0,i.lastIndexOf("/")+1);n.getAttribute("merge")||document.head.appendChild(function(){var e=t.createElement("link");return e.href="https://manage.dianliaoapp.com/client/dev/h5_activity/common/css/layer.css",e.type="text/css",e.rel="styleSheet",e.id="layermcss",e}())}()}(window);
//进行rem布局的自适应过程,默认设置的设计图纸为750
var calculatSeize = function () {
	var BASE_FONT_SIZE = 100;
	var roat =1;
	var wraps = document.getElementById('wrap_total');
	var docEl = document.documentElement,
	    clientWidth = docEl.clientWidth;
		clientHeight = docEl.clientHeight;
    var getUrl = window.location.href;
	if (!clientWidth) return;
    var html_font_size = 0;
    html_font_size = BASE_FONT_SIZE * ((clientWidth*roat) / 750);
	docEl.style.fontSize = html_font_size + 'px';
	// 如果只是在相应的-0.01~0.01之间的小数值，直接进行return掉
	if (html_font_size-parseFloat(getComputedStyle(docEl).fontSize)<0.01 && html_font_size-parseFloat(getComputedStyle(docEl).fontSize)>-0.01) {
		// 计算准确直接跳出
		return;
	} 
	// 在曲面屏手机存在着rem计算不准的问题
	else {
		var again_html_font_size = html_font_size/(parseInt(getComputedStyle(docEl).fontSize)/html_font_size);
		docEl.style.fontSize = again_html_font_size + 'px';
	}
};
if (document.addEventListener) {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, calculatSeize, false);
    document.addEventListener('DOMContentLoaded', calculatSeize, false);
    calculatSeize();
}
var config = {
	khserver: "http://ybklocker.dev.uboxol.com",
	tipMsgTime: null,//旧版本的提示
	/*
		layerMsg弹窗的提示的信息不做处理
		layerLoadOpe加载层的显示效果进行实际的控制，只打开一个加载层，在进行新的加载的时候，进行+1操作；
		layerLoadClose关闭加载层，对larerCount的数量进行-1操作。
	*/ 
	layerLoadIndex: null,//新版本的加载中
	larerCount: 0,//加载中的打开次数
	// 弹窗的提示
	layerMsg : function (content, second) {
		layer.open({
			content: content,
			skin: 'msg',
			time: second, //second秒后自动关闭
		});
	},
	//操作弹出框设置(弹出窗的内容，左按钮，右按钮，回调函数的调用)
	layerShowBtn : function (content, btnHideName, btnSureName, callBack) {
		layer.open({
			content: content,
			btn: [btnSureName, btnHideName],
			yes: function(index){
				// 回调函数的调用
			  	callBack();
			  	layer.close(index); // 关闭这个指定的弹出层
			}
		});
	},
	// 加载中层的打开
	layerLoadOpen : function () {
		if(config.larerCount==0) {
			config.layerLoadIndex = layer.open({type: 2});
			config.larerCount = 1;
		} else {
			config.larerCount = config.larerCount-0+1;
		}
	},
	// 加载中层的关闭
	layerLoadClose : function () {
		config.larerCount = config.larerCount-1;
		if(config.larerCount==0) {
			// 调用了所有的清空的加载层，进行实际的清楚掉显示加载层
			layer.close(config.layerLoadIndex);
		} else {
			console.log('只是清除掉了一个加载层');
		}
	},
	// 关闭掉所有的layer的层
	layerAllClose : function () {
		layer.closeAll();
	},
	// 设置cookie
	setCookie(name, value, expireDay) {
		expireDay = expireDay || 1;
		var exp = new Date();
	    exp.setTime(exp.getTime() + this.cookieExpire*24*60*60*1000);
	    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString() + "; path=/";
	},
	// 获得cookie
	getCookie(cookie_name) {
		if (document.cookie.length>0) {
			var c_start = document.cookie.indexOf(cookie_name + "=");
			var c_end;
			if (c_start != -1) {
				c_start = c_start + cookie_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return decodeURIComponent(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	// 设置本地存储key, value, type--(true->localStorage, false->sessionStorage)
	setStorage : function (key, value, type) {
		if (typeof(key)!='string'&&typeof(value)!='string') {
			alert('存储必须是字符串');
		}
		if (type) {
			localStorage.setItem(key,value);
		}else {
			sessionStorage.setItem(key,value);
		}
	},
	// 取出本地存储key, type--(true->localStorage, false->sessionStorage)
	getStorage : function (key, type) {
		if (type) {
			return localStorage.getItem(key);
		}else {
			return sessionStorage.getItem(key);
		}
	},
	/*
		原生js信息弹窗提示框:tipMsg->正常的信息提示框
		text-信息提示框的文本
		callback-信息提示完毕的回调函数
		showtime-信息提示显示时间，easeintime-设置动画进入的时间，easeouttime-设置动画离开的时间
	*/ 
	tipMsg : function (text, callback, showtime, easeintime, easeouttime) {
		if (config.tipMsgTime!=null) {
			document.getElementById("tipMsg").style.opacity = "0";
			document.getElementById("tipMsg").style.zIndex = "-9999";
			document.getElementById("tipMsg").style.transition = "opacity "+(easeouttime/1000)+"s ease";
			document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeouttime/1000)+"s ease";
			clearTimeout(config.tipMsgTime);
			config.tipMsgTime=null;
		}else{
			// 不进行处理
		}
		showtime = showtime || 1500;
		easeintime = easeintime || 1500;
		easeouttime = easeouttime || 1200;
		document.getElementById("tipMsg").innerHTML = text;
		document.getElementById("tipMsg").style.opacity = "1";
		document.getElementById("tipMsg").style.display = "block";
		document.getElementById("tipMsg").style.zIndex = "999";
		document.getElementById("tipMsg").style.transition = "opacity "+(easeintime/1000)+"s ease";
		document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeintime/1000)+"s ease";
		config.tipMsgTime = setTimeout(function () {
			document.getElementById("tipMsg").style.opacity = "0";
			document.getElementById("tipMsg").style.zIndex = "-9999";
			document.getElementById("tipMsg").style.transition = "opacity "+(easeouttime/1000)+"s ease";
			document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeouttime/1000)+"s ease";
			if (callback && typeof callback == "function") {
				callback();
			}
		}, showtime);
	},
	// 获取链接地址后面的参数情况，传入key得value
	getReq : function (name) {
		var url = location.search;
		url = url.replace(/amp;/g,"");
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				this[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
			return this[name];
	   }
	   return null;
	},
	// 获取链接地址后面的参数情况，传入key得value
	getHashReq : function (name) {
		var url = window.location.href;
		if (url.indexOf("?") != -1) {
			url = location.href.substring(location.href.indexOf('?'),location.href.length);
			url = url.replace(/amp;/g,"");
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				this[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
			return this[name];
	   }
	   return null;
	},
	// 获取链接地址后面的参数情况，传入key得value ?&
	getHashVReq : function (name) {
		var url = decodeURIComponent(window.location.href);
		if (url.indexOf("?") != -1) {
		//	url = location.href.substring(location.href.indexOf('?'),location.href.length);
			url = url.replace(/amp;/g,"");
			var str = url.substr(1);
			strs = str.split("?");
			for(var i = 0; i < strs.length; i++) {
				if(strs[i].indexOf('&') != -1){
					var strA = strs[i].split('&');
					for(var j=0;j<strA.length;j++){
						this[strA[j].split("=")[0]] = decodeURI(strA[j].split("=")[1]);
					}
				}else{
					this[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
				}
				
			}
			return this[name];
	   }
	   return null;
	},
	/*
		自运行函数，进行终端版本判断
		页面中直接使用(config.appVersion.ios==true)
		config.appVersion = { ios: true, android: false }
	*/ 
	appVersion : (function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        };
	   })(),
	/*
		判断第三方平台
		config.thirdParty().isWechat == true
		config.thirdParty() = {isWechat: true, isQQ: false, isWeibo: false, isSafari: false}
	*/ 
	thirdParty : function () {
		 var ua = navigator.userAgent.toLowerCase();
		 return {
		 	isWechat: ua.match(/MicroMessenger/i) == "micromessenger", //在微信中打开
		 	isQQ: ua.match(/QQ/i) == "qq", //在QQ空间打开
		 	isWeibo: ua.match(/WeiBo/i) == "weibo",
		 	isSafari: ua.indexOf('safari') >0
		 };
	},
	/*
		获取间隔前的时间
		startDate->传入目前的日期(new Date()格式的日期形式),days->间隔的时间
		得到对象beforeTime->之前的时间,currentlyTime->目前的时间
	*/ 
	getDateInterval : function (startDate, days) {
		var start;
		var end;
		if (startDate instanceof Date) {
			var yearStartDate = startDate.getFullYear();
			var monthStartDate = startDate.getMonth()+1;
			var dayStartDate = startDate.getDate();
			monthStartDate = monthStartDate>9 ? monthStartDate : "0"+monthStartDate;
			dayStartDate = dayStartDate>9 ? dayStartDate : "0"+dayStartDate;
			start = startDate.getFullYear() + "-" + (monthStartDate) + "-" + dayStartDate;
			var startAfterDays = startDate.setDate(startDate.getDate() - days);
			startAfterDays = new Date(startAfterDays);
			var yearEndDate = startAfterDays.getFullYear();
			var monthEndDate = startAfterDays.getMonth()+1;
			var dayEndDate = startAfterDays.getDate();
			monthEndDate = monthEndDate>9 ? monthEndDate : "0"+monthEndDate;
			dayEndDate = dayEndDate>9 ? dayEndDate : "0"+dayEndDate;
			end = startAfterDays.getFullYear() + "-" + (monthEndDate) + "-" + dayEndDate;
		}
		return {
			beforeTime: end,
			currentlyTime: start 
		};
	},
	/*
		传入时间获取到时分秒(对应十位、个位)
		timeSeconds->传入时间单位为秒
		hourTen->小时的十位，hourBit->小时的个位...
	*/ 
	changeHourMinSecond : function (timeSeconds) {
		var hour = parseInt(timeSeconds/3600);
		var minter = parseInt(timeSeconds/60%60);
		var second = parseInt(timeSeconds%60);
		//对时、分、秒位数位数少于十位进行处理
		hour = hour>9 ? hour : "0"+hour;
		minter = minter>9 ? minter : "0"+minter;
		second = second>9 ? second : "0"+second;
		var one = (hour+"").substring(0,1);
		var two = (hour+"").substring(1,2);
		var three = (minter+"").substring(0,1);
		var four = (minter+"").substring(1,2);
		var five = (second+"").substring(0,1);
		var six = (second+"").substring(1,2);
		return {
			hourTen: one,
			hourBit: two,
			minterTen: three,
			minterBit: four,
			secondTen: five,
			secondBit: six
		};
	},
};
	