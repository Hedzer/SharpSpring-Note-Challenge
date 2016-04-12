define(
	[
		'controllers/server/api'
	],
	function(api){
		function ServerLogout(){
			//logout code here
		}
		api.logout = ServerLogout;
		return api;
	}
);