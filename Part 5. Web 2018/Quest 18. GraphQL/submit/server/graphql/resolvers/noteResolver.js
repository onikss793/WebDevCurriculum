const noteDao = require('../../dao/noteDao');

const getNote = async (parent, args, { res }) => {
	try {
		const { note_id } = args;
		const data = await noteDao.findNote(note_id).then(d => d && d.toJSON());

		return  { ...data }
	} catch (err) {
		throw err;
	}
};

const getManyNotes = async (parent, args, { res, user_id }) => {
	try {
		const notes = await noteDao.findNotes(user_id);

		return [...notes];
	} catch (err) {
		throw err;
	}
};

const createNote = async (parent, args, { res, user_id }) => {
	try {
		const { ...data } = args;
		const noteData = {
			...data,
			user_id
		};

		await noteDao.createOrUpdate({ title: noteData.title }, noteData);
		return { success: true };
	} catch (err) {
		return err;
	}
};

const updateNote = async (parent, args, { res, user_id }) => {
	try {
		const { id, ...data } = args;

		await noteDao.updateNote({ id }, { ...data });

		return { success: true };
	} catch (err) {
		throw err;
	}
};

module.exports = { createNote, getNote, getManyNotes, updateNote };