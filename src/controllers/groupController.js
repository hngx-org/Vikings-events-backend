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

const getGroupDetails = async(req, res) => {
  const groupId = req.params.groupId;
  try{
    const group = await Groups.findByPk(groupId)
    if(group) {
      res.json(group);
    } else {
      res.status(404).json({ error: 'Group not found'})
    }
  } catch (error){
    console.error(error)
    res.status(500).json({ error: error.message})
  }
}

module.exports = { createGroup, getGroups, getGroupDetails };
