angular.module("WisestGame").directive('gameLoginField', function() {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs, $controller) {
			var label = $element.find("label");
			var input = $element.find("input");


			function validInput(input) {
				var emailRegex = /.+@.+/;
				var valid = true;
				var name = input.attr("name");
				if((name == "first_name" || name == "last_name") && input.val().length <= 0) {
					valid = false;
				} else if(name == "password" && input.val().length < 6) {
					valid = false;
				} else if(name == "email" && !emailRegex.exec(input.val()) ) {
					valid = false;
				}
				return valid;
			}

			$element.click(function() {
				input.focus();
			});

			input.blur(function() {
				if( !input.val() ) {
					label.show();
				}

				if(validInput(input)) {
					input.removeClass("invalid");
				} else {
					input.addClass("invalid");
				}
			});

			input.focus(function() {
				label.hide();
			});
		}
	};
});