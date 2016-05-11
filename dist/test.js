"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}();!function t(e,r,a){function n(i,s){if(!r[i]){if(!e[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=r[i]={exports:{}};e[i][0].call(d.exports,function(t){var r=e[i][1][t];return n(r?r:t)},d,d.exports,t,e,r,a)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<a.length;i++)n(a[i]);return n}({1:[function(t,e,r){e.exports=function(){var e=t("./modules/data-attr"),r=t("./modules/share-api");return e(),r()}()},{"./modules/data-attr":4,"./modules/share-api":7}],2:[function(t,e,r){e.exports={facebook:function(t){return{type:"get",url:"//graph.facebook.com/?id="+t,transform:function(t){var e=JSON.parse(t.responseText).shares;return this.storeSet(this.type,e),e}}},pinterest:function(t){return{type:"jsonp",url:"//api.pinterest.com/v1/urls/count.json?callback=?&url="+t,transform:function(t){var e=t.count;return this.storeSet(this.type,e),e}}},linkedin:function(t){return{type:"jsonp",url:"//www.linkedin.com/countserv/count/share?url="+t+"&format=jsonp&callback=?",transform:function(t){var e=t.count;return this.storeSet(this.type,e),e}}},reddit:function(t){return{type:"get",url:"//www.reddit.com/api/info.json?url="+t,transform:function(t){var e=JSON.parse(t.responseText).data.children,r=0;return e.forEach(function(t){r+=Number(t.data.ups)}),this.storeSet(this.type,r),r}}},google:function(t){return{type:"post",data:{method:"pos.plusones.get",id:"p",params:{nolog:!0,id:t,source:"widget",userId:"@viewer",groupId:"@self"},jsonrpc:"2.0",key:"p",apiVersion:"v1"},url:"https://clients6.google.com/rpc",transform:function(t){var e=JSON.parse(t.responseText).result.metadata.globalCounts.count;return this.storeSet(this.type,e),e}}}}},{}],3:[function(t,e,r){var a=t("./count-transforms"),n=t("./events");e.exports=function(){function t(e,r){var n=this;if(_classCallCheck(this,t),!r)throw new Error("Open Share: no url provided for count");if(e.indexOf(",")>-1)this.type=e,this.typeArr=this.type.split(","),this.countData=[],this.typeArr.forEach(function(t){if(!a[t])throw new Error("Open Share: "+e+" is an invalid count type");n.countData.push(a[t](r))});else{if(!a[e])throw new Error("Open Share: "+e+" is an invalid count type");this.type=e,this.countData=a[e](r)}}return _createClass(t,[{key:"count",value:function(t){this.os=t,this.url=this.os.getAttribute("data-open-share-count"),Array.isArray(this.countData)?this.getCounts():this.getCount()}},{key:"getCount",value:function(){var t=this.storeGet(this.type);t&&(this.os.innerHTML=t),this[this.countData.type](this.countData),n.trigger(this.os,"counted-"+this.url)}},{key:"getCounts",value:function(){var t=this;this.total=[];var e=this.storeGet(this.type);e&&(this.os.innerHTML=e),this.countData.forEach(function(e){t[e.type](e,function(e){if(t.total.push(e),t.total.length===t.typeArr.length){var r=0;t.total.forEach(function(t){r+=t}),t.storeSet(t.type,r),t.os.innerHTML=r,n.trigger(t.os,"counted-"+t.url)}})}),this.os.innerHTML=this.total}},{key:"jsonp",value:function(t,e){var r=this,a="jsonp_"+Math.random().toString().substr(-10);window[a]=function(a){var n=t.transform.apply(r,[a])||0;e&&"function"==typeof e?e(n):r.os.innerHTML=n};var n=document.createElement("script");n.src=t.url.replace("callback=?","callback="+a),document.getElementsByTagName("head")[0].appendChild(n)}},{key:"get",value:function(t,e){var r=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE&&200===a.status){var n=t.transform.apply(r,[a])||0;e&&"function"==typeof e?e(n):r.os.innerHTML=n}},a.open("GET",t.url),a.send()}},{key:"post",value:function(t,e){var r=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE&&200===a.status){var n=t.transform.apply(r,[a])||0;e&&"function"==typeof e?e(n):r.os.innerHTML=n}},a.open("POST",t.url),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a.send(JSON.stringify(t.data))}},{key:"storeSet",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?0:arguments[1];window.localStorage&&t&&localStorage.setItem("OpenShare-"+t,e)}},{key:"storeGet",value:function(t){return window.localStorage&&t?localStorage.getItem("OpenShare-"+t):void 0}}]),t}()},{"./count-transforms":2,"./events":5}],4:[function(t,e,r){var a=t("./open-share"),n=t("./count"),o=t("./share-transforms"),i=t("./events");e.exports=function(){function t(){e(),void 0!==window.MutationObserver&&u(document.querySelectorAll("[data-open-share-watch]"))}function e(){var t=arguments.length<=0||void 0===arguments[0]?document:arguments[0],e=t.querySelectorAll("[data-open-share]:not([data-open-share-node])");[].forEach.call(e,s);var a=t.querySelectorAll("[data-open-share-count]:not([data-open-share-node])");[].forEach.call(a,r),i.trigger(document,"loaded")}function r(t){var e=t.getAttribute("data-open-share-count"),r=new n(e,t.getAttribute("data-open-share-count-url"));r.count(t),t.setAttribute("data-open-share-node",e)}function s(t){var e=t.getAttribute("data-open-share"),r=e.indexOf("-"),n=void 0;if(r>-1){var i=e.substr(r+1,1),s=e.substr(r,2);e=e.replace(s,i.toUpperCase())}var u=o[e];if(!u)throw new Error("Open Share: "+e+" is an invalid type");n=new a(e,u),t.getAttribute("data-open-share-dynamic")&&(n.dynamic=!0),d(n,t),t.addEventListener("click",function(e){c(e,t,n)}),t.addEventListener("OpenShare.trigger",function(e){c(e,t,n)}),t.setAttribute("data-open-share-node",e)}function u(t){[].forEach.call(t,function(t){var r=new MutationObserver(function(t){e(t[0].target)});r.observe(t,{childList:!0})})}function c(t,e,r){r.dynamic&&d(r,e),r.share(t),i.trigger(e,"shared")}function d(t,e){t.setData({url:e.getAttribute("data-open-share-url"),text:e.getAttribute("data-open-share-text"),via:e.getAttribute("data-open-share-via"),hashtags:e.getAttribute("data-open-share-hashtags"),tweetId:e.getAttribute("data-open-share-tweet-id"),related:e.getAttribute("data-open-share-related"),screenName:e.getAttribute("data-open-share-screen-name"),userId:e.getAttribute("data-open-share-user-id"),link:e.getAttribute("data-open-share-link"),picture:e.getAttribute("data-open-share-picture"),caption:e.getAttribute("data-open-share-caption"),description:e.getAttribute("data-open-share-description"),user:e.getAttribute("data-open-share-user"),video:e.getAttribute("data-open-share-video"),username:e.getAttribute("data-open-share-username"),title:e.getAttribute("data-open-share-title"),media:e.getAttribute("data-open-share-media"),to:e.getAttribute("data-open-share-to"),subject:e.getAttribute("data-open-share-subject"),body:e.getAttribute("data-open-share-body"),ios:e.getAttribute("data-open-share-ios")})}document.addEventListener("OpenShare.load",t),document.addEventListener("DOMContentLoaded",t)}},{"./count":3,"./events":5,"./open-share":6,"./share-transforms":8}],5:[function(t,e,r){e.exports={trigger:function(t,e){var r=document.createEvent("Event");r.initEvent("OpenShare."+e,!0,!0),t.dispatchEvent(r)}}},{}],6:[function(t,e,r){e.exports=function(){function t(e,r){_classCallCheck(this,t),this.ios=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,this.type=e,this.dynamic=!1,this.transform=r,this.typeCaps=e.charAt(0).toUpperCase()+e.slice(1)}return _createClass(t,[{key:"setData",value:function(t){if(this.ios){var e=this.transform(t,!0);this.mobileShareUrl=this.template(e.url,e.data)}var r=this.transform(t);this.shareUrl=this.template(r.url,r.data)}},{key:"share",value:function(t){var e=this;if(this.mobileShareUrl){var r=(new Date).valueOf();setTimeout(function(){var t=(new Date).valueOf();t-r>1600||(window.location=e.shareUrl)},1500),window.location=this.mobileShareUrl}else"email"===this.type?window.location=this.shareUrl:window.open(this.shareUrl,"OpenShare")}},{key:"template",value:function(t,e){var r=t,a=void 0;for(a in e)e[a]&&(e[a]=encodeURIComponent(e[a]),r+=a+"="+e[a]+"&");return r.substr(0,r.length-1)}}]),t}()},{}],7:[function(t,e,r){var a=t("./open-share"),n=t("./share-transforms"),o=t("./events");e.exports=function(){var t=function(){function t(e,r){var o=this;_classCallCheck(this,t),this.element=e,this.data=r,this.os=new a(r.type,n[r.type]),this.os.setData(r),this.data.bindClick&&this.element.addEventListener("click",function(t){o.share()})}return _createClass(t,[{key:"share",value:function(t){this.data.dynamic&&this.os.setData(data),this.os.share(t),o.trigger(this.element,"shared")}}]),t}();return t}},{"./events":5,"./open-share":6,"./share-transforms":8}],8:[function(t,e,r){e.exports={twitter:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];if(e&&t.ios){var r="";if(t.text&&(r+=t.text),t.url&&(r+=" - "+t.url),t.hashtags){var a=t.hashtags.split(",");a.forEach(function(t){r+=" #"+t})}return t.via&&(r+=" via "+t.via),{url:"twitter://post?",data:{message:r}}}return{url:"https://twitter.com/share?",data:t}},twitterRetweet:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"twitter://status?",data:{id:t.tweetId}}:{url:"https://twitter.com/intent/retweet?",data:{tweet_id:t.tweetId,related:t.related}}},twitterLike:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"twitter://status?",data:{id:t.tweetId}}:{url:"https://twitter.com/intent/favorite?",data:{tweet_id:t.tweetId,related:t.related}}},twitterFollow:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];if(e&&t.ios){var r=t.screenName?{screen_name:t.screenName}:{id:t.userId};return{url:"twitter://user?",data:r}}return{url:"https://twitter.com/intent/user?",data:{screen_name:t.screenName,user_id:t.userId}}},facebook:function(t){return{url:"https://www.facebook.com/dialog/feed?app_id=961342543922322&redirect_uri=http://facebook.com&",data:t}},facebookSend:function(t){return{url:"https://www.facebook.com/dialog/send?app_id=961342543922322&redirect_uri=http://facebook.com&",data:t}},youtube:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"youtube:"+t.video+"?"}:{url:"https://www.youtube.com/watch?v="+t.video+"?"}},youtubeSubscribe:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"youtube://www.youtube.com/user/"+t.user+"?"}:{url:"https://www.youtube.com/user/"+t.user+"?"}},instagram:function(t){return{url:"instagram://camera?"}},instagramFollow:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"instagram://user?",data:t}:{url:"http://www.instagram.com/"+t.username+"?"}},snapchat:function(t){return{url:"snapchat://add/"+t.username+"?"}},google:function(t){return{url:"https://plus.google.com/share?",data:t}},pinterest:function(t){return{url:"https://pinterest.com/pin/create/bookmarklet/?",data:t}},linkedin:function(t){return{url:"http://www.linkedin.com/shareArticle?",data:t}},buffer:function(t){return{url:"http://bufferapp.com/add?",data:t}},tumblr:function(t){return{url:"https://www.tumblr.com/widgets/share/tool?",data:t}},reddit:function(t){return{url:"http://reddit.com/submit?",data:t}},flickr:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e&&t.ios?{url:"flickr://photos/"+t.username+"?"}:{url:"http://www.flickr.com/photos/"+t.username+"?"}},whatsapp:function(t){return{url:"whatsapp://send?",data:t}},sms:function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return{url:e?"sms:&":"sms:?",data:t}},email:function(t){var e="mailto:";return null!==t.to&&(e+=""+t.to),e+="?",{url:e,data:{subject:t.subject,body:t.body}}}}},{}],9:[function(t,e,r){function a(t){var e=document.createElement("a");return e.classList.add("open-share-link","twitter"),e.setAttribute("data-open-share","twitter"),e.setAttribute("data-open-share-url",t.url),e.setAttribute("data-open-share-via",t.via),e.setAttribute("data-open-share-text",t.text),e.setAttribute("data-open-share-hashtags",t.hashtags),e.innerHTML='<span class="fa fa-twitter"></span>'+t.button,e}function n(){var t=i;t.button="Open Share Watcher!",document.querySelector(".open-share-watch").appendChild(a(t))}var o=t("./index"),i={url:"http://www.digitalsurgeons.com",via:"digitalsurgeons",text:"Forward Obsessed",hashtags:"forwardobsessed"};window.addNode=n,document.addEventListener("DOMContentLoaded",function(){var t=i;t.button="Dynamic Open Share!",document.querySelector(".open-share-nodes").appendChild(a(i));var e=document.createEvent("Event");e.initEvent("OpenShare.load",!0,!0),document.dispatchEvent(e)}),document.addEventListener("OpenShare.loaded",function(){console.log("Open Share loaded"),[].forEach.call(document.querySelectorAll("[data-open-share]"),function(t){t.addEventListener("OpenShare.shared",function(t){console.log("Open Share Shared",t)})});({twitter:new o(document.querySelector('[data-api-example="twitter"]'),{type:"twitter",bindClick:!0,url:"http://digitalsurgeons.com",via:"digitalsurgeons",text:"Digital Surgeons",hashtags:"forwardobsessed"}),facebook:new o(document.querySelector('[data-api-example="facebook"]'),{type:"facebook",bindClick:!0,link:"http://digitalsurgeons.com",picture:"http://www.digitalsurgeons.com/img/about/bg_office_team.jpg",caption:"Digital Surgeons",description:"forwardobsessed"}),pinterest:new o(document.querySelector('[data-api-example="pinterest"]'),{type:"pinterest",bindClick:!0,url:"http://digitalsurgeons.com",media:"http://www.digitalsurgeons.com/img/about/bg_office_team.jpg",description:"Digital Surgeons"}),email:new o(document.querySelector('[data-api-example="email"]'),{type:"email",bindClick:!0,to:"techroom@digitalsurgeons.com",subject:"Digital Surgeons",body:"Forward Obsessed"})})});var s=["facebook","google","linkedin","reddit","pinterest",["google","linkedin","reddit","pinterest"]];s.forEach(function(t){Array.isArray(t)&&(t=t.join(","));var e=document.querySelector('[data-open-share-count="'+t+'"]');e.addEventListener("OpenShare.counted-"+t,function(){var r=e.innerHTML;console.log(t,"shares: ",r)})})},{"./index":1}]},{},[9]);