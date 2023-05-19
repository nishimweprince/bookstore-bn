import db from '../../../database/models';

const { favorite } = db;

const getFavorite = async (req, res) => {
  // CATCH BOOK ID FROM REQUEST PARAMS
  const { id } = req.params;
  // CATCH USER ID FROM LOCALS
  const { userId } = res.locals;

  console.log('userId', userId);
  console.log('id', id);

  try {
    // CHECK IF BOOK IS FAVORITED
    const isFavorited = await favorite.findOne({
      where: { userId, bookId: id },
    });
    // IF BOOK IS FAVORITED, RETURN SUCCESS
    if (isFavorited) {
        return res.status(200).json({
            message: 'Book is favorited',
            status: true,
        });
    }
    // IF BOOK IS NOT FAVORITED, RETURN NOT FOUND
    return res.status(200).json({
        message: 'Book is not favorited',
        status: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default getFavorite;
