const { Sequelize } = require('sequelize');
const { database_dev, database_test } = require('./config');

const getDatabase = (env) => {
	switch (env) {
		case 'dev': {
			const { database, dialect, host, password, username } = database_dev;

			return new Sequelize(
				database,
				username,
				password,
				{ host, dialect, logging: false }
			);
		}
		case 'test': {
			const { database, dialect, host, password, username } = database_test;

			return new Sequelize(
				database,
				username,
				password,
				{ host, dialect, logging: false }
			);
		}
		default:
			break;
	}
};

module.exports = getDatabase(process.env.NODE_ENV);
