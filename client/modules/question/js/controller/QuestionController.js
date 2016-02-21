angular.module("WisestGame").controller('QuestionController', ['$location', '$stateParams', 'Themes', 'Question', 'Game', function($location, $stateParams, Themes, Question, Game) {

	var requiredProperties = ["description", "options", "answer", "level", "difficulty", "theme"];
	var self = this;

	this.themes = [];
	this.questions = [];
	this.question = {
		options: []
	};

	function isValid(question) {
		return requiredProperties.every(function(property) {
			if (Array.isArray(question[property]))
				return question[property].length >= 2;
			else
				return question[property];
		});
	}

	this.inCreateMode = function() {
		if (!this.themes.length) {
			this.themes = Themes.query();
		}
	};

	this.inListMode = function() {
		this.questions = Question.query();
	};

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
	this.checkSomeQuestion = function() {
		this.pendingAnswer = false;
		this.currentResponse = undefined;

		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				self.currentQuestion = question;
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				console.error(err);
			});
	};
	this.backOrCancel = function() {
		$location.path('questions');
	};

}]);