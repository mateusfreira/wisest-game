WisestGame.factory('socketClient', ['$window', function($window) {

	function SocketClient() {
    	var socket = $window.io('http://localhost:3001');
		
		this.subscribe = function(room) {
			socket.emit("subscribe", { room: room });
		};

		this.addListener = function(event, method){
			socket.on(event, method);
		};
	}

    return new SocketClient();
}]);