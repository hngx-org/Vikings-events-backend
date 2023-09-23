const express = require('express');
// router.post("/register", );
const {
  getUsers,
  getProfile,
  updateUserProfile,
  deleteInterestForAnEvent,
  createInterestForAnEvent,
  getAllInterestForAnEvent,
  getUserGroups,
} = require('../controllers/userController');
const { isUserAuthenticated, verify } = require('../middlewares/auth');

const router = express.Router();

router.get('/', verify, getUsers);

router.get('/:profileId', getProfile);

router.get('/:userId/groups', getUserGroups);

router.put('/:profileId', updateUserProfile);

// Get all interest in an event
router.get('/:userId/interests/events', verify, getAllInterestForAnEvent);

// Delete interest in an event
router.delete('/:userId/interests/:eventId', verify, deleteInterestForAnEvent);

// Create interest in an event
router.post('/:userId/interests/:eventId', verify, createInterestForAnEvent);

module.exports = router;
