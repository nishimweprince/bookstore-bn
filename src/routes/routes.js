import express from 'express';
import userRoute from './userRoute';
import bookRoute from './bookRoute';

// LOAD EXPRESS ROUTER
const router = express.Router();

/**
 * ROUTES
 */

// USER ROUTES
router.use('/user', userRoute);

// BOOK ROUTES
router.use('/book', bookRoute);

// EXPORT ROUTER
export default router;