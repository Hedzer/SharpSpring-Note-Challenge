define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function app(){
			Syrup.Elements.div.call(this);
			scalable(this);
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			this.class = 'app';
			this.className = 'app';
			this.start = function(){/* app controller for starting the app */};
			this.stop = function(){/* app controller for stopping */}
		}
		app.prototype = Object.create(Syrup.Elements.div.prototype);
		app.prototype.constructor = app;
		return app;
	}
);