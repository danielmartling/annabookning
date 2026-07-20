// /src/server/db/models/programday.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "program_day",
        {
            day_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            day: { type: DataTypes.DATEONLY, allowNull: false, unique: true },
            title: { type: DataTypes.STRING, defaultValue: "" },
            message: { type: DataTypes.STRING, defaultValue: "" }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );