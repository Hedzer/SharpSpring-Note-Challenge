(function(){
	// ---------- COMPATIBILITY TESTS ----------
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
	// ---------- END COMPATIBILITY TESTS ----------
	//Application dependencies
	require.config({
		paths: {
			//shims
			'ES5-Shim': 		'/js/shims/es5-shim.min',
			'Viewport-Shim': 	'/js/shims/vminpoly.min',
			//frameworks
			'Syrup': 			'/js/frameworks/syrup.min',
			'Gomme': 			'/js/frameworks/gomme.min',
			//components
			'Navigation Bar': 	'/js/components/navbar',
			'List': 			'/js/components/list',
			'Note List Item': 	'/js/components/noteListItem',
			//app
			'SharpNotes': 		'/js/apps/sharpnotes.app'
		}
	});

	//Load Application
	/*
		Optimization Notes:
		Normally I'd split up the calls into modules, but given that I've lost "two days" on Laravel/Lumen
		I'm inclined to not complicate this project more than needed. Another option would be to minify+combine
		to reduce requests, and ideally these sources would be CDN hosted.  For reliability, and the sake of speed
		I'm locally hosting these, and just pulling them all in a single require. :/
	*/
	require(
		[
			//shims
			(!ES5 ? 'ES5-Shim' : null),
			(!CSSVP ? 'Viewport-Shim' : null),
			//frameworks
			'Syrup',
			'Gomme',
			//components
			'Navigation Bar',
			'List',
			'Note List Item',
			//app
			'SharpNotes'
		],
		function(){
			console.log("Loading complete!");
		}
	)

})();



