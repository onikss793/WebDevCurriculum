const noteDao = require('../dao/noteDao'),
	utils = require('../utils');

const getNote = async (req, res, next) => {
	try {
		const noteId = req.params.id;
		const note = await noteDao.findNote(noteId);

		res.status(200).json(utils.responseMessage('success', note));
	} catch (err) {
		next(err);
	}
};

const getManyNotes = async (req, res, next) => {
	try {
		const user_id = req.user_id;
		const notes = await noteDao.findNotes(user_id);

		res.status(200).json(utils.responseMessage('success', notes));
	} catch (err) {
		next(err);
	}
};

const createNote = async (req, res, next) => {
	try {
		const { title, body, cursor_position } = req.body;
		const user_id = req.user_id;
		const noteData = {
			title: title,
			user_id,
			body: body,
			cursor_position: cursor_position
		};

		await noteDao.createOrUpdate({ title: noteData.title }, noteData);

		res.status(200).json(utils.responseMessage('success'));
	} catch (err) {
		next(err);
	}
};

const updateNote = async (req, res, next) => {
	try {
		const noteId = req.params.id;
		const data = req.body;

		await noteDao.updateNote({ id: noteId }, { ...data });

		res.status(200).json(utils.responseMessage('success'));
	} catch (err) {
		next(err);
	}
};

module.exports = { getManyNotes, getNote, createNote, updateNote };
