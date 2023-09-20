const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getGroup = async (req, res) => {
  const group = 'A Group with id';
  res.json({ group });
};

module.exports = { getGroups, getGroup };
