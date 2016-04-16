define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function list(){
			//Initialization
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			div.call(this);
			scalable(this);
			this.class = 'list';
			this.className = 'list';

			//Visual Additons
			this.add(new div()).as("Menu").with(function(){
				this.classList.add('menu');
			});
			this.add(new div()).as("Collection").with(function(){
				this.classList.add('collection');
			});
			// API Portions
			this.Items = {
				add:this.Static.addItem.bind(this),
				remove:this.Static.removeItem.bind(this),
				removeAll:this.Static.removeAllItems.bind(this),
				render:this.Static.renderItems.bind(this),
				clear:this.Static.clearRendered.bind(this),
				roster:{},
				rendered:{},
				sorter:function(a,b){ //the sorting algorithm
					console.log('ran default')
					return 0;
				}
			};
			this.Items.Render = {
				model:function(){/* Expects a gomme model class */},
				view:function(){/* Expects a view class */},
				controller:function(){/* Expects a controller for transforming */},
				decorator:function(view, item){/* additional side transformations for the view */}
			};

			var cid = 0;
			this.newId = function(){
				return Math.rand()*new Date().valueOf()+"-"+(cid++);
			};
		}
		list.prototype = Object.create(Syrup.Elements.div.prototype);
		list.prototype.Static = {
			addItem:function(item){
				var id = (item.id || this.newId());
				item.id = id;
				this.Items.roster[id] = item;		
			},
			removeItem:function(id){
				var view = this.Items.rendered[id];
				if (view && typeof view.remove === 'function'){
					view.remove();
				}
				delete this.Items.roster[id];
			},
			removeAllItems:function(){
				var self = this;
				Object.keys(this.Items.roster).forEach(function(id){
					self.Items.remove(id);
				});
			},
			renderItems:function(){
				var self = this;
				Object.keys(this.Items.rendered).forEach(function(id){
					var view = self.Items.rendered[id];
					if (view && typeof view.remove === 'function'){
						view.remove();
					}
				});
				var list = [];
				Object.keys(this.Items.roster).forEach(function(id){
					list.push(self.Items.roster[id]);
				});
				list.sort(function(a,b){
					return self.Items.sorter(a,b);
				});
				list.forEach(function(item){
					if (typeof self.Items.Render.view === 'function'){
						var view = new self.Items.Render.view();
						if (view && typeof view.bindTo === 'function'){
							view.bindTo(item);
							view.id = item.id;
							self.Items.rendered[item.id] = view;
							if (typeof self.Items.Render.controller === 'function'){
								self.Items.Render.controller(view, item);
							}
							if (typeof self.Items.Render.decorator === 'function'){
								self.Items.Render.decorator(view, item);
							}
							view.addTo(self.Collection);
						}			
					}
				});
			},
			clearRendered:function(){
				var self = this;
				Object.keys(this.Items.rendered).forEach(function(id){
					var view = self.Items.rendered[id];
					if (view && typeof view.remove === 'function'){
						view.remove();
					}
				});
			}
		};
		list.prototype.constructor = list;
		return list;
	}
);