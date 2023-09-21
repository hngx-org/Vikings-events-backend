const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  getUser,
  updateUserProfile,
} = require('../controllers/userController');
// const { getUser } = require('../controllers/userController');
require('../utils/passport')(passport);
require('dotenv').config();

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  },
);

router.get('/', passport.authenticate('jwt', { session: false }), getUser);

// router.get("/:profileId", );

router.put('/:profileId', passport.authenticate('jwt', { session: false }), updateUserProfile);

// Create interest in an event
// router.post("/userId/interests/:eventId", );

// Delete interest in an event
// router.delete("/:userId/interests/:eventId", );

module.exports = router;
