const Groups = require('../models/groups');

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const groupDetials = async (req, res) => {
  const { groupId } = req.params;
  try {
    const detials = await Groups.findByPk(groupId);
    if (!detials) {
      return res
        .status(404)
        .json({ error: 'Group profile not found!' });
    }
    res.status(200).json(detials);
  } catch (error) {
    console.error('Error fetching this group profile:', error);
    res.status(500).json({ error: 'Unable to fetch group profile' });
  }
};

module.exports = { getGroups, groupDetials };
