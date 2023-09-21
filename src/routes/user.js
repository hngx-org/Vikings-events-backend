const express = require('express');
const {
  getUser,
  updateUserProfile,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUser);

// router.post('/register', );

// router.post("/login", );

// router.get("/:profileId", );

router.put('/:profileId', updateUserProfile);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

module.exports = router;
