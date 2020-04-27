const { Note } = require('../model');

const findNote = (
    id,
    index,
    attributes = ['id', 'title', 'body', 'cursor_position']
) => {
    return Note.findOne({ where: { id, ...index }, attributes });
};

const findNotes = (
    user_id,
    index,
    attributes = ['id', 'title', 'body', 'cursor_position', 'selected']
) => {
    return Note.findAll({
        where: { user_id, ...index },
        attributes,
    });
};

const insertNote = (data) => {
    return Note.create(data);
};

const updateNote = (index, data) => {
    return Note.update(data, { where: { ...index } });
};

const deleteNote = (index) => {
    return Note.destroy({ where: { ...index } });
};

const findOrCreate = (index, defaults) => {
    return Note.findOrCreate({
        where: { ...index },
        defaults: { ...defaults },
    });
};

const createOrUpdate = (index, defaults) => {
	return Note.findOrCreate({
		where: { ...index },
		defaults: { ...defaults }
	}).then(([note, created]) => {
		!created && Note.update(defaults, { where: { id: note.id }});
	});
}

module.exports = {
    insertNote,
    updateNote,
    findNotes,
    findNote,
    deleteNote,
    findOrCreate,
	createOrUpdate
};
