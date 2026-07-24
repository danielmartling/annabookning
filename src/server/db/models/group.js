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
            accomodation: { type: DataTypes.ENUM("in", "out", "other", "day"), allowNull: true },
            type: { type: DataTypes.ENUM("own", "external", "staff", "test"), allowNull: true },
            contact_name: { type: DataTypes.STRING, allowNull: true },
            contact_phone: { type: DataTypes.STRING, allowNull: true },
            contact_email: { type: DataTypes.STRING, allowNull: true },
            notes: { type: DataTypes.STRING, allowNull: true },
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
            on_island: {
                type: DataTypes.VIRTUAL,
                get() {
                    const today = new Date().toISOString().slice(0, 10);
                    return today >= this.get("arrival_date") && today <= this.get("departure_date");
                }
            }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );