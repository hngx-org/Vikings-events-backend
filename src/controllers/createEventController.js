const { Op } = require('sequelize');
const Events = require('../models/events');

// eslint-disable-next-line consistent-return
const createEventController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    } = req.body;

    const eventExists = await Events.findOne({
      where: {
        title: {
          [Op.eq]: title,
        },
      },
    });

    if (eventExists) {
      return res.status(409).json({ error: 'Event with this title already exists' });
    }

    const newEvent = {
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    };
    const event = await Events.create(newEvent);

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEventController };
