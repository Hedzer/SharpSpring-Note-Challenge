define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function modal(){
			var div = Syrup.Elements.div;
			div.call(this);
			scalable(this);
			this.class = 'modal';
			this.classList.add('modal');
			this.add(new div()).as('Overlay').with(function(){
				this.classList.add('overlay');
			});
			this.add('dismissHandle');
			this.add('dismissEvent');
			this.on('dismissEventPropertyChanged', function(e){
				this.dismissHandle = this.on(this.dismiss, function(e){
					this.trigger('dismissed', e);
				});
			});
		}
		modal.prototype = Object.create(Syrup.Elements.div.prototype);
		modal.prototype.constructor = modal;
		return modal;
	}
);