const User = require('../models/users');

const getUsers = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.dataValues;
};

const createUser = async ({ name, email, picture }) => {
  const user = await User.create({ name, email, avatar: picture });
  return user;
};

// eslint-disable-next-line consistent-return
const updateUserProfile = async (req, res, next) => {
  const userId = req.params.profileId;
  const { name, email, avatar } = req.body;
  try {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      res.status(404).json({ error: 'User not found' });
    }

    const [updatedRowCount] = await User.update(
      {
        name,
        email,
        avatar,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'updated user not found' });
    }

    const updatedUser = await User.findByPk(userId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUserProfile,
};
