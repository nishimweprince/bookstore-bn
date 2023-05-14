import db from '../../database/models/index';
import { getToken } from '../utils/cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// LOAD MODELS
const { book, user } = db;

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const { JWT_SECRET: secret } = process.env;

/**
 * CHECK IF USER IS AUTHENTICATED
 */

// CHECK IF USER IS AUTHENTICATED
const checkGeneralAuth = async (req, res, next) => {
  try {
    // GET TOKEN FROM REQUEST
    const token = getToken(req);
    // IF NO TOKEN, RETURN ERROR
    if (!token) {
      return res.status(401).json({
        error: 'Access denied. Please make sure you are logged in',
      });
    }
    // VERIFY TOKEN
    const { id, role} =  jwt.verify(token, secret);
    // PASS USER ID TO LOCAL RESPONSE
    res.locals = { userId: id, role };
    // END MIDDLEWARE
    return next();
    // CATCH ERROR
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { checkGeneralAuth };
