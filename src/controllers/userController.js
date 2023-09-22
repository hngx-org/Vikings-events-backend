/* eslint-disable object-curly-newline */
const User = require('../models/users');
const InterestedEvents = require('../models/interested-events');

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

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res.status(400).json({ message: 'Something went wrong' });
    }

    if (users.length < 1) {
      res.status(200).json({ message: 'No Users have been added yet.' });
      return;
    }

    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  return user.dataValues;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return null;
  return user.dataValues;
};

const createUser = async ({ id, name, email, picture }) => {
  const user = await User.create({ id, name, email, avatar: picture });
  return user;
};

// Already Done
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

const createInterestForAnEvent = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;

    // check if the user has already created interest before
    const userInterest = await InterestedEvents.findOne({
      where: { user_id: userId, event_id: req.params.eventId },
    });

    if (userInterest) {
      throw new Error('User has already created interest for this event');
    }

    const newInterest = await InterestedEvents.create({
      user_id: userId,
      event_id: req.params.eventId,
    });

    res.status(200).json(newInterest);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserEvents = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userEvents = await UserEvents.findAll({
      where: { user_id: userId },
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'avatar'] },
        {
          model: Event,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'start_date',
            'end_date',
            'start_time',
            'end_time',
            'thumbnail',
          ],
        },
      ],
    });

    res.json(userEvents);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getProfile,
  getUserByEmail,
  getUserById,
  createUser,
  updateUserProfile,
  createInterestForAnEvent,
};
