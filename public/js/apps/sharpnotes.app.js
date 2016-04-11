define(
	[
		'frameworks/syrup',
		'components/app',
		'components/navbar',
		'components/page',
		'components/matchstick'
	],
	function(Syrup, app, navigation, page, matchstick){
		function SharpNotes(){
			app.call(this);
			this.class = 'SharpNotes';
			this.className = 'SharpNotes';
			//Navigation
			this.add(new navigation()).as('Navigation').with(function(){
				this.brand = '#Sharp Notes';
				//Logout Button
				this.add(new matchstick()).as('Logout').with(function(){
					this.classList.add('logout-button');
					this.classList.add('cursive');
					this.Body.Text.textContent = 'Logout';
					this.Head.style.background = 'black';
					this.Body.style.background = 'red';
				});
			});
			this.add(new page()).as("Page").with(function(){

			});
		}
		SharpNotes.prototype = Object.create(app.prototype);
		SharpNotes.prototype.constructor = SharpNotes;
		return SharpNotes;

		// var App = {
		// 	Navigation:(function(){
		// 		var navigation = new navbar();
		// 		navigation.addTo(document.body);
		// 		navigation.brand = '#Sharp Notes';
		// 		return navigation;			
		// 	})(),
		// 	Page:(function(){

		// 	})(),
		// 	Controller:(function(){

		// 	})()
		// }
	}
);