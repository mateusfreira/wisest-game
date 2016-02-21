angular.module("WisestGame").controller('QuestionController', ['$location', 'Themes', 'Question', function($location, Themes, Question) {
	
	var requiredProperties = ["description", "options", "answer", "level", "difficulty", "theme"];
	var self = this;

	this.themes = Themes.query();

	this.question = {
		options:[]
	};

	function isValid(question) {
		return requiredProperties.every(function(property) {
			if (Array.isArray(question[property]))
				return question[property].length >= 2;	
			else
				return question[property];
		});
	}

	this.save = function() {
		if (isValid(this.question)) {
			var question = new Question(this.question);
			question.$save(function(response) {
				self.question = {};
			}, function(error) {
				console.error(error);
			});
		} else {
			alert("fill all required properties");
		}
	};

	this.cancel = function() {
		$location.path('questions');
	};

}]);