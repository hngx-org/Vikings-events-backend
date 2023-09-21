const User = require('../models/users');

<<<<<<< HEAD
const getUser = async (req, res) => {
=======
const getUsers = async (req, res) => {
>>>>>>> 535dc538d4ef34f43cbe91cf80cda392c9c75133
  const users = 'All Users';
  res.json({ users });
};

<<<<<<< HEAD
const getUserProfile = async (req, res) => {
  try {
    //  check Id input
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ status: 'Failure', error: 'Invalid Id' });
    }
    const user = await User.findByPk(profileId);
    //  check for user
    if (!user) {
      return res
        .status(404)
        .json({ status: 'Failure', error: 'User Not found' });
    }
    return res
      .status(200)
      .json({ status: 'Success', message: 'User found', data: user });
  } catch (err) {
    return res.status(500).json({ status: 'Failure', error: err.message });
  }
};

module.exports = { getUser, getUserProfile };
=======
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.dataValues;
};

const createUser = async ({ name, email, picture }) => {
  const user = await User.create({ name, email, avatar: picture });
  return user;
};

module.exports = { getUsers, getUserByEmail, createUser };
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

module.exports = { getUsers, updateUserProfile };
>>>>>>> 535dc538d4ef34f43cbe91cf80cda392c9c75133
