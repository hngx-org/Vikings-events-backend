import Router from 'express'
import { getEvent } from '../controllers/eventController.js'

const router = Router()

// Get all events
// router.get('/', getEvents)

// Create an event
// router.post("/", createEvent);

// Get an event by ID/ get event details
router.get("/:eventId", getEvent );

// Update an event by ID/ update event
// router.put("/:eventId", );

// Delete an event by ID/ Delete event
// router.delete("/:eventId", );

// Create an event comment
// router.post("/:eventId/comments", );

// get event comments
// router.get("/:eventId/comments", );

// Add an event comment images
// router.post("/:eventId/comments/:commentId/images", );

// get event comment image
// router.get("/:eventId/comments/:commentId/images", );

export default router
