// /src/server/db/populate.js
// If such a user does not exist in the db, it will be inserted here from enviroment variables.

import bcrypt from "bcrypt";
import { User } from "./models/index.js";

const password_hash = await bcrypt.hash(process.env.ADMINPASSWORD, 12);

const [adminuser, admincreated] = await User.findOrCreate({
    where: {
        username: process.env.ADMINUSERNAME
    },
    defaults: {
        displayname: process.env.ADMINDISPLAYNAME,
        password_hash: password_hash,
        role: "staff",
        permission: "system-admin"
    }
});

if (admincreated) {
    console.log("Admin user created!");
}

const [testuser, testcreated] = await User.findOrCreate({
    where: {
        username: "test"
    },
    defaults: {
        displayname: "Testanvändare 1",
        password_hash: await bcrypt.hash("test", 12),
        role: "guest"
    }
});

if (testcreated) {
    console.log("Test user created!");
}