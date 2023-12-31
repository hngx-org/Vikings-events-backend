/* eslint-disable no-console */
const sequelize = require('../config/config');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');
const CommentImages = require('../models/comment_images');
const EventThumbnail = require('../models/event_thumbnail');
const GroupEvents = require('../models/group-events');

const InterestedEvents = require('../models/interested-events');
const { upload } = require('../services/cloudinary');
const { getUserById } = require('./userController');
const Events = require('../models/3-events');
const User = require('../models/1-users');
const Images = require('../models/4-images');
const Comments = require('../models/5-comments');

// cloudinary.config({
//   cloud_name: 'ol4juwon',
//   api_key: '619781942963636',
//   api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
// });

const getEvents = async (req, res) => {
  try {
    const now = new Date();

    const check = new Date();
    check.setHours(0, 0, 0, 0);

    const nowTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const nowEvents = [];
    const upcomingEvents = [];

    const events = await Events.findAll({
      where: {
        start_date: {
          [Op.gte]: check, // Events with start_date greater than or equal to now
        },
      },
      order: [['start_date', 'ASC']], // Order events by start_date in ascending order
    });

    await Promise.all(
      events.map(async (event) => {
        const imagesLink = await EventThumbnail.findOne({
          where: { event_id: event.id },
        });

        let image = null;

        if (imagesLink) {
          image = await Images.findByPk(imagesLink.dataValues.image_id);
          console.log(image.url);
        }

        const formated = {
          ...event.dataValues,
          image: image && image.url,
        };

        console.log('date', event.start_date, now);

        // Convert date strings to JavaScript Date objects
        const date1 = await convertToDAte(event.start_date);
        const date2 = await convertToDAte(now);

        // Get the date parts without the time
        console.log('time', event.start_time, event.end_time, nowTime);

        const time1 = await convertTo24HourFormat(event.start_time);
        const time3 = await convertTo24HourFormat(event.end_time);
        const time2 = await convertTo24HourFormat(nowTime);

        if (
          date1.getTime() == date2.getTime() &&
          time1 <= time2 &&
          time3 >= time2
        ) {
          nowEvents.push(formated);
        } else {
          upcomingEvents.push(formated);
        }
      }),
    );

    res.status(200).json({
      events: { nowEvents, upcomingEvents },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createEventController = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
      group_id,
    } = req.body;

    const userId = req.user.id;
    console.log(userId);

    const user = await User.findByPk(userId);

    const newEvent = {
      title,
      description,
      location,
      creator_id: user.id,
      start_date,
      end_date,
      start_time,
      end_time,
    };

    if (!req.files) return res.status(400).json({ message: 'add event image' });

    // upload the images
    const urls = await upload(req.files);

    const events = await Events.create(newEvent);

    const imageIDs = [];

    // loop to create images
    for (const url of urls) {
      const image = await Images.create({ url });
      imageIDs.push(image.id);
    }

    // loop to create image comment association
    for (const imageID of imageIDs) {
      await EventThumbnail.create({
        event_id: events.dataValues.id,
        image_id: imageID,
      });
    }

    if (group_id != 'null') {
      await GroupEvents.create({
        group_id,
        event_id: events.id,
      });
    }

    return res.status(201).json({ ...events.dataValues, urls });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteEventController = async (req, res) => {
  const { eventId } = req.params;

  try {
    const response = await Events.destroy({ where: { id: eventId } });

    res.json({ message: 'Event deleted successfully', data: 1 });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      error: 'An error occurred while deleting the event',
      details: error.message,
    });
  }
};

const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    } = req.body;

    // Fetch the event by ID
    const event = await Events.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (userId != event.dataValues.creator_id)
      return res.status(400).json({ error: 'Unauthorized access' });

    // Update event details
    event.title = title || event.dataValues.title;
    event.description = description || event.dataValues.description;
    event.location = location || event.dataValues.location;
    event.creator_id = userId || event.dataValues.creator_id;
    event.start_date = start_date || event.dataValues.start_date;
    event.end_date = end_date || event.dataValues.end_date;
    event.start_time = start_time || event.dataValues.start_time;
    event.end_time = end_time || event.dataValues.end_time;

    // Save the updated event
    await event.save();

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      error: 'An error occurred while updating the event',
      details: error.message,
    });
  }
};

const addCommentToEventController = async (req, res) => {
  const { eventId } = req.params;
  const { body } = req.body;

  const userId = req.user.id;

  const event = await Events.findByPk(eventId);

  if (!event) {
    return res.status(404).send({ error: 'Event not found' });
  }

  try {
    const newComment = { body, event_id: eventId, user_id: userId };
    const comment = await Comments.create(newComment);

    return res
      .status(201)
      .send({ message: 'Comment created successfully', comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'An error occurred while creating the comment',
      details: error.message,
    });
  }
};

const addEventCommentImage = async (req, res) => {
  const t = await Images.sequelize.transaction();
  const c = await CommentImages.sequelize.transaction();
  try {
    console.log('error');
    const { commentId, eventId } = req.params;
    const files = req.file;
    console.log({ files });
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log({ result });
    const imageID = await Images.create({ url: result.secure_url });
    console.log(imageID.dataValues.id);
    await CommentImages.create({
      image_id: imageID.dataValues.id,
      comment_id: commentId,
    });
    t.commit();
    c.commit();
    return res.status(200).json({ data: 'image added successfully' });
  } catch (e) {
    t.rollback();
    c.rollback();
    console.error(e);
    res
      .status(500)
      .json({ error: 'An internal error occurred while  uploading image' });
  }
};

// get Event details
const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Events.findByPk(eventId);
    const comments = await Comments.findAll({
      where: { event_id: eventId },
      include: [Images],
      attributes: {
        include: [
          [
            // Note the wrapping parentheses in the call below!
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes
                    WHERE
                    likes.comment_id = Comments.id
                )`),
            'likesCount',
          ],
        ],
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const response = {
      event,
      comments,
      message: 'Event fetched successfully',
      status: 'Success',
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const convertTo24HourFormat = async (timeStr) => {
  if (!timeStr) return `00:00`;
  const timeArray = timeStr.split(' ');
  const isPM = timeArray[1] === 'PM';

  if (!timeArray[0]) return `00:00`;

  let [hours, minutes] = timeArray[0].split(':').map(Number);

  if (isPM && hours !== 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }

  // Pad single-digit hours and minutes with leading zeros
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');

  return `${hours}:${minutes}`;
};
const convertToDAte = async (date) => {
  const date1 = new Date(date);

  const datePart2 = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
  );
  return datePart2;
};

module.exports = {
  getEvents,
  createEventController,
  deleteEventController,
  addEventCommentImage,
  getEvents,
  createEventController,
  deleteEventController,
  updateEventController,
  addCommentToEventController,
  getEventDetails,
};
