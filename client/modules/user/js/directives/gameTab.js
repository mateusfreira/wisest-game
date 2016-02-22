Mousetrap.bind("enter", function() {
	$("#enter-sound")[0].play();
});

Mousetrap.bind("up", function() {
	var currentItem = $(window.currentItem)[0];
	var items = $("[game-tab]").toArray();
	var currentIndex = items.indexOf(currentItem);
	var nextIndex = currentIndex - 1 % items.length;

	for(var i=0; i<items.length; i++) {
		if(i == nextIndex) {
			window.currentItem = items[i];
			$(window.currentItem).focus();
			$("#menu-sound")[0].play();
		}
	}
});

Mousetrap.bind("down", function() {
	var currentItem = $(window.currentItem)[0];
	var items = $("[game-tab]").toArray();
	var currentIndex = items.indexOf(currentItem);
	var nextIndex = currentIndex + 1 % items.length;

	for(var i=0; i<items.length; i++) {
		if(i == nextIndex) {
			window.currentItem = items[i];
			$(window.currentItem).focus();
			$("#menu-sound")[0].play();
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