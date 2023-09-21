const express = require('express');

const {
  createGroup,
  getGroups,
  addUserToGroup,
  getGroupDetails,
} = require('../controllers/groupController');

const router = express.Router();

// Create a group
router.post('/', createGroup);

// get all groups
router.get('/', getGroups);

// Get a group detail
router.get('/:groupId', getGroupDetails);

// Update a group detail
router.put('/:groupId');

// Add user to a group
//router.post('/:groupId/members/:userId', addUserToGroup);

// Remove user from a group
// router.delete("/:groupId/members/:userId", );

module.exports = router;
