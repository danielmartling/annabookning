import { sequelize } from "./sequelize.js";
import "./models/index.js";

await sequelize.authenticate();
console.log("Database connected.");

await sequelize.sync({ alter: true });
console.log("Models synced.");

export { sequelize };