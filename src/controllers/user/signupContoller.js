import db from '../../../database/models/index';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uploadToCloudinary from '../../utils/uploads';

// CONFIGURE DOTENV
dotenv.config();

// LOAD MODELS
const { user } = db;

// LOAD ENVIRONMENT VARIABLES
const { JWT_SECRET: secret } = process.env;

// SIGNUP CONTROLLER

const signupController = async (req, res) => {
  // GET DATA FROM REQUEST BODY
  const { name, email, password, role } = req.body;
  let { photo } = req.body;

  console.log(req.body);

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

    // CHECK IF A USER HAS PROVIDED A PHOTO
    if (!photo) {
      photo = 'https://res.cloudinary.com/nishimweprince/image/upload/v1683983573/bookstore/users/default_zqfkfp.png';
    }

    /**
     * IF USER DOES NOT EXIST
     */
    // CLOUDINARY UPLOAD
    const photoUrl = await uploadToCloudinary(photo, 'users', `user_${email}`);
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
