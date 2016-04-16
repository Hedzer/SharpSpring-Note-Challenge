define(
	[
		'frameworks/syrup',
		'models/note',
		'components/mixins/scalable'
	],
	function(Syrup, modelNote, scalable){
		function noteListItem(){
			var notelistitem = this;
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			div.call(this);
			scalable(this);
			this.class = 'noteListItem';
			this.classList.add('note-list-item');
			//Visual Additions
			this.add(new div()).as('Icon').with(function(){
				this.classList.add('icon');
			});
			this.add(new div()).as('Body').with(function(){
				this.classList.add('body');
				this.add(new div()).as('Title').with(function(){
					this.classList.add('title');
					this.add(new span()).as('Text').with(function(){
						this.classList.add('text');
					});
				});
				this.add(new div()).as('Fader').with(function(){
					this.classList.add('fader');
				});
				this.add(new div()).as('Date').with(function(){
					this.classList.add('date');
					this.add(new span()).as('Text').with(function(){
						this.classList.add('text');
					});
				});
			});
			//Properties & Methods
			this.useHandles = {};
			this.uses = modelNote;
			this.add('boundTo');

			//Events
			var unbind = this.unbind;
			this.on('destructed', function(){
				unbind();
			});
		}
		noteListItem.prototype = Object.create(Syrup.Elements.div.prototype);
		noteListItem.prototype.constructor = noteListItem;
		noteListItem.prototype.bindTo = function(item){
			var self = this;
			this.unbind();
			var note = this.uses;
			if (item instanceof note){
				this.boundTo = item;
				var setTitle = function(){
					self.Body.Title.Text.textContent = item.title;
				};
				var setDate = function(){
					var jsDate = new Date(item.dateCreated * 1000);
					self.Body.Date.Text.textContent = jsDate.toLocaleString(self.dateLocale, self.dateOptions);
				};
				this.useHandles.title = item.$.on('title', setTitle);
				this.useHandles.dateCreated = item.$.on('dateCreated', setDate);
				setTitle();
				setDate();
				return;
			}
			console.log('Item: ', item, ' is not and instance of ', this.uses);
		};
		noteListItem.prototype.unbind = function(){
			Object.keys(this.useHandles).forEach(function(handle){
				if (handle && typeof handle.remove === 'function'){
					handle.remove();
				}
			});
		};
		noteListItem.prototype.dateLocale = 'en-US';
		noteListItem.prototype.dateOptions = {
			weekday:'long',
			year:'numeric',
			month:'long',
			day:'numeric'
		};
		return noteListItem;
	}
);