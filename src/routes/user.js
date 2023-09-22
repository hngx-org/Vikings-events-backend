const express = require('express');

// router.post("/register", );
const {
  getUsers,
  getProfile,
  updateUserProfile,
  deleteInterestForAnEvent,
  createInterestForAnEvent,
} = require('../controllers/userController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

router.get('/', isUserAuthenticated, verify, getUsers);

router.get('/:profileId', getProfile);
// router.get('/:userId', getUserById);

// get users events
// router.get('/:userId/events',getUserEvents)

// get users events
// router.get('/:userId/events',getUserEvents)

router.put('/:profileId', updateUserProfile);

// Delete interest in an event
router.delete(
  '/:userId/interests/:eventId',
  isUserAuthenticated,
  verify,
  deleteInterestForAnEvent,
);

// Create interest in an event
router.post(
  '/:userId/interests/:eventId',
  isUserAuthenticated,
  verify,
  createInterestForAnEvent,
);

module.exports = router;
