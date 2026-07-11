import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "subgroup",
        {
            subgroup_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            group_id: { type: DataTypes.INTEGER, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
            arrival_date: { type: DataTypes.DATEONLY, allowNull: true },
            departure_date: { type: DataTypes.DATEONLY, allowNull: true },
            participants: { type: DataTypes.INTEGER, allowNull: true },
            leaders: { type: DataTypes.INTEGER, allowNull: true },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );