import express from 'express';
import dotenv from 'dotenv';
import db from '../database/models/index';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const { PORT } = process.env;

// INITIALIZATE EXPRESS APP
const app = express();

// PARSE REQUEST BODY
app.use(bodyParser.json());

// USE CORS MIDDLEWARE
app.use(cors());

// LOAD ROUTES
app.use('/api', routes);

// CREATE SERVER INSTANCE
const server = app.listen(PORT);

// CONNECT TO DATABASE
const dbConnection = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.log(`Database error: ${error.message}`);
  }
};

// START SERVER
Promise.all([dbConnection(), server]).then(() => {
  console.log(`Server listening on port:${PORT}`);
});
