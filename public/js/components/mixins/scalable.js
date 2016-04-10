define(function(){
	return function mixinScalable(syrupClass){
		syrupClass.add("scale");
		syrupClass.on("scalePropertyChanged", function(e){
			if (e && e.detail){
				this.style.fontSize = e.detail.new;
			}
		});
	}
});