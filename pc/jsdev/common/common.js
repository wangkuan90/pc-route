define(function(require, exports, module){
	
	"use strict";
	
	var $ = require("jquery");
	
	return {
		ajax: function(url, options) {
			// Ajax参数
			var params = {
				url: url,
				cache: false,
				type: 'get',
				dataType: 'json',
				contentType: "application/json",
				beforeSend: function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("accept", "application/json");
					XMLHttpRequest.setRequestHeader("content-type", "application/json");
				}
			}
			options = $.extend(params, options);
			// 定义延迟对象
			var defer = $.Deferred();
			$.ajax(options)
			.done(function(res) {
				
			})
			.fail(function(res) {
				// 失败
				console.log('something error');
			});

			return defer.promise();
		},
		getHtml: function(url) {
			var params = {
				url: "./pc/"+url,
				cache: false,
				type: 'get',
				dataType: 'html'
			}
			// 定义延迟对象
			var defer = $.Deferred();
			$.ajax(params)
			.done(function(res) {
				defer.resolve(res);
			})
			.fail(function(res) {
				// 失败
				console.log('something error');
				defer.reject();
			});
			return defer.promise();
		},
		get : function(url, options, other){
			// Ajax参数
			for(var i in options){
				url += ("&" + i + "=" +options[i]);
			}
			var options = {
				url: url,
				type: "GET",
				dataType: "script"
			}
			options = $.extend({}, options, other);
			// 定义延迟对象
			$.ajax(options);
		},
		getUrl : function(startStr, endStr, isContainer, targetStr){
			//@parms : startStr		起始字符串
			//@parms : endStr  		结束字符串
			//@parms : isContainer   是否包含
			//@parms : targetStr		目标字符串
			startStr = startStr || "#";
			endStr = endStr || "?";
			targetStr = targetStr || location.href;
			
			if(!targetStr.contain(startStr)){
				return "";
			}
			var url = (isContainer ? startStr : "") + targetStr.split(startStr)[1];
			return url.contain(endStr) ? url.split(endStr)[0] : url + (isContainer ? endStr : "");
		},
		getParams : function(url){
			
			var params = url.substring(url.lastIndexOf('?')+1);
			var paramsObj = {}, sp = [];
			if(params.length > 0) {
				sp = params.split('&');
			}
			// 获取url参数
			for(var i = 0, _l = sp.length; i < _l; i++) {
				var item = sp[i].split('=');
				paramsObj[item[0]] = item[1];
			}
			return paramsObj;
		}
	}
});