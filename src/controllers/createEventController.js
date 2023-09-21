const Events = require('../models/events');

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
    const events = await Events.create(newEvent);

    res.send(events);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createEventController };
