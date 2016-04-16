define(
	[
		'controllers/server/api'
	],
	function(api){
		function list(success, failure){
			return api.post('notes/list', {}, success, failure);
		}
		api.Notes = (api.Notes || {});
		api.Notes.list = list;
		return api;
	}
);