(function() {
	var io = require('socket.io')(3001);
	var PvP = require('./PvP');

	var rooms = {};
	var gameServerSocket;

	io.on('connection', function (socket) {
		
		socket.on("wisestGameServer", function() {
			gameServerSocket = socket;

			gameServerSocket.on("createRoom", function(data){
				if (!rooms[data.room]) {
					if (data.pvp)
						rooms[data.room] = new PvP(gameServerSocket, data.room);
					else if (data.tvt)
						console.log("not implemented yet"); // tvt game
				}
				else
					socket.emit("createRoomError", {message: "The room " + room + " already exists."});
			});

			gameServerSocket.on("updateGameInfo", function(data) {
				if (rooms[data.room]) {
					io.to(data.room).emit("gameInfo", { startTime: data.startTime, context: data.context });
				}
			});
		});

		socket.on('subscribe', function (data) {
			try {
				if (rooms[data.room]) {
					rooms[data.room].addPlayer(socket);
					socket.join(data.room);
					if (rooms[data.room].isReady())
						rooms[data.room].startGame();
				}
				//else
				//	socket.emit("inexistentRoom", { message: "The room " + room + " doesn't exists."});
		    } catch(e) {
		    	console.log(e);
		    	//socket.emit("error", { error: e });
		    }
		});
	});
})();