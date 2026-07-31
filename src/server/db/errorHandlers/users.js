import { UniqueConstraintError } from "sequelize";
import { internalError } from "./common.js";

export function userError(res, err) {
    if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
            code: "USERNAME_EXISTS",
            field: "username",
            message: "Username already exists."
        });
    };
    console.error(err);
    return internalError(res, err);
}