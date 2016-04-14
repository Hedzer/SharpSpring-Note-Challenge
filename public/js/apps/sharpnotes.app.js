define(
	[
		'frameworks/syrup',
		'components/app',
		'components/login',
		'components/modal',
		'components/sharpnotes/navbar',
		'components/page',
		'components/sharpnotes/noteList',
		'controllers/server/api'
	],
	function(Syrup, app, login, modal, navigation, page, list, server){
		function SharpNotes(){
			app.call(this);
			this.class = 'SharpNotes';
			this.classList.add('SharpNotes');
			//Properties
			this.add('loggedIn', false);
			//Navigation
			this.add(new navigation()).as('Navigation');
			//Page
			this.add(new page()).as('Page').with(function(){
				this.add(new list()).as('NoteList').with(function(){
					this.classList.add('note-list');
				});
			});
			//Modal
			this.add(new modal()).as("LoginModal").with(function(){
				this.add(new login()).as("Login");
			});
		}
		SharpNotes.prototype = Object.create(app.prototype);
		SharpNotes.prototype.constructor = SharpNotes;
		return SharpNotes;
	}
);