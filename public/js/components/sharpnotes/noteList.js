define(
	[
		'components/list',
		'controllers/sharpnotes/noteList',
		'components/matchstick',
		'components/noteListItem'
	],
	function(list, controller, matchstick, noteListItem){
		function noteList(){
			//Initialization
			var notelist = this;
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			var img = Syrup.Elements.img;
			list.call(this);
			this.class = 'noteList';
			this.classList.add('note-list');

			//Visual Additons
			this.Menu.add(new matchstick()).as('AddNote').with(function(){
				var addNote = this;
				['add-note','button-b','transitions-background-color', 'cursive'].forEach(function(c){
					addNote.classList.add(c);
				});
				this.Head.add(new img()).as('Picture').with(function(){
					this.src = '/images/add.svg.php?color=82ad2c';
					this.className = 'svg-icon';
				});
				this.Body.Text.with(function(){
					this.textContent = 'New Note';
				});
			});

			//Properties
			this.Items.Render.view = noteListItem;
			this.Items.Render.controller = function(view, item){
				
			};
		}
		noteList.prototype = Object.create(list.prototype);
		noteList.prototype.constructor = noteList;
		return noteList;
	}
);