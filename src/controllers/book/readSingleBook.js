import db from '../../../database/models/index';

// LOAD MODELS
const { book, user, genre, author } = db;

// GET SINGLE BOOK CONTROLLER
const readSingleBook = async (req, res) => {
  // GET BOOK ID FROM REQUEST PARAMS
  const { id } = req.params;

  try {
    // GET BOOK
    const singleBook = await book.findOne({
      where: { id },
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['name', 'email', 'slug'],
        },
        {
          model: genre,
          as: 'genre',
          attributes: ['name'],
        },
        {
          model: author,
          as: 'author',
          attributes: ['name', 'slug'],
        },
      ],
    });
    // IF BOOK DOES NOT EXIST, RETURN ERROR
    if (!singleBook) {
        return res.status(404).json({
            message: 'Book not found',
        });
    }
    // RETURN RESPONSE
    return res.status(200).json({
        message: 'Book retrieved successfully',
        book: singleBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default readSingleBook;
