// /src/server/db/models/subgroup.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "subgroup",
        {
            subgroup_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            group_id: { type: DataTypes.INTEGER, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            desc: { type: DataTypes.STRING, allowNull: true },
            tag: { type: DataTypes.STRING, allowNull: false },
            arrival_date: { type: DataTypes.DATEONLY, allowNull: true },
            departure_date: { type: DataTypes.DATEONLY, allowNull: true },
            participants: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            leaders: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );