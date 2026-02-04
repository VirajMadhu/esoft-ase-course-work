import dotenv from "dotenv";
import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

dotenv.config();

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    pool: {
        max: 10,
        min: 0,
        acquire: 10000,
        idle: 10000,
    },
    logging: false,
});

export default sequelize;