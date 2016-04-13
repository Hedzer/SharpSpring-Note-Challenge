define(
	function(){
		var API = {};
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
		return API;
	}
);