/*! wangkuan - 2015-11-28 09:23:37 */
function IsPC(){var userAgentInfo=navigator.userAgent;console.log("浏览器信息:"+userAgentInfo);for(var Agents=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],flag=!0,v=0;v<Agents.length;v++)if(userAgentInfo.indexOf(Agents[v])>0){flag=!1;break}return flag}IsPC()||(location.href="mobile/index.html"),seajs.config({alias:{jquery:"jquery/jquery-sea-2.1.4.min",$:"jquery/jquery-sea-2.1.4.min",livereload:"http://127.0.0.1:35729/livereload",index:"./pc/js/index",router:"./jar/my-router","-":"./jar/my-underscore",header:"./pc/component/header",weather:"./pc/common/weather",api:"./pc/api",ip:"http://www.coding123.net/getip.ashx?js=1",city:"http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js","router-config":"./controller/router-config","router-controller":"./controller/router-controller"},preload:["city"]}),seajs.use("index");