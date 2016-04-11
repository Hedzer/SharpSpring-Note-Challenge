define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		function matchstick(){
			Syrup.Elements.div.call(this);
			scalable(this);
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.span;
			this.class = 'matchstick';
			this.className = 'matchstick';
			this.add(new div()).as('Head').with(function(){
				this.className = 'head';
				this.add(new span()).as('Text').with(function(){
					this.className = 'text';
				});
				var self = this;
				this.on('textContentChanged', function(e){
					self.Text.textContent = e.detail.new;
				});
			});
			this.add(new div()).as('Body').with(function(){
				this.className = 'body';
				this.add(new span()).as('Text').with(function(){
					this.className = 'text';
				});
				var self = this;
				this.on('textContentPropertyChanged', function(e){
					self.Text.textContent = e.detail.new;
				});
			});
			this.add('headAlignment'); //add the eventful property
			this.on('headAlignmentPropertyChanged', function(e){
				var value = String(e.detail.new).toLowerCase();
				if (value === 'right'){
					this.Head.style.inline = {
						left:'auto',
						right:'0em'
					};
					this.Body.style.inline = {
						left:'0em',
						right:'1em'
					};
					return;
				}
				this.Head.style.inline = {
					left:'0em',
					right:'auto'
				};
				this.Body.style.inline = {
					left:'1em',
					right:'0em'
				};
			});
			this.headAlignment = 'left';
		}
		matchstick.prototype = Object.create(Syrup.Elements.div.prototype);
		matchstick.prototype.constructor = matchstick;
		return matchstick;
	}
);