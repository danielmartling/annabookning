// /src/server/db/models/activitycategory.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity_category",
        {
            category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            desc: { type: DataTypes.STRING, allowNull: true },
            order: { type: DataTypes.INTEGER },
            active: { type: DataTypes.BOOLEAN, defaultValue: true }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );