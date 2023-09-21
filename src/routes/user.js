const express = require('express')

const router = express.Router();
const { getUser, registerUser, loginUser, getUserProfile, updateUserProfile, createInterest, deleteInterest } = require('../controllers/userController');

// Get user details
router.get('/', async (req, res) => {
  try {
    const users = await getUser();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to retrieve user details', error: error.message });
  }
});

// User Registration
router.post('/register', async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'User registration failed', error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const user = await loginUser(req.body);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get user profile by ID
router.get('/:profileId', async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.params.profileId);
    if (!userProfile) {
      res.status(404).json({ message: 'User profile not found' });
    } else {
      res.status(200).json(userProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
  }
});

// Update user profile by ID
router.put('/:profileId', async (req, res) => {
  try {
    const updatedUserProfile = await updateUserProfile(req.params.profileId, req.body);
    if (!updatedUserProfile) {
      res.status(404).json({ message: 'User profile not found' });
    } else {
      res.status(200).json(updatedUserProfile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to update user profile', error: error.message });
  }
});


// Create interest in an event
router.post('/:userId/interests/:eventId', async (req, res) => {
  try {
    const newInterest = await createInterest(req.params.userId, req.params.eventId);
    res.status(201).json(newInterest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to create interest', error: error.message });
  }
});

 // Delete interest in an event
 router.delete('/:userId/interests/:eventId', async (req, res) => {
  try {
    const deletedInterest = await deleteInterest(req.params.userId, req.params.eventId);
    if (!deletedInterest) {
      res.status(404).json({ message: 'Interest not found' });
    } else {
      res.status(200).json({ message: 'Interest deleted successfully' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to delete interest', error: error.message });
  }
});


module.exports = router
