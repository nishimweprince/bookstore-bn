import db from '../../../database/models';

const { user } = db;

const getUser = async (req, res) => {
  // GET USER ID FROM LOCAL RESPONSES
  const { userId } = res.locals;

  // CATCH USER ID FROM REQUEST PARAMS
  const { id } = req.params;

  try {
    // IF USER ID FROM LOCAL RESPONSES IS NOT EQUAL TO USER ID FROM REQUEST PARAMS, RETURN ERROR
    if (userId !== id) {
      return res.status(403).json({
        message: 'You are not allowed to perform this action',
      });
    }
    // FIND USER BY ID
    const foundUser = await user.findOne({
      where: { id: userId },
    });
    // IF USER DOES NOT EXIST, RETURN ERROR
    if (!foundUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    // IF USER EXISTS, RETURN USER
    return res.status(200).json({
      message: 'User found successfully',
      user: foundUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default getUser;
