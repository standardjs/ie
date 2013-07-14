(function (definitions) {
	var namedConstructors = {},
		createType = ie.helper.createType,
		definition;
	for (var i=0;i!=definitions.length;i++) {
		definition = definitions[i];
		namedConstructors[definition.name] = createType(
			namedConstructors[definition.parent]||Object,
			definition.constructor, 
			definition.instance, 
			definition.statics,
			definition.shared
		);
	}

})(
	[
		{
			name: "Node",
			constructor: function IENode(){},
			instance: {

			},
			statics: {

			},
			shared: {
				ATTRIBUTE_NODE: 2,
				CDATA_SECTION_NODE: 4,
				COMMENT_NODE: 8,
				DOCUMENT_FRAGMENT_NODE: 11,
				DOCUMENT_NODE: 9,
				DOCUMENT_POSITION_CONTAINED_BY: 16,
				DOCUMENT_POSITION_CONTAINS: 8,
				DOCUMENT_POSITION_DISCONNECTED: 1,
				DOCUMENT_POSITION_FOLLOWING: 4,
				DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32,
				DOCUMENT_POSITION_PRECEDING: 2,
				DOCUMENT_TYPE_NODE: 10,
				ELEMENT_NODE: 1,
				ENTITY_NODE: 6,
				ENTITY_REFERENCE_NODE: 5,
				NOTATION_NODE: 12,
				PROCESSING_INSTRUCTION_NODE: 7,
				TEXT_NODE: 3
			}
		},
		{
			name: "HTMLElement",
			parent: "Node",
			constructor: function IEHTMLElement(){},
			instance: {

			},
			statics: {

			}
		}
	]
);