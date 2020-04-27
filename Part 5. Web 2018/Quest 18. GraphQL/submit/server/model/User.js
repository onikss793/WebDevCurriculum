const { DataTypes } = require('sequelize');

module.exports = (db) =>
    db.define(
        'User',
        {
            username: { type: DataTypes.STRING(10), allowNull: false },
            password: { type: DataTypes.STRING(30), allowNull: false },
        },
        { underscored: true }
    );
