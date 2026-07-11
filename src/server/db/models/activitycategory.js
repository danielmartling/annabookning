import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity_category",
        {
            category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            order: { type: DataTypes.INTEGER },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );