module.exports = function(app) {
    var Question = app.controllers.Question;
    
    app.route('/questions')
       .get(Question.findAll)
       .post(Question.create);

    app.route('/questions/:questionId')
       .get(Question.findOne)
       .put(Question.update)
       .delete(Question.delete);

    app.param('questionId', Question.findById);
};