const db = require('../database');

module.exports = (...names) => {
    return names.reduce((acc, curr) => {
        return {
            ...acc,
            [curr]: require(`./${curr}`)(db),
        };
    }, {});
};
