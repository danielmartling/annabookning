import bcrypt from "bcrypt";
import { User } from "../db/models/index.js";


async function loginHandler(req, res) {
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
            return res.status(401).json({ success: false });
        }

        req.session.user = {
            id: user.user_id,
            role: user.role,
            permission: user.permission
        };

        user.last_login = new Date();
        await user.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

async function logoutHandler(req, res) {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true });
    });
};

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login.html?message=notloggedin");
    }
    next();
}

export { loginHandler, logoutHandler, requireLogin }