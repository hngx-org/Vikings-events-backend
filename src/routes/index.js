const express = require('express');
const { getIndex } = require('../controllers/index');
const { userController } = require('../controllers/user');
const { eventController } = require('../controllers/event');

const router = express.Router();

router.get('/', getIndex);
router.post('/', userController);
router.post('/event', eventController);

module.exports = router;
