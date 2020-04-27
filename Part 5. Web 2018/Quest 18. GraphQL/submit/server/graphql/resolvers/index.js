const { logIn } = require('./authResolver'),
	{ createNote, getNote, getManyNotes, updateNote } = require('./noteResolver'),
	{ uploadSessionData, loadSessionData } = require('./sessionResolver');

module.exports = {
	Query: {
		getNote,
		getManyNotes,
		loadSessionData
	},
	Mutation: {
		logIn,
		createNote,
		updateNote,
		uploadSessionData
	}
};