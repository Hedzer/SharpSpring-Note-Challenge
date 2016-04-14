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
			var sharpnotes = this;
			app.call(this);
			this.class = 'SharpNotes';
			this.classList.add('SharpNotes');
			//Properties
			this.add('loggedIn', false);
			//Navigation
			this.add(new navigation()).as('Navigation').with(function(){
				this.classList.add('transitions-all');
				this.classList.add('invisible');
				this.classList.add('intangible');
				this.on('logoutRequested', function(e){
					//cheap logout, for now
					server.token = false;
					sharpnotes.checkLogin();
				});
			});
			//Page
			this.add(new page()).as('Page').with(function(){
				this.classList.add('invisible');
				this.classList.add('intangible');
				this.add(new list()).as('NoteList').with(function(){
					this.classList.add('note-list');
					this.classList.add('transitions-all');
				});
			});
			//Modal
			this.add(new modal()).as("LoginModal").with(function(){
				this.classList.add('transitions-all');
				this.classList.add('invisible');
				this.classList.add('intangible');
				this.add(new login()).as("Login").with(function(){
					this.Submit.classList.add('transitions-all');
					this.Message.classList.add('transitions-all');
					this.on('loginSucceeded', function(e){
						sharpnotes.checkLogin();
						this.Message.reset();
					});
					this.on('loginFailed', function(e){
						sharpnotes.checkLogin();
					});
				});
			});
			//Needs to be moved
			this.checkLogin = function(){
				var modalAction = (server.token ? 'add' : 'remove');
				var appAction = (!server.token ? 'add' : 'remove');
				//can be turned into a loop later
				this.LoginModal.classList[modalAction]('intangible');
				this.Navigation.classList[appAction]('intangible');
				this.Page.classList[appAction]('intangible');

				this.LoginModal.classList[modalAction]('invisible');
				this.Navigation.classList[appAction]('invisible');
				this.Page.classList[appAction]('invisible');
			};
			this.checkLogin();
		}
		SharpNotes.prototype = Object.create(app.prototype);
		SharpNotes.prototype.constructor = SharpNotes;
		return SharpNotes;
	}
);