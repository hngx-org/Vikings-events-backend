const express = require('express');
const { getUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUser);
router.get('/getUserProfile/:userId', getUserProfile);

// router.post("/register", );

// router.post("/login", );

// router.get("/:profileId", );

// router.put("/profileId",);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

module.exports = router;
