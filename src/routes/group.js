const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array('images', 1);

const {
  createGroup,
  getGroups,
  addUserToGroup,
  getGroupDetails,
  removeUserFromAGroup,
} = require('../controllers/groupController');
const { verify, isUserAuthenticated } = require('../middlewares/auth');
const { cloudConfig } = require('../middlewares/cloudinary');

const router = express.Router();

// Create a group
router.post('/', uploads, verify, cloudConfig, createGroup);

// get all groups
router.get('/', getGroups);

// Get a group detail
router.get('/:groupId', getGroupDetails);
// router.get('/groupId/events', getGroupEvents);

// Update a group detail
router.put('/:groupId');

// Add user to a group
router.post('/:groupId/members/:userId', verify, addUserToGroup);

// Remove user from a group
router.delete('/:groupId/members/:userId', verify, removeUserFromAGroup);

module.exports = router;
