define(
	[
		'frameworks/syrup',
		'components/mixins/scalable'
	],
	function(Syrup, scalable){
		var hasSVGSupport = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
		var pixelRatio = window.devicePixelRatio;
		function responsiveImage(){
			Syrup.Elements.img.call(this);
			scalable(this);
			this.class = 'responsiveImage';
			this.className = 'responsiveImage';
			this.add(['images', 'checkDelayTimer']);
			this.add('sizeCheckDelay', 50);
			this.on('imagesPropertyChanged', function(e){
				var value = this.images;
				var type = typeof value;
				type = (Array.isArray(value) ? 'array' : type);
				(this.imagesTypeHandler[type] || this.imagesTypeHandler.unsupported).call(this, value, type);
			});
		}
		responsiveImage.prototype = Object.create(Syrup.Elements.img.prototype);
		responsiveImage.prototype.constructor = responsiveImage;
		responsiveImage.prototype.imagesTypeHandler = {
			string:function(value){
				this.src = value;
			},
			object:function(value){
				console.log(this.clientWidth);
				var SVG = (value.svg || value.SVG || value.Svg);
				if (hasSVGSupport && SVG){

				}
			},
			unsupported:function(value, type){
				console.log('Unsupported image type: ', type, ', Recieved: ', value);
			}
		};
		return responsiveImage;
	}
);