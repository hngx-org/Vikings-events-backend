const Router = require('express')
const {
  addUserToGroup,
  getGroups,
} = require('../controllers/groupController.js')

const router = Router()

// Create a group
// router.post("/", );

// get all groups
router.get('/', getGroups)

// Get a group detail
// router.get("/:groupId", );

// Get a group detail
// router.put("/:groupId", );

// Add user to a group
router.post('/:groupId/members/:userId', addUserToGroup)

// Remove user from a group
// router.delete("/:groupId/members/:userId", );

module.exports = router
