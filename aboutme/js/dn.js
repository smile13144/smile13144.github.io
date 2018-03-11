/*! Copyright 2013 Baidu Inc. All RightsReserved. */;(function(){var baidu=(function(){var T,baidu=T=baidu||{version:"1.5.2"};baidu.guid="$BAIDU$";baidu.$$=window[baidu.guid]=window[baidu.guid]||{global:{}};baidu.dom=baidu.dom||{};baidu.dom.g=function(a){if(!a){return null}if("string"==typeof a||a instanceof String){return document.getElementById(a)}else{if(a.nodeName&&(a.nodeType==1||a.nodeType==9)){return a}}return null};baidu.g=baidu.G=baidu.dom.g;baidu.dom._styleFixer=baidu.dom._styleFixer||{};baidu.dom._styleFilter=baidu.dom._styleFilter||[];baidu.dom._styleFilter.filter=function(b,e,f){for(var a=0,d=baidu.dom._styleFilter,c;c=d[a];a++){if(c=c[f]){e=c(b,e)}}return e};baidu.string=baidu.string||{};baidu.string.toCamelCase=function(a){if(a.indexOf("-")<0&&a.indexOf("_")<0){return a}return a.replace(/[-_][^-_]/g,function(b){return b.charAt(1).toUpperCase()})};baidu.dom.setStyle=function(c,b,d){var e=baidu.dom,a;
c=e.g(c);b=baidu.string.toCamelCase(b);if(a=e._styleFilter){d=a.filter(b,d,"set")}a=e._styleFixer[b];(a&&a.set)?a.set(c,d):(c.style[a||b]=d);return c};baidu.setStyle=baidu.dom.setStyle;baidu.dom.setStyles=function(b,c){b=baidu.dom.g(b);for(var a in c){baidu.dom.setStyle(b,a,c[a])}return b};baidu.setStyles=baidu.dom.setStyles;baidu.browser=baidu.browser||{};(function(){var a=navigator.userAgent;baidu.browser.safari=/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a)&&!/chrome/i.test(a)?+(RegExp["\x241"]||RegExp["\x242"]):undefined})();baidu.browser.ie=baidu.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?(document.documentMode||+RegExp["\x241"]):undefined;baidu.browser.opera=/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent)?+(RegExp["\x246"]||RegExp["\x242"]):undefined;
(function(){var a=baidu.dom.ready=function(){var g=false,f=[],c;if(document.addEventListener){c=function(){document.removeEventListener("DOMContentLoaded",c,false);d()}}else{if(document.attachEvent){c=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",c);d()}}}}function d(){if(!d.isReady){d.isReady=true;for(var k=0,h=f.length;k<h;k++){f[k]()}}}function b(){try{document.documentElement.doScroll("left")}catch(h){setTimeout(b,1);return}d()}function e(){if(g){return}g=true;if(document.readyState==="complete"){d.isReady=true}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",c,false);window.addEventListener("load",d,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",c);window.attachEvent("onload",d);var h=false;
try{h=window.frameElement==null}catch(i){}if(document.documentElement.doScroll&&h){b()}}}}}e();return function(h){d.isReady?h():f.push(h)}}();a.isReady=false})();baidu.event=baidu.event||{};baidu.event._listeners=baidu.event._listeners||[];baidu.lang=baidu.lang||{};baidu.lang.isString=function(a){return"[object String]"==Object.prototype.toString.call(a)};baidu.isString=baidu.lang.isString;baidu.dom._g=function(a){if(baidu.lang.isString(a)){return document.getElementById(a)}return a};baidu._g=baidu.dom._g;baidu.event.on=function(b,e,g){e=e.replace(/^on/i,"");b=baidu.dom._g(b);var f=function(i){g.call(b,i)},a=baidu.event._listeners,d=baidu.event._eventFilter,h,c=e;e=e.toLowerCase();if(d&&d[e]){h=d[e](b,e,f);c=h.type;f=h.listener}if(b.addEventListener){b.addEventListener(c,f,false)}else{if(b.attachEvent){b.attachEvent("on"+c,f)
}}a[a.length]=[b,e,g,f,c];return b};baidu.on=baidu.event.on;baidu.fn=baidu.fn||{};baidu.fn.bind=function(b,a){var c=arguments.length>2?[].slice.call(arguments,2):null;return function(){var e=baidu.lang.isString(b)?a[b]:b,d=(c)?c.concat([].slice.call(arguments,0)):arguments;return e.apply(a||e,d)}};baidu.browser.chrome=/chrome\/(\d+\.\d+)/i.test(navigator.userAgent)?+RegExp["\x241"]:undefined;baidu.fn.blank=function(){};baidu.dom.contains=function(a,b){var c=baidu.dom._g;a=c(a);b=c(b);return a.contains?a!=b&&a.contains(b):!!(a.compareDocumentPosition(b)&16)};baidu.dom.hide=function(a){a=baidu.dom.g(a);a.style.display="none";return a};baidu.hide=baidu.dom.hide;baidu.dom.show=function(a){a=baidu.dom.g(a);a.style.display="";return a};baidu.show=baidu.dom.show;baidu.object=baidu.object||{};baidu.extend=baidu.object.extend=function(c,a){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]
}}return c};baidu.url=baidu.url||{};baidu.string.escapeReg=function(a){return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])","g"),"\\\x241")};baidu.url.getQueryValue=function(b,c){var d=new RegExp("(^|&|\\?|#)"+baidu.string.escapeReg(c)+"=([^&#]*)(&|\x24|#)","");var a=b.match(d);if(a){return a[2]}return null};baidu.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)};baidu.lang.isFunction=function(a){return"[object Function]"==Object.prototype.toString.call(a)};baidu.lang.toArray=function(b){if(b===null||b===undefined){return[]}if(baidu.lang.isArray(b)){return b}if(typeof b.length!=="number"||typeof b==="string"||baidu.lang.isFunction(b)){return[b]}if(b.item){var a=b.length,c=new Array(a);while(a--){c[a]=b[a]}return c}return[].slice.call(b)};baidu.event.un=function(c,f,b){c=baidu.dom._g(c);
f=f.replace(/^on/i,"").toLowerCase();var i=baidu.event._listeners,d=i.length,e=!b,h,g,a;while(d--){h=i[d];if(h[1]===f&&h[0]===c&&(e||h[2]===b)){g=h[4];a=h[3];if(c.removeEventListener){c.removeEventListener(g,a,false)}else{if(c.detachEvent){c.detachEvent("on"+g,a)}}i.splice(d,1)}}return c};baidu.un=baidu.event.un;baidu.array=baidu.array||{};baidu.each=baidu.array.forEach=baidu.array.each=function(g,e,b){var d,f,c,a=g.length;if("function"==typeof e){for(c=0;c<a;c++){f=g[c];d=e.call(b||g,f,c);if(d===false){break}}}return g};baidu.dom.getDocument=function(a){a=baidu.dom.g(a);return a.nodeType==9?a:a.ownerDocument||a.document};baidu.dom.getComputedStyle=function(b,a){b=baidu.dom._g(b);var d=baidu.dom.getDocument(b),c;if(d.defaultView&&d.defaultView.getComputedStyle){c=d.defaultView.getComputedStyle(b,null);
if(c){return c[a]||c.getPropertyValue(a)}}return""};baidu.dom.getStyle=function(c,b){var e=baidu.dom;c=e.g(c);b=baidu.string.toCamelCase(b);var d=c.style[b]||(c.currentStyle?c.currentStyle[b]:"")||e.getComputedStyle(c,b);if(!d){var a=e._styleFixer[b];if(a){d=a.get?a.get(c):baidu.dom.getStyle(c,a)}}if(a=e._styleFilter){d=a.filter(b,d,"get")}return d};baidu.getStyle=baidu.dom.getStyle;baidu.event._eventFilter=baidu.event._eventFilter||{};baidu.event._eventFilter._crossElementBoundary=function(a,d){var c=d.relatedTarget,b=d.currentTarget;if(c===false||b==c||(c&&(c.prefix=="xul"||baidu.dom.contains(b,c)))){return}return a.call(b,d)};baidu.event._eventFilter.mouseenter=window.attachEvent?null:function(a,b,c){return{type:"mouseover",listener:baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary,this,c)}
};baidu.event._eventFilter.mouseleave=window.attachEvent?null:function(a,b,c){return{type:"mouseout",listener:baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary,this,c)}};; return baidu;})();var j=void 0,k=!0,l=null,m=!1,n={},ca="1",o="0",p=document,r=p.body,da="CSS1Compat"!==p.compatMode,s=da?r:p.documentElement,u=window.BAIDU_CLB_SLOTS_MAP,ea=window.BAIDU_DAN_config||{},fa=100,ha=100,v=2147483647,ia=-2147483648,ja=Object.prototype.hasOwnProperty,A=o,la="data-baidu-dan-id",B="data-baidu-dan-position-fix",ma="data-baidu-dan-player-toggle-state",na=0,oa={N:"http://pplmauth.baidu.com/cpro/auth/authorizer.php",E:"http://epplmauth.baidu.com/cpro/auth/authorizer.php"};
oa["http://cbjs.baidu.com/js/gmvl.baidu.com"]=oa.N;var C={N:"http://gmvl.baidu.com/dan/sp.html",E:"http://egmvl.baidu.com/dan/sp.html"};C["http://cbjs.baidu.com/js/gmvl.baidu.com"]=C.N;
var pa="y.js",W:Aa}},Ca={"0":"video",1:"video",2:"barrier",3:"null",4:"static",5:"static",6:"video",7:"float",8:"null",20:"video",21:"video",
22:"couplet",23:"barrier",24:"static",25:"expand",26:"null",27:"captcha"},E={"0":"video",1:"video",2:"flash",3:"image",4:"null",5:"video",6:"video",7:"flash",8:"flash",20:"video",21:"flash",22:"image",23:"media"},F=l,Da;function G(a,b,d){a.setAttribute(b,d)}var Ea=m,H=p.createElement("div"),I=p.createElement("div");H.style.position="absolute";H.style.top="200px";I.style.position="fixed";I.style.top="100px";H.appendChild(I);r.appendChild(H);
I.getBoundingClientRect&&I.getBoundingClientRect().top==H.getBoundingClientRect().top&&(F={});r.removeChild(H);(function(){var a=p.createElement("object");"classid"in a&&(Ea=k,a.setAttribute("test","test"),a.getAttribute("test")||(G=function(a,d,c){a[d]=c}))})();var Fa=p.createElement("div");Fa.innerHTML='<div style="opacity:.25;"></div>';Da="http://cbjs.baidu.com/js/0.25"==Fa.firstChild.style.opacity;function J(a){return j===a?"":encodeURIComponent(a)}
function K(a){var a=a&&a.style,b=0,d=0,c;if(F&&!da&&(c=r.style.position||(r.currentStyle?r.currentStyle.position:""),"relative"===c||"absolute"===c))b=r.offsetLeft||0,d=r.offsetTop||0;a&&(a.top="0",a.left="0");return{width:s.clientWidth,height:s.clientHeight,scrollLeft:window.pageXOffset||s.scrollLeft,scrollTop:window.pageYOffset||s.scrollTop,h:b,m:d}}
function L(a){var b=new Image,d="baidu_dan_log_"+ +new Date;window[d]=b;b.onload=b.onerror=b.onabort=function(){try{delete window[d]}catch(a){window[d]=j}b=l};a+=-1<a.indexOf("?")?"&":"?";a+=".stamp="+Math.random();b.src=a}
function Ga(){var a=p.domain;0===a.indexOf("www.")&&(a=a.substr(4));"."===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));var b=a.match(RegExp("([a-z0-9][a-z0-9\\-]*?\\.(?:com|cn|net|org|gov|info|la|cc|co|jp|us|hk|tv|me|biz|in|be|io|tk|cm|li|ru|ws|hn|fm)(?:\\.(?:cn|jp|tw|ru))?)$","i"));return b?b[0]:a}function Ha(a){a=escape(a).replace(/([*+-.\/@_])/g,function(a){return"%"+a.charCodeAt(0).toString(16)});return a.replace(/%/g,"_")}
function N(a,b){var d=b||l,c=p.createElement("script");c.charset="utf-8";c.async=k;c.src=a;if(d){var e=m;c.onload=c.onreadystatechange=function(){if(!e&&(!c.readyState||"loaded"===c.readyState||"complete"===c.readyState))e=k,d()}}var f=p.getElementsByTagName("head")[0]||p.body;f.insertBefore(c,f.firstChild)}
function Ia(){var a=window.pageXOffset||s.scrollLeft,b=window.pageYOffset||s.scrollTop,d=p.createElement("div");baidu.dom.setStyles(d,{position:"absolute",top:"0px",left:"0px"});r.appendChild(d);var c=d.getBoundingClientRect(),e={};e.top=c.top+b;e.left=c.left+a;r.removeChild(d);return e}
function Ja(a,b){var d=O(a);Ka(d);if(!d.C||!(0<(P&292))){var c=d.type;n[c]&&n[c].create&&baidu.dom.ready(function(){n[c].create(d,b);La(d)});d.V&&N(d.V);if(!d.placeholder&&b){var e=baidu.g(b);e&&e.parentNode.removeChild(e)}}}window.BAIDU_DAN_showAd=window.BAIDU_DAN_showAd||Ja;var Ma={};function Na(a){var b=a.id;1!==Ma[b]&&(Ma[b]=1,a=O(b),Oa(a),b=a.type,("video"!==b||"video"!==a.a)&&Pa(a),setTimeout(function(){Qa(a,"start")},0),n[b]&&n[b].show&&n[b].show(a))}
n.video=function(){function a(a){x=a;t&&(w=(+new Date-t)/1E3)}function b(a){L(C[a.p]+"?"+a.c+"&tm="+J(+new Date)+"&l="+w+"&m="+e+"&alp="+f+"&alr="+g+"&alrs="+h+"&alm="+q+"&allc="+z+"&alsc="+i+"&als="+y+"&tgs="+A+"&pt="+a.d)}function d(e,d){b(e);switch(d){case "start":clearInterval(c);x||(c=setInterval(function(){a(m);150<w?clearInterval(c):b(e)},5E3));break;case "stop":clearInterval(c)}}var c=0,e=0,f=0,g=0,h=0,q=0,z=0,i=0,y=0,t=0,w=0,x=m;return{create:function(a){if(!(0<na++)){var b=a.id,c=a.width,
e=a.height,d=R(b,c,e),f=S(a,d);Ra(f,b,c,e);F&&G(d,B,2);r.appendChild(f);T(d,a);baidu.dom.setStyle(f,"z-index",ia)}},show:function(a){"video"===a.type&&"video"===a.a&&(t=+new Date,d(a,"start"));a=baidu.g(U(a.id));baidu.dom.setStyle(a,"z-index",v);F&&V()},M:function(b,c,f){"video"===f.type&&"video"===f.a&&(e++,x||(a(k),d(f,"stop")))},na:function(){return w},za:function(c){x||(a(m),b(c))},Aa:function(b){x||(a(k),d(b,"stop"))},va:function(a){f++;b(a)},wa:function(a){g++;b(a)},xa:function(a){h++;b(a)},
ua:function(a){q++;b(a)},ta:function(a){z++;b(a)},sa:function(a){i++;b(a)},ya:function(a){y++;b(a)}}}();
n.barrier=function(){function a(a){d=setTimeout(function(){Aa(a)},a.ba)}function b(){d&&clearTimeout(d)}var d=0;return{create:function(a){if(!(0<na++)){var b=a.id,d=a.width,g=a.height,h=p.createElement("div"),q=R(b,d,g),z=p.createElement("div"),i=p.createElement("ins");i.id="baidu_dan_collapsed_"+b;i.style.display="block";baidu.event.on(i,"mouseover",baidu.fn.bind(Sa,i,O(b)));var y=Ta(a,"close"),t=S(a,[h,z]);baidu.browser.chrome&&(t.style.overflow="visible");z.style.display="none";h.appendChild(q);
z.appendChild(y);z.appendChild(i);baidu.dom.setStyles(t,{width:d+"px",height:g+16+"px"});W(t,b,1,0,d,g+16);baidu.dom.setStyle(t,"z-index",ia);F&&G(h,B,1);F&&G(z,B,3);r.appendChild(t);T(q,a);b={src:a.ha,width:fa,height:ha};a=parseInt(a.ia,10);(a=Ua[E[20>a?a+21:a]])&&a(i,b,baidu.fn.blank)}},show:function(b){var d=baidu.g(U(b.id));if(2>d.firstChild.children.length){var f=Ta(b,"minimize","close");d.firstChild.appendChild(f)}baidu.dom.setStyle(d,"z-index",v);F&&V();a(b)},ga:function(c,e,f){b();c=baidu.g(U(f.id));
c.style.height=O(c.getAttribute(la)).height+16+"px";F||(e=c.style,e.bottom="auto",e.right="auto");W(c,j,1,0,f.width,f.height+16);d&&a(f)},M:function(a,b,d){a=baidu.g(U(d.id)).style;a.marginTop=0;a.marginLeft=0;a.height=ha+16+"px";a.top="auto";a.left="auto"},clear:b}}();
n["static"]={create:function(a,b){var d=baidu.g(b);if(d){var c=R(a.id,a.width,a.height),e=S(a,c),f=ea.zIndex,f=0<parseInt(f,10)?f:v;baidu.dom.setStyle(e,"z-index",f);d.style.display="";d.appendChild(e);T(c,a);Xa(e,a)}},n:function(a){return{a:Ya(E[u[a]._html.material_type]),placeholder:k}}};
n.couplet=function(){function a(a,f,g,h,q,z){var i=p.createElement("div"),y=p.createElement("div"),t=S({id:a,width:d,height:c},[i,y]);baidu.browser.chrome&&(t.style.overflow="visible");f=R(a,f,g);g=p.createElement("div");g.id="baidu_dan_couplet_closeButton";baidu.on(g,"click",baidu.fn.bind(b,l,a,h));baidu.dom.setStyles(g,{position:"relative",left:"73px",top:"3px",width:"52px",height:"20px",cursor:"pointer",background:"url(http://dn.baidu.com/images/couplet.png) no-repeat 0px 0px"});baidu.dom.setStyles(i,
{border:"1px solid #cccccc",margin:"3px"});baidu.dom.setStyles(y,{height:"24px",borderTop:"1px solid #cccccc",background:"url(http://dn.baidu.com/images/couplet.png) repeat-x 0px -20px"});baidu.dom.setStyles(t,{border:"1px solid #cccccc",backgroundColor:"#f7f7f7",textAlign:"left",zIndex:ia});i.appendChild(f);y.appendChild(g);i=0;"right"===q&&(i=2);W(t,a,i,z,d,c);F&&G(y,B,5);r.appendChild(t);q="left"===q;T(f,{id:h.id,type:h.type,d:h.d,b:h.b,c:h.c,k:h.k,f:h.f,a:q?h.a:h.Fa,src:q?h.src:h.Ea,width:q?h.width:
h.ea,height:q?h.height:h.da});Xa(y,{id:a,type:h.type})}function b(a,b){va({id:a,type:b.type})}var d=128,c=303;return{create:function(b){function f(a){if(!a.$)return 10;a=Math.floor((s.clientWidth-a.ja)/2)-a.width-10;return 0<=a?a:10}if(!(screen.width<=b.minWidth||0<na++)){var g=f(b),h=b.id;a(h,b.width,b.height,b,"left",g);var q="right_"+h;a(q,b.ea,b.da,b,"right",g);if(b.$)baidu.event.on(window,"resize",function(){setTimeout(function(){var a=f(b);W(baidu.g(U(h)),h,0,a,d,c);W(baidu.g(U(q)),q,2,a,d,
c)},0)})}},show:function(a){var b=baidu.g(U(a.id)),a=baidu.g(U(a.id,"right"));b&&baidu.dom.setStyle(b,"z-index",v);a&&baidu.dom.setStyle(a,"z-index",v);F&&V()},n:function(a){var a=u[a]._html,b=parseInt(a.content_width,10);if(!b||720>b)b=4095;return{a:Ya(E[a.material_type]),$:1===a.position,ja:b,minWidth:a.min_resolution,Ea:a.right_src,Fa:Ya(E[a.right_type]),ea:a.right_width,da:a.right_height}}}}();
n.expand=function(){function a(a,b,d){var e,f,w=g[d.id];if(w.F){var x=s.clientWidth,ga=s.clientHeight;f=window.pageXOffset||s.scrollLeft;e=window.pageYOffset||s.scrollTop;var D=a.getBoundingClientRect();e=e+D.top-h.top;f=f+D.left-h.left;var D=a.getBoundingClientRect(),aa=g[d.id],Q=d.I-d.width,ba=d.r-d.height,M=g[d.id];M.D=M.S?D.top>ga-D.bottom?1:2:D.left>x-D.right?3:4;1===aa.D&&(e-=ba);3===aa.D&&(f-=Q);baidu.dom.setStyles(b,{position:"absolute",top:e+"px",left:f+"px",width:d.I+"px",height:d.r+"px"});
baidu.dom.setStyle(a,"visibility","hidden");baidu.dom.setStyles(b,{visibility:"visible",zIndex:v});w.Y=+new Date;w.s=1;c(d,2)}else w.u&&(w.log.X=+new Date-w.u,c(d,1))}function b(a,b,c){g[a.id].s&&(c=c.relatedTarget||c.toElement,(!c||!baidu.dom.contains(b,c))&&d(a))}function d(a){var b=g[a.id];if(b.s){b.O=+new Date;b.log.fa=b.O-b.Y;b.s=0;var b=baidu.g(U(a.id)),d=baidu.g(U(a.id,"expand"));baidu.dom.setStyle(b,"visibility","visible");baidu.dom.setStyles(d,{visibility:"hidden",zIndex:ia});c(a,3)}}function c(a,
b){var c=g[a.id],d=[0,0,0,0,0,0,0,0];d[b]=1;switch(b){case 0:d[4]=c.log.T;d[5]=c.log.aa;break;case 1:d[6]=c.log.X;break;case 3:d[7]=c.log.fa}Za(a,0,1,"",d.join(","))}function e(a){a.id=a.id.replace("expand_","");var b=g[a.id];b.H=+new Date;b.log.T=b.H-b.U;b.log.aa=b.H-b.u;b.F=1;c(a,0)}function f(a){var b=g[a.id];if(!b.options){var c=a.b;c&&(c=$a(c,"e_1"));b.options={id:"expand_"+a.id,b:c,d:a.d,c:a.c,width:a.I,height:a.r,src:a.la,a:a.ma,f:a.f,fn:"onExpandLoad",l:"id="+a.id}}return b.options}var g=
{},h=Ia();return{create:function(c,e){var i=c.id;g[i]={S:1,D:1,Ga:0,u:0,U:0,H:0,oa:0,F:0,s:0,Y:0,O:0,log:{T:0,aa:0,X:0,fa:0}};i=g[i];c.height===c.r&&(i.S=0);n["static"].create(c,e);var i=f(c),h=R(i.id,i.width,i.height),h=S(i,h);baidu.dom.setStyles(h,{width:"0px",height:"0px",position:"absolute",top:"0px",left:"0px",zIndex:v});r.appendChild(h);Xa(h,i);i=baidu.g(U(c.id));h=baidu.g(U(c.id,"expand"));baidu.event.on(i,"mouseenter",baidu.fn.bind(a,l,i,h,c));baidu.event.on(h,"mouseleave",baidu.fn.bind(d,
l,c));baidu.event.on(i,"mouseleave",baidu.fn.bind(b,l,c,h))},show:function(a){var b=g[a.id];b.u=+new Date;b.oa=1;setTimeout(function(){var c=f(a),d=baidu.g(ab(c.id));b.U=+new Date;T(d,c,e)},5E3)},ra:e,n:function(a){a=u[a]._html;return{a:Ya(E[a.material_type]),la:a.expand_src,ma:Ya(E[a.expand_type]),I:a.expand_width,r:a.expand_height,placeholder:k}},Ha:function(a,b){var c=a.id;g[c].F&&(c="expand_"+c);setTimeout(function(){var a=baidu.g(X("logo_"+c));a.width=b.width;a.height=b.height},0)}}}();
n.captcha=function(){function a(){if(wa)i();else{var a=O(Q),b=baidu.g(U(a.id));"none"===b.style.display&&(W(b,a.id,1,0,xa,ya),F&&G(b.lastChild,B,1),e(a))}}function b(a){d(m);baidu.dom.hide(U(a.id))}function d(a){baidu.dom.setStyle(D,"display",a?"block":"none");baidu.dom.setStyles(ga,{"background-color":a?"#fef2f2":"","border-color":a?"#cc3333":"#cccccc"});baidu.dom.setStyle(x,"background-color",a?"#fef2f2":"")}function c(a){M=k;var b=q(a.id),c=baidu.g(x),e=encodeURIComponent(c.value);e?(N(oa[a.p]+
"?"+("di="+a.id+"&ans="+e+"&jk="+b.Ba+"&fn="+t+"&dt="+(+new Date-ba))),za=setTimeout(function(){M=m;clearTimeout(za);h(a.id,m)},5E3)):(d(k),baidu.on(c,"keydown",f))}function e(a){M=m;ba=+new Date;var a="captcha=1&"+a.Ca,b={fn:w,dt:Math.round(+new Date/1E3)},c;for(c in b)ja.call(b,c)&&(a=a.replace(RegExp("&"+c+"=(\\w+)"),function(a,d){return a.replace(d,b[c])}));N("http://cb.baidu.com/ecom?"+a)}function f(){var a=baidu.g(x);baidu.un(a,"keydown",f);a.focus();a.value="";d(m)}function g(a){Va[a.id]=a;
var a=q(a.id),b=O(a.id);if(Wa&&(Wa=m,a.z&&b.R&&b.P)){z();wa=k;return}if(wa)i();else{b=baidu.g(U(b.id));baidu.dom.show(b);F&&V();f();b=baidu.g(ab(a.id));baidu.dom.setStyles(b,{width:a.width+"px",height:a.height+"px"});b.innerHTML="";T(b,a,baidu.fn.blank);Pa(q(a.id));if(a.z){var c=a,d=document.createElement("div");baidu.dom.setStyles(d,{position:"absolute",left:"156px",bottom:"20px",width:"75px",height:"30px"});if(baidu.browser.ie&&8>parseInt(baidu.browser.ie,10))Y(d,{id:c.id,width:"75",height:"30",
src:"captcha_vcode.swf",l:"img="+J(c.z)});else{var e=document.createElement("img");e.src="data:image/jpeg;base64,"+c.z;d.appendChild(e)}b.appendChild(d)}baidu.g(aa).innerHTML=a.Da;La(a)}}function h(a,c){if(M){var g=O(a),h=q(a);clearTimeout(za);if(c){if(baidu.g(x).value="",b(g),Oa(h),"undefined"!==typeof window[y])window[y](c)}else h=baidu.g(x),e(g),ba=(new Date).getTime(),d(k),baidu.on(h,"keydown",f)}}function q(a){a=Va[a];return{id:a.id,width:a.width,height:a.height,d:a.product_type,
qa:a.material_type,a:E[a.material_type],src:a.src,k:a.monitor_url,Da:unescape(a.question_tip),c:a.url_parameter,b:a.target_url,Ba:a.qid,z:a.verification_code,p:a._vlog,t:a.hmjsId}}function z(){var a=O(Q);window.ka&&(window.ka=l);N(pa,function(){window[rb]=window[y];var b={};b[a.R]={_html:"cpro_client=${cpro_client}|cpro_template=vcode_captchaF_254_218|cpro_h=185|cpro_w=250|cpro_at=image_flash|cpro_161=1|cpro_flush=4|cpro_cflush=#e10900|cpro_curl=#008000|cpro_cdesc=#444444|cpro_ctitle=#0000FF|cpro_cbg=#FFFFFF|cpro_cbd=#FFFFFF|cpro_cad=1".replace(/\$\{cpro_client\}/g,
a.P)};window[sb](b);i()})}function i(){var a=window[tb];a&&a()}var y="BAIDU_CLB_captchaVerifiedCallback",t="BAIDU_DAN_captchaAuthCallback",w="BAIDU_DAN_captchaMaterialCallback",x="baidu_dan_captcha_userInput",ga="baidu_dan_captcha_userInput_border",D="baidu_dan_captcha_errorInfo",aa="baidu_dan_captcha_questionTip",Q=m,ba=+new Date,M=m,za=0,Va={},xa=330,ya=390;Ia();var Wa=k,wa=m,rb="fcallback_baiduCaptcha",tb="adDisplayHandler__baiduCaptcha",sb="BAIDU_CPRO_SETJSONADSLOT";window[w]=window[w]||g;window[t]=
window[t]||h;window.BAIDU_DAN_showCaptchaAd=window.BAIDU_DAN_showCaptchaAd||a;return{create:function(d){if(!Q){Q=d.id;var f=['<div style="position: absolute !important;width:'+xa+"px; height: "+ya+"px;overflow:hidden !important;background:url('captcha.png');_background:none;\"></div>",'<div id="baidu_dan_captcha_innerWrapper" style="position:relative !important;text-align:left !important;width:310px;height:370px;top:10px;left:10px;font-size:12px;font-family: \'\u5b8b\u4f53,Arial\';"><div style="position: absolute ! important; right: 5px; top: 9px; height: 10px; width: 11px; cursor: pointer; " id="baidu_dan_captcha_closeButton"></div><div style="position: absolute ! important; left: 5px; top: 30px; width: 300px"><div id="baidu_dan_captcha_content" style="height: 250px; width: 300px;"></div><div style="height: 16px; margin-top: 10px; overflow: hidden; position: relative; width: 300px;">',
'<span id="'+aa+'" style="line-height: 15px; color:#666666"></span>','<span style="line-height: 15px; color:#666666">\uff1a</span><span style="line-height: 15px; color:#666666; text-decoration:underline; cursor:pointer; margin-left:5px" id="baidu_dan_captcha_changeButton">\u6362\u4e00\u5f20</span></div><div style="overflow:hidden;*zoom:1;margin-top:9px;height:25px;vertical-align:middle;">','<div style="position:relative !important;float:left;height:23px;width:223px;border:1px solid #cccccc;" id="'+
ga+'">','<input type="text" style="margin-top:4px;padding:0px;line-height:16px;height:16px;margin-left:3px; border:0 none;width:218px;outline:none;" id="'+x+'">','<span style="position:absolute;line-height:16px;top:4px;right:0px;color:#cc3333;display:none" id="'+D+'">\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01</span>','</div><div style="float:right;width:70px;height:25px;display:inline !important;cursor:pointer" id="baidu_dan_captcha_submit"></div></div><div style="height: 14px; line-height: 14px; margin-top: 8px; overflow: hidden;width: 300px;"><a style="color: #666666;" onfocus="this.blur()" href="mailto:yanzhengma@baidu.com" target="_blank">\u95ee\u9898\u53cd\u9988</a></div></div>'].join(""),
g=S(baidu.object.extend(d,{width:xa,height:ya}),[]);baidu.dom.setStyle(g,"display","none");baidu.dom.setStyle(g,"overflow","visible");g.innerHTML=f;r.appendChild(g);f=R(d.id,d.width||0,d.height||0);baidu.g("baidu_dan_captcha_content").appendChild(f);Xa(baidu.g("baidu_dan_captcha_innerWrapper"),d);baidu.on("baidu_dan_captcha_submit","click",baidu.fn.bind(c,l,d));baidu.on("baidu_dan_captcha_closeButton","click",baidu.fn.bind(b,l,d));baidu.on("baidu_dan_captcha_changeButton","click",baidu.fn.bind(e,
l,d));if(window.BAIDU_CLB_captchaBtnId&&baidu.g(window.BAIDU_CLB_captchaBtnId))baidu.on(window.BAIDU_CLB_captchaBtnId,"click",function(){a()})}},n:function(a){a=u[a]._html;return{P:a.cpro_client,R:a.cpro_id}}}}();function va(a){var b=baidu.g(U(a.id));n[a.type].clear&&n[a.type].clear();b.style.display="none";setTimeout(function(){b.parentNode.removeChild(b)},0);Qa(a,"stop");return m}function U(a,b){return b?"baidu_dan_wrapper_"+b+"_"+a:"baidu_dan_wrapper_"+a}
function ab(a){return"baidu_dan_container_"+a}function X(a){return"baidu_dan_player_"+a}function $a(a,b){var d=baidu.url.getQueryValue(a,"k");d?(b="&k="+Ha(d+"|"+b),a=a.replace("&k="+d,b)):a=-1===a.indexOf("?")?a+"?k="+Ha(b):a+"&k="+Ha(b);return a}function R(a,b,d){var c=p.createElement("ins"),e=c.style;c.id=ab(a);e.display="block";e.width=b+"px";e.height=d+"px";e.position="relative";e.overflow="hidden";return c}
function S(a,b){var b=baidu.lang.toArray(b),d=a.id,c=p.createElement("ins"),e=c.style,f=0,g=b.length;c.id=U(d);c.setAttribute(la,d);c.setAttribute(ma,o);e.display="block";e.overflow="hidden";e.position="relative";e.textDecoration="none";e.zIndex=v;e.width=a.width+"px";for(e.height=a.height+"px";f<g;f++)c.appendChild(b[f]);return c}
function La(a){if(a.t){var b=baidu.g(U(a.id)),d=b.parentNode;if(d){var c=p.createElement("ins");c.id="_bdhm_mkt_"+a.t;d.insertBefore(c,b.nextSibling);N("http://click.hm.baidu.com/mkt.js?"+a.t)}}}function T(a,b,d){var c=Ua[b.a];c&&c.apply(l,arguments)}
function Y(a,b){var d=b.l||"id="+J(b.id);b.o&&(d+="&rcv_url="+J(b.f));a.innerHTML=Ea?'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" name="baidu_dan_player" '+(b.id?'id="'+X(b.id)+'" ':"")+'width="'+b.width+'" height="'+b.height+'" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"><param name="allowScriptAccess" value="always" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="movie" value="'+b.src+
'" />'+(d?'<param name="flashvars" value="'+d+'" />':"")+"</object>":'<embed wmode="transparent" src="'+b.src+'" quality="high" name="baidu_dan_player" '+(b.id?'id="'+X(b.id)+'" ':"")+(d?'flashVars="'+d+'" ':"")+'width="'+b.width+'" height="'+b.height+'"allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';!b.o&&b.b&&bb(a,b.b)}
function bb(a,b){if(b){var d=p.createElement("a"),c=d.style;d.href=b;d.target="_blank";c.position="absolute";c.zIndex=999;c.top=0;c.width="100%";c.height="2000px";c.backgroundColor="#fff";Da?c.opacity=0:(c.filter="alpha(opacity=0)",c.zoom=1);"outline"in c?c.outline="none":d.hideFocus=k;a.insertBefore(d,a.firstChild)}}
function Ta(a,b){var d=1,c=arguments.length,e,f,g=p.createElement("div");g.className="baidu-dan-control-bar";for(g.style.overflow="hidden";d<c;d++)e=arguments[d],e=Ba[e],f=p.createElement("span"),f.innerHTML=e.text,baidu.dom.setStyles(f,{width:e.width+"px",height:e.height+"px",backgroundImage:"url("+e.Z+")",backgroundPosition:e.offsetX+"px "+e.offsetY+"px",textIndent:"-2000px",overflow:"hidden",cssFloat:"right",styleFloat:"right"}),baidu.event.on(f,"click",baidu.fn.bind(e.W,f,a)),g.insertBefore(f,
g.firstChild);return g}
function Xa(a,b){var d=U("logo_"+b.id);if(!baidu.g(d))if("couplet"===b.type){var c=document.createElement("a");c.id=d;c.href=ra;c.target="_blank";a.appendChild(c);var d={position:"absolute",zIndex:v,left:"5px",bottom:"3px",height:"17px",width:"12px",overflow:"hidden",background:"url("+qa+") no-repeat 0px 0px"},e=c.style;"outline"in e?e.outline="none":c.hideFocus=k;baidu.dom.setStyles(c,d)}else c=document.createElement("div"),c.id=d,a.appendChild(c),d={position:"absolute",zIndex:v,bottom:"0px",height:"23px",
right:"4px"},baidu.dom.setStyles(c,d),d="logo_"+b.id,Y(c,{id:d,width:"18",height:"23",src:"logo_h.swf",l:(b.l||"id="+b.id)+"&logoId="+d})}
var Ua={video:function(a,b){Y(a,{id:b.id,width:b.width,height:b.height,src:b.ca,l:["player_id="+J(b.id),"play_url="+J(b.src),"target_url="+J(b.b),"rcv_url="+J(b.f),"effect_time="+(b.ba/1E3).toFixed(),"o_mute="+(ea.videoMute?"1":"0"),"o_volume="+("number"==typeof ea.videoVolume?ea.videoVolume:"20")].join("&")})},flash:Y,image:function(a,b,d){var c=p.createElement("img");c.width=b.width;c.height=b.height;c.src=b.src;c.id=X(b.id);"function"!==typeof d?c.complete?Na(b):c.onload=function(){c.onload=l;
Na(b)}:d(b);c.style.display="block";a.appendChild(c);bb(a,b.b)},media:function(a,b){b.o=k;Y(a,b)},shell:function(a,b){var d=b.src,c=b.fn||"onLoad",e=b.id,e=e.replace("expand_","");Y(a,{id:e,src:"shell.swf",l:["id="+J(e),"fn="+J(c),"src="+J(d)].join("&"),o:b.o,f:b.f,width:b.width,height:b.height,b:b.b})}};
function Aa(a){var b=baidu.g(U(a.id)),d=b.firstChild,c=b.lastChild,e=b.style;setTimeout(function(){e.width=fa+"px";e.height=ha+"px";A=ca;b.setAttribute(ma,A);var f=n[a.type].M&&n[a.type].M(d,c,a);"barrier"http://cbjs.baidu.com/js/===a.type?W(b,a.id,2,0,j,j):Ra(b,a.id);!f&&d!==c&&(d.style.display="none",c.style.display="block");Qa(a,"stop")},0);return m}
function Sa(a){var b=baidu.g(U(a.id)),d=b.style,c=a.height,e=b.firstChild,f=b.lastChild;d.width=a.width+"px";d.height=c+"px";A=o;b.setAttribute(ma,A);if((!n[a.type].ga||!n[a.type].ga(e,f,a))&&e!==f)f.style.display="none",e.style.display="block";F&&(e.getAttribute(B)||delete F[a.id],V());return m}
var O=function(){var a={};return function(b,d){if(!a[b]){var c=d||u[b],e=c._html;a[b]={id:b,Ja:c._w,Ia:c._h,c:e.url_parameter,d:e.product_type,type:Ca[e.product_type],qa:e.material_type,a:E[e.material_type],src:e.src,width:parseInt(e.width,10),height:parseInt(e.height,10),ca:e.player_url||"video-player.swf",o:1==e.product_type||21==e.product_type,b:e.target_url,ba:1E3*e.max_impression_time||
5E3,f:e.rcv_url,k:e.monitor_url,C:"video"===Ca[e.product_type],Ca:e.query_string,p:c._vlog,V:e.extra_js,t:e.hmjsId};c=a[b].type;n[c].n&&baidu.object.extend(a[b],n[c].n(b))}return a[b]}}(),cb={};function Ya(a){return"flash"===a?"shell":a}
function W(a,b,d,c,e,f){var g=["left","center","right"];cb[b]={fixMode:d,marginOffset:c};e?baidu.dom.setStyles(a,{width:e+"px",height:f+"px"}):(e=a.offsetWidth,f=a.offsetHeight);F?(e=e||a.offsetWidth,g=f||a.offsetHeight,f=K(a),g={position:"absolute",top:f.scrollTop+(f.height-g)/2-f.m+"px"},0===d&&(g.left=f.scrollLeft-f.h+c+"px"),2===d&&(g.left=f.scrollLeft+f.width-f.h-e-c+"px"),1===d&&(g.left=f.scrollLeft-f.h+f.width/2+"px",g.marginLeft=(-(e/2)).toFixed()+"px"),baidu.dom.setStyles(a,g),b&&(F[b]=a)):
(b={position:"fixed",top:"50%",marginTop:(-(f/2)).toFixed()+"px"},1===d?(b.left="50%",b.marginLeft=(-(e/2)).toFixed()+"px"):b[g[d]]=c+"px",baidu.dom.setStyles(a,b))}function Ra(a,b,d,c){d?baidu.dom.setStyles(a,{width:d+"px",height:c+"px"}):(d=a.offsetWidth,c=a.offsetHeight);F?(db(a,d,c),b&&(F[b]=a)):baidu.dom.setStyles(a,{position:"fixed",bottom:0,right:0})}
function db(a,b,d){var b=b||a.offsetWidth,d=d||a.offsetHeight,c=K(a);baidu.dom.setStyles(a,{position:"absolute",left:c.scrollLeft+c.width-c.h-b+"px",top:c.scrollTop+c.height-c.m-d+"px"})}
var eb=[l,function(a,b,d){var b=b||a.offsetWidth,d=d||a.offsetHeight,c=K(a);baidu.dom.setStyles(a,{position:"absolute",left:c.scrollLeft-c.h+c.width/2+"px",top:c.scrollTop-c.m+c.height/2+"px",marginLeft:(-(b/2)).toFixed()+"px",marginTop:(-(d/2)).toFixed()+"px"})},db,function(a,b,d){var b=b||a.offsetWidth,d=d||a.offsetHeight,c=K(a);baidu.dom.setStyles(a,{position:"absolute",left:c.scrollLeft+c.width-c.h-b+"px",top:c.scrollTop-c.m+(c.height-d)/2+"px"})},function(a,b,d){d=d||a.offsetHeight;b=K(a);baidu.dom.setStyles(a,
{position:"absolute",left:b.scrollLeft-b.h+"px",top:b.scrollTop-b.m+(b.height-d)/2+"px"})},function(a,b,d,c){W(a,c,cb[c].fixMode,cb[c].marginOffset)}];
function V(){var a,b,d=0,c;for(a in F)ja.call(F,a)&&(d++,b=F[a],c=b.lastChild.offsetWidth?b.lastChild:b.firstChild,(c=c.getAttribute(B))&&function(a,b,c){setTimeout(function(){eb[c](a,0,0,b)},0)}(b,a,c));0==d?(fb=m,baidu.event.un(window,"scroll",V),baidu.event.un(window,"resize",V)):fb||(fb=k,baidu.event.on(window,"scroll",V),baidu.event.on(window,"resize",V))}var fb=m;
function Oa(a){var b=Ga();baidu.lang.isArray(a.k)&&a.k.length&&baidu.array.each(a.k,function(a){a=a.replace(/\{placement\}/g,b);L(a)})}function Pa(a){L(C[a.p]+"?"+a.c+"&tm="+J(+new Date)+"&pt="+J(a.d))}function Za(a,b,d,c,e){a=O(a.id);L(C[a.p]+"?"+a.c+"&tm="+J(+new Date)+"&pt="+J(a.d)+"&ac="+(b+"|"+d+"|"+c+"|"+e))}function Z(a,b){var d=baidu.g(U(a)),c=Z[b];if(d&&c)return d=Array.prototype.slice.call(arguments),d[0]=O(a),d.splice(1,1),c.apply(l,d)}
window.BAIDU_DAN_materialCallback=window.BAIDU_DAN_materialCallback||Z;Z.onMinimize=Aa;Z.onRestore=Sa;Z.onClose=function(a){va(a)};Z.onLoad=function(a){Na(a)};Z.onExpandLoad=n.expand.ra;Z.onFinish=n.video.za;Z.onPause=n.video.Aa;Z.logMousePause=n.video.va;Z.logMouseReplay=n.video.wa;Z.logMouseRestore=n.video.xa;Z.logMouseMute=n.video.ua;Z.logMouseMinimize=n.video.ta;Z.logMouseClose=n.video.sa;Z.logMouseSearch=n.video.ya;Z.openWindow=function(a,b){b&&b.url?window.open(b.url):Z.openClickUrl(a,{Ka:0})};
Z.openClickUrl=function(a,b){if(a.b){var d=0,c=a.b;baidu.url.getQueryValue(c,"k");b&&1===b.valid&&(d=1);c=$a(c,"v_"+d);b&&b.inField&&(c+="&in="+J(b.inField));window.open(c)}};Z.sendInteractiveLog=function(a,b){for(var d=b.name,c=0;c<d.length;c++)d[c]=J(d[c]);Za(a,1,b.online,d.join(","),b.value.join(","))};Z.exposeAdElements=function(a){var b=baidu.g(U(a.id)),a=baidu.g(X(a.id));window.BAIDU_DAN_adElements={ins:b.firstChild,wrapper:b,swf:a}};
Z.resizeLogo=function(a,b){setTimeout(function(){var a=b.logoId,c=baidu.g(X(a)),a=baidu.g(U(a)).style;c.width=b.width;c.height=b.height;a.right=85===b.width?"0px":"4px"},0)};
Z.adInfo=function(a){var b,d,c,e,f;f=baidu.g(U(a.id));f.getBoundingClientRect?(f=f.getBoundingClientRect(),b=gb().document,e="CSS1Compat"!==b.compatMode?b.body:b.documentElement,b=e.clientHeight,d=e.clientWidth,c=e.clientLeft,e=e.clientTop,f.left>=c&&f.top>=e&&f.right<=d&&f.bottom<=b?(c=1,f.left<d/2&&(c|=1),f.top>b/2&&(c|=2),f=(2<c?c^1:c)+1):f=0):f=5;return[p.domain,a.id,baidu.url.getQueryValue(a.c,"mid"),a.width,a.height,f].join("|")};var $={},hb=m,P=0,ib=0,jb=0;
function Qa(a,b){$[a.id]||($[a.id]={L:"static"===a.type||"expand"===a.type,code:0,offsetX:0,offsetY:0,j:0,pa:12E3,count:0});var d=$[a.id];"stop"===b&&d.j&&clearInterval(d.j);"start"===b&&!d.j&&0.3>Math.random()&&(kb(a),d.j=setInterval(function(){kb(a)},d.pa))}function kb(a){var b=$[a.id];5<=b.count++?clearInterval(b.j):(lb(a,mb,function(a){a===m&&clearInterval(b.j)}),nb(a,b))}
function nb(a,b){L("http://cbjslog.baidu.com/dan_log?"+["ty="+sa,"di="+a.id,a.c,"pt="+a.d,"tgs="+(A||!b.L),"l="+n.video.na(),"c="+b.code,"x="+b.offsetX,"y="+b.offsetY,"q="+(da?1:0),"tm="+ +new Date].join("&"))}function lb(a,b,d){for(var c=k,e=0,f=b.length;e<f;e++)if(b[e]&&"function"===typeof b[e]&&b[e](a)===m){c=m;break}d&&d(c)}var wb=[ob,pb,qb,ub,vb],mb=[xb,yb,zb,Ab];function ob(){return Bb()?(P|=1,k):m}function Bb(){return window!=window.top&&window!=window.parent?k:m}
function pb(){gb()!=window.top&&(P|=2)}function gb(){var a=Cb();return a[a.length-1]}function Cb(){for(var a=0,b=window,d=b.top,c=[b];b!==d&&10>a++&&Db(b)&&Db(b.parent);){b=b.parent;c.push(b)}Cb=function(){return c};return c}
function qb(a){for(var b=Cb(),d=window.top,c,e,f=0,g=b.length;f<g;f++){c=b[f];if(c===d)break;c=c.document;e=(e="CSS1Compat"!==c.compatMode)?c.body:c.documentElement;c=e.clientWidth;e=e.clientHeight;if(c<a.width||e<a.height)P|=4;c>2*a.width&&e>2*a.height&&(P|=8);100<c&&100<e&&(P|=16);if(28===(P&28))break}}function ub(){for(var a=Cb(),b,d=0,c=a.length-1;d<c;d++)if(b=a[d],!Eb(b.frameElement)){P|=32;break}}
function Eb(a){var b=baidu.dom.getStyle,d;if(!(d="none"==b(a,"display"))){if(!(b="hidden"==b(a,"visibility")))a=Da?baidu.dom.getStyle(a,"opacity")||"1":(a=a.style.filter)&&0<=a.indexOf("opacity")?parseFloat(a.match(/opacity[=:]([^)]*)/)[1])/100+"":"1",b="1"!=a;d=b}return d?m:k}function vb(a){var b=Cb();2>b.length||(a=Fb(a,b[0].frameElement,a.C),a.v&&(ib=a.A,P|=64),a.w&&(jb=a.B,P|=128),a.J||(P|=256))}
function Fb(a,b,d){if(b.getBoundingClientRect){var c=b.getBoundingClientRect(),b=b.ownerDocument,e="CSS1Compat"!==b.compatMode?b.body:b.documentElement,f=e.clientHeight,g=e.clientWidth,b=e.clientLeft,e=e.clientTop;return d?(d=c.right-g-b,f=c.bottom-f-e,{v:1<Math.abs(d),w:1<Math.abs(f),A:d,B:f,K:c.left>=b&&c.top>=e&&1>=d&&1>=f,J:c.right-b>=a.width&&c.bottom-e>=a.height&&1>=d&&1>=f}):{v:m,w:m,A:c.left,B:c.top,K:c.left>=b&&c.top>=e&&c.right<=g&&c.bottom<=f,J:c.right-b>=a.width&&c.bottom-e>=a.height&&
g-c.left+b>=a.width&&f-c.top+e>=a.height}}L("http://cbjslog.baidu.com/dan_log?"+["ty="+ua,"url="+J(p.URL)].join("&"));return{v:m,w:m,A:0,B:0,K:k,J:k}}function xb(a){var b=$[a.id],d=baidu.g(U(a.id)),c=baidu.g(ab(a.id)),a=baidu.g(X(a.id));return!d||!c||!a?(b.code|=1,m):k}function yb(a){var b=$[a.id];if(A===o||b.L){var d=baidu.g(X(a.id)),a=Fb(a,d,a.C);a.v&&(b.offsetX=a.A,b.code|=2);a.w&&(b.offsetY=a.B,b.code|=4);a.K||(b.code|=8)}}
function zb(a){for(var b=$[a.id],d,c,e=baidu.g(X(a.id));e&&!(e===p||e===r||e===p.documentElement);e=e.parentNode){if(!Eb(e)){b.code|=32;break}if(A===o||b.L)if(d=e.offsetWidth||e.clientWidth,c=e.offsetHeight||e.clientHeight,d<a.width&&"hidden"===baidu.dom.getStyle(e,"overflowX")||c<a.height&&"hidden"===baidu.dom.getStyle(e,"overflowY")){b.code|=16;break}}}
function Ab(a){var b=$[a.id],d=baidu.g(X(a.id)),c="video"===a.a?a.ca:a.src;if(Ea&&"image"!==a.a)for(var e,a=0;a<d.childNodes.length;a++){if(e=d.childNodes[a],"movie"===e.getAttribute("name")&&(e=e.getAttribute("value"),e!=c&&"shell.swf"!=e&&(b.code|=64)}
function Ka(a){hb||(lb(a,wb),L("http://cbjslog.baidu.com/dan_log?"+["ty="+ta,"di="+a.id,a.c,"pt="+a.d,"if="+P,"x="+ib,"y="+jb,"ib="+(0<(P&292)?1:0),"ir="+J(Gb()),"tm="+ +new Date].join("&")),hb=k)}function Db(a){var b=m;try{a&&"object"===typeof a&&a.document&&"setInterval"in a&&(b=k)}catch(d){b=m}return b}function Gb(){if(!Bb())return"";var a=gb();return a===window.top?a.document.location.href:a.document.referrer||a.document.location.href}var Hb=window.BAIDU_DAN_readySlotId;
if(Hb){Ja(Hb,"");0.01>Math.random()&&L("http://cbjslog.baidu.com/dan_log?"+["ty=4","di="+Hb,"url="+J(p.URL)].join("&"));try{delete window.BAIDU_DAN_readySlotId}catch(Ib){window.BAIDU_DAN_readySlotId=j}};})();