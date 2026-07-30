// /src/server/db/models/activity.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity",
        {
            activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            category_id: { type: DataTypes.INTEGER, allowNull: false },
            tag_id: { type: DataTypes.INTEGER, allowNull: true },
            title: { type: DataTypes.STRING, allowNull: false },
            subtitle: { type: DataTypes.STRING },
            order: { type: DataTypes.INTEGER },
            desc_short: { type: DataTypes.STRING },
            desc_guest: { type: DataTypes.STRING },
            desc_staff: { type: DataTypes.STRING },
            material: { type: DataTypes.STRING },
            place: { type: DataTypes.STRING },
            languages: { type: DataTypes.STRING },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );