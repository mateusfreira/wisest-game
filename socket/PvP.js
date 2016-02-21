module.exports = (function(argument) {
	
	var playerProperties = ["socket", "name", "level", "score"];

	function PvP(gameServer, room) {
		this.room = room;
		this.gameServer = gameServer;
		this.players = [];
		this._isStarted = false;
	}

	PvP.prototype.addPlayer = function(socket) {
		if (this.isReady()) throw new Error("This room is full");
		this.players.push(socket);
	};

	PvP.prototype.startGame = function() {
		if (this.isReady() && !this._isStarted) {
			this._isStarted = true;
			this.gameServer.emit("startGame", { room: this.room });
		}
	};

	PvP.prototype.isReady = function() {
		return this.players.length === 2;
	}

	function checkPlayerProperties(player) {
		var isValid = playerProperties.every(function(property){
			return player.hasOwnProperty(property);
		});

		if (!isValid) {
			throw new Error("Missing properties! Player invalid!", 500);
		}
	}

	function buildPlayerInfo(socket, player) {
		return {
			socket: socket,
			data: player
		};
	}

	return PvP;

})();