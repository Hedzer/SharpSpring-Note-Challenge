define(
	[
		'/js/frameworks/gomme'
	],
	function(Gomme){
		var none = undefined;
		var ModelNote = Gomme.model('ModelNote'
			{
				id:none,
				title:none,
				body:none,
				type:none,
				dateCreated:none,
				dateUpdated:none
			}
		);
		return ModelNote;
	}
);