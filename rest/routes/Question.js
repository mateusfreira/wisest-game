module.exports = function(app) {
  var Question = app.controllers.Question;
  app.get('/question/check',
    Question.check
  );
  
};