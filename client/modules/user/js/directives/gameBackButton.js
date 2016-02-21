angular.module("WisestGame").directive('gameBackButton', function() {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs, $controller) {
			$element.click(function() {
				window.history.back();
			});
		}
	};
});