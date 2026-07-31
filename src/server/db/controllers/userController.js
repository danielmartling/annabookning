// src/server/db/controllers/userController.js

import { User } from "../models/index.js";
import bcrypt from "bcrypt";

import { userError } from "../errorHandlers/users.js";
import { findUser, userUpdated, userCreated } from "../helpers/users.js";
import { log } from "../helpers/history.js";
import * as validator from "../validators/users.js";

// GET /users
export async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: [
                "user_id",
                "username",
                "displayname",
                "email",
                "phone",
                "role",
                "permission",
                "active"
            ],
            order: [
                ['role', 'ASC'],
                ['active', 'DESC'],
                ['username', 'ASC'],
            ],
        });
        return res.json(users);
    } catch (err) {
        return userError(res, err);
    }
}


// GET /users/:id
export async function getUser(req, res) {
    try {
        const user = await findUser(req.params.id, res);
        return res.json(user);
    } catch (err) {
        return userError(res, err);
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

        const usernameError = validator.username(username);
        if (usernameError) {
            return res.status(400).json(usernameError);
        }

        const passwordError = validator.password(password, repeatpassword);
        if (passwordError) {
            return res.status(400).json(passwordError);
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

        await log(req, "users", user.user_id, "create");

        return userCreated(res, user);

    } catch (err) {
        return userError(res, err);
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

        const user = await findUser(req.params.id, res);
        if (!user) return;

        const usernameError = validator.username(username);
        if (usernameError) {
            return res.status(400).json(usernameError);
        }

        await user.update({
            username,
            displayname,
            email,
            phone
        });

        await log(req, "users", user.user_id, "change", "info");

        return userUpdated(res, user);

    } catch (err) {
        return userError(res, err);
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

        const user = await findUser(req.params.id, res);
        if (!user) return;

        await user.update({
            active,
            role,
            permission,
        });

        await log(req, "users", user.user_id, "change", "roles");

        return userUpdated(res, user);

    } catch (err) {
        return userError(res, err);
    }
}

// PUT /users/password/:id
export async function updateUserPassword(req, res) {
    try {

        const {
            newpassword,
            repeatpassword
        } = req.body;

        const user = await findUser(req.params.id, res, true);
        if (!user) return;

        const passwordError = validator.password(newpassword, repeatpassword);
        if (passwordError) {
            return res.status(400).json(passwordError);
        }

        const password_hash = await bcrypt.hash(newpassword, 12);

        await user.update({
            password_hash,
        });

        await log(req, "users", user.user_id, "change", "password");

        return userUpdated(res, user);

    } catch (err) {
        return userError(res, err);
    }
}