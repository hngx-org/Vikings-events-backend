const express = require('express');
// router.post("/register", );
const {
  getUsers,
  getProfile,
  updateUserProfile,
  createInterestForAnEvent,
} = require('../controllers/userController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getUsers);

router.get('/:profileId', getProfile);

// get users events
// router.get('/:userId/events',getUserEvents)

router.put('/:profileId', updateUserProfile);

// Create interest in an event
router.post(
  '/:userId/interests/:eventId',
  isUserAuthenticated,
  verify,
  createInterestForAnEvent,
);

module.exports = router;
