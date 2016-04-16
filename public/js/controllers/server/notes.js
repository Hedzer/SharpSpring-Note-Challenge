define(
	[
		'controllers/server/api'
	],
	function(api){
		function list(success, failure){
			return api.post('notes/list', {}, success, failure);
		}
		function update(note, success, failure) {
			//additional validation
			var outbound = {
				id:note.id,
				title:note.title,
				body:note.body
			};
			return api.post('notes/update', outbound, success, failure);
		}
		function create(note, success, failure){
			//additional validation
			return api.post('notes/create', note, success, failure);
		}
		function remove(id, success, failure){
			if (!id){
				try{failure('No note Id provided, nothing was deleted.')}catch(e){}
			}
			//additional validation
			return api.post('notes/delete', id, success, failure);
		}
		api.Notes = (api.Notes || {});
		api.Notes.list = list;
		api.Notes.update = update;
		api.Notes.create = create;
		api.Notes.delete = remove;
		return api;
	}
);