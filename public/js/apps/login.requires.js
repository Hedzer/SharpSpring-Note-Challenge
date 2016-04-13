(function(){

	//Application dependencies
	require.config({
		baseUrl:"/js/",
		paths: {
			//shims
			'ES5-Shim': 		'shims/es5-shim.min',
			'Viewport-Shim': 	'shims/vminpoly.min',
			'ClassListPoly': 	'shims/classList',
			//app
			'Login': 			'apps/login.app'
		}
	});

	//Load Application
	/*
		Optimization Notes:
			The following should be done if used for serious production:
				1. Optimize using requirejs's r.js
				2. Upload all the static content to a CDN or subdomains used for static content
			Optionally, if using a compatible browser, a Service Worker can be installed to handle resource requests.
			These steps were not taken to assure reliability when loading locally, and for some ease in debugging.
	*/
	require(
		[
			//shims
			'ES5-Shim',
			'Viewport-Shim',
			//app
			'Login'
		],
		function(es5, cssvp, Login){
			var instance = new Login();
			instance.addTo(document.body);
			instance.start();
		}
	)

})();



