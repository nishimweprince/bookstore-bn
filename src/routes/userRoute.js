import express from 'express';
import signupController from '../controllers/user/signupContoller';
import loginController from '../controllers/user/loginController';
import addFavorite from '../controllers/favorites/addFavorite';
import { checkGeneralAuth } from '../middlewares/protectRoutes';
import getFavorites from '../controllers/favorites/getFavorites';
import removeFavorite from '../controllers/favorites/removeFavorite';

// LOAD EXPRESS ROUTER
const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', signupController);

// LOGIN ROUTE
router.post('/login', loginController);

// ADD FAVORITE
router.post('/favorite/:id', checkGeneralAuth, addFavorite);

// GET ALL FAVORITES
router.get('/favorite', checkGeneralAuth, getFavorites);

// REMOVE FAVORITE
router.delete('/favorite/:id', checkGeneralAuth, removeFavorite);

// EXPORT ROUTER
export default router;
