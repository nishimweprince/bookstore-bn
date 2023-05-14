import db from '../../../database/models/index';

// LOAD MODELS
const { favorite, book } = db;

// CREATE FAVORITE CONTROLLER
const addFavorite = async (req, res) => {
  // CATCH BOOK ID FROM REQUEST PARAMS
  const { id } = req.params;
  // CATCH USER ID FROM LOCALS
  const { userId } = res.locals;
  try {
    // CHECK IF BOOK EXISTS
    const bookExists = await book.findOne({
      where: { id },
    });
    // IF BOOK DOES NOT EXIST, RETURN ERROR
    if (!bookExists) {
      return res.status(404).json({
        error: 'Book not found',
      });
    }
    // CHECK IF BOOK IS ALREADY FAVORITED
    const isFavorite = await favorite.findOne({
      where: { userId, bookId: id },
    });
    // IF BOOK IS ALREADY FAVORITED, RETURN ERROR
    if (isFavorite) {
      return res.status(409).json({
        error: 'You have already favorited this book',
      });
    }
    // CREATE FAVORITE
    const favoriteBook = await favorite.create({
      userId,
      bookId: id,
    });
    // RETURN RESPONSE
    return res.status(201).json({
      message: 'Book added to favorites',
      favoriteBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default addFavorite;
