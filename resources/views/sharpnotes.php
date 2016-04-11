<!DOCTYPE html>
<html>
	<head>
		<!-- Start Meta Tags-->
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- End Meta Tags-->
		<title>Sharp Notes</title>
		<?php if($app->environment('development')): ?>
			<link rel="stylesheet" type="text/css" href="/css/apps/sharpnotes.css">
		<?php else: ?>
			<link rel="stylesheet" type="text/css" href="/css/apps/sharpnotes.built.css">
		<?php endif; ?>
	</head>
	<body>
		<?php if($app->environment('development')): ?>
			<script data-main="/js/apps/sharpnotes.requires.js" src="/js/libs/require.min.js"></script>
		<?php else: ?>
			<script type="text/javascript" src="/js/apps/sharpnotes.app.built.js"></script>
		<?php endif; ?>
	</body>
</html>