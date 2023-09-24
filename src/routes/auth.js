const express = require('express');

const { handleLoginController, handleLogoutController } = require('../controllers/authController');

const { verify } = require('../middlewares/auth')

const router = express.Router();

router.post('/', handleLoginController);

router.post('/logout',verify, handleLogoutController);

module.exports = router;
