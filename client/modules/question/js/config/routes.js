/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // Create question
        .state('createQuestion', {
            url: "/questions/create",
            templateUrl: "modules/question/template/createQuestion.html",
            data: {pageTitle: 'Create a question'},
            controller: "QuestionController"
        })

        .state('viewQuestion', {
            url: "/questions/:questionId",
            templateUrl: "modules/question/template/viewQuestion.html",
            data: {pageTitle: 'Question'},	
            controller: "QuestionController"
        })

        .state('editQuestion', {
            url: "/questions/:questionId/edit",
            templateUrl: "modules/question/template/editQuestion.html",
            data: {pageTitle: 'Edit a question'},
            controller: "QuestionController"
        })

        .state('listQuestions', {
            url: "/questions",
            templateUrl: "modules/question/template/listQuestions.html",
            data: {pageTitle: 'Questions'},
            controller: "QuestionController"
        });

}]);