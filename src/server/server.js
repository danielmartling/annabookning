"use strict"

import "dotenv/config";
// dotenv.config({ quiet: true });



import { app } from "./app.js";

import { sequelize } from "./db/index.js";

import "./db/populate.js"