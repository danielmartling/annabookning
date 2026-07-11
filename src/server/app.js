"use strict"

import express from "express";
const app = express();
const port = process.env.PORT;

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Access static resources folders
app.use('/img', express.static(path.join(__dirname, '../../resources/img')));
app.use('/icons', express.static(path.join(__dirname, '../../resources/icons')));
app.use('/templates', express.static(path.join(__dirname, '../../resources/templates')));
app.use('/docs', express.static(path.join(__dirname, '../../docs')));

import { loginHandler, logoutHandler, requireLogin } from "./middleware/auth.js";
app.post("/api/login", loginHandler);
app.post("/api/logout", logoutHandler);

app.use(express.static(path.join(__dirname, "../../webapp/public")));

const staffRoot = path.join(__dirname, "../../webapp/staff");
const guestRoot = path.join(__dirname, "../../webapp/guest");
app.use(requireLogin);
app.use((req, res, next) => {
    
    const root =
        req.session.user.role === "staff"
            ? staffRoot
            : guestRoot;

    express.static(root)(req, res, next);

});

app.get("/", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login.html");
    }

    if (req.session.user.role === "staff") {
        return res.sendFile(path.join(staffRoot, "index.html"));
    }

    return res.sendFile(path.join(guestRoot, "index.html"));

});


app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, "../../webapp/public/404.html")
    );
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});

export { app };