var GameService = require('../services/GameService');

module.exports = function(app) {

	function SocketClient() {
		socket = require('socket.io-client')('http://localhost:3001');
		socket.emit("connectServer", {});

		var self = this;

		this.createRoom = function(room, mode) {
			socket.emit("createRoom", { room: room, mode: mode });
		};

		this.updateGameInfo = function(room) {
			return GameService.getGameInfo(room).then(function(gameInfo){
				socket.emit("updateGameInfo", { room: room, gameInfo: gameInfo });
			});
		};

		socket.on("startGame", function(data){
			GameService.startGame(data.room);
			self.updateGameInfo(data.room).then(function(){
				socket.emit("startGame", { room: data.room });
			})
		});

		socket.on("updateGameInfo", function(data) {
			self.updateGameInfo(data.room);
		})
	}

	app.socket = new SocketClient();

	return app.socket;
};