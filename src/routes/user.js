const express = require('express');
const { profile } = require('../controllers/userController');

const router = express.Router();

// router.post("/register", );

// router.post("/login", );

router.get('/:profileId', profile);

// router.put("/:profileId",);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

module.exports = router;
