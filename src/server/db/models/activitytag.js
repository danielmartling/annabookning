// /src/server/db/models/activitytag.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity_tag",
        {
            tag_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            desc: { type: DataTypes.STRING, allowNull: true },
            active: { type: DataTypes.BOOLEAN, defaultValue: true },
            color: { type: DataTypes.STRING,allowNull: true },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );