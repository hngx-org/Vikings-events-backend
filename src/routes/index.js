const express = require('express');
const { getIndex } = require('../controllers/index');
const { userController } = require('../controllers/user');
const { eventController } = require('../controllers/event');
const { groupController } = require('../controllers/group');
const { commentController } = require('../controllers/comment');
const { getEventController } = require('../controllers/getEvents');

const router = express.Router();

router.get('/', getIndex);
router.post('/', userController);
router.post('/event', eventController);
router.post('/group', groupController);
router.post('/comment', commentController);
router.get('/events', getEventController);

module.exports = router;
