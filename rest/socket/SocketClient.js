module.exports = function(app) {

	function SocketClient() {
		socket = require('socket.io-client')('http://localhost:3001');
		socket.emit("connectServer", {});

		var self = this;

		this.createRoom = function(room, mode) {
			socket.emit("createRoom", { room: room, mode: mode });
		};

		this.updateGameInfo = function(room, startTime, context) {
			socket.emit("updateGameInfo", { room: room, startTime: startTime, context: context });
		};

		socket.on("startGame", function(data){
			self.updateGameInfo(data.room, new Date().getTime(), {});
		});
	}

	app.socket = new SocketClient();

	return app.socket;
};