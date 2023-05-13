const dotenv = require("dotenv");

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_URL,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    database_url: DB_URL
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    database_url: DB_URL
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    database_url: DB_URL
  },
};
