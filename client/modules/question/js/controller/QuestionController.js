angular.module("WisestGame").controller('QuestionController', ['$location', '$stateParams', 'Themes', 'Question', function($location, $stateParams, Themes, Question) {
	
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
				self.question = response;
				$location.path('questions/' + response._id);
			}, function(error) {
				console.error(error);
			});
		} else {
			alert("fill all required properties");
		}
	};

	this.findOne = function() {
		if (!this.question._id) {
			this.question = Question.get({
				questionId: $stateParams.questionId
			});
		}
	};

	this.backOrCancel = function() {
		$location.path('questions');
	};

}]);