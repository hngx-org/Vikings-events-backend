const express = require('express');
const {
  getEvents,
  createEventController,
  deleteEventController,
} = require('../controllers/eventController');
const { getComments } = require('../controllers/commentController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

// Get all events
// router.get('/', getEvents);

// Create an event
router.post('/', createEventController);

// Get an event by ID/ get event details
router.get('/:eventId', getEvents);

// Update an event by ID/ update event
// router.put("/:eventId", );

// Delete an event by ID/ Delete event
router.delete('/:eventId', deleteEventController);

// Create an event comment
// router.post("/:eventId/comments", );

// get event comments
router.get('/:eventId/comments', getComments);

// Add an event comment images
// router.post("/:eventId/comments/:commentId/images", );

// get event comment image
// router.get("/:eventId/comments/:commentId/images", );

module.exports = router;
