"use strict";

angular.module("controller.home", [])

.controller("HomeController", function($scope, $rootScope) {

	$scope.goUiCss = function() {
		$scope.$state.go("ui-css");
	}

});