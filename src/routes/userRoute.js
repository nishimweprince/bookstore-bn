import express from 'express';
import signupController from '../controllers/user/signupContoller';
import loginController from '../controllers/user/loginController';
import addFavorite from '../controllers/favorites/addFavorite';
import { checkGeneralAuth } from '../middlewares/protectRoutes';
import getFavorites from '../controllers/favorites/getFavorites';
import removeFavorite from '../controllers/favorites/removeFavorite';
import getFavorite from '../controllers/favorites/getSingleFavorites';
import getUser from '../controllers/user/getUser';

// LOAD EXPRESS ROUTER
const router = express.Router();

// SIGNUP ROUTE
router.post('/signup', signupController);

// LOGIN ROUTE
router.post('/login', loginController);

// GET SINGLE USER
router.get('/:id', checkGeneralAuth, getUser);

// ADD FAVORITE
router.post('/favorites/:id', checkGeneralAuth, addFavorite);

// GET ALL FAVORITES
router.get('/favorites', checkGeneralAuth, getFavorites);

// REMOVE FAVORITE
router.delete('/favorites/:id', checkGeneralAuth, removeFavorite);

// GET SINGLE BOOK
router.get('/favorites/:id',checkGeneralAuth, getFavorite);

// EXPORT ROUTER
export default router;
