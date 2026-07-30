// src/server/db/controllers/userController.js

import { User, History } from "../models/index.js";
import bcrypt from "bcrypt";

import { UniqueConstraintError } from "sequelize";


// GET /users
export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({
            order: [
                ['role', 'ASC'],
                ['active', 'DESC'],
                ['username', 'ASC'],
            ],
        });

        return res.json(users);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
        });
    }
}


// GET /users/:id
export async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        return res.json(user);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
        });
    }
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

        if (!username || /\s/.test(username)) {
            return res.status(400).json({
                code: "INVALID_USERNAME",
                message: "Username may not contain spaces."
            });
        }

        if (!password || password.length < 4) {
            return res.status(400).json({
                code: "PASSWORD_TOO_SHORT",
                message: "Password must be at least 4 characters."
            });
        }

        if (password !== repeatpassword) {
            return res.status(400).json({
                code: "PASSWORD_MISMATCH",
                message: "Passwords do not match."
            });
        }

        const password_hash = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            displayname,
            password_hash,
            active,
            role,
            permission,
            email,
            phone
        });

        await History.create({ table_name: "users", record_id: user.user_id, action: "create", user_id: req.session.user.id });

        return res.status(201).json({
            user_id: user.user_id,
            username: user.username
        });

    } catch (err) {

        if (err instanceof UniqueConstraintError) {
            return res.status(409).json({
                code: "USERNAME_EXISTS",
                field: "username",
                message: "Username already exists."
            });
        }

        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
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
                code: "USER_NOT_FOUND",
                message: "User not found."
            });
        }

        if (!username || /\s/.test(username)) {
            return res.status(400).json({
                code: "INVALID_USERNAME",
                message: "Username may not contain spaces."
            });
        }

        await user.update({
            username,
            displayname,
            email,
            phone
        });

        await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "info", user_id: req.session.user.id });

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

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return res.status(409).json({
                code: "USERNAME_EXISTS",
                field: "username",
                message: "Username already exists."
            });
        }

        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
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
                code: "USER_NOT_FOUND",
                message: "User not found."
            });
        }

        await user.update({
            active,
            role,
            permission,
        });

        await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "roles", user_id: req.session.user.id });

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                user_id: user.user_id,
                username: user.username
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
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
                code: "USER_NOT_FOUND",
                message: "User not found."
            });
        }

        if (!newpassword || newpassword.length < 4) {
            return res.status(400).json({
                code: "PASSWORD_TOO_SHORT",
                message: "Password must be at least 4 characters."
            });
        }

        if (newpassword !== repeatpassword) {
            return res.status(400).json({
                code: "PASSWORD_MISMATCH",
                message: "Passwords do not match."
            });
        }

        const password_hash = await bcrypt.hash(newpassword, 12);

        await user.update({
            password_hash,
        });

        await History.create({ table_name: "users", record_id: user.user_id, action: "change", changes: "password", user_id: req.session.user.id });

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                user_id: user.user_id,
                username: user.username
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: "Internal server error."
        });
    }
}