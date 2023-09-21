const express = require('express');
<<<<<<< HEAD
const { getUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUser);
router.get('/:profileId', getUserProfile);
=======
const {
  getUsers,
  updateUserProfile,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
>>>>>>> 535dc538d4ef34f43cbe91cf80cda392c9c75133

// router.post('/register', );

// router.post("/login", );

// router.get("/:profileId", );

router.put('/:profileId', updateUserProfile);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

module.exports = router;
