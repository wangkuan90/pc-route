define(function(require, exports, module) {

	"use strict";
	
	var RouterController = {
		IndexController : function(){
			console.log("HomepageController");
		},
		AnimateController : function(){
			console.log("AnimateController");
		}
	}
	
	return RouterController;
});