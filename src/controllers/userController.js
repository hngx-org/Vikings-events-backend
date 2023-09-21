const User = require('../models/users')
const Events = require('../models/events')
const InterestedEvents = require('../models/interested-events')

const getUser = async (req, res) => {
  const users = 'All Users'
  res.json({ users })
}

const deleteInterestedEvent = async (req, res) => {
  try {
    const userId = req.params.userId
    const eventId = req.params.eventId

    // find if the user exists in the database
    const user = await User.findOne({
      where: {
        Id: userId,
      },
    })

    if (!user) {
      return res
        .status(400)
        .json({ error: `Cannot find the user with the Id ${userId}` })
    }

    // find if the event exists in the database
    const event = await Events.findOne({
      where: {
        Id: eventId,
      },
    })

    if (!event) {
      return res
        .status(400)
        .json({ error: `Cannot find the event with the Id ${eventId}` })
    }

    // remove interest in an event
    const interestedEvent = await InterestedEvents.destroy({
      where: {
        user_id: userId,
        event_id: eventId,
      },
    })

    if (!interestedEvent) {
      return res.status(400).json({ error: 'Cannot find interested event' })
    }

    res
      .status(200)
      .json({ message: 'You are no longer interested in this event' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getUser, deleteInterestedEvent }
