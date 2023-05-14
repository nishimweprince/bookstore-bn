import db from '../../../database/models/index';

// LOAD MODELS
const { book } = db;

// DELETE BOOK CONTROLLER
const deleteBook = async (req, res) => {
  // GET BOOK ID FROM REQUEST PARAMS
  const { id } = req.locals;

  try {
    // DELETE BOOK
    await book.destroy({
      where: { id },
    });
    // RETURN RESPONSE
    return res.status(200).json({
      message: 'Book deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default deleteBook;
