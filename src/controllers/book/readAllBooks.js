import db from '../../../database/models/index';

// LOAD MODELS
const { book, user, genre, author } = db;

// GET ALL BOOKS CONTROLLER
const readAllBooks = async (req, res) => {
  try {
    // GET ALL BOOKS
    const books = await book.findAll({
      attributes: ['id', 'title', 'releaseYear', 'isbn', 'copies', 'createdAt', 'slug', 'updatedAt', 'cover'],
      include: [
        {
            model: user,
            as: 'user',
            attributes: ['name', 'email'],
        },
        {
            model: genre,
            as: 'genre',
            attributes: ['name'],
        },
        {
            model: author,
            as: 'author',
            attributes: ['name'],
        }
      ],
    });
    // RETURN RESPONSE
    return res.status(200).json({
      message: 'Books retrieved successfully',
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default readAllBooks;
