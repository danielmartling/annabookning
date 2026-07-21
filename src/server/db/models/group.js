// /src/server/db/models/group.js
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
            accomodation: { type: DataTypes.ENUM("in", "out", "both", "day") },
            type: { type: DataTypes.ENUM("own", "external", "staff", "test") },
            participants: {
                type: DataTypes.VIRTUAL,
                get() {
                    const subgroups = this.get("subgroups") || [];
                    return subgroups.reduce(
                        (sum, subgroup) => sum + (subgroup.participants || 0),
                        0
                    );
                }
            },
            leaders: {
                type: DataTypes.VIRTUAL,
                get() {
                    const subgroups = this.get("subgroups") || [];
                    return subgroups.reduce(
                        (sum, subgroup) => sum + (subgroup.leaders || 0),
                        0
                    );
                }
            },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );