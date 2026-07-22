// /src/server/db/index.js

import { sequelize } from "./sequelize.js";
import "./models/index.js";

await sequelize.authenticate();
console.log("Database connected.");

await sequelize.sync({ alter: process.env.NODE_ENV === "dev" });
console.log("Models synced.");

export { sequelize };