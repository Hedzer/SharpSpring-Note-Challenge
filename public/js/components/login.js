define(
	[
		'frameworks/syrup',
		'components/mixins/scalable',
		'controllers/server/login'
	],
	function(Syrup, scalable, controller){
		function login(){
			Syrup.Elements.form.call(this);
			scalable(this);
			this.class = 'login';
			this.classList.add('login');
			var input = Syrup.Elements.input;
			var button = Syrup.Elements.button;
			var login = this;
			this.add(new input()).as('Username').with(function(){
				this.classList.add('username');
				this.type = 'text';
				this.placeholder = 'email@domain.com';
				this.value = 'test@test.com';
			});
			this.add(new input()).as('Password').with(function(){
				this.classList.add('password');
				this.type = 'password';
				this.placeholder = 'password';
				this.value = '$sh4rpspr1nG$';
			});
			this.add(new button()).as('Submit').with(function(){
				this.classList.add('submit');
				this.type = 'button';
				this.textContent = 'Login';
				this.on('click', function(e){
					controller.login(
						{
							email:login.Username.value,
							password:login.Password.value,
						},
						function success(response){
							login.trigger('loginSucceeded', response);
						},
						function failure(response){
							login.trigger('loginFailed', response);
						}
					);					
				});
			});
		}
		login.prototype = Object.create(Syrup.Elements.form.prototype);
		login.prototype.constructor = login;
		return login;
	}
);