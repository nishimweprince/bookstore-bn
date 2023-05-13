import db from '../../../database/models/index';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const {
  JWT_SECRET: secret,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// LOAD MODELS
const { user } = db;

// SIGNUP CONTROLLER

const signupController = async (req, res) => {
  // GET DATA FROM REQUEST BODY
  const { name, email, password, role, photo } = req.body;

  try {
    // CHECK IF USER ALREADY EXISTS
    const userExists = await user.findOne({
      where: { email },
    });
    // IF USER EXISTS, RETURN ERROR
    if (userExists) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }
    /**
     * IF USER DOES NOT EXIST
     */
    // CLOUDINARY UPLOAD
    const options = {
      folder: 'bookstore/users',
      public_id: `user_${email}`,
      use_filename: true,
      unique_filename: false,
    };
    const result = await cloudinary.uploader.upload(photo, options);
    const photoUrl = result.url;
    // IF USER DOES NOT EXIST, HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    // IF USER DOES NOT EXIST, CREATE USER
    const newUser = await user.create(
      {
        name,
        email,
        password: hashedPassword,
        role,
        photo: photoUrl,
      },
      {
        attributes: {
          exclude: ['password'],
        },
      }
    );
    /* IF USER IS CREATED, GENERATE TOKEN */
    // PAYLOAD
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    // RETURN SUCCESS MESSAGE
    const { password: pass, ...data } = newUser.dataValues;
    return res.status(201).json({
      message: 'User created successfully',
      token,
      data,
    });
    // CATCH ANY ERRORS
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default signupController;
