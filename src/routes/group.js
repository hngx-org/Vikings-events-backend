const express = require('express');

const {
  createGroup,
  getGroups,
  addUserToGroup,
  getGroupDetails,
  removeUserFromAGroup,
} = require('../controllers/groupController');
const { verify, isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// Create a group
router.post('/', verify, isUserAuthenticated, createGroup);

// get all groups
router.get('/', getGroups);

// Get a group detail
router.get('/:groupId', getGroupDetails);

// Update a group detail
router.put('/:groupId');

// Add user to a group
router.post(
  '/:groupId/members/:userId',
  verify,
  isUserAuthenticated,
  addUserToGroup,
);

// Remove user from a group
router.delete(
  '/:groupId/members/:userId',
  isUserAuthenticated,
  verify,
  removeUserFromAGroup,
);

module.exports = router;
