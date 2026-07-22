"use strict"

import "dotenv/config";

import { app } from "./app.js";

import { sequelize } from "./db/index.js";

// Insert admin user
import "./db/populate.js"