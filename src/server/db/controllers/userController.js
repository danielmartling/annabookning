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
            // Throw error not same password
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