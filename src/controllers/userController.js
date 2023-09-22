/* eslint-disable object-curly-newline */
const User = require('../models/users');
const Events = require('../models/events');
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

const getUsers = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
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

// removing interest in an event
const deleteInterestForAnEvent = async (req, res) => {
  try {
    const userId = req.params.userId;
    const eventId = req.params.eventId;

    // find if the user exists in the database
    const user = await User.findOne({
      where: {
        Id: userId,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: `Cannot find the user with the Id ${userId}` });
    }

    // find if the event exists in the database
    const event = await Events.findOne({
      where: {
        Id: eventId,
      },
    });

    if (!event) {
      return res
        .status(404)
        .json({ error: `Cannot find the event with the Id ${eventId}` });
    }

    // remove interest in an event
    const interestedEvent = await InterestedEvents.destroy({
      where: {
        user_id: userId,
        event_id: eventId,
      },
    });

    if (!interestedEvent) {
      return res.status(404).json({ error: 'Cannot find interested event' });
    }

    res
      .status(200)
      .json({ message: 'You are no longer interested in this event' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// creating interest for an event
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

// const getUserEvents = async(req,res,next)=>{
//   try{
//     const { userId } = req.params;

//     const userEvents = await UserEvents.findAll({
//       where: { user_id: userId },
//       include: [
//         { model: User, attributes: ['id', 'name', 'email', 'avatar'] },
//         { model: Event, attributes: ['id', 'title', 'description', 'location', 'start_date', 'end_date', 'start_time', 'end_time', 'thumbnail'] },
//       ],
//     });

//     res.json(userEvents);

//   }catch(error){
//     next(error)
//   }

// }

module.exports = {
  getUsers,
  getProfile,
  getUserByEmail,
  getUserById,
  createUser,
  updateUserProfile,
  createInterestForAnEvent,
  deleteInterestForAnEvent,
};
