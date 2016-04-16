define(
	[
		'components/list',
		'controllers/sharpnotes/noteList',
		'components/matchstick',
		'components/noteListItem',
		'models/note',
		'controllers/server/notes'
	],
	function(list, controller, matchstick, noteListItem, note, Server){
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
				this.on("click", function(){
					Server.Notes.create(
						{},
						function success(response){
							try {
								var response = JSON.parse(response);
								var data = response.data;
								if (typeof data === 'object'){
									var noteId = data.id;
									notelist.addNote(data);
									notelist.Items.clear();
									notelist.Items.render();
									var view = notelist.Items.rendered[noteId];
									if (view){
										view.trigger('click');
									}
								}
							} catch(e){}

						},
						function failure(response){}
					);					
				});

			});

			//Properties & Methods
			this.add(['note', 'noteTypes']);
			this.Items.Render.view = noteListItem;
			this.Items.sorter = function(a,b){
				return (b.dateCreated - a.dateCreated);
			};
			var lastSelected = false;
			this.Items.Render.controller = function(view, item){
				if (view && typeof view.on === 'function'){
					view.on('click', function(){
						if (lastSelected && lastSelected !== view){
							lastSelected.classList.remove('selected');
						}
						view.classList.add('selected');
						lastSelected = view;
						notelist.note = item;
					});					
				}
			};
			this.addNote = function(record){
				var item = new note();
				item.id = record.id;
				item.title = record.title;
				item.body = record.body;
				try {
					var t = record.updated_at.split(/[- :]/);
					var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]).valueOf();
					item.dateCreated = d;									
				} catch(e){}
				item.type = notelist.noteTypes[record.typeId];
				notelist.Items.add(item);
			};
			this.getNotes = function(){
				//this needs a service for the note models but there's no time
				Server.Notes.list(function(raw){
					//for now discarding types
					//also api post service is malfunctioning
					try {
						var response = JSON.parse(raw);
						var data = response.data;
						if (data && data.types && Array.isArray(data.types)){
							notelist.noteTypes = {};
							data.types.forEach(function(type){
								notelist.noteTypes[type.id] = type.name;
							});
						}
						if (data && data.notes && Array.isArray(data.notes)){
							notelist.Items.removeAll(); //should take the time out to merge properly vs clear and update
							data.notes.forEach(notelist.addNote);
							notelist.Items.render();
						}
					} catch (e){

					}

				});
			};
		}
		noteList.prototype = Object.create(list.prototype);
		noteList.prototype.constructor = noteList;
		return noteList;
	}
);