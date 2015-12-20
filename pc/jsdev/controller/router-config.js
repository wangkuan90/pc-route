define(function(require, exports, module) {

	"use strict";
	
	var RouterConfig = {
		"#" : {
			url : "",
			container : "#body",
			templateUrl: function(params) {
				return "/html/index.html";
			},
			controller: "IndexController"
		},
		"index" : {
			url : "",
			container : "#body",
			templateUrl: function(params) {
				return "/html/index.html";
			},
			controller: "IndexController"
		},
		"blog" : {
			url : "",
			container : "#animate",
			templateUrl: function(params) {
				params.step = "animate";
				if(params.step === "animate"){
					return "/html/blog/animate.html";
				}
				return "/html/index.html";
			},
			controller: "AnimateController"
		}
	}
	
	return RouterConfig;

});