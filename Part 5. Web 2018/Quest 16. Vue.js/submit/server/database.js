const { Sequelize } = require('sequelize');
const { database_dev } = require('./config');

const getDatabase = (env) => {
	switch (env) {
		case 'dev':
			const { database, dialect, host, password, username } = database_dev;

			return new Sequelize(
				database,
				username,
				password,
				{
					host: host,
					dialect: dialect,
					logging: false,
				}
			);
		default:
			break;
	}
};

module.exports = getDatabase(process.env.NODE_ENV);
