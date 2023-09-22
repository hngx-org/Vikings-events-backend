const express = require('express');
// router.post("/register", );
const {
  getUsers,
  getProfile,
  updateUserProfile,
  deleteInterestForAnEvent,
  createInterestForAnEvent,
  getAllInterestForAnEvent,
} = require('../controllers/userController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

router.get('/', isUserAuthenticated, verify, getUsers);

router.get('/:profileId', getProfile);

router.put('/:profileId', updateUserProfile);

// Get all interest in an event
router.get(
  '/:userId/interests/events',
  isUserAuthenticated,
  verify,
  getAllInterestForAnEvent,
);

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
