import express from 'express';
import signupRoute from './userRoute';

// LOAD EXPRESS ROUTER
const router = express.Router();

// LOAD ROUTES
router.use('/user', signupRoute);

// EXPORT ROUTER
export default router;