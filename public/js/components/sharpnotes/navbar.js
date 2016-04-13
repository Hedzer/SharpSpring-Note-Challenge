define(
	[
		'components/navbar',
		'controllers/sharpnotes/navbar',
		'components/matchstick',

	],
	function(navbar, controller, matchstick){
		function sharpnotesNavbar(){
			navbar.call(this);
			this.class = 'sharpnotesNavbar';
			this.classList.add('sharpnotes-navbar');
			this.brand = '#Sharp Notes';
			//Logout Button
			this.add(new matchstick()).as('Logout').with(function(){
				var logoutButton = this;
				var buttonText = logoutButton.Body.Text;
				//classes to add
				['logout-button', 'button-a','transitions-background-color', 'cursive'].forEach(function(c){
					logoutButton.classList.add(c);
				});
				this.Body.Text.textContent = 'Logout';
			});
		}
		sharpnotesNavbar.prototype = Object.create(navbar.prototype);
		sharpnotesNavbar.prototype.constructor = sharpnotesNavbar;
		return sharpnotesNavbar;
	}
);