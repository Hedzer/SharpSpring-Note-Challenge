define(
	[
		'frameworks/syrup',
		'components/app',
		'components/page',
		'components/login'
	],
	function(Syrup, app, page, login){
		function Login(){
			app.call(this);
			this.class = 'Login';
			this.classList.add('Login');
			//Page
			this.add(new page()).as('Page').with(function(){
				this.add(new login());
			});
		}
		Login.prototype = Object.create(app.prototype);
		Login.prototype.constructor = Login;
		return Login;
	}
);