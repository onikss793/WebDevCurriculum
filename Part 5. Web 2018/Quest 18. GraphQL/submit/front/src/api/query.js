const getNote = (note_id) => {
	return {
		query:
			`query {
				getNote(note_id: "${ note_id }") {
					id
					title
					body
					cursor_position
					isSelected
				}
			}`
	};
};

const getManyNotes = () => {
	return {
		query:
			`query {
				getManyNotes {
					id
					title
				}
			}`
	};
};

const loadSessionData = () => {
	return {
		query:
			`query {
				loadSessionData {
					user_id
					notes {
						title
						body
						cursor_position
						isSelected
					}
				}
			}`
	};
};

module.exports = { getNote, getManyNotes, loadSessionData };
