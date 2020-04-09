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
        const in_process = req.query.in_process ? true : false;
        const user_id = req.user_id;
        const index = getIndex(in_process);
        const notes = await noteDao.findNotes(user_id, index);

        res.status(200).json(utils.responseMessage('success', notes));
    } catch (err) {
        next(err);
    }
};

const createNote = async (req, res, next) => {
    try {
        const data = req.body;
        const user_id = req.user_id;
        const in_process = req.query.in_process ? true : false;
        const rawData = getDataForCreation(user_id, in_process, data);

        if (Array.isArray(rawData)) {
            await resetInProcess(user_id);
            await Promise.all(
                rawData.map(async (data) => {
                    await uploadData(data);
                })
            );
        } else {
            await uploadData(rawData);
        }

        res.status(200).json(utils.responseMessage('success'));
    } catch (err) {
        next(err);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const data = req.body;

        await noteDao.updateNote(noteId, ...data);

        res.status(200).json(utils.responseMessage('success'));
    } catch (err) {
        next(err);
    }
};

module.exports = { getManyNotes, getNote, createNote, updateNote };

const resetInProcess = async (user_id) => {
    const index = { user_id, is_saved: true, in_process: true };
    const data = { in_process: false };
    await noteDao.updateNote(data, index);
};

const uploadData = async (data) => {
    const [note, created] = await noteDao.findOrCreate(
        { title: data.title },
        data
    );

    !created && (await noteDao.updateNote({ id: note.id }, data));
};

const getIndex = (forSession) => {
    if (forSession) {
        return { in_process: true };
    } else {
        return { is_saved: true };
    }
};

const getDataForCreation = (user_id, forSession, data) => {
    if (forSession) {
        return data.map(
            ({ title, body, cursor: cursor_position, selected }) => {
                return {
                    title,
                    body,
                    cursor_position,
                    selected,
                    in_process: true,
                    user_id,
                };
            }
        );
    } else {
        return {
            in_process: false,
            is_saved: true,
            title: data.title,
            user_id,
            body: data.body,
            cursor_position: data.cursor,
        };
    }
};
