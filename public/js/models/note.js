define(
	[
		'/js/frameworks/gomme'
	],
	function(Gomme){
		var none = undefined;
		var NoteData = Gomme.model('NoteData'
			{
				id:none,
				title:none,
				body:none,
				type:none,
				dateCreated:none,
				dateUpdated:none
			}
		);
		return NoteData;
	}
);