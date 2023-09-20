const Events = require('../models/events.js');

async function getEventController(req, res) {
  try {
    const event = await Events.findAndCountAll({ limit: 10 });
    res.json({ msg: 'Event retrieved', event });
  } catch (error) {
    console.log(error, 'error');
    res.send(error, 'error');
  }
}

module.exports = { getEventController };
