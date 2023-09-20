const Events = require('../models/events');

const getEvents = async (req, res) => {
  try {
    const events = await Events.findAndCountAll({ limit: 10 });

    res.send(events);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getEvents };
