(function() {
	var io = require('socket.io')(3001);
	var PvP = require('./PvP');

	var rooms = {};
	var gameServer;

	io.on('connection', function (socket) {
		
		socket.on("connectServer", function() {
			gameServer = socket;

			gameServer.on("createRoom", function(data){
				console.log("createRoom", data.room);
				if (!rooms[data.room]) {
					if (data.pvp)
						rooms[data.room] = new PvP(gameServer, data.room);
					else if (data.tvt)
						console.log("not implemented yet"); // tvt game
				}
				else
					socket.emit("createRoomError", {message: "The room " + room + " already exists."});
			});

			gameServer.on("updateGameInfo", function(data) {
				console.log("updateGameInfo");
				if (rooms[data.room]) {
					io.to(data.room).emit("gameInfo", { startTime: data.startTime, context: data.context });
				}
			});
		});

		socket.on('subscribe', function (data) {
			console.log("subscribe");
			console.log(data);
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