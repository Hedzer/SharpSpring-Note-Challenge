({
	baseUrl:'../',
	paths: {
		'requireLib': 'libs/require.min',
		'ES5-Shim': 'shims/es5-shim.min',
		'Viewport-Shim': 'shims/vminpoly.min',
		'Login': 'apps/login.app'
	},
	include: 'requireLib',
	name: 'apps/login.requires',
	out: '../apps/login.app.built.js'
})