angular.module("WisestGame").controller('QuestionController', ['$location', '$stateParams', 'Themes', 'Levels', 'Question', function($location, $stateParams, Themes, Levels, Question) {

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
			this.levels = Levels.query();
		}
	};

	this.inListMode = function() {
		this.questions = Question.crud.query();
	};

	this.findOne = function() {
		Question.crud.get({
			questionId: $stateParams.questionId
		}).$promise.then(function(question) {
			self.question = question;
			question.duration = question.duration / 1000;
			return question;
		});
	};

	this.somethingWrong = function(question) {
		Question.somethingWrong(question).then(function() {
			alert("Thank you!");
			self.checkSomeQuestion();
		}).catch(function() {
			alert("Some problem happened trying to approve, Please try again!");
		});

	};

	this.everyThingIsOk = function(question) {
		Question.everythingOk(question).then(function() {
			alert("Thank you!");
			self.checkSomeQuestion();
		}).catch(function() {
			alert("Some problem happened trying to approve, Please try again!");
		});
	};

	this.checkSomeQuestion = function() {

		this.pendingAnswer = false;
		this.currentResponse = undefined;
		Question.nextQuestion()
			.then(function(question) {
				question.duration = question.duration / 1000;
				self.currentQuestion = question;
				self.pendingAnswer = true;
			}).catch(function(err) {
				if (err.status == 500) {
					alert('There is no more question in this theme for you!');
					$location.path('dashboard');
				}
			});
	};

	this.persist = function(method) {
		if (isValid(this.question)) {
			var question;
			if (!this.question._id) {
				this.question = new Question.crud(this.question);
			}

			this.question.duration = this.question.duration * 1000;

			this.question[method](function(response) {
				self.question = response;
				this.edit(response._id);
				$location.path('questions');
			}, function(error) {
				console.error(error);
			});
		} else {
			alert("Fill all required properties");
		}
	};

	this.view = function(question) {
		this.edit(question);
	};

	this.edit = function(question) {
		var id = question || this.question._id;
		$location.path('questions/' + id + "/edit");
	};

	this.backToView = function() {
		$location.path('questions/' + $stateParams.questionId);
	};



	this.backToList = function() {
		$location.path('questions');
	};

	this.backToMenu = function() {
		$location.path('dashboard');
	};

}]);