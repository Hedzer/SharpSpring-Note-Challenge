<!-- 
	These static resources are locally stored for reliability, but should be hosted on a CDN
	Max connections is 2-6 concurrent per browser, so this is a potentially big bottleneck
	Solutions: Use a CDN, merge the JS files, or use requirejs to load them when needed
-->
<script type="text/javascript" src="/js/es5-shim.min.js"></script>
<script type="text/javascript" src="/js/syrup.min.js"></script>
<script type="text/javascript" src="/js/gomme.min.js"></script>
<script type="text/javascript" src=""></script>