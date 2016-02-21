var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	requireModule = require('./').requireModule,
	Score = requireModule('Score');

var QuestionSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	code: String,
	theme: {
		type: Schema.ObjectId,
		ref: 'Theme',
		required: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'Theme'
	},
	options: {
		type: Array,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	level: {
		type: Schema.ObjectId,
		ref: 'Theme'
	}, // required: true },
	difficulty: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		default: 30000,
		required: true
	},
	approved: {
		type: Boolean,
		default: false
	},
	reviewers: [{
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		created_at: Date,
		approved: Boolean
	}],
	created_at: {
		type: Number,
		default: Date.now
	},
	updated_at: Date
});

QuestionSchema.methods.addReviewer = function(userId, approved) {
	this.reviewers.push({
		user: userId,
		created_at: new Date(),
		approved: approved
	});
	if (this.reviewers.filter(function(reviewer) {
			return reviewer.approved;
		}).length >= 3) {
		this.approved = true;
	}
	return this.save();
};

QuestionSchema.methods.checkAnswer = function(answer) {
	return this.answer === answer;
};

QuestionSchema.statics.someToApprove = function(user) {
	var self = this;
	console.log("asdadasdasd", user);
	return this.someRandon({
		user: { $ne : user},
		'reviewers.user' : { $ne : user},
		approved: false
	});
};

QuestionSchema.statics.some = function(user, theme) {
	var self = this;
	var questionToDontDisplay = [];
	return Score.find({
			user: user,
			hit: true,
			approved: false
		}, "question").then(function(scores) {
			return scores.map(function(score) {
				return score.question;
			});
		})
		.then(function(questionToDontDisplay) {
			return self.someRandon({
				theme: theme,
				"_id": {
					$nin: questionToDontDisplay
				}
			});
		})

};

QuestionSchema.statics.someRandon = function(filter) {
	var self = this;
	return self
		.count(filter)
		.then(function(count) {
			return self.findOne(filter)
				.skip(Math.floor(Math.random() * count));
		}).catch(function(e) {
			return e;
		});
};

QuestionSchema.statics.checkAnswerById = function(id, answer) {
	var self = this;
	return self.findById(id)
		.then(function(question) {
			return question.checkAnswer(answer);
		});
}

module.exports = mongoose.model('Question', QuestionSchema);