(function(){

	// ---------- FEATURE DETECTION ----------
	//ES5 Tests
	var ES5 = (function () { 
		// Also, rudimentary, a more trustworthy method could me created
		"use strict";
		return (
			Function.prototype.bind && 
			Object.create && 
			Array.prototype.forEach && 
			!this
		);
	}());

	//CSS Viewport Tests
	var CSSVP = (function(){
		var vw, vh;
		var vwDiv = document.createElement('div');
		var vhDiv = document.createElement('div');
		vwDiv.style.width = '50vw';
		vhDiv.style.height = '50vh';
		//if there are more tests, can be turned into a loop
		document.body.appendChild(vwDiv);
		document.body.appendChild(vhDiv);
		vw = window.getComputedStyle(vwDiv).width;
		vh = window.getComputedStyle(vhDiv).height;
		document.body.removeChild(vwDiv);
		document.body.removeChild(vhDiv);
		return (vw !== "0px" && vh !== "0px");
	})();

	//Speech Recognition
	var SpeechRecognition = window.SpeechRecognition ||
		window.webkitSpeechRecognition ||
		window.mozSpeechRecognition ||
		window.msSpeechRecognition ||
		window.oSpeechRecognition;

	var SVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
	var Supports = {
		ES5:ES5,
		ViewportUnits:CSSVP,
		SpeechRecognition:SpeechRecognition
	};
	// ---------- END FEATURE DETECTION ----------

	//Application dependencies
	require.config({
		baseUrl:"/js/",
		paths: {
			//shims
			'ES5-Shim': 		'shims/es5-shim.min',
			'Viewport-Shim': 	'shims/vminpoly.min',
			'SharpNotes': 		'apps/sharpnotes.app'
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
			(!Supports.ES5 ? 'ES5-Shim' : null),
			(Supports.ViewportUnits ? 'Viewport-Shim' : null),
			'SharpNotes'
		],
		function(es5, cssvp, SharpNotes){
			console.log("Loading complete!");
		}
	)

})();



