const Events = require('../models/events.js');

async function eventController(req, res) {
  try {
    const {
      title,
      description,
      location,
      start_date,
      creator_id,
      end_date,
      start_time,
      end_time,
    } = req.body;

    const EventInfo = {
      title,
      description,
      location,
      creator_id,
      start_date,
      end_date,
      start_time,
      end_time,
    };

    const newEvent = await Events.create(EventInfo);

    await newEvent.save();

    res.send({ msg: 'Event created', newEvent });
  } catch (error) {
    console.log(error, 'error');
    res.send(error, 'error');
  }
}

module.exports = { eventController };
