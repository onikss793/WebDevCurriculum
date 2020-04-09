const { DataTypes } = require('sequelize');

module.exports = (db) =>
    db.define(
        'UserSession',
        {
            session_id: {
                type: DataTypes.STRING(60),
                allowNull: false,
                primaryKey: true,
            },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        { underscored: true }
    );
