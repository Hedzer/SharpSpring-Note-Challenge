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
			if (item instanceof this.uses){
				this.boundTo = item;
				this.useHandles.title = item.$.on('title', function(e){
					self.Body.Title.Text.textContent = item.title;
				});
				this.useHandles.dateCreated = item.$.on('dateCreated', function(e){
					var jsDate = new Date(item.dateCreated * 1000);
					self.Body.Date.Text.textContent = date.toLocaleString(self.dateLocale, self.dateOptions);
				});
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