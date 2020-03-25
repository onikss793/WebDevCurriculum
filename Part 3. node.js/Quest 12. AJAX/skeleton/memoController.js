const memoService = require('./memoService'),
    utils = require('./utils');

const getMemo = (req, res, next) => {
    try {
        const data = _getData(req, utils.isQuery, _getSingleMemo, _getAllMemo);

        res.status(200).json(utils.responseMessage('success', data));
    } catch (err) {
        next(utils.throwError(400, 'No Such File'));
    }
};

const createMemo = (req, res, next) => {
    try {
        const data = req.body;
        const content = JSON.stringify(req.body);

        if (utils.dataExist(data, 'title')) {
            const fileName = _getNewFileName();

            memoService.writeFile(fileName, content);

            const newMemo = memoService.readFile(fileName);

            res.status(200).json(utils.responseMessage('success', newMemo));
        } else {
            next(utils.throwError(400, 'Failed'));
        }
    } catch (err) {
        next(err);
    }
};

const _getNewFileName = () => {
    const maxNumber = memoService.readFiles().length;

    return maxNumber + 1;
};

const _getData = (req, isQuery, getSingle, getAll) => {
    if (isQuery(req)) {
        return getSingle(req.query.name);
    } else {
        return getAll();
    }
};

const _getSingleMemo = name => {
    const data = memoService.readFile(`${name}.txt`);
    const body = JSON.parse(data.body);

    return { ...body };
};

const _getAllMemo = () => {
    return memoService.readFiles();
};

module.exports = { getMemo, createMemo };
