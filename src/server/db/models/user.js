// /src/server/db/models/user.js
import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define(
        "user",
        {
            user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: { 
                type: DataTypes.STRING, 
                allowNull: false, 
                unique: true, 
                validate: { 
                    len: [3, 50], 
                    notEmpty: true
                } 
            },
            displayname: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
            password_hash: { type: DataTypes.STRING, allowNull: false },
            active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            last_login: { type: DataTypes.DATE, allowNull: true },
            role: { type: DataTypes.ENUM("staff", "guest") },
            permission: { type: DataTypes.ENUM("program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"), allowNull: true },
            email: { type: DataTypes.STRING, allowNull: true },
            phone: { type: DataTypes.STRING, allowNull: true }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true
        }
    );