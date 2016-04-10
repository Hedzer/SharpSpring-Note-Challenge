({
	baseUrl:'../',
	paths: {
		'requireLib': 'libs/require.min',
		'ES5-Shim': 'shims/es5-shim.min',
		'Viewport-Shim': 'shims/vminpoly.min',
		'SharpNotes': 'apps/sharpnotes.app'
	},
	include: 'requireLib',
	name: 'apps/sharpnotes.requires',
	out: '../apps/sharpnotes.app.built.js'
})