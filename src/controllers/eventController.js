// const db = require('../models/index');
import db from '../models/index.js'

const Event = db.Event

// const getEvents = async (req, res) => {
//   const events = 'All Events'
//   res.json({ events })
// }

// const getEvent = async (req, res) => {
//   const events = 'All Events'
//   res.json({ events })
// }

// get one event
const getEvent = async (req, res) => {
  const { eventId } = req.params
  try {
    const response = await Event.findOne({ where: { id: eventId } })

    if (!response || response.length === 0) {
      res.status(404).json({
        status: '404',
        message: `No event found with the id: ${eventId}`,
      })
    } else {
      res
        .status(200)
        .json({ status: '200', message: 'Event found', data: response })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({status: '500', message: 'INTERNAL SERVER ERROR', error: error })
  }
}
export { getEvent }
