define(
	[
		'frameworks/syrup',
		'components/app',
		'components/sharpnotes/navbar',
		'components/page',
		'components/sharpnotes/noteList'
	],
	function(Syrup, app, navigation, page, list){
		function SharpNotes(){
			app.call(this);
			this.class = 'SharpNotes';
			this.classList.add('SharpNotes');
			//Navigation
			this.add(new navigation()).as('Navigation');
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
	}
);