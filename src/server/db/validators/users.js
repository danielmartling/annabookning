
export function username(username) {
    if (!username || /\s/.test(username)) {
        return res.status(400).json({
            code: "INVALID_USERNAME",
            message: "Username may not contain spaces."
        });
    }
}

export function password(password, repeatpassword) {
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
}