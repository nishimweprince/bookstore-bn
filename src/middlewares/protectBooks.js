import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../database/models/index';
import { getToken } from '../utils/cookies';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIRONMENT VARIABLES
const { JWT_SECRET: secret } = process.env;

// LOAD MODELS
const { book, user } = db;

/**
 * PROTECT BOOKS ROUTES
 */

// PROTECT CREATE BOOK ROUTE
const protectCreateBook = async (req, res, next) => {
  try {
    /**
     * VERIFY AUTHORIZATION
     */
    const token = getToken(req);
    // IF NO TOKEN, RETURN ERROR
    if (!token) {
      return res.status(401).json({
        error: 'Access denied. Please make sure you are logged in',
      });
    }
    // IF TOKEN, VERIFY IT
    const { id, role } = jwt.verify(token, secret);
    // IF VERIFIED, CHECK IF USER HAS NECESSARY PERMISSIONS
    if (role !== 0) {
      return res.status(403).json({
        error: 'Access denied. User does not have necessary permissions',
      });
    }
    // IF USER HAS NECESSARY PERMISSIONS, CONTINUE
    res.locals = { ...res.locals, userId: id };
    // END VERIFY AUTHORIZATION
    return next();

    // CATCH ERRORS
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// PROTECT DELETE BOOK
const protectDeleteBook = async (req, res, next) => {
  try {
    // CATCH BOOK ID FROM REQUEST PARAMS
    const { id } = req.params;
    /**
     * VERIFY AUTHORIZATION
     */
    // GET TOKEN FROM REQUEST
    const token = getToken(req);
    // IF NO TOKEN, RETURN ERROR
    if (!token) {
      return res.status(401).json({
        error: 'Access denied. Please make sure you are logged in',
      });
    }
    // IF TOKEN, VERIFY IT
    const { id: userId, role } = jwt.verify(token, secret);
    /**
     * CHECK IF A USER HAS NECESSARY PERMISSIONS
     */
    // CHECK IF A USER IS AN OWNER
    if (role !== 0) {
      return res.status(403).json({
        message: 'Access denied. User does not have necessary permissions',
      });
    }
    // CHECK IF A USER OWNS THE BOOK
    const bookExists = await book.findOne({
      where: { id, userId },
    });
    // IF BOOK DOES NOT EXIST, RETURN ERROR
    if (!bookExists) {
      return res.status(404).json({
        message: 'Book not found. Make sure you own the book',
      });
    }
    // IF USER HAS NECESSARY PERMISSIONS, CONTINUE
    res.locals = { userId, role, id: bookExists.dataValues.id };
    // END VERIFY AUTHORIZATION
    return next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { protectCreateBook, protectDeleteBook };
