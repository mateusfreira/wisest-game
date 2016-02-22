(function() {
	var io = require('socket.io')(3001);
	var PvP = require('./PvP');

	var rooms = {};
	var gameServer;

	io.on('connection', function (socket) {
		console.log("connection");
		socket.on("connectServer", function() {
			gameServer = socket;

			gameServer.on("createRoom", function(data){
				console.log("createdeRoom", data.room);
				if (!rooms[data.room]) {
					console.log("---> room created", data.room);
					rooms[data.room] = new PvP(gameServer, data.room);
					console.log("---> exists? ", !!rooms[data.room]);
				}
				//else
				//	socket.emit("createRoomError", {message: "The room " + room + " already exists."});
			});

			gameServer.on("updateGameInfo", function(data) {
				console.log("updateGameInfo");
				if (rooms[data.room]) {
					console.log("---> sending gameInfo", JSON.stringify(data));
					io.to(data.room).emit("gameInfo", { gameInfo: data.gameInfo });
				}
			});

			gameServer.on("startGame", function(data) {
				console.log("startGame");
				if (rooms[data.room]) {
					console.log("---> sending startGame", data);
					io.to(data.room).emit("startGame", {});
				}
			});
		});

		socket.on('subscribe', function (data) {
			console.log("subscribe");
			try {
				console.log("---> data", JSON.stringify(data));
				console.log("---> exists? ", !!rooms[data.room]);
				if (rooms[data.room]) {
					console.log("---> addPlayer");
					rooms[data.room].addPlayer(socket);
					socket.join(data.room);
					console.log("---> isReady? ", rooms[data.room].isReady());
					if (rooms[data.room].isReady()){
						console.log("---> startGame");
						rooms[data.room].startGame();
					}
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