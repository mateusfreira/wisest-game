module.exports = function(app) {
    var Question = app.controllers.Question;
    
    app.route('/questions')
       .get(Question.findAll)
       .post(Question.create);

    app.route('/questions/:questionId')
       .get(Question.findOne)
       .put(Question.update)
       .delete(Question.delete);

    app
       .route('/questions/:questionId/everythingOk')
       .get(Question.everythingOk);
    app
       .route('/questions/:questionId/somethingWrong')
       .get(Question.somethingWrong);       

    app
       .route('/questions/nextToApprove')
       .post(Question.nextToApprove);

    app.param('questionId', Question.findById);
};