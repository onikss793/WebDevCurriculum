const { Sequelize } = require('sequelize');
const { database_dev } = require('./config');

const getDatabase = (env) => {
    switch (env) {
        case 'dev':
            const database = database_dev;

            const sequelize = new Sequelize(
                database.database,
                database.username,
                database.password,
                {
                    host: database.host,
                    dialect: database.dialect,
                    logging: false,
                }
            );

            return sequelize;
    }
};

module.exports = getDatabase(process.env.NODE_ENV);
