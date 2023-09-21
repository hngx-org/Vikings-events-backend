const express = require('express');
// router.post("/register", );
const {
  getUsers,
  getProfile,
  updateUserProfile,
  deleteInterestedEvent,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

// router.post('/register', );

// router.post("/login", );

router.get('/:profileId', getProfile);

router.put('/:profileId', updateUserProfile);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
router.delete('/:userId/interests/:eventId', deleteInterestedEvent);

module.exports = router;
