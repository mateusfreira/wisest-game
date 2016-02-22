Mousetrap.bind("up", function() {
	function focusCurrent() {
		$(window.currentItem).focus();
	}

	// $(window.currentItem).off();
	var currentItem = $(window.currentItem)[0];
	var items = $("[game-tab]").toArray();
	var currentIndex = items.indexOf(currentItem);
	var nextIndex = currentIndex - 1 % items.length;

	for(var i=0; i<items.length; i++) {
		if(i == nextIndex) {
			window.currentItem = items[i];
			$(window.currentItem).focus();
			// $(window.currentItem).on("blur", focusCurrent);
		}
	}
});

Mousetrap.bind("down", function() {

	function focusCurrent() {
		// $(window.currentItem).focus();
	}

	// $(window.currentItem).off();
	var currentItem = $(window.currentItem)[0];
	var items = $("[game-tab]").toArray();
	var currentIndex = items.indexOf(currentItem);
	var nextIndex = currentIndex + 1 % items.length;

	for(var i=0; i<items.length; i++) {
		if(i == nextIndex) {
			window.currentItem = items[i];
			$(window.currentItem).focus();
			// $(window.currentItem).on("blur", focusCurrent);
		}
	}
});

angular.module("WisestGame").directive('gameTabHelper', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs, $controller) {
			setTimeout(function() {
				$element.find("[game-tab]:first").focus();
				window.currentItem = $element.find("[game-tab]:first")[0];
			}, 500);
		}
	};
});