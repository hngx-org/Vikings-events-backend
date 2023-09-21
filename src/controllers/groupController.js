const Groups = require('../models/groups');

const createGroup = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newGroup = await Groups.create({
      title,
    });
    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const groupDetials = async (req, res) => {
  const { groupId } = req.params;
  try {
    const detials = await Groups.findByPk(groupId);
    if (!detials) {
      return res.status(404).json({ error: 'Group profile not found!' });
    }
    return res.status(200).json(detials);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch group profile' });
  }
};

module.exports = { getGroups, groupDetials, createGroup };
