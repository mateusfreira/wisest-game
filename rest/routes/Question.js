module.exports = function(app) {
  var Question = app.controllers.Question;
  app.get('/question/some',
    Question.some
  );
};