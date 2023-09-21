const User = require('../models/users');

const getUser = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
};

// eslint-disable-next-line consistent-return
const updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  const {
    name,
    email,
    avatar,
  } = req.body;
  try {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.update({
      name,
      email,
      avatar,
    }, {
      where: {
        id: userId,
      },
      returning: true,
    });

    if (updatedUser > 0) {
      return res.status(200).json({ message: 'User profile updated successfully' });
    }
    return res.status(400).json({ message: 'No change was detected' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUserProfile };
