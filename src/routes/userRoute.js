import express from 'express';
import signupController from '../controllers/user/signupContoller';
import loginController from '../controllers/user/loginController';

// LOAD EXPRESS ROUTER
const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', signupController);

// LOGIN ROUTE
router.post('/login', loginController);

// EXPORT ROUTER
export default router;