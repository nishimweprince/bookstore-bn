import db from '../../../database/models/index';

// LOAD MODELS
const { favorite, book, user } = db;

// REMOVE FAVORITE CONTROLLER
const removeFavorite = async (req, res) => {
  // CATCH BOOK ID FROM REQUEST PARAMS
  const { id } = req.params;
  // CATCH USER ID FROM LOCALS
  const { userId } = res.locals;

  try {
    // CHECK IF BOOK EXISTS IN FAVORITES
    const bookExists = await favorite.findOne({
      where: { userId, bookId: id },
    });

    // IF BOOK DOES NOT EXIST, RETURN ERROR
    if (!bookExists) {
      return res.status(404).json({
        error: 'Book not found. Make sure you have it in your favorites',
      });
    }
    // REMOVE BOOK FROM FAVORITES
    await favorite.destroy({
      where: { userId, bookId: id },
    });
    // RETURN RESPONSE
    return res.status(200).json({
      message: 'Book removed from favorites',
    });
    // CATCH ERROR
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default removeFavorite;
