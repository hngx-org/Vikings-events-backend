/* eslint-disable object-curly-newline */
const { Op } = require('sequelize');
const User = require('../models/users');
const UserGroups = require('../models/user-groups.js');
const Groups = require('../models/groups');
const GroupImages = require('../models/group_image');
const Images = require('../models/images');
const Events = require('../models/events');
const InterestedEvents = require('../models/interested-events');
const sequelize = require('../config/config');

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

const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({
        status: res.statusCode,
        message: 'User not found',
        error: `Unable to fetch user with id ${userId}`,
      });
      return;
    }

    const usersGroups = await UserGroups.findAll({
      where: { user_id: userId },
    });

    const data = [];
    const groupId = usersGroups.map((group) => group.group_id);

    await Promise.all(
      groupId.map(async (id) => {
        const groups = await Groups.findByPk(id);

        const imageObject = await GroupImages.findAll({
          where: { group_id: id },
        });

        const imgId = imageObject.map((img) => img.image_id);

        const images = await Promise.all(
          imgId.map(async (id) => {
            const image = await Images.findByPk(id);
            return image;
          }),
        );

        const memberCount = await UserGroups.count({
          where: { group_id: id },
        });

        data.push({ groups, images, memberCount });
      }),
    );

    res.status(200).json({
      status: res.statusCode,
      message: 'User groups and images retrieved',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: 'Error fetching user groups and images',
      error: error.message,
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res.status(400).json({ error: 'Something went wrong' });
    }

    if (users.length < 1) {
      res.status(200).json({ message: 'No Users have been added yet.' });
      return;
    }

    res
      .status(200)
      .json({ status: res.statusCode, message: 'All Users', data: users });
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
    const { userId } = req.params;
    const { eventId } = req.params;

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

// get all interest for an event
const getAllInterestForAnEvent = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    if (!year || !month) {
      return res
        .status(400)
        .json({ message: 'Year and month query parameters are required.' });
    }
    const { InterestedEvents } = sequelize.models;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Get all event_ids that the user is interested in
    const userEvents = await InterestedEvents.findAll({
      attributes: ['event_id'],
      where: {
        user_id: userId,
      },
    });

    const eventIds = userEvents.map((userEvent) => userEvent.event_id);

    // Retrieve events for the interested event_ids within the specified date range
    const eventsWithDates = await Events.findAll({
      where: {
        id: {
          [Op.in]: eventIds,
        },
        start_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Create an object to store events for each day of the month
    const eventsByDay = {};

    // Group events by day
    eventsWithDates.forEach((event) => {
      const eventDate = event.start_date;
      const day = eventDate.getDate();

      if (!eventsByDay[day]) {
        eventsByDay[day] = [];
      }

      eventsByDay[day].push(event);
    });

    res.status(200).json(eventsByDay);
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
  deleteInterestForAnEvent,
  getAllInterestForAnEvent,
  getUserGroups,
};
