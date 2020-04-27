const logIn = (id, pw) => {
	return {
		query:
			`mutation {
				logIn(id: "${ id }", pw: "${ pw }") {
					success
					token
				}
			}`
	};
};

const createNote = (title, body) => {
	return {
		query:
			`mutation {
				createNote(title: "${ title }", body: "${ body }") {
					success
				}
			}`
	};
};

const _updateNote = (id, title, body) => {
	return {
		query:
			`mutation {
				updateNote(id: "${ id }", title: "${ title }", body: "${ body }") {
					success
				}
			}`
	};
};

const uploadSessionData = (notes) => {
	return {
		query:
			`mutation {
				uploadSessionData(notes: "${ JSON.stringify(notes).replace(/"/g, '\'') }") {
					success
				}
			}`
	};
};

module.exports = { logIn, createNote, _updateNote, uploadSessionData };