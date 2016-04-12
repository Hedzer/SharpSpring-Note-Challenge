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
			this.add(new div()).as("Content").with(function(){
				this.classList.add('content');
			});
			// API Portions
			this.Items = {
				add:this.Static.addItem.bind(this),
				remove:this.Static.removeItem.bind(this),
				removeAll:this.Static.removeAllItems.bind(this),
				roster:{},
				rendered:{}
			};
			this.Items.Render = {
				model:function(){/* Expects a gomme model class */},
				view:function(){/* Expects a view class */},
				controller:function(){/* Expects a controller for transforming */},
				decorator:function(){/* additional side transformations for the view */}
			};
		}
		list.prototype = Object.create(Syrup.Elements.div.prototype);
		list.prototype.Static = {
			addItem:function(){

			},
			removeItem:function(){},
			removeAllItems:function(){},
			renderItems:function(){}
		};
		list.prototype.constructor = list;
		return list;
	}
);