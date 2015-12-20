"use strict";

angular.module("service.common", [])

.factory("Auth", function($rootScope) {
	return {
		doLogout: function() {
			$rootScope.removeModuleScope();
			$rootScope.$$isLogin = false;
			$rootScope.$$profile = null;
		}
	}
})

.factory("XHR", function($rootScope, $q, $http, $ionicLoading, $ionicHistory, Auth) {
	return {
		app: function(url, data, headers) {
			for (var key in headers) {
				$http.defaults.headers.common[key] = headers[key];
			}
			var defer = $q.defer();
			$http.post($GC.localServer + url, data, {
				withCredentials: true
			}).success(function(res) {
				defer.resolve(res);
			});
			return defer.promise;
		}
	};
})

.factory("Formatter", function() {
	return {
		/**
		 * 日期格式转换
		 * @param str
		 * @returns {*}
		 */
		date: function(str) {
			return str.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})/, "$1-$2-$3");
		}
	}
})

/**
 * 倒计时
 * @param  {[type]} $cookieStore [description]
 * @return {[type]}              [description]
 */
.factory("CountDown", function($rootScope) {
	return {
		counter: function(name) {
			var self = this;
			setTimeout(function() {
				self.counter();
				$rootScope.$apply($rootScope.$sleep = self.sleep());
			}, 1000);
		},
		sleep: function(sec, firstRun) {
			var self = this,
				now = +(new Date().getTime()),
				point = $getCookie("waitPoint");
			if ((!point || point <= now) && firstRun) {
				point = now + sec * 1000;
				$setCookie("waitPoint", point);
			}
			return (point - now) > 0 ? Math.floor((point - now) / 1000) : 0;
		}
	}
})


.factory('Valid', function($ionicLoading) {
	return {
		form: function(form) {
			if (form.$invalid) {
				angular.forEach(form, function(item, key) {
					if (key.indexOf('$') === -1) {
						if (form[key].$invalid) {
							$ionicLoading.show({
								template: form[key].$error.required ? '请选填:' + key : key + "格式错误",
								duration: 1500
							});
							throw key + '错误';
						}
					}
				});
				throw 'Form valid error.';
			}
		}
	};
})

.factory("Popup", function($ionicPopup) {

	return $ionicPopup;

})

.factory("UserAgent", function() {
	var u = navigator.userAgent;
	return {
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
		iPad: u.indexOf('iPad') > -1,
		wx: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
	}
})