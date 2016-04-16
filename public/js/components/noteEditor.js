define(
	[
		'frameworks/syrup',
		'models/note',
		'components/mixins/scalable',
		'components/modal',
		'components/matchstick',
		'controllers/server/notes'
	],
	function(Syrup, modelNote, scalable, modal, matchstick, Server){
		function noteEditor(){
			Syrup.Elements.div.call(this);
			scalable(this);
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			var textarea = Syrup.Elements.textarea;
			var input = Syrup.Elements.input;
			var img = Syrup.Elements.img;
			var noteeditor = this;
			this.class = 'noteEditor';
			this.classList.add('noteEditor');

			//Visual additions
			this.add(new div()).as('Toolbar').with(function(){
				this.classList.add('toolbar');
				this.add(new matchstick()).as('Save').with(function(){
					this.classList.add('save');
					this.Body.Text.textContent = 'Save';
					this.Head.with(function(){
						this.add(new img()).as('Picture').with(function(){
							this.src = '/images/check.svg.php?color=0000ff';
							this.className = 'svg-icon';
						});						
					});
					this.on('click', function(){
						Server.Notes.update(
							noteeditor.boundTo,
							function saved(response){
								//create modal to let the user know it was saved
								noteeditor.trigger('noteSaved', noteeditor.boundTo);
							},
							function failed(response){
								//create modal to let the user know it was saved
								noteeditor.trigger('noteSavingFailed', response);
							}
						);
					});
				});
				this.add(new matchstick()).as('Dictate').with(function(){
					this.classList.add('dictate');
					this.Body.Text.textContent = 'Read It';
					if (!window.SpeechSynthesisUtterance){
						this.style.display = 'none';
					}
					this.on('click', function(){
						if (noteeditor.utterance && typeof noteeditor.utterance.cancel === 'function'){
							noteeditor.utterance.cancel();
							return;
						}
						var utterance = new SpeechSynthesisUtterance(noteeditor.Note.value);
						noteeditor.utterance = utterance;
						window.speechSynthesis.speak(utterance);
					});
					this.Head.with(function(){
						this.add(new img()).as('Picture').with(function(){
							this.src = '/images/listen.svg.php?color=D8BF00';
							this.className = 'svg-icon';
						});						
					});
				});
				this.add(new matchstick()).as('Delete').with(function(){
					this.classList.add('delete');
					this.Body.Text.textContent = 'Delete';
					this.Head.with(function(){
						this.add(new img()).as('Picture').with(function(){
							this.src = '/images/delete.svg.php?color=ff0000';
							this.className = 'svg-icon';
						});
					});
					this.on('click', function(){
						Server.Notes.delete(
							noteeditor.boundTo.id,
							function saved(response){
								//create modal to let the user know it was saved
								try {
									var response = JSON.parse(response);
									var data = response.data;
									console.log(data);
									if (data){
										noteeditor.trigger('noteDeleted', noteeditor.boundTo.id);
										noteeditor.Title.value = "";
										noteeditor.Note.value = "";								
									}
									//somethign went wrong
								} catch (e){
									//somethign went wrong
									console.log(e);
								}

							},
							function failed(response){
								//create modal to let the user know it was saved
								noteeditor.trigger('noteDeletionFailed', response);
							}
						);
					});
				});
			});
			this.add(new input()).as('Title').with(function(){
				this.classList.add('title');
				this.placeholder = 'Example Title';
			});
			this.add(new div()).as('NoteWrapper').with(function(){
				this.classList.add('note-wrapper');
				this.add(new textarea()).as('Note').with(function(){
					this.classList.add('note');
					this.wrap = 'hard';
					noteeditor.Note = this;
				});
			});

			//Properties & Methods
			this.useHandles = {};
			this.uses = modelNote;
			this.add('boundTo');
			this.add('utterance');

			//Events
			var unbind = this.unbind;
			this.on('destructed', function(){
				unbind();
			});

			//come back to this
			this.on('boundToPropertyChanged', function(){
				var disabled = !(this.boundTo && this.boundTo.id);
				this.Toolbar.Save.disabled = disabled;
				this.Toolbar.Dictate.disabled = disabled;
				this.Toolbar.Delete.disabled = disabled;
			});

			var tutorial = new modelNote();
			tutorial.title = 'How To Use SharpNotes';
			tutorial.body = 
'CREATING A NEW NOTE\n\
----------------------------------------------\n\
To create a new note, click on the "+ New Note" button located \n\
on the upper left of the app. After giving the new note a title, it should\n\
become available in the note list located to the left.\n\n\
EDITING A NOTE\n\
----------------------------------------------\n\
Clicking on a note in the list to the left will immediately begin editing it.\n\
To save the note, click on the save button at the top of the editor.\n\
This is the editor, you can click right here - YES! right here! and -\n\
edit any text inside of it.\n\
'
			this.bindTo(tutorial);
		}
		noteEditor.prototype = Object.create(Syrup.Elements.div.prototype);
		noteEditor.prototype.constructor = noteEditor;
		noteEditor.prototype.bindTo = function(item){
			var self = this;
			this.unbind();
			var note = this.uses;
			if (item instanceof note){
				this.boundTo = item;
				var setTitle = function(){
					self.Title.value = (item.title || '');
				};
				var setNote = function(){
					self.NoteWrapper.Note.value = (item.body || '');
				};
				this.useHandles.title = item.$.on('title', setTitle);
				this.useHandles.note = item.$.on('body', setNote);
				var events = ['input', 'keypress', 'onpropertychange'];
				events.forEach(function(name){
					self.useHandles['title'+name] = self.Title.on(name, function(){
						self.boundTo.title = self.Title.value;
					});
					self.useHandles['note'+name] = self.NoteWrapper.Note.on(name, function(){
						self.boundTo.body = self.NoteWrapper.Note.value;
					});
				});
				setTitle();
				setNote();
				return;
			}
			console.log('Item: ', item, ' is not and instance of ', this.uses);
		};
		noteEditor.prototype.unbind = function(){
			Object.keys(this.useHandles).forEach(function(handle){
				if (handle && typeof handle.remove === 'function'){
					handle.remove();
				}

			});
		};
		return noteEditor;
	}
);