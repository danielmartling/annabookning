import bcrypt from "bcrypt";
import { User } from "./models/index.js";

const password_hash = await bcrypt.hash(process.env.ADMINPASSWORD, 12);

const [user, created] = await User.findOrCreate({
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

if (created) {
    console.log("Admin user created!");
}