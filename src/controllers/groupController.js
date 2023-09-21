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

const updateGroupDetails = async (req, res) => {
  const { groupId } = req.params;
  const groupDetail = await Groups.findOne({ where: { id: groupId } });
  if (!groupDetail) return res.status(400).json({ error: 'invalid Id' });
  await groupDetail.update({ ...req.body }, { where: { id: groupId } });
  return res.status(200).json({ groupDetail });
};
module.exports = { createGroup, getGroups, updateGroupDetails };
