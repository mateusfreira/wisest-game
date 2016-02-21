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

	this.inEditMode = function() {
		if (!this.themes.length) {
			this.themes = Themes.query();
		}
	};

	this.inListMode = function() {
		this.questions = Question.query();
	};

	this.findOne = function() {
		this.question = Question.get({
			questionId: $stateParams.questionId
		});
	};
	
	this.checkSomeQuestion = function() {

		this.pendingAnswer = false;
		this.currentResponse = undefined;
		Game.nextQuestion.query()
			.$promise
			.then(function(question) {
				console.log(question);
				self.currentQuestion = question;
				self.pendingAnswer = true;
			})
			.catch(function(err) {
				console.error(err);
			});
	};

	this.persist = function(method) {
		if (isValid(this.question)) {
			var question;
			if (!this.question._id){
				this.question = new Question(this.question);
			}
			this.question[method](function(response) {
				self.question = response;
				$location.path('questions/' + response._id);
			}, function(error) {
				console.error(error);
			});
		} else {
			alert("fill all required properties");
		}
	};

	this.view = function(question) {
		$location.path('questions/' + question);
	};

	this.edit = function() {
		$location.path('questions/' + this.question._id + "/edit");
	};

	this.backToView = function() {
		$location.path('questions/' + $stateParams.questionId);
	};



	this.backToList = function() {
		$location.path('questions');
	};

}]);