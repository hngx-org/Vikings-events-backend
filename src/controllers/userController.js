const User = require('../models/users');

const getProfile = async (req, res) => {
  const userProfileId = req.params.profileId;
  try {
    const userProfile = await User.findByPk(userProfileId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch user profile' });
  }
};

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

// const getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.status(400).json({ message: 'Invalid User ID' });
//     }

//     const user = await User.findOne({ where: { id } });
//     if (!user) {
//       res.status(404).json({ message: `User with id ${id} not found` });
//     }
//     res.status(200).json(user);
//     //for authentication purposes - generating JWT token
//     return user;
//   } catch (error) {
//     next(error);
//   }
// };

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
  getProfile,
  getUserByEmail,
  createUser,
  updateUserProfile,
  getUserById,
};
