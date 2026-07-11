import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "group",
        {
            group_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            booking_number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
            arrival_date: { type: DataTypes.DATEONLY, allowNull: false },
            departure_date: { type: DataTypes.DATEONLY, allowNull: false },
            accomodation: { type: DataTypes.ENUM("in", "out", "both", "day")},
            type: { type: DataTypes.ENUM("own", "external", "staff", "test")},
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );