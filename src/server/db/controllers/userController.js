// src/server/db/controllers/userController.js

import { User, History } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";


// GET /users
export async function getAllUsers(req, res) {
    const users = await User.findAll({
        order: [
            ['active', 'ASC'],
            ['username', 'ASC'],
        ],
    });

    res.json(users);
}


// GET /users/:id
export async function getUser(req, res) {
    const user = await User.findByPk(req.params.id);
    res.json(user);
}


// POST /users
export async function createUser(req, res) {
    try {
        const {
            username,
            displayname,
            password,
            repeatpassword,
            active,
            role,
            permission,
            email,
            phone
        } = req.body;

        if (/\s/.test(username)) {
            throw new Error("Username may not contain spaces.");
        }

        if (password.length < 4) {
            throw new Error("Password must be at least 4 characters.");
        }

        if (password !== repeatpassword) {
            throw new Error("Password must be the same!");
        }

        const password_hash = await bcrypt.hash(password, 12);

        const user = await User.create({
            username: username,
            displayname: displayname,
            password_hash: password_hash,
            active: active,
            role: role,
            permission: permission,
            email: email,
            phone: phone
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "create", user_id: req.session.user.id });

        res.status(201).json({
            user_id: user.user_id,
            username: user.username
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

// PUT /users/info/:id
export async function updateUserInfo(req, res) {
    try {

        const {
            username,
            displayname,
            email,
            phone
        } = req.body;

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (/\s/.test(username)) {
            throw new Error("Username may not contain spaces.");
        }

        await user.update({
            username,
            displayname,
            email,
            phone
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "info", user_id: req.session.user.id });

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

// PUT /users/roles/:id
export async function updateUserRoles(req, res) {
    try {

        const {
            active,
            role,
            permission
        } = req.body;

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update({
            active: active,
            role: role,
            permission: permission,
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "roles", user_id: req.session.user.id });

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

// PUT /users/password/:id
export async function updateUserPassword(req, res) {
    try {

        const {
            newpassword,
            repeatpassword
        } = req.body;

        const user = await User.findByPk(req.params.id);

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

        const password_hash = await bcrypt.hash(newpassword, 12);

        await user.update({
            password_hash: password_hash,
        });

        const logentry = await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "password", user_id: req.session.user.id });

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