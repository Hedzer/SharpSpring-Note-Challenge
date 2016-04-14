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
			var div = Syrup.Elements.div;
			var span = Syrup.Elements.div;
			var login = this;
			this.add(new div()).as('Header').with(function(){
				this.classList.add('header');
				this.add(new span()).as('Text').with(function(){
					this.classList.add('text');
					this.textContent = 'Login';
				});
			});
			this.add(new div()).as('UsernameLabel').with(function(){
				this.classList.add('username-label');
				this.classList.add('login-label');
				this.textContent = 'Email';
			});
			this.add(new input()).as('Username').with(function(){
				this.classList.add('username');
				this.classList.add('login-input');
				this.type = 'text';
				this.placeholder = 'email@domain.com';
				this.value = 'test@test.com';
			});
			this.add(new div()).as('PasswordLabel').with(function(){
				this.classList.add('password-label');
				this.classList.add('login-label');
				this.textContent = 'Password';
			});
			this.add(new input()).as('Password').with(function(){
				this.classList.add('password');
				this.classList.add('login-input');
				this.type = 'password';
				this.placeholder = 'password';
				this.value = '$sh4rpspr1nG$';
			});
			this.add(new button()).as('Submit').with(function(){
				var submit = this;
				this.add('locked', false);
				this.unlock = function(ms){
					ms = (ms || 0);
					return setTimeout(function(){
						submit.locked = false;
					}, ms);
				};
				this.classList.add('submit');
				this.type = 'button';
				this.textContent = 'Login';
				this.on('click', function(e){
					if (this.locked){
						return;
					}
					this.locked = true;
					controller.login(
						{
							email:login.Username.value,
							password:login.Password.value,
						},
						function success(response){
							console.log('success ', response);
							login.Message.reset();
							login.Message.classList.add('success');
							login.trigger('loginSucceeded', response);
							login.Message.Text.textContent = 'Login Successful!';
							submit.unlock(250);
						},
						function failure(response){
							console.log('failed ', response);
							login.Message.reset();
							login.Message.classList.add('failure');
							if (typeof response === 'string'){
								login.Message.Text.textContent = response;
							}
							login.trigger('loginFailed', response);
							submit.unlock(250);
						},
						function invalid(response){
							if (response.email){
								login.Username.classList.add('invalid');
							}
							if (response.password){
								login.Password.classList.add('invalid');
							}
							login.Message.reset();
							login.Message.classList.add('invalid');
							console.log(response , typeof response);
							if (typeof response === 'object'){
								var warnings = '';
								Object.keys(response).forEach(function(key){
									warnings+=(key+': '+response[key]+'<br>');
								});
								login.Message.Text.innerHTML = warnings;
							}
							login.trigger('loginInvalid', response);
							submit.unlock(250);
						}
					);					
				});
				this.on('lockedPropertyChanged', function(){
					if (this.locked){
						this.classList.add('locked');
						return;
					}
					this.classList.remove('locked');
				});
			});
			this.add(new div()).as('Message').with(function(){
				this.reset = function(){
					this.classList.remove('invalid');
					this.classList.remove('success');
					this.classList.remove('failure');
					this.textContent = '';
				};
				this.classList.add('message');
				this.add(new div()).as('Text').with(function(){
					this.classList.add('text');
				});
			});
		}
		login.prototype = Object.create(Syrup.Elements.form.prototype);
		login.prototype.constructor = login;
		return login;
	}
);