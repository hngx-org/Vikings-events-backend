const express = require('express');
const {
  getEvents,
  createEventController,
  deleteEventController,
  addEventCommentImage,
  updateEventController,
  getEventDetails,
} = require('../controllers/eventController');
const {
  getComments,
  createComment,
} = require('../controllers/commentController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

// Get all events
router.get('/', getEvents);

// Create an event
router.post('/', verify, isUserAuthenticated, createEventController);

// Get an event by ID/ get event details
router.get('/:eventId', getEventDetails);

// Update an event by ID/ update event
router.put('/:eventId', verify, isUserAuthenticated, updateEventController);

// Delete an event by ID/ Delete event
router.delete('/:eventId', verify, isUserAuthenticated, deleteEventController);

// Create an event comment
router.post('/:eventId/comments', verify, isUserAuthenticated, createComment);

// get event comments
router.get('/:eventId/comments', getComments);

// Add an event comment images
router.post('/:eventId/comments/:commentId/images', addEventCommentImage);

// get event comment image
// router.get("/:eventId/comments/:commentId/images", );

module.exports = router;
