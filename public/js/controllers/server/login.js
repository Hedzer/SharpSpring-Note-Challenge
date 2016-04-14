define(
	[
		'libs/modules/ajax',
		'controllers/server/api'
	],
	function(ajax, api){
		function ServerLoginController(credentials, onSuccess, onFailure){
			ajax.post(
				'/auth/login',
				{
					email:credentials.email,
					password:credentials.password
				}
			)
			.success(function(response, xhr){
				if (typeof onSuccess === 'function'){
					onSuccess(response, xhr);
				}
			})
			.failure(function(response, xhr){
				if (typeof onFailure === 'function'){
					onFailure(response, xhr);
				}
			});
		}
		api.login = ServerLoginController;
		return api;
	}
);