const express = require('express')
const {
  getUser,
  deleteInterestedEvent,
} = require('../controllers/userController.js')

const router = express.Router()

router.get('/', getUser)

// router.post("/register", );

// router.post("/login", );

// router.get("/:profileId", );

// router.put("/profileId",);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
router.delete('/:userId/interests/:eventId', deleteInterestedEvent)

module.exports = router
