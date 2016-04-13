<!DOCTYPE html>
<html>
	<head>
		<!-- Start Meta Tags-->
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<!-- End Meta Tags-->
		<title>Login</title>
		<?php if($app->environment('development')): ?>
			<link rel="stylesheet" type="text/css" href="/css/apps/login.css">
		<?php else: ?>
			<link rel="stylesheet" type="text/css" href="/css/apps/login.built.css">
		<?php endif; ?>
	</head>
	<body>
		<?php if($app->environment('development')): ?>
			<script data-main="/js/apps/login.requires.js" src="/js/libs/require.min.js"></script>
		<?php else: ?>
			<script type="text/javascript" src="/js/apps/login.app.built.js"></script>
		<?php endif; ?>
	</body>
</html>