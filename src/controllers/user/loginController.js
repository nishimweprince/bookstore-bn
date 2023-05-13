import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../../database/models/index';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const { JWT_SECRET: secret } = process.env;

// LOAD MODELS
const { user } = db;

// LOGIN CONTROLLER

const loginController = async (req, res) => {
  // GET DATA FROM REQUEST BODY
  const { email, password } = req.body;

  try {
    // CHECK IF USER EXISTS
    const userExists = await user.findOne({
      where: { email },
    });
    // IF USER DOES NOT EXIST, RETURN ERROR
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    // IF USER EXISTS, COMPARE PASSWORDS
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    // IF PASSWORDS DO NOT MATCH, RETURN ERROR
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Email or password is incorrect',
      });
    }
    // IF PASSWORDS MATCH, GENERATE TOKEN
    const payload = {
      id: userExists.id,
      email: userExists.email,
      role: userExists.role,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1w' });
    // RETURN RESPONSE
    const { password: pass, ...userData } = userExists.dataValues;
    return res.status(200).json({
      message: 'User logged in successfully',
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default loginController;
