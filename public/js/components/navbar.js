define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function navbar(){
			Syrup.Elements.nav.call(this);
			scalable(this);
			var div = Syrup.Elements.div;
			this.class = 'navbar';
			this.className = 'navbar';
			this.add(new div()).as('Brand').with(function(){
				this.className = 'brand';
			});
			this.add('brand'); //add the eventful property
			this.on('brandPropertyChanged', function(e){
				this.Brand.textContent = e.detail.new;
			});

		}
		navbar.prototype = Object.create(Syrup.Elements.nav.prototype);
		navbar.prototype.constructor = navbar;
		return navbar;
	}
);