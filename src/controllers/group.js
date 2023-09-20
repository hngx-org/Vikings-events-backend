const Groups = require('../models/groups.js');

async function groupController(req, res) {
  try {
    const { name } = req.body;

    const newGroup = await Groups.create({ name });

    await newGroup.save();

    res.send({ msg: 'Group created', newGroup });
  } catch (error) {
    console.log(error, 'error');
    res.send(error, 'error');
  }
}

module.exports = { groupController };
