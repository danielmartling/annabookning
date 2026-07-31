import bcrypt from "bcrypt";
import { User, History } from "../db/models/index.js";


export async function loginHandler(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: {
                username,
                active: true
            }
        });

        if (!user) {
            return res.status(401).json({ success: false });
        }

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            await History.create({ table_name: "users", record_id: user.user_id, action: "wrongpassword", user_id: user.user_id });
            return res.status(401).json({ success: false });
        }

        req.session.user = {
            id: user.user_id,
            role: user.role,
            permission: user.permission
        };

        user.last_login = new Date();
        await user.save();
        await user.increment("login_count");
        await History.create({ table_name: "users", record_id: user.user_id, action: "login", user_id: req.session.user.id });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export async function logoutHandler(req, res) {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true });
    });
};

export function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login.html?message=notloggedin");
    }
    next();
}

export function requireRoles(roles) {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not logged in' });
        };

        const hasRole = roles.some(role => req.session.user.role === role);

        if (!hasRole) {
            return res.status(403).json({ error: 'Forbidden: insufficient role' });
        }

        next();
    }
}

export function requirePermission(permissions) {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not logged in' });
        };

        const hasPermission = permissions.some(permission => req.session.user.permission === permission);

        if (!hasPermission) {
            return res.status(403).json({ error: 'Forbidden: insufficient permission' });
        }

        next();
    }
}