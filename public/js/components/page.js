define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function page(){
			Syrup.Elements.div.call(this);
			scalable(this);
			this.class = 'page';
			this.className = 'page';
		}
		page.prototype = Object.create(Syrup.Elements.div.prototype);
		page.prototype.constructor = page;
		return page;
	}
);