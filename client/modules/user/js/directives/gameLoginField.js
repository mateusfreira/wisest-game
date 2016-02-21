angular.module("WisestGame").directive('gameLoginField', function() {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs, $controller) {
			var label = $element.find("label");
			var input = $element.find("input");

			$element.click(function() {
				input.focus();
			});

			input.blur(function() {
				if( !input.val() ) {
					label.show();
				}
			});

			input.focus(function() {
				label.hide();
			});
		}
	};
});