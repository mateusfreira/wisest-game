angular.module("WisestGame").controller('LoginController', ['$state', 'User', 'settings', function($state, User, settings) {

	this.userContext = {};
	this.loginAnonymous = function() {
		var i = parseInt((Math.random(1) * 100));

		return User.signup.query({
				email: randUsers[i]+(new Date().getTime())+"@starwars.com",
				password: 123456,
				first_name: randUsers[i],
				last_name: randUsers[i]
			}).$promise
			.then(function(response) {
				$state.go("dashboard", {}, {
					location: true
				});
			}).catch(function() {
				alert('');
			});
	};

	this.login = function() {
		User.login.query({
				email: this.userContext.email,
				password: this.userContext.password
			}).$promise
			.then(function(response) {
				settings.user = response;
				$state.go("dashboard", {}, {
					location: true
				});
			})
			.catch(function(err) {
				alert(err.data);
			});
	};

	this.goSignup = function() {
		$state.go("signup", {}, {
			location: true
		});
	};
	var randUsers = [
		"4-LOM",
		"Aayla Secura",
		"Admiral Ackbar",
		"Admiral Thrawn",
		"Ahsoka Tano",
		"Anakin Solo",
		"Asajj Ventress",
		"Aurra Sing",
		"Senator Bail Organa",
		"Barriss Offee",
		"Bastila Shan",
		"Ben Skywalker",
		"Bib Fortuna",
		"Biggs Darklighter",
		"Boba Fett",
		"Bossk",
		"Brakiss",
		"C-3PO",
		"Cad Bane",
		"Cade Skywalker",
		"Callista Ming",
		"Captain Rex",
		"Carnor Jax",
		"Chewbacca",
		"Clone Commander Cody",
		"Count Dooku",
		"Darth Bane",
		"Darth Krayt",
		"Darth Maul",
		"Darth Nihilus",
		"Darth Vader",
		"Dash Rendar",
		"Dengar",
		"Durge",
		"Emperor Palpatine",
		"Exar Kun",
		"Galen Marek",
		"General Crix Madine",
		"General Dodonna",
		"General Grievous",
		"General Veers",
		"Gilad Pellaeon",
		"Grand Moff Tarkin",
		"Greedo",
		"Han Solo",
		"IG 88",
		"Jabba The Hutt",
		"Jacen Solo",
		"Jaina Solo",
		"Jango Fett",
		"Jarael",
		"Jerec",
		"Joruus C'Baoth",
		"Ki-Adi-Mundi",
		"Kir Kanos",
		"Kit Fisto",
		"Kyle Katarn",
		"Kyp Durron",
		"Lando Calrissian",
		"Luke Skywalker",
		"Luminara Unduli",
		"Lumiya",
		"Mace Windu",
		"Mara Jade",
		"Mission Vao",
		"Natasi Daala",
		"Nom Anor",
		"Obi-Wan Kenobi",
		"Padmé Amidala",
		"Plo Koon",
		"Pre Vizsla",
		"Prince Xizor",
		"Princess Leia",
		"PROXY",
		"Qui-Gon Jinn",
		"Quinlan Vos",
		"R2-D2",
		"Rahm Kota",
		"Revan",
		"Satele Shan",
		"Savage Opress",
		"Sebulba",
		"Shaak Ti",
		"Shmi Skywalker",
		"Talon Karrde",
		"Ulic Qel-Droma",
		"Visas Marr",
		"Watto",
		"Wedge Antilles",
		"Yoda",
		"Zam Wesell",
		"Zayne Carrick",
		"Zuckuss"
	];

}]);