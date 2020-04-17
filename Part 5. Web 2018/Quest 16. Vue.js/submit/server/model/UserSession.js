const { DataTypes } = require('sequelize');

module.exports = (db) =>
	db.define(
		'UserSession',
		{
			user_id: { type: DataTypes.INTEGER, allowNull: false },
			notes: { type: DataTypes.STRING }
		},
		{ underscored: true }
	);
