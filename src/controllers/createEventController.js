const Events = require('../models/events');

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

    res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEventController };
