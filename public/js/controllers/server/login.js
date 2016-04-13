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
				},
				function(response){
					console.log(response);
				}
			);
		}
		api.login = ServerLoginController;
		return api;
	}
);