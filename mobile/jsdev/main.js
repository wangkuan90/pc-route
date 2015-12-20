"use strict";
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
if (IsPC()) {
	location.href = "../index.html";
}

$script(["../lib/ionic/js/ionic.bundle.min.js"], function() {

	$script.path("../mobile/jsdev/");

	$script(["init"], "app-init");
	$script.ready(["app-init"], function() {
		$script([
			"service/common", "service/model"
		], "app-service");
	});

	$script.ready(["app-service"], function() {
		$script([
			"controller", "controller/user", "controller/home", "controller/module", "controller/activity"
		], "app-controller");
	});

	$script.ready(["app-controller"], function() {
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
		});
	});
});