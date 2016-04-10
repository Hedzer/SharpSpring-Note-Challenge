define(
	[
		'frameworks/syrup',
		'components/navbar'
	],
	function(Syrup, navbar){
		var App = {
			Navigation:(function(){
				var navigation = new navbar();
				navigation.addTo(document.body);
				navigation.brand = '#Sharp Notes';
				return navigation;			
			})(),
			Page:(function(){

			})(),
			Controller:(function(){

			})()
		}

	}
);