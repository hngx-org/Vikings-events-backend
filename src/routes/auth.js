const express = require('express');

const { handleLoginController } = require('../controllers/authController');

const router = express.Router();

router.post('/', handleLoginController);

module.exports = router;
