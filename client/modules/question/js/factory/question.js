angular.module('WisestGame').factory('Question', ['$resource', 'settings',
	function($resource, settings) {
		return {
			getNextQuestion: $resource(settings.serverUrl + '/questions/nextToApprove', {}, {
				query: {
					method: 'POST',
					params: {},
					isArray: false
				}
			}),
			nextQuestion : function(){
				return this.getNextQuestion.query().$promise;
			},
			crud: $resource(settings.serverUrl + '/questions/:questionId', {
				questionId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			}),
			everythingOk: function(questionId) {
				return this.doEverythingOk.get({
					questionId: questionId
				}).$promise;
			},
			doEverythingOk: $resource(settings.serverUrl + '/questions/:questionId/ideverythingOk', {
				questionId: '@_id'
			})
		};
	}
]);