// /src/server/db/models/history.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "history",
        {
            history_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            table_name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
            record_id: { type: DataTypes.INTEGER },
            action: { type: DataTypes.STRING, allowNull: false },
            changes: { type: DataTypes.STRING },
            user_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            tableName: 'history',
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );