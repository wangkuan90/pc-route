"use strict";

$H5.hasHeadBar = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) !== "micromessenger";
/**
 * 设置cookie
 * @param {[type]} cname  [description]
 * @param {[type]} cvalue [description]
 * @param {[type]} exdays [description]
 */
function $setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**
 * 获取cookie
 * @param  {[type]} cname [description]
 * @return {[type]}       [description]
 */
function $getCookie(cname) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(cname + "=");
		if (c_start != -1) {
			c_start = c_start + cname.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

angular

	.module("app", ["ionic",
	"service.common", "service.model",
	"controller", "controller.user", "controller.home", "controller.module", "controller.activity"
])

.run(function($rootScope, $state, $q, $stateParams, $log, $ionicLoading, $ionicModal) {


	// App全局变量
	$rootScope.$H5 = $H5;

	// 模块变量域
	$rootScope._module_data = {};

	// 视图便捷访问方法
	$rootScope.$state = $state;
	$rootScope.$params = $stateParams;

	$rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {

	});

	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {

		$ionicLoading.hide();

		// HACK :打开modal 按后退会导致无法关闭（hack为后退就直接移除modal）
		angular.element(document.querySelectorAll('.modal-backdrop.active')).remove();
		document.querySelector('body').classList.remove('modal-open');
		// HACK END

		$rootScope.preState = from.name;
		$rootScope.preParams = fromParams;

		// 中途刷新页面执行
		$rootScope.moduleRequired = function(condition) {
			if (!!condition === false) {
				location.href = "/";
				throw "Opps!";
			}
		};

	});

	/**
	 * 模块级别的变量存储
	 * @param name
	 * @param data
	 * @returns {*}
	 */
	$rootScope.$moduleScope = function(name, data) {
		if (!$rootScope._module_data[name]) {
			$rootScope._module_data[name] = {};
		}
		return angular.isObject(data) ? angular.extend($rootScope._module_data[name], data) : $rootScope._module_data[name];
	};

	/**
	 * 清空模块缓存
	 * @return {[type]} [description]
	 */
	$rootScope.removeModuleScope = function() {
		$rootScope._module_data = {};
	};

	/**
	 * 保证翻滚可以置顶
	 */
	addEventListener('resize', function() {
		window.scrollTo(0, 0);
	})

})
//
///**
// * filter --------------------------------------------------------------------------------------------------------------
// */
//
//// 去掉括号里的内容
//.filter("noMemo", function() {
//	return function(input) {
//		if (input) return input.replace(/[\(（][\s\S]*[\)）]/, '').replace(/\s/g, '');
//	}
//})
//
//.filter("hiddenString", function($log) {
//	return function(input, startLen, endLen) {
//		if (!input) return false;
//		var xNum = input.length - (startLen + endLen);
//		if (xNum < 0) {
//			$log.error("保留字符长度不能超过自身");
//			return input;
//		}
//		return input.replace(input.slice(startLen, input.length - endLen), new Array(xNum + 1).join("*"));
//	}
//})
//
//.filter("textHtml", function() {
//	return function(input) {
//		return input.replace(/\n/g, "<br>");
//	}
//})
//
//.filter("cutString", function() {
//	return function(input, len) {
//		if (!input) return false;
//		var tail = input.length > len ? ".." : "";
//		return input.substring(0, len) + tail;
//	}
//})
//
//
//.filter("TsToDate", function() {
//	return function(input) {
//		if (!input) return '';
//		if (!isNaN(input)) {
//			input = parseInt(input);
//		} else {
//			input = input.split(",")[0].split(" ")[0];
//		}
//		var d = new Date(input);
//		var mon = "0" + (d.getMonth() + 1);
//		var day = "0" + d.getDate();
//		return d.getFullYear() + '-' + mon.substr(mon.length - 2) + '-' + day.substr(day.length - 2);
//	}
//})
//
//.filter("formatDate", function() {
//	return function(input, formatter) {
//		// 多种格式日期
//		// formatDate(20150828, HH/MM/DD hh:mm:ss)
//		var HH, MM, DD, hh, mm, ss;
//		if (input.length === 8) {
//			// 20150828
//			input += '';
//			HH = input.substring(0, 4);
//			MM = input.substring(4, 6);
//			DD = input.substring(6, 8);
//			hh = '00';
//			mm = '00';
//			ss = '00';
//		}
//		if (input.length > 8) {
//			input = new Date(parseInt(input, 10));
//			HH = input.getFullYear();
//			MM = input.getMonth() + 1;
//			DD = input.getDay();
//			hh = input.getHours();
//			mm = input.getMinutes();
//			ss = input.getSeconds();
//		}
//		return formatter.replace(/HH/, HH).replace(/MM/, MM).replace(/DD/, DD).replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
//	}
//})
//
///**
// * directive -----------------------------------------------------------------------------------------------------------
// */
//.directive("fullHeight", function() {
//	return {
//		restrict: "A",
//		link: function(scope, element, attrs) {
//			element.css("height", (document.body.scrollHeight - 44) + "px");
//		}
//	};
//})
//
//.directive("fullWidth", function() {
//	return {
//		restrict: "A",
//		link: function(scope, element, attrs) {
//			element.css("width", (document.body.scrollWidth) + "px");
//		}
//	};
//})
//
//.directive("autoHeight", function($timeout) {
//	return {
//		restrict: "A",
//		link: function(scope, element, attrs) {
//			$timeout(function() {
//				var h = element.prop("offsetWidth") * attrs["autoHeight"];
//				element.css("height", h + "px");
//				if (element[0].querySelector('.text')) {
//					element[0].querySelector('.text').style.marginTop = h / 3.5 + 'px';
//				}
//			}, 0);
//		}
//	}
//})
//
//.directive("sideMenu", function($rootScope, Config, XHR) {
//	return {
//		restrict: "A",
//		link: function(scope, element, attrs) {
//
//			// 设置侧栏菜单
//			scope.$sideMenu = "/template/menu/side.html";
//			scope.$sideMenuTitle = "医院快速菜单";
//			scope.$hospitalId = Config.hospitalId();
//
//			scope.selectHospital = function() {
//				$rootScope._sideMenuSelectHospital = true;
//				$rootScope.$state.go("homepage");
//			};
//		}
//	};
//})
//
//// 首页模块介绍说明
//.directive("moduleMemo", function() {
//	var datas = {
//		"fenzhen": "症状自测找对医生",
//		"yuyue": "提前预约先人一步",
//		"keshi": "介绍擅长出诊信息",
//		"daohang": "地理位置楼层导航",
//		"houzhen": "实时查看门诊叫号",
//		"dangri": "实时挂号直接就诊",
//		"report": "及时查看检查报告",
//		"chufang": "及时查看处方单",
//		"zixun": "随时关注健康知识",
//		"kandian": "医院最新动态公告",
//		"zhinan": "就医须知和流程",
//		"diaocha": "一切以病人为中心",
//		"paiban": "随时查看门诊动态",
//		"tingzhen": "停诊信息随时掌握",
//		"gonggao": "医院最新动态公告",
//		"xianchang": "现场挂号",
//		"zice": "自测"
//	}
//	return {
//		restrict: "A",
//		link: function(scope, element, attrs) {
//			element.text(datas[attrs['moduleMemo']]);
//		}
//	}
//})
//
//.directive("quickButton", function($rootScope) {
//
//	return {
//		restrict: "AE",
//		template: '<ul ng-show="qb_open" ng-class="{open:qb_open}">' +
//			'<li ng-repeat="link in links" ng-click="link.click()" ng-class="{last: $last}">' +
//			'<i class="icon-{{ link.icon }}"></i>{{ link.name }}</li>' +
//			'</ul>' +
//			'<i class="arrow" ng-show="qb_open" ng-class="{open:qb_open}"></i>' +
//			'<a href="javascript:;" class="q-button" ng-class="{open:qb_open}" ng-click="toggle()"><i class="x-icon"></i>{{ buttonText }}</a>',
//		link: function(scope, el, attrs) {
//			scope.buttonText = '更多';
//			$rootScope.qb_open = false;
//			$rootScope.links = [{
//				name: '首页',
//				click: function() {
//					$rootScope.qb_open = false;
//					scope.$state.go("homepage");
//				},
//				icon: 'home'
//			}, {
//				name: '个人中心',
//				click: function() {
//					$rootScope.qb_open = false;
//					$rootScope.$state.go("my");
//				},
//				icon: 'user'
//			}, {
//				name: '院内搜索',
//				click: function() {
//					$rootScope.qb_open = false;
//					$rootScope.$state.go("search-suggest");
//				},
//				icon: 'search'
//			}, {
//				name: '预约挂号',
//				click: function() {
//					$rootScope.qb_open = false;
//					$rootScope.$state.go("m-yuyue");
//				},
//				icon: 'guahao'
//			}, ];
//			if ($rootScope.multiHospital) {
//				$rootScope.links.push({
//					name: '切换医院',
//					click: function() {
//						$rootScope.qb_open = false;
//						$rootScope._sideMenuSelectHospital = true;
//						$rootScope.$state.go("homepage");
//					},
//					icon: 'switch'
//				});
//			}
//			scope.toggle = function() {
//				$rootScope.qb_open = !$rootScope.qb_open;
//			};
//		}
//	};
//
//})
//
//.directive("switchHospital", function(Config, XHR, $rootScope) {
//
//	return {
//		restrict: "C",
//		templateUrl: '/template/modal/switch-hospital.html',
//		link: function(scope, el, attrs) {
//			scope.close = function() {
//				$rootScope._switchHospital = false;
//			};
//			$rootScope.switchHospital = function() {
//				$rootScope._switchHospital = true;
//			};
//			$rootScope.$watch('_switchHospital', function(v) {
//				if (v) {
//					// 打开选择
//					scope.open = true;
//					Config.hospitalList().then(function(res) {
//						scope.curr = Config.hospitalId() || res.data[0].value;
//						scope.hospitalList = res.data;
//						scope.setHospital = function(id) {
//							Config.hospitalId(id);
//							location.reload();
//						};
//					});
//				} else {
//					scope.close();
//					scope.open = false;
//				}
//			});
//		}
//	};
//})
//
//
//.directive('searchBox', function(Search, $rootScope, $window) {
//
//	return {
//		restrict: "E",
//		scope: {
//			search: '='
//		},
//		templateUrl: '/template/directive/search.html',
//		link: function(scope, el, attrs) {
//			var ls = $window.localStorage;
//			var getHistory = function() {
//				var _items = ls.getItem('search-history').split(',');
//				if (_items[0] === '') {
//					_items = [];
//				}
//				return _items;
//			};
//			scope.tips = function() {
//				if (!scope.search.q) {
//					scope.items = getHistory();
//					scope.showHistory = scope.items.length > 0;
//				} else {
//					scope.items = [{
//						name: scope.search.q
//					}];
//					scope.query(scope.search.q);
//				}
//				scope.focus = true;
//			};
//			scope.notips = function() {
//				scope.showHistory = false;
//				scope.items = [];
//				scope.focus = false;
//				scope.search.q = '';
//			};
//			// 清除记录
//			scope.cleanHistory = function() {
//				ls.setItem('search-history', '');
//				scope.items = [];
//				scope.showHistory = false;
//			};
//			// 删除单条记录
//			scope.delHistory = function(name) {
//				var _items = getHistory();
//				var _index = _items.indexOf(name);
//				if (_index !== -1) {
//					_items.splice(_index, 1);
//				}
//				if (_items.length === 0) {
//					scope.cleanHistory();
//				}
//				ls.setItem('search-history', _items.join(','));
//				scope.items = _items;
//			};
//			// 本地存储
//			if (!ls.getItem('search-history')) {
//				scope.cleanHistory();
//			}
//			// 到结果页
//			scope.detail = function(item) {
//				var _items = getHistory();
//				if (_items.indexOf(item) === -1) {
//					_items.push(item);
//					ls.setItem('search-history', _items.join(','));
//				}
//				$rootScope.search_q = item;
//				$rootScope.$state.go('search-result', {
//					name: item
//				});
//				scope.notips();
//			};
//			scope.query = function(q) {
//				new Search.Suggestion(q).query().then(function(res) {
//					if (res.suggest && res.suggest.doctor) {
//						scope.items = scope.items.concat(res.suggest.doctor);
//					}
//					if (scope.items.length <= 1) {
//						scope.noRecord = true;
//					}
//				});
//				scope.showHistory = false;
//			};
//			scope.doq = function($event) {
//				if ($event.keyCode === 13) {
//					$rootScope.search_q = scope.search.q;
//					$rootScope.$state.go('search-result', {
//						name: scope.search.q
//					});
//				}
//			};
//			scope.$watch('search.q', function(q, o) {
//				if (q != o && q) {
//					scope.items = [{
//						name: q
//					}];
//					scope.query(q);
//				}
//				if (!q && o) {
//					scope.noRecord = false;
//					// 删除输入后要给点提示
//					scope.tips();
//				}
//				if (!q && !o) {
//					scope.noRecord = false;
//					scope.notips();
//				}
//			});
//		}
//	};
//});