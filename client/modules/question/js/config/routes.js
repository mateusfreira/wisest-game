/* Setup Rounting */
angular.module("WisestGame").config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // Create question
        .state('createQuestion', {
            url: "/questions/create",
            templateUrl: "modules/question/template/createQuestion.html",
            data: {pageTitle: 'Create a question'}
        })
        .state('correctQuestion', {
            url: "/questions/correct",
            templateUrl: "modules/question/template/correctQuestion.html",
            data: {pageTitle: 'Correct Question'}
        })        
        .state('viewQuestion', {
            url: "/questions/:questionId",
            templateUrl: "modules/question/template/viewQuestion.html",
            data: {pageTitle: 'Question'}
        })

        .state('editQuestion', {
            url: "/questions/:questionId/edit",
            templateUrl: "modules/question/template/editQuestion.html",
            data: {pageTitle: 'Edit a question'}
        })

        .state('listQuestions', {
            url: "/questions",
            templateUrl: "modules/question/template/listQuestions.html",
            data: {pageTitle: 'Questions'}
        });

}]);