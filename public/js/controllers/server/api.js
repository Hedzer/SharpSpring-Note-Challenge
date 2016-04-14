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
			return ajax.post(
				url,
				{
					data:args,
					token:API.token
				}
			)
			.success(function(response){
				//put in authentication check
				if (typeof onSuccess === 'function'){
					onSuccess(response, xhr);
				}
			})
			.failure(function(response){
				//put in authentication check
				if (typeof onFailure === 'function'){
					onFailure(response, xhr);
				}
			});
		}
		return API;
	}
);