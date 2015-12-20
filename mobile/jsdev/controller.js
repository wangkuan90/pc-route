"use strict";
angular.module("controller", [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $locationProvider) {

	// seo优化
	$locationProvider.hashPrefix('!');

	$ionicConfigProvider.views.maxCache(0);
	$ionicConfigProvider.templates.maxPrefetch(0);

	$stateProvider

	// 找回密码
		.state("ui-css", {
		url: "/ui-css?module&step",
		views: {
			view_module: {
				templateUrl: function(params) {
					params.module = params.module || "buttons";
					params.step = params.step || "list";
					return "/template/module/ui-css/" + params.module + "/ "+ 
						params.step + ".html?_=" + $GC.version;
				},
				controller: "UiCSSController"
			}
		}
	})

	// 首页分配器
	.state("home", {
		url: "/",
		views: {
			homes: {
				templateUrl: function() {
					$H5.layout = "homepage";
					return "template/homepage.html";
				},
				controller: "HomeController"
			}
		}
	});

	$urlRouterProvider.otherwise("/");

});