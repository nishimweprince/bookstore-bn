import db from '../../../database/models/index';

// LOAD MODELS
const { favorite, book, user } = db;

// GET ALL FAVORITES CONTROLLER
const getFavorites = async (req, res) => {
  try {
    // CATCH USER ID FROM LOCALS
    const { userId } = res.locals;
    // FIND ALL FAVORITES
    const favorites = await favorite.findAll({
      where: { userId },
      include: [
        {
          model: book,
          as: 'book',
          attributes: [
            'title',
            'releaseYear',
            'copies',
            'cover',
            'isbn',
            'createdAt',
            'updatedAt',
          ],
        },
        {
            model: user,
            as: 'user',
            attributes: ['name'],
        }
      ],
    });
    // RETURN RESPONSE
    return res.status(200).json({
      message: 'Favorites retrieved successfully',
      favorites,
    });
    // CATCH ERROR
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default getFavorites;
