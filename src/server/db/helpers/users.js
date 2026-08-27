import { User } from "../models/index.js";

export async function findUser(id, res, getHash = false) {
    const attributes = [
        "user_id",
        "username",
        "displayname",
        "email",
        "phone",
        "role",
        "permission",
        "active",
        "login_count"
    ];
    const user = await User.findByPk(id, {
        attributes: [
            ...attributes,
            ...(getHash ? ["password_hash"] : [])
        ]
    });
    if (!user) {
        res.status(404).json({
            code: "USER_NOT_FOUND",
            message: "User not found."
        });
        return null;
    }
    return user;
}

export function userUpdated(res, user) {
    return res.status(200).json({
        message: "User updated successfully",
        user: {
            user_id: user.user_id,
            username: user.username
        }
    });
}

export function userCreated(res, user) {
    return res.status(201).json({
        message: "User created successfully",
        user: {
            user_id: user.user_id,
            username: user.username
        }
    });
}