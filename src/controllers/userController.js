const getUser = async (req, res) => {
  const users = 'All Users';
  res.json({ users });
};

module.exports = { getUser }
