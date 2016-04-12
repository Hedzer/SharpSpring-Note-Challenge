define(
	[
		'components/list',
		'controllers/sharpnotes/noteList',
		'components/matchstick'
	],
	function(list, controller, matchstick){
		function noteList(){
			//Initialization
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			var img = Syrup.Elements.img;
			list.call(this);
			this.class = 'noteList';
			this.classList.add('note-list');

			//Visual Additons
			this.Menu.add(new matchstick()).as('AddNote').with(function(){
				this.classList.add('add-note');
				this.Head.add(new img()).as('Picture').with(function(){
					this.src = '/images/add.svg';
					this.className = 'svg-icon';
				});
				this.Body.Text.with(function(){
					this.textContent = 'New Note';
					this.classList.add('cursive');
				})
			});

		}
		noteList.prototype = Object.create(list.prototype);
		noteList.prototype.constructor = noteList;
		return noteList;
	}
);