define(
	[
		'libs/modules/ajax'
	],
	function(ajax){
		var API = {
			post:APIServer,
			queue:[]
		};
		var token = null;
		Object.defineProperty(API, 'token', {
			get:function(){
				if (window.sessionStorage){
					if (!token){
						token = window.sessionStorage.getItem('token');
					}
					return token;
				}
			},
			set:function(value){
				token = value;
				if (window.sessionStorage){
					if (!token){
						window.sessionStorage.removeItem('token');
						return;	
					}
					window.sessionStorage.setItem('token', value);
				}
			}
		});
		function APIServer(url, args, onSuccess, onFailure){
			var query = {
				url:url,
				args:args,
				success:onSuccess,
				failure:onFailure
			};
			var xhr = ajax.post(
				'/api/'+url,
				{
					data:args,
					token:API.token
				},
				onSuccess,
				onFailure
			);
			var signature = [
				'auth',
				'token',
				'data'
			];
			var router = function(callback){
				var wrapped = function(response, xhr){
					try {
						var packet = JSON.parse(response);
						if (typeof callback === 'function'){
							var isPackage = true;
							signature.forEach(function(prop){
								isPackage = isPackage & packet.hasOwnProperty(prop);
							});
							if (isPackage){
								//here we would check for expired, refresh tokens, logout, etc
								xhrProxy._success(packet.data, xhr);
								(onSuccess || function(){})(packet.data, xhr);
							} else {
								xhrProxy._failure(packet.data, 'Incorrect Format');
							}
						}
					}catch(e){
						xhrProxy._failure(response, 'Parse Error');
					}
					xhrProxy._then(response, xhr);		
				};
				return wrapped;
			};
			var xhrProxy = Object.create(xhr, {
				success:{
					value:function(callback){
						this._success = callback;
						router(callback);
						return xhrProxy;
					}
				},
				failure:{
					value:function(callback){
						this._failure = callback;
						router(callback);
						return xhrProxy;
					}
				},
				then:{
					value:function(callback){
						this._then = callback;
						router(callback);
						return xhrProxy;
					}
				}
			});
			return xhrProxy;
		}
		return API;
	}
);