function IsPC() {
	var userAgentInfo = navigator.userAgent;
	console.log("浏览器信息:" + userAgentInfo);
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
	];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
if(!IsPC()){
	location.href = "mobile/index.html";
}

seajs.config({
	alias: {
		"jquery": "jquery/jquery-sea-2.1.4.min",
		"$": "jquery/jquery-sea-2.1.4.min",
		"livereload": "http://127.0.0.1:35729/livereload",
		"index": "./pc/jsdev/index",
		"router": "./jar/my-router", //自定义路由器
		"-": "./jar/my-underscore", //自定义方法类 
		"header": "./pc/component/header",
		"weather": "./pc/common/weather", // 天气模块
		"api": "./pc/api",
		"ip": "http://www.coding123.net/getip.ashx?js=1",
		"city": "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
		"router-config": "./controller/router-config",
		"router-controller": "./controller/router-controller",
	},
	// 预加载项
	preload: [
		"city",
		'livereload'
		//		"ip",

	],
});
// 加载入口模块
seajs.use("index");