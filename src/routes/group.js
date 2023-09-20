const Router = require('express');
const { getGroups } = require('../controllers/groupController');

const router = Router();

// Create a group
// router.post("/", );

// get all groups
router.get('/', getGroups);

// Get a group detail
// router.get("/:groupId", );

// Get a group detail
// router.put("/:groupId", );

// Add user to a group
// router.post("/:groupId/members/:userId", );

// Remove user from a group
// router.delete("/:groupId/members/:userId", );

module.exports = router;
