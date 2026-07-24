// /src/server/db/sequelize.js

import { Sequelize, DataTypes } from 'sequelize';
import { types } from 'pg';

types.setTypeParser(1082, val => val);

types.setTypeParser(types.builtins.DATE, (val) => val)

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    });