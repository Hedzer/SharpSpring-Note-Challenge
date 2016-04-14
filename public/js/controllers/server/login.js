define(
	[
		'libs/modules/ajax',
		'controllers/server/api'
	],
	function(ajax, api){
		function ServerLoginController(credentials, onSuccess, onFailure, onInvalid){
			var success = function(response, xhr){
				if (typeof onSuccess === 'function'){
					onSuccess(response, xhr);
				}
			};
			var failure = function(response, xhr){
				if (typeof onFailure === 'function'){
					onFailure(response, xhr);
				}
			};
			var invalid = function(response, xhr){
				if (typeof onInvalid === 'function'){
					onInvalid(response, xhr);
				}
			};
			ajax.post(
				'/auth/login',
				{
					email:credentials.email,
					password:credentials.password
				}
			)
			.success(function(response, xhr){
				try {
					var parsed = JSON.parse(response);
					if (parsed.auth && parsed.token){
						api.token = parsed.token;
						success(parsed);
						return;
					}
					if (parsed.email || parsed.password){
						invalid(parsed);
						return
					}
					failure('Authentication Failed');
				}catch(e){
					failure('Unknown Server Error');
				}
			})
			.failure(function(response){
				try {
					var parsed = JSON.parse(response);
					if (parsed.email || parsed.password){
						invalid(parsed);
					} else {
						failure('Unknown Server Error');
					}
				}catch(e){
					failure(response);
				}
			});
		}
		api.login = ServerLoginController;
		return api;
	}
);