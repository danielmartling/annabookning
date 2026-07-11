import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "booking",
        {
            booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            group_id: { type: DataTypes.INTEGER, allowNull: false },
            activity_id: { type: DataTypes.INTEGER, allowNull: false },
            date: { type: DataTypes.DATEONLY, allowNull: false },
            // end_date: { type: DataTypes.DATEONLY },
            shift: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 3 } },
            // end_shift: { type: DataTypes.INTEGER },
            start_time: { type: DataTypes.STRING },
            guide: { type: DataTypes.STRING },
            info: { type: DataTypes.STRING },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );