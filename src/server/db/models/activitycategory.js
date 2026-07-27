// /src/server/db/models/activitycategory.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity_category",
        {
            category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            desc: { type: DataTypes.STRING, allowNull: true },
            color: { type: DataTypes.STRING, allowNull: true },
            order: { type: DataTypes.INTEGER, defaultValue: 9999 },
            active: { type: DataTypes.BOOLEAN, defaultValue: true }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );