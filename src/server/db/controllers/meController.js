// src/server/db/controllers/meController.js

import { User, History } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

// GET /me
export async function getMe(req, res) {
    const user = await User.findByPk(req.session.user.id);
    res.json(user);
}

// PUT /me/info
export async function updateMyInfo(req, res) {
    try {

        const {
            username,
            displayname,
            email,
            phone
        } = req.body;

        const user = await User.findByPk(req.session.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update({
            displayname,
            email,
            phone
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "edit", changes: "info", user_id: req.session.user.id });

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                user_id: user.user_id,
                username: user.username,
                displayname: user.displayname,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Update user error:", error);

        return res.status(500).json({
            message: "Failed to update user",
            error: error.message
        });
    }
}

// PUT /me/password
export async function updateMyPassword(req, res) {
    try {

        const {
            oldpassword,
            newpassword,
            repeatpassword
        } = req.body;

        const user = await User.findByPk(req.session.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (newpassword.length < 4) {
            throw new Error("Password must be at least 4 characters.");
        }

        if (newpassword !== repeatpassword) {
            throw new Error("Password must be the same!");
        }

        const old_password_hash = await bcrypt.hash(oldpassword, 12);
        const new_password_hash = await bcrypt.hash(newpassword, 12);

        if (old_password_hash === new_password_hash) {
            throw new Error("New password can not be the same as the old one!");
        }

        await user.update({
            password_hash: new_password_hash,
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "edit", changes: "password", user_id: req.session.user.id });

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                user_id: user.user_id,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Update user error:", error);

        return res.status(500).json({
            message: "Failed to update user",
            error: error.message
        });
    }
}