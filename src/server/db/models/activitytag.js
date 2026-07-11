import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "activity_tag",
        {
            tag_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );