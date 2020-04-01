const memoService = require('../services/memoService'),
    utils = require('../utils');

const getMemo = (req, res, next) => {
    try {
        const memoId = req.params.id;
        const data = _getSingleMemo(memoId);

        res.status(200).json(utils.responseMessage('success', data));
    } catch (err) {
        next(utils.throwError(500, err.message));
    }
};

const getMemoList = (req, res, next) => {
    try {
        const data = _getAllMemo();

        res.status(200).json(utils.responseMessage('success', data));
    } catch (err) {
        next(utils.throwError(500, err.message));
    }
};

const createMemo = (req, res, next) => {
    try {
        const data = req.body;
        const content = JSON.stringify(req.body);
        const memoId = _getNewMemoId();

        !utils.dataExist(data, 'title') &&
            next(utils.throwError(400, 'Title must be included'));

        memoService.writeFile(memoId, content);

        res.status(200).json(
            utils.responseMessage('success', _getSingleMemo(memoId))
        );
    } catch (err) {
        next(utils.throwError(500, 'File creation failed'));
    }
};

const updateMemo = (req, res, next) => {
    try {
        const data = req.body;
        const content = JSON.stringify(req.body);
        const memoId = req.params.id;

        !utils.dataExist(data, 'title') &&
            next(utils.throwError(400, 'Title must be included'));

        memoService.writeFile(memoId, content);

        res.status(200).json(
            utils.responseMessage('success', _getSingleMemo(memoId))
        );
    } catch (err) {
        next(utils.throwError(500, 'File update failed'));
    }
};

const deleteMemo = (req, res, next) => {
    try {
        const memoId = req.params.id;

        memoService.deleteFile(memoId);

        res.status(200).json(utils.responseMessage('success'));
    } catch (err) {
        next(utils.throwError(500, 'File deletion failed'));
    }
};

const _getNewMemoId = () => {
    const maxNumber = memoService.readFiles().length;

    return maxNumber + 1;
};

const _getSingleMemo = memoId => {
    const data = JSON.parse(memoService.readFile(memoId));

    return { id: memoId, ...data };
};

const _getAllMemo = () => {
    const data = memoService.readFiles();

    return data;
};

module.exports = {
    getMemo,
    getMemoList,
    createMemo,
    updateMemo,
    deleteMemo
};
