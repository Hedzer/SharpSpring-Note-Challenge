define(
	[
		'frameworks/syrup',
		'components/app',
		'components/navbar',
		'components/page',
		'components/matchstick',
		'components/responsiveImage',
		'components/sharpnotes/noteList'
	],
	function(Syrup, app, navigation, page, matchstick, responsiveImage, list){
		function SharpNotes(){
			app.call(this);
			this.class = 'SharpNotes';
			this.className = 'SharpNotes';
			//Navigation
			this.add(new navigation()).as('Navigation').with(function(){
				this.brand = '#Sharp Notes';
				//Logout Button
				this.add(new matchstick()).as('Logout').with(function(){
					var logoutButton = this;
					var buttonText = logoutButton.Body.Text;
					//classes to add
					['logout-button', 'cursive'].forEach(function(c){
						logoutButton.classList.add(c);
					});
					this.Body.Text.textContent = 'Logout';
				});
			});
			//Page
			this.add(new page()).as('Page').with(function(){
				this.add(new list()).as('NoteList').with(function(){
					this.classList.add('note-list');
				});
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