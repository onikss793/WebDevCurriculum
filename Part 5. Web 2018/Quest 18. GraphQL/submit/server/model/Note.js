const { DataTypes } = require('sequelize');

module.exports = (db) =>
    db.define(
        'Note',
        {
            title: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            body: { type: DataTypes.STRING(3000) },
            cursor_position: { type: DataTypes.INTEGER },
            isSelected: { type: DataTypes.BOOLEAN, defaultValue: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        { underscored: true, paranoid: true }
    );
