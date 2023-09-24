const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array('images', 1);

const {
  getEvents,
  createEventController,
  deleteEventController,
  addCommentToEventController,
  addEventCommentImage,
  updateEventController,
  getEventDetails,
} = require('../controllers/eventController');
const {
  getComments,
  createComment,
} = require('../controllers/commentController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');
const { cloudConfig } = require('../middlewares/cloudinary');

const router = express.Router();

// Get all events
router.get('/', getEvents);

// Create an event
router.post('/', uploads, verify, cloudConfig, createEventController);

// Get an event by ID/ get event details
router.get('/:eventId', verify, getEventDetails);

// Update an event by ID/ update event
router.put('/:eventId', verify, updateEventController);

// Delete an event by ID/ Delete event
router.delete('/:eventId', verify, deleteEventController);

// Create an event comment
router.post('/:eventId/comments', verify, createComment);

// get event comments
router.get('/:eventId/comments', getComments);

// Add an event comment images
router.post('/:eventId/comments/:commentId/images', addEventCommentImage);

// get event comment image
// router.get("/:eventId/comments/:commentId/images", );

module.exports = router;
