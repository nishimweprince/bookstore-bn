import express from 'express';
import addBook from '../controllers/book/addBook';
import readAllBooks from '../controllers/book/readAllBooks';
import { protectCreateBook, protectDeleteBook } from '../middlewares/protectBooks';
import deleteBook from '../controllers/book/deleteBook';
import readSingleBook from '../controllers/book/readSingleBook';

// EXPRESS ROUTER
const router = express.Router();

// ADD BOOK
router.post('/', protectCreateBook, addBook);

// DELETE BOOK
router.delete('/:id', protectDeleteBook, deleteBook);

// GET ALL BOOKS
router.get('/', readAllBooks);

// GET SINGLE BOOK
router.get('/:id', readSingleBook)

// EXPORT ROUTER
export default router;
